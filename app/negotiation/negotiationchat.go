package negotiation

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

// NegotiationChatWebsocketHandler is the websocket endpoint handler for negotiation chat
func NegotiationChatWebsocketHandler(c *gin.Context) {
	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil) // Upgrade HTTP request to WebSocket
	if err != nil {
		http.Error(c.Writer, "Could not open websocket connection", http.StatusBadRequest)
		return
	}
	defer conn.Close()

	for {
		// Read message from user
		_, msg, err := conn.ReadMessage()
		if err != nil {
			return
		}

		log.Println("Message received:", string(msg))

		// Generate AI response (mock)
		aiResponse, err := generateGeminiResponse(string(msg))
		if err != nil {
			http.Error(c.Writer, "Could not generate Gemini AI Response", http.StatusInternalServerError)
			return
		}

		// Write message back to WebSocket
		if err := conn.WriteMessage(websocket.TextMessage, []byte(aiResponse)); err != nil {
			return
		}
	}
}

// TODO start with an intro message
func generateGeminiResponse(msg string) (string, error) {
	return "Implement me", nil
}
