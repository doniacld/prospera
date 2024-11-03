package main

import (
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"github.com/doniacld/prospera/app/negotiation"
	"github.com/doniacld/prospera/app/salary"
)

func main() {
	r := gin.Default()

	salary.NewSalaryBenchmark()

	// Configure CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},  // Frontend origin
		AllowMethods:     []string{"POST", "GET", "OPTIONS"}, // Allow relevant methods
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		AllowCredentials: true,
	}))

	// TODO not sure if we need it
	r.GET("/salary", salary.StartNegotiationHandler)
	r.GET("/negotiation", negotiation.StartNegotiationHandler)

	r.POST("/salary/benchmark", salary.PostSalaryBenchmarkHandler)

	// Websocket endpoints to chat with Prospera
	r.GET("/ws/salary", salary.SalaryChatWebsocketHandler)
	r.GET("/ws/negotiation", negotiation.NegotiationChatWebsocketHandler)

	// start server
	err := r.Run(":8080")
	if err != nil {
		log.Fatalf("Could not start server: %s", err)
	}
}
