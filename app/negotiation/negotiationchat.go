package negotiation

import (
	"context"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"

	"github.com/doniacld/prospera/app/gemini"
	"github.com/doniacld/prospera/app/user"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

// NegotiationChatWebsocketHandler is the websocket endpoint handler for negotiation chat
func NegotiationChatWebsocketHandler(c *gin.Context) {
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

	// Generate AI response
	chatInfo := gemini.NewChatInfo(userID)
	aiResponse, err := gemini.InitiateChat(chatInfo, buildNegotiationCoachPrompt(userDetails))
	if err != nil {
		http.Error(c.Writer, "Could not generate Gemini AI Response", http.StatusInternalServerError)
		return
	}

	msg := coachPromptIntro + aiResponse
	err = ws.WriteMessage(websocket.TextMessage, []byte(msg))
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
