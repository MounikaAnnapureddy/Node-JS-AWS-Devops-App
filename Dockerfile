# Our node app is based on `18-alpine` image 
FROM node:18-alpine

# Setting up the environment variables needed:
ENV DOMAIN="http://localhost:3000" \
PORT=3000 \
STATIC_DIR="./client" \
PUBLISHABLE_KEY="pk_test_51OS6mWF95hysrTjz0DrQpIdBxoA6sRPMWoXC9lme9ckdpz8E9dtUNEYsJSG0nGBO8yahLXWGGPzFAzsDGVdOwctg00OmsrvcUT"
SECRET_KEY="sk_test_51OS6mWF95hysrTjzp6M0jXGcoXbmxXDGhSECjzgAMdjJrwmNrYnX7dDg1V0fTn4mcXESgIwFP01u1bi3lWGK74Jm00vQFv4D7I"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
