# Variables
BACKEND_DIR := app
FRONTEND_DIR := prospera-app
DOCKER_COMPOSE := docker-compose.yml

# Docker Targets
.PHONY: docker-build docker-up docker-down docker-backend docker-frontend docker-kill

# Docker build and start services
docker-build:
	docker-compose -f $(DOCKER_COMPOSE) build

docker-up: docker-build
	docker-compose -f $(DOCKER_COMPOSE) up -d

docker-down:
	docker-compose -f $(DOCKER_COMPOSE) down

# Start individual Docker services
docker-backend:
	docker-compose -f $(DOCKER_COMPOSE) up -d backend

docker-frontend:
	docker-compose -f $(DOCKER_COMPOSE) up -d frontend

# Kill Docker services
docker-kill:
	docker-compose -f $(DOCKER_COMPOSE) down

# Local Targets
.PHONY: run-backend run-frontend kill-backend kill-frontend

# Run backend locally
run-backend:
	cd $(BACKEND_DIR) && go run main.go

# Run frontend locally
run-frontend:
	cd $(FRONTEND_DIR) && npm start

# Kill backend and frontend
kill-backend:
	pkill -f "go run main.go" || echo "No backend process running"

kill-frontend:
	pkill -f "npm start" || echo "No frontend process running"

# Combined Local Commands
.PHONY: run-local kill-local

run-local: run-backend run-frontend

kill-local: kill-backend kill-frontend

run-salarybench-request:
	curl -X POST http://localhost:8080/salary/benchmark \
	-H "Content-Type: application/json" \
	-d@app/testdata/salarybenchmark_input.json

# Help
.PHONY: help

help:
	@echo "Available commands:"
	@echo "  run-backend       - Run backend locally"
	@echo "  run-frontend      - Run frontend locally"
	@echo "  kill-backend      - Kill local backend"
	@echo "  kill-frontend     - Kill local frontend"
	@echo "  run-local         - Run both backend and frontend locally"
	@echo "  kill-local        - Kill both backend and frontend locally"
	@echo "  docker-build      - Build Docker images for backend and frontend"
	@echo "  docker-up         - Start Docker containers for backend and frontend"
	@echo "  docker-down       - Stop and remove Docker containers"
	@echo "  docker-backend    - Start only the backend Docker container"
	@echo "  docker-frontend   - Start only the frontend Docker container"
	@echo "  docker-kill       - Kill all Docker containers"
