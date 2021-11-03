From node:10.19.0

MAINTAINER SeungHyeop Chae <shchae.dev@gmail.com>

RUN mkdir -p /app

WORKDIR /app

ADD . /app

COPY package*.json ./

RUN npm install

EXPOSE 3030

CMD ["sudo","npm","start"]
