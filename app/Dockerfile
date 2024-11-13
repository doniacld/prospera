# Use the official Golang image to build the Go application
FROM golang:1.23 AS builder

# Set environment variable for a static build
ENV CGO_ENABLED=0

# Set the working directory inside the container
WORKDIR /app

# Copy go.mod and go.sum files to download dependencies
COPY app/go.mod app/go.sum ./
RUN go mod download

## Copy .env file into the Docker image
#COPY app/.env app/.env

# Copy the entire backend code into the working directory
COPY app/ .

# Build the Go application and output to /app/main
RUN go build -o main .

# Use a smaller image to run the application
FROM alpine:latest
WORKDIR /app

# Copy the statically built binary from the builder stage
COPY --from=builder /app/main /app/main

# Expose the port the backend listens on
EXPOSE 8080

# Run the application
CMD ["/app/main"]
