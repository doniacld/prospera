package salary

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"

	"github.com/doniacld/prospera/app/user"
)

func PostSalaryBenchmarkHandler(c *gin.Context) {
	sb := user.SalaryInfo{}
	if err := c.ShouldBindJSON(&sb); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	userID, err := addSalaryBenchmark(sb)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}

	// Return the response as JSON
	c.JSON(http.StatusOK, gin.H{"userId": userID})
}

func addSalaryBenchmark(sb user.SalaryInfo) (string, error) {
	_, ok := user.SalaryInfoPerUser[sb.UserID]
	if !ok {
		sb.UserID = uuid.NewString()
		user.SalaryInfoPerUser[sb.UserID] = sb
		log.Println("Salary user.SalaryInfo Added for " + sb.UserID)
	} else {
		user.SalaryInfoPerUser[sb.UserID] = sb
		log.Println("Salary user.SalaryInfo Updated for " + sb.UserID)
	}

	log.Println("Salary SalaryInfo Added for userID " + sb.UserID)

	return sb.UserID, nil
}
