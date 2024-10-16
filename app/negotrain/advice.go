package negotrain

import (
	"context"
	"encoding/json"
	"log"
	"os"

	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
)

const (
	googleApiKeyEnv = "GOOGLE_API_KEY"
	//googleApiKeyEnv = "FAKE" // do no waste requests
	requestPrompt = "Give actionable advice for a women for negotiation taking into account the following context using this JSON schema."
)

type Advice struct {
	Title   string `json:"title"`
	Content string `json:"content"`
}

func generateAdvices(b BenchmarkComparison) ([]Advice, error) {
	// TODO use the content of the benchmark for the request
	ctx := context.Background()
	client, err := genai.NewClient(ctx, option.WithAPIKey(os.Getenv(googleApiKeyEnv)))
	if err != nil {
		log.Fatal(err)
	}
	defer client.Close()

	model := client.GenerativeModel("gemini-1.5-pro-latest")
	// Ask the model to respond with JSON.
	model.ResponseMIMEType = "application/json"
	// Specify the schema.
	model.ResponseSchema = &genai.Schema{
		Type: genai.TypeArray,
		Items: &genai.Schema{
			Type: genai.TypeObject,
			Properties: map[string]*genai.Schema{
				"title": {
					Type:        genai.TypeString,
					Description: "Title of the advice.",
				},
				"content": {
					Type:        genai.TypeString,
					Description: "The content of the advice.",
				},
			},
			Required: []string{"title", "content"},
		},
	}

	resp, err := model.GenerateContent(ctx, genai.Text(requestPrompt))
	if err != nil {
		log.Fatal(err)
	}

	var advices []Advice
	for _, part := range resp.Candidates[0].Content.Parts {
		if txt, ok := part.(genai.Text); ok {
			if err := json.Unmarshal([]byte(txt), &advices); err != nil {
				log.Fatal(err)
			}
		}
	}
	return advices, nil
}
