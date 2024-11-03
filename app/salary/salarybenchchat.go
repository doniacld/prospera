package salary

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"net/http"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

// SalaryChatWebsocketHandler is the websocket endpoint handler for salary benchmark chat.
func SalaryChatWebsocketHandler(c *gin.Context) {
	userID := c.Query("userID")
	sb, ok := SalaryBenchmarkPerUser[userID]
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

	intro := fmt.Sprintf("Hello! I hope you are doing well! Thanks for all the info, here is a recap"+
		"Your job title is: %s, you have %d years of experience in your field and you live in %s area",
		sb.JobTitle, sb.YearsExperience, sb.Location)

	err = ws.WriteMessage(websocket.TextMessage, []byte(intro))
	if err != nil {
		http.Error(c.Writer, "Could not write message", http.StatusInternalServerError)
		return
	}
	fmt.Println("Salary Websocket connected")

	for {
		// Read message from user
		_, msg, err := ws.ReadMessage()
		if err != nil {
			return
		}

		// Generate AI response (mock)
		aiResponse, err := generateGeminiResponse(string(msg))
		if err != nil {
			http.Error(c.Writer, "Could not generate Gemini AI Response", http.StatusInternalServerError)
			return
		}

		// Write message back to WebSocket
		if err := ws.WriteMessage(websocket.TextMessage, []byte(aiResponse)); err != nil {
			return
		}
	}
}

// TODO start with an intro message
func generateGeminiResponse(msg string) (string, error) {
	return "TODO: Implement me", nil
}
