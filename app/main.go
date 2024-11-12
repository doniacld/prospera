package main

import (
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"github.com/doniacld/prospera/app/negotiation"
	"github.com/doniacld/prospera/app/salary"
	"github.com/doniacld/prospera/app/tips"
	"github.com/doniacld/prospera/app/user"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Failed to load environment variables :", err)
		return
	}

	r := gin.Default()

	user.NewSalaryInfoPerUser()

	// Configure CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},  // Frontend origin
		AllowMethods:     []string{"POST", "GET", "OPTIONS"}, // Allow relevant methods
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		AllowCredentials: true,
	}))

	// Endpoint to store user salary info
	r.POST("/salary/benchmark", salary.PostSalaryBenchmarkHandler)

	// Websocket endpoints to chat with Prospera
	r.GET("/ws/salary", salary.SalaryChatWebsocketHandler)
	r.GET("/ws/negotiation", negotiation.NegotiationChatWebsocketHandler)
	r.GET("/ws/tips", tips.TipsChatWebsocketHandler)

	// start server
	err = r.Run(":8080")
	if err != nil {
		log.Fatalf("Could not start server: %s", err)
	}
}
