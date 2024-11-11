package salary

import "fmt"

func buildPrompt(userDetails Details) string {
	promptStr := ""
	promptStr += fmt.Sprintf("I am a %s with %d years of experience in the field of %s.\n", userDetails.JobTitle, userDetails.YearsExperience, userDetails.Industry)
	promptStr += fmt.Sprintf("I am currently looking for new opportunities in %s.\n", userDetails.Location)
	promptStr += fmt.Sprintf("I am currently paid %d.\n", userDetails.CurrentSalary)
	promptStr += fmt.Sprintf("I am aiming to earn more with a target of a next salary of %d.\n", userDetails.DesiredSalary)
	promptStr += fmt.Sprintf("I have the following skills: %s.\n", userDetails.Skills)
	promptStr += fmt.Sprintf("I have a major in %s.\n", userDetails.Major)
	promptStr += fmt.Sprintf("I am graduated in %s.\n", userDetails.Diploma)

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
