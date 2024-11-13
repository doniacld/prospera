package tips

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"

	"github.com/doniacld/prospera/app/gemini"
	"github.com/doniacld/prospera/app/user"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

// TipsChatWebsocketHandler is the websocket endpoint handler for negotiation chat
func TipsChatWebsocketHandler(c *gin.Context) {
	userID := c.Query("userID")
	userDetails, ok := user.SalaryInfoPerUser[userID]
	if !ok {
		http.Error(c.Writer, "User not found", http.StatusBadRequest)
	}

	// Upgrade HTTP request to WebSocket
	ws, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		http.Error(c.Writer, "Could not open websocket connection", http.StatusBadRequest)
		return
	}
	defer ws.Close()

	log.Println("Negotiation Websocket connected")

	intro := `Nice move! Here are some personalized negotiation 
tips to help you make a confident impression during your salary discussion.
Remember, good preparation and the right strategies can make all the difference. 
Let's get you equipped for success!
`

	// Generate AI response
	chatInfo := gemini.NewChatInfo(userID)
	aiResponse, err := gemini.InitiateChat(chatInfo, buildTipsPrompt(userDetails))
	if err != nil {
		http.Error(c.Writer, "Could not generate Gemini AI Response", http.StatusInternalServerError)
		return
	}

	intro += aiResponse

	err = ws.WriteMessage(websocket.TextMessage, []byte(intro))
	if err != nil {
		http.Error(c.Writer, "Could not write message", http.StatusInternalServerError)
		return
	}

	for {
		// Read message from user
		_, msg, err := ws.ReadMessage()
		if err != nil {
			return
		}

		// Generate AI response
		aiResponse, err := gemini.SendMessage(context.Background(), chatInfo, string(msg))
		if err != nil {
			http.Error(c.Writer, "Could not generate Gemini AI Response", http.StatusInternalServerError)
			return
		}

		// Write message back to WebSocket (= user)
		if err := ws.WriteMessage(websocket.TextMessage, []byte(aiResponse)); err != nil {
			return
		}
	}
}

func buildTipsPrompt(user user.SalaryInfo) string {
	tips := ""
	tips += fmt.Sprintf("I am a %s with %d years of experience in %s.\n", user.JobTitle, user.YearsExperience, user.Industry)
	tips += fmt.Sprintf("I am currently exploring new opportunities in %s.\n", user.Location)
	tips += fmt.Sprintf("Currently, I earn %d, and my target salary is %d.\n", user.CurrentSalary, user.DesiredSalary)
	tips += fmt.Sprintf("Skills: %s.\n", strings.Join(user.Skills, ", "))
	tips += fmt.Sprintf("Education includes a major in %s, graduated with a %s.\n", user.Major, user.Diploma)

	// Intro and tips for negotiation, with a special section for women in tech
	endingNote := `
Negotiation Tips:
1. **Know Your Worth**: Do thorough research on market salary ranges for roles like %s, especially in the %s industry, and don't hesitate to back up your ask with examples of your achievements and skills.
2. **Negotiate Beyond Salary**: Besides salary, consider asking for benefits like flexible working hours, professional development budgets, or equity shares.
3. **Express Your Value Confidently**: When negotiating, focus on the value you bring to the team and company, showcasing how your skills and experience directly contribute to company goals.

Confidence-Boosting Tips for Women in Tech:
1. **Advocate for Yourself**: Don't wait for recognition—speak up about your achievements and ask for opportunities that align with your career growth.
2. **Leverage a Mentor Network**: Connect with other women in tech for guidance, mentorship, and support, which can help boost both confidence and career development.
3. **Stay Curious and Keep Learning**: Continuously upskill and stay updated with industry trends, reinforcing your confidence in your expertise and readiness for new challenges.

Good luck with your negotiation journey! Believe in your value, and remember that confidence grows with every step you take in advocating for yourself. You’ve got this!
`

	return tips + fmt.Sprintf(endingNote, user.JobTitle, user.Industry)
}
