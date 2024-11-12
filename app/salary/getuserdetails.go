package salary

import (
	"net/http"

	"github.com/doniacld/prospera/app/user"
	"github.com/gin-gonic/gin"
)

// GetSalaryBenchmarkHandler retrieves salary information for a specific userId
func GetSalaryBenchmarkHandler(c *gin.Context) {
	// Extract userId from the URL parameters
	userID := c.Query("userId")

	// Lookup the userId in SalaryInfoPerUser
	salaryInfo, exists := user.SalaryInfoPerUser[userID]
	if !exists {
		// If userId does not exist, return a 404 error
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Return the salary information as JSON if found
	c.JSON(http.StatusOK, salaryInfo)
}
