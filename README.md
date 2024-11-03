# Prospera

**Your new BFF empowering you to earn what you deserve!** 💸👯

## Quickstart

### Prerequisites

- [Install Go](https://go.dev/doc/install) with a version > 1.23
- You need you [get a Google API Key](https://aistudio.google.com/app/apikey) and export it the terminal 
where you run the backend

```shell
 export GOOGLE_API_KEY=<your_api_key>                      
```

### Backend

In a terminal run:
```shell
make run
```
or 

```shell
cd app && go run main.go
```

To make a call to the negotiation chat, run:
```shell
 curl -v -X POST "http://localhost:8080/negotiation" -d '{"jobTitle":"Makeup Artist"}'
```
