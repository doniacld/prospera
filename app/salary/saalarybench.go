package salary

type SalaryBenchmark struct {
	JobTitle        string `json:"job_title"`
	YearsExperience int    `json:"YearsExperience"`
	Location        string `json:"Location"`
}

func (b *SalaryBenchmark) NewSalaryBenchmark() *SalaryBenchmark {
	return &SalaryBenchmark{}
}
