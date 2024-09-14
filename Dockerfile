FROM node:slim

WORKDIR /backend

COPY package*.json /

RUN npm install

COPY . .

ENV PORT=4500

EXPOSE 4500

CMD [ "npm", "run", "dev" ]