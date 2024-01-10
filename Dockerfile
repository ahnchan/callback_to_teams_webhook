FROM node:16
EXPOSE 8080

COPY * .
CMD npm install

RUN npm start