package salary

import (
	"github.com/google/uuid"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

var UserDetails map[string]Details

func NewSalaryBenchmark() {
	UserDetails = make(map[string]Details)
}

type Details struct {
	UserID          string   `json:"userId"`
	JobTitle        string   `json:"jobTitle"`
	YearsExperience int      `json:"YearsExperience"`
	Location        string   `json:"Location"`
	CurrentSalary   int      `json:"CurrentSalary"`
	DesiredSalary   int      `json:"DesiredSalary"`
	Skills          []string `json:"Skills"`
	Industry        string   `json:"Industry"`
	Major           string   `json:"Major"`
	Diploma         string   `json:"Diploma"`
}

func PostSalaryBenchmarkHandler(c *gin.Context) {
	sb := Details{}
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

func addSalaryBenchmark(sb Details) (string, error) {
	_, ok := UserDetails[sb.UserID]
	if !ok {
		sb.UserID = uuid.NewString()
		UserDetails[sb.UserID] = sb
		log.Println("Salary Details Added for " + sb.UserID)
	} else {
		UserDetails[sb.UserID] = sb
		log.Println("Salary Details Updated for " + sb.UserID)
	}

	log.Printf("Salary Details Added for %v \n", sb)

	log.Println("Salary Details Added for " + sb.UserID)

	return sb.UserID, nil
}
