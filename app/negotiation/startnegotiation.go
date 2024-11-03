package negotiation

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// StartNegotiationRequest is the request for StartNegotiation endpoint.
type StartNegotiationRequest struct {
	UserID string `json:"userID,omitempty"` // TODO when is it created?
}

// StartNegotiationResponse is the response for StartNegotiation endpoint.
type StartNegotiationResponse struct {
	UserID       string `json:"userId,omitempty"`
	DiscussionID string `json:"discussionId,omitempty"`
}

// StartNegotiationHandler is the handler for StartNegotiation endpoint.
func StartNegotiationHandler(c *gin.Context) {
	request := StartNegotiationRequest{}
	err := c.BindJSON(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	// TODO create and store a new chat
	discussionID, err := createChat()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}

	response := StartNegotiationResponse{
		UserID:       request.UserID,
		DiscussionID: discussionID,
	}

	// Returns a status 200 Created OK
	c.JSON(http.StatusOK, response)
}

// createChat creates and stores a new chat.
func createChat() (string, error) {
	discussion := uuid.New().String()

	return discussion, nil
}
