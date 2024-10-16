package salarybench

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type SalaryBenchmarkResponse struct {
	MinRange int `json:"minRange"`
	MaxRange int `json:"maxRange"`
}

func GetSalaryBenchMarkHandler(c *gin.Context) {
	jobTitle := c.Query("jobTitle")
	location := c.Query("location")
	experienceYears := c.Query("experienceYears")

	eyInt, err := strconv.Atoi(experienceYears)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	salary, err := getSalaryBenchmark(jobTitle, location, eyInt) // Fetch salary using APIs or static data
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	c.JSON(http.StatusOK, gin.H{
		"jobTitle":   jobTitle,
		"location":   location,
		"experience": experienceYears,
		"salaryMin":  salary.MinRange,
		"salaryMax":  salary.MaxRange,
	})

	return
}

func getSalaryBenchmark(jobTitle, location string, experienceYears int) (SalaryBenchmarkResponse, error) {
	// Call to external API or fetch from dataset
	return SalaryBenchmarkResponse{2000, 5000}, nil // placeholder salary
}
