package main

import (
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"github.com/doniacld/prospera/app/negotrain"
	"github.com/doniacld/prospera/app/salarybench"
)

func main() {
	r := gin.Default()

	// Configure CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},  // Frontend origin
		AllowMethods:     []string{"POST", "GET", "OPTIONS"}, // Allow relevant methods
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		AllowCredentials: true,
	}))

	r.GET("/salarybench", salarybench.GetSalaryBenchMarkHandler)
	r.POST("/negotiation", negotrain.NegotiationChatHandler)

	// start server
	err := r.Run(":8080")
	if err != nil {
		log.Fatalf("Could not start server: %s", err)
	}
}
