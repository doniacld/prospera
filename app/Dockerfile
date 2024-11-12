FROM golang:1.23 as builder

WORKDIR /backend

COPY . /backend

RUN go mod download
RUN go build -o main .

FROM alpine:latest
RUN apk update && apk add --no-cache ca-certificates

WORKDIR /backend

COPY --from=builder /backend/main .

ENTRYPOINT ["./backend/main"]
