package negotrain

import (
	"context"
	"fmt"
	"os"

	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
)

func NegotiationChatHandler(c *gin.Context) {
	b := BenchmarkComparison{}

	fmt.Println("c", *c.Request, c.Params)

	if err := c.ShouldBindJSON(&b); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	nc := NewNegotiationCoach()

	resp, err := nc.Chat(context.Background(), promptStart)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}

	// Return the response as JSON
	c.JSON(http.StatusOK, gin.H{"response": NegotiationChatResponse{ChatResp: resp}})
}

type NegotiationChatResponse struct {
	ChatResp string `json:"chatResp"`
}

const (
	roleModel = "model"
	roleUser  = "user"

	// TODO need to be refined
	promptStart = `
1. I am woman willing to learn how to negotitate my future salary because I am not well paid.
2. We are going to do a play role so you can train me to negotiate.
3. Challenge me with real examples and counter offer. Consider an offer as a whole not only the salary. 
4. The role play should not be too long and should be engaging.
5. Can you please provide at the end of the roleplay between 3 to 5 feedback on my answers and how I can improve
6 Can you start the conversion! Hi %s! I hope you are doing well. 
What did you think about the offer we sent you with a salary %s?`
)

type NegotiationCoach struct {
	chatMessages []*genai.Content
	chatSession  *genai.ChatSession
}

func NewNegotiationCoach() *NegotiationCoach {
	return &NegotiationCoach{}
}

func (c *NegotiationCoach) InitiateChat() {
	ctx := context.Background()

	client, err := genai.NewClient(ctx, option.WithAPIKey(os.Getenv(googleApiKeyEnv)))
	if err != nil {
		log.Fatal(err)
	}
	defer client.Close()

	model := client.GenerativeModel("gemini-1.5-flash")

	cs := model.StartChat()
	c.chatSession = cs

	//c.chatSession.History = c.chatMessages
	res, err := cs.SendMessage(ctx, genai.Text(promptStart))
	if err != nil {
		// TODO not sure how to behave if there is an error, regarding the history.
		log.Fatal(err)
	}
	fmt.Printf("%v \n", res.Candidates)
}

func (c *NegotiationCoach) Chat(ctx context.Context, msg string) (string, error) {
	client, err := genai.NewClient(ctx, option.WithAPIKey(os.Getenv(googleApiKeyEnv)))
	if err != nil {
		log.Fatal(err)
	}
	defer client.Close()

	model := client.GenerativeModel("gemini-1.5-flash")

	cs := model.StartChat()
	c.chatSession = cs

	res, err := c.chatSession.SendMessage(ctx, genai.Text(msg))
	if err != nil {
		// TODO not sure how to behave if there is an error, regarding the history.
		log.Fatal(err)
	}

	fmt.Printf("%v \n", res.Candidates[0])

	c.chatMessages = []*genai.Content{
		{
			Parts: []genai.Part{
				genai.Text(msg),
			},
			Role: roleUser,
		},
		{
			Parts: res.Candidates[0].Content.Parts,
			Role:  roleModel,
		},
	}

	output := printResponse(res)

	return output, err
}

func printResponse(resp *genai.GenerateContentResponse) string {
	var respS string

	for _, cand := range resp.Candidates {
		if cand.Content != nil {
			for _, part := range cand.Content.Parts {
				respS = fmt.Sprintf("%v\n", part)
			}
		}
	}

	fmt.Println("response", respS)
	return respS
}
