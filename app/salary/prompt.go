package salary

import (
	"fmt"
	"github.com/doniacld/prospera/app/user"
)

func buildPrompt(user user.SalaryInfo) string {
	promptStr := ""
	promptStr += fmt.Sprintf("I am a %s with %d years of experience in the field of %s.\n", user.JobTitle, user.YearsExperience, user.Industry)
	promptStr += fmt.Sprintf("I am currently looking for new opportunities in %s.\n", user.Location)
	promptStr += fmt.Sprintf("I am currently paid %d.\n", user.CurrentSalary)
	promptStr += fmt.Sprintf("I am aiming to earn more with a target of a next salary of %d.\n", user.DesiredSalary)
	promptStr += fmt.Sprintf("I have the following skills: %s.\n", user.Skills)
	promptStr += fmt.Sprintf("I have a major in %s.\n", user.Major)
	promptStr += fmt.Sprintf("I am graduated in %s.\n", user.Diploma)

	// Add a constant ending note for the format
	endingNote := `
  I would like to know what is the salary range I could expect.

  Can you give me a salary range using the following format?
  - Minimum salary range :
  - Maximum salary range: 

  Add some information about what I could negotiate (holidays, etc) in a format list of 3 bullets:
  1. xxx
  2. xxx
  3. xxx

  Add a nice note to end wishing you luck and encourage me to learn how to negotiate using the negotiation coach my tool will provide:
  ---
  NB: xxx`

	return promptStr + endingNote
}
