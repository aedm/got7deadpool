# Dockerfile
FROM debian

# Install Meteor
RUN apt-get update
RUN apt-get -y install curl procps python g++ make
RUN curl https://install.meteor.com/ | sh   # Meteor 1.4.2

ADD . /app
WORKDIR /app

RUN meteor npm install
RUN meteor build --directory /meteor-app
WORKDIR /meteor-app/bundle/programs/server
RUN meteor npm install

ENV PORT 3000
EXPOSE 3000

CMD meteor node boot.js program.json
