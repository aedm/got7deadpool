# Dockerfile
FROM aedm/meteor:1.4.2.1

ADD . /app
WORKDIR /app

RUN meteor npm install
RUN meteor --allow-superuser build --directory /meteor-app
WORKDIR /meteor-app/bundle/programs/server
RUN meteor npm install

ENV PORT 3000
EXPOSE 3000

CMD meteor node boot.js program.json
