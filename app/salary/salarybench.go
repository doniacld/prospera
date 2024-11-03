package salary

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

var SalaryBenchmarkPerUser map[string]Benchmark

func NewSalaryBenchmark() {
	SalaryBenchmarkPerUser = make(map[string]Benchmark)
}

type Benchmark struct {
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
	sb := Benchmark{}
	if err := c.ShouldBindJSON(&sb); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	err := addSalaryBenchmark(sb)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}

	// Return the response as JSON
	c.JSON(http.StatusOK, gin.H{"response": ""})
}

func addSalaryBenchmark(sb Benchmark) error {
	_, ok := SalaryBenchmarkPerUser[sb.UserID]
	if !ok {
		SalaryBenchmarkPerUser[sb.UserID] = sb
		log.Println("Salary Benchmark Added for " + sb.UserID)
	} else {
		SalaryBenchmarkPerUser[sb.UserID] = sb
		log.Println("Salary Benchmark Updated for " + sb.UserID)
	}

	return nil
}
