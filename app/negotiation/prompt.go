package negotiation

import (
	"fmt"
	"strings"

	"github.com/doniacld/prospera/app/user"
)

func buildNegotiationCoachPrompt(user user.SalaryInfo) string {
	// Create a prompt for the negotiation coach role-play
	prompt := ""
	prompt += fmt.Sprintf("I'm %s, a professional with %d years in %s, currently aiming for a new opportunity in %s.\n", user.JobTitle, user.YearsExperience, user.Industry, user.Location)
	prompt += fmt.Sprintf("My current salary is %d, and I'm targeting a next salary of %d.\n", user.CurrentSalary, user.DesiredSalary)
	prompt += fmt.Sprintf("Skills: %s.\n", strings.Join(user.Skills, ", "))
	prompt += fmt.Sprintf("Education: Major in %s, graduated with a %s.\n", user.Major, user.Diploma)

	// Negotiation coach prompt for an interactive and gamified experience
	coachPrompt := `
Here’s the game plan:
I’ll take on the role of your employer, and you’ll respond as if you’re in the actual negotiation room. Don't worry—I’ll guide, encourage, and challenge you at every step!

Round 1: **Expressing Your Value**
🎯 Let’s start with your strengths. Share the unique skills and achievements that make you stand out. Ready to make your case? Aim to impress!

Round 2: **Counter the Offer**
💰 Time to get tactical! I’ll make a first offer, and I want to see you confidently counter with a thoughtful rationale. Hint: Back up your ask with specific contributions or goals!

Round 3: **Going Beyond Salary**
💼 Remember, there’s more to negotiate than salary. Let’s see how you’ll ask for those extras like flexibility, professional development, or other benefits. Show me your strategy!

Final Challenge: **Holding Your Ground**
🎯 I’ll challenge your counteroffer. Stay confident, show resilience, and remember your worth. Are you up for the challenge?

Game Tip 💡: Throughout each round, keep responses concise but impactful! I’ll provide feedback and adjust my responses to keep you sharp and ready for anything.

Ready to begin? Type “Start” to kick off your first round. Let’s get negotiating! 💪
`
	return prompt + coachPrompt
}

const coachPromptIntro = `Welcome to the Negotiation Arena! 🏆 Let's get you warmed up and ready to master the art of negotiation!
Here’s the game plan:
I’ll take on the role of your employer, and you’ll respond as if you’re in the actual negotiation room. Don't worry—I’ll guide, encourage, and challenge you at every step!

Round 1: **Expressing Your Value**
🎯 Let’s start with your strengths. Share the unique skills and achievements that make you stand out. Ready to make your case? Aim to impress!

Round 2: **Counter the Offer**
💰 Time to get tactical! I’ll make a first offer, and I want to see you confidently counter with a thoughtful rationale. Hint: Back up your ask with specific contributions or goals!

Round 3: **Going Beyond Salary**
💼 Remember, there’s more to negotiate than salary. Let’s see how you’ll ask for those extras like flexibility, professional development, or other benefits. Show me your strategy!

Final Challenge: **Holding Your Ground**
🎯 I’ll challenge your counteroffer. Stay confident, show resilience, and remember your worth. Are you up for the challenge?

Game Tip 💡: Throughout each round, keep responses concise but impactful! I’ll provide feedback and adjust my responses to keep you sharp and ready for anything.

Ready to begin? Type “Start” to kick off your first round. Let’s get negotiating! 💪`
