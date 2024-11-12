# Prospera

**Your new BFF empowering you to earn what you deserve!** 💸👯

## Quickstart

### Prerequisites

- Install Docker
- You need you [get a Google API Key](https://aistudio.google.com/app/apikey) and add it to [.env](./app/.env) file.
```shell
GOOGLE_API_KEY=<your_api_key>                      
```

If you want to run the backend manually:
- [Install Go](https://go.dev/doc/install) with a version > 1.23

If you want to run the frontend manually:
- [Install npm]() with a version > 22


### Run with Docker

Run the following command to launch the backend and the frontend, the full app.
It will build and run the docker for the backend (server) and the frontend.
```shell
make up
```

There are available then:
- backend: http://localhost:8080
- frontend: http://localhost:3000

### Backend

To run manually the backend

In a terminal run:
```shell
make run
```
or 

```shell
cd app && go run ./...
```

To make a call to the salary input form, run:
```shell
make make run_salarybench_request
```

Retrieve the userID from the response and pass it to the websocket endpoints:

You need to install `wscat` to launch websocket requests.

Request to call the salary benchmark endpoint:
```shell
wscat -c "ws://localhost:8080/ws/salary?userID=dc99f730-a288-4f49-81f6-e616847183ce"
```

Request to call the negotiation coach endpoint:
```shell
wscat -c "ws://localhost:8080/ws/negotiation?userID=dc99f730-a288-4f49-81f6-e616847183ce"
```

Request to call the tips to boost your confidence endpoint:
```shell
wscat -c "ws://localhost:8080/ws/tips?userID=dc99f730-a288-4f49-81f6-e616847183ce"
```

## Frontend

## TODO



