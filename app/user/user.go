package user

var SalaryInfoPerUser map[string]SalaryInfo

func NewSalaryInfoPerUser() {
	SalaryInfoPerUser = make(map[string]SalaryInfo)
}

type SalaryInfo struct {
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
