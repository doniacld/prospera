package chat

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Chat struct {
	ID       string
	Messages []Message
}

type Message struct {
	Role    Role
	Content string
}

type Role string

const user = Role("user")
const bot = Role("bot")

func GetHistoryHandler(c *gin.Context) {
	chatID := c.Query("chatID")

	chat, err := getChatHistoryByID(chatID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	c.JSON(http.StatusOK, gin.H{
		"chat": chat,
	})
}

func getChatHistoryByID(id string) (Chat, error) {
	return Chat{
		ID: id,
		Messages: []Message{
			{
				Role:    bot,
				Content: "Hi! I hope you are doing well",
			},
			{
				Role:    user,
				Content: "Thanks for your insights",
			},
		},
	}, nil
}
