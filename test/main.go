package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
)

const googleApiKeyEnv = "GOOGLE_API_KEY"

const promptStart = `
1. I am woman willing to learn how to negotiate my future salary because I am not well paid.
2. We are going to do a play role, you are my AI assistant Prospera and you will train me to negotiate.
3. Challenge me with real examples and counter offer. Consider an offer as a whole not only the salary. 
4. The role play should not be too long and should be engaging.
5. Can you please provide at the end of the roleplay between 3 to 5 feedback on my answers and how I can improve
6 Can you start the conversion! Hi %s! I hope you are doing well. 
What did you think about the offer we sent you with a salary %s? and wait for answer before going further`

func main() {
	ctx := context.Background()
	client, err := genai.NewClient(ctx, option.WithAPIKey(os.Getenv(googleApiKeyEnv)))
	if err != nil {
		log.Fatal(err)
	}
	defer client.Close()

	model := client.GenerativeModel("gemini-1.5-flash")
	cs := model.StartChat()

	cs.History = []*genai.Content{
		{
			Parts: []genai.Part{
				genai.Text(promptStart),
			},
			Role: "user",
		},
		//{
		//	Parts: []genai.Part{
		//		genai.Text(""),
		//	},
		//	Role: "model",
		//},
	}

	res, err := cs.SendMessage(ctx, genai.Text("Hi Prospera! My name is Donia, my current salary is 30K and I am willing to earn 40K"))
	if err != nil {
		log.Fatal(err)
	}
	printResponse(res)

}

func printResponse(resp *genai.GenerateContentResponse) {
	for _, cand := range resp.Candidates {
		if cand.Content != nil {
			for _, part := range cand.Content.Parts {
				fmt.Println(part)
			}
		}
	}
	fmt.Println("---")
}
