run_backend:
	cd app && go run ./...

run_salarybench_request:
	curl -X POST http://localhost:8080/salary/benchmark \
	-H "Content-Type: application/json" \
	-d@app/testdata/salarybenchmark_input.json


.PHONY: up
up:
	docker-compose up -d

.PHONY: down
down:
	docker-compose down

.PHONY: build
build: up

.PHONY: stop
stop: down
