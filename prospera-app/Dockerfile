# frontend/Dockerfile
FROM node:22

WORKDIR /frontend

COPY /prospera-app /frontend
RUN npm install

COPY . .

EXPOSE 80

CMD [ "npm", "start" ]
