package negotrain

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type BenchmarkComparison struct {
	JobTitle string `json:"jobTitle"`
	//CurrentSalary   float64  `json:"currentSalary"`
	//DesiredSalary   float64  `json:"desiredSalary"`
	//IndustryMedian  float64  `json:"industryMedian"`
	//Industry        string   `json:"industry"`
	//Location        string   `json:"location"`
	//YearsExperience int      `json:"yearsExperience"`
	//Skills          []string `json:"skills"`
}

type NegotiationResponse struct {
	Advices             []Advice            `json:"advices"`
	BenchmarkComparison BenchmarkComparison `json:"benchmarkComparison"`
}

func NegotiationHandler(c *gin.Context) {
	b := BenchmarkComparison{}

	fmt.Println("c", *c.Request, c.Params)

	if err := c.ShouldBindJSON(&b); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	fmt.Println("b", b)

	resp, err := GetNegotiationScript(b)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}

	// Return the response as JSON
	c.JSON(http.StatusOK, gin.H{"advices": resp.Advices, "benchmarkComparison": resp.BenchmarkComparison})
}

func GetNegotiationScript(b BenchmarkComparison) (NegotiationResponse, error) {
	// Fetch industry median salary (mock data or call your salary benchmark function)
	//industryMedian := 80000.0 // Placeholder value

	// Generate AI-powered negotiation advice (mock data or integrate with your AI model)

	// Build the benchmark comparison
	benchmarkComparison := BenchmarkComparison{
		JobTitle: b.JobTitle,
		//CurrentSalary:   b.CurrentSalary,
		//DesiredSalary:   b.DesiredSalary,
		//IndustryMedian:  industryMedian,
		//Location:        b.Location,
		//YearsExperience: b.YearsExperience,
		//Skills:          b.Skills,
	}

	//advices, err := generateAdvices(benchmarkComparison)
	//if err != nil {
	//	return NegotiationResponse{}, fmt.Errorf("")
	//}

	// Create the response object
	response := NegotiationResponse{
		Advices:             advicesContent,
		BenchmarkComparison: benchmarkComparison,
	}
	return response, nil
}

var advicesContent = []Advice{
	{
		Title: "Highlight Your Technical Skills",
		Content: "Emphasize your leadership in Python projects and your ability to manage teams while coding. " +
			"Highlight that these skills contribute significantly to the company's growth.",
	},
	{
		Title:   "Leverage Industry Salary Data",
		Content: "content",
		//Content: fmt.Sprintf("In " + b.Location + "'s " + b.Industry + " industry, the median salary for a " +
		//	b.JobTitle + " with " + strconv.Itoa(b.YearsExperience) + " years of experience is around $" +
		//	strconv.FormatFloat(industryMedian, 'f', 2, 64) + ". " +
		//	"Use this data to support your requested salary.",
	},
	{
		Title: "Discuss Long-Term Impact",
		Content: "Mention your long-term commitment and how your leadership in key projects will " +
			"continue to add value to the company. Propose that your desired salary reflects " +
			"your role's future growth potential.",
	},
}
