package gemini

import (
	"context"
	"errors"
	"fmt"
	"log"
	"os"

	"github.com/google/uuid"

	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
)

const (
	googleApiKeyEnv = "GOOGLE_API_KEY"
	generativeModel = "gemini-1.5-flash" // TODO: Make it configurable to the user?

	roleModel = "model"
	roleUser  = "user"
)

type ChatInfo struct {
	//messages []*genai.Content
	userID    string
	sessionID string
}

var ChatsInfoPerUser = map[ChatInfo]*genai.ChatSession{}

func NewChatInfo(userID string) ChatInfo {
	chatInfo := ChatInfo{userID: userID, sessionID: uuid.NewString()}
	ChatsInfoPerUser[chatInfo] = &genai.ChatSession{}

	return chatInfo
}

func InitiateChat(info ChatInfo, msg string) (string, error) {
	ctx := context.Background()
	//chat := ChatsInfoPerUser[ChatInfo{
	//	userID:    info.userID,
	//	sessionID: info.sessionID,
	//}]

	client, err := genai.NewClient(ctx, option.WithAPIKey(os.Getenv(googleApiKeyEnv)))
	if err != nil {
		log.Fatal(err)
	}
	defer client.Close()

	model := client.GenerativeModel(generativeModel)
	cs := model.StartChat()

	// Update history with user message
	cs.History = append(
		cs.History,
		&genai.Content{Parts: []genai.Part{genai.Text(msg)}, Role: roleUser},
	)

	// Send message to Gemini
	res, err := cs.SendMessage(ctx, genai.Text(msg))
	if err != nil {
		// TODO not sure how to behave if there is an error, regarding the history.
		log.Println(err)
	}

	// Update history with model message
	cs.History = append(
		cs.History,
		&genai.Content{Parts: res.Candidates[0].Content.Parts, Role: roleModel},
	)

	// Update chat session history
	fmt.Println("BEFORE", cs)
	ChatsInfoPerUser[info] = cs
	fmt.Println("AFTER", cs)

	resp := fmt.Sprintf("%v \n", res.Candidates[0].Content.Parts[0])

	return resp, nil
}

func SendMessage(ctx context.Context, info ChatInfo, msg string) (string, error) {
	//ctx := context.Background()
	chatSession, ok := ChatsInfoPerUser[info]
	if !ok {
		return "", errors.New("no chat session found")
	}

	client, err := genai.NewClient(ctx, option.WithAPIKey(os.Getenv(googleApiKeyEnv)))
	if err != nil {
		log.Fatal(err)
	}
	defer client.Close()

	model := client.GenerativeModel(generativeModel)
	cs := model.StartChat()

	cs.History = chatSession.History

	res, err := cs.SendMessage(ctx, genai.Text(msg))
	if err != nil {
		// TODO not sure how to behave if there is an error, regarding the history.
		return "", err
	}

	fmt.Printf("%v \n", res.Candidates[0])
	chatSession.History = append(
		chatSession.History,
		&genai.Content{Parts: []genai.Part{genai.Text(msg)}, Role: roleUser},
	)

	chatSession.History = append(
		chatSession.History,
		&genai.Content{Parts: res.Candidates[0].Content.Parts, Role: roleModel},
	)

	ChatsInfoPerUser[info] = chatSession
	//output := printResponse(res)

	resp := fmt.Sprintf("%#v", res.Candidates[0].Content.Parts[0])

	return resp, err
}
