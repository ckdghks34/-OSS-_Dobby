From node:10.19.0

MAINTAINER SeungHyeop Chae <shchae.dev@gmail.com>

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN mkdir -p ./k5d105.p.ssafy.io

COPY ./k5d105.p.ssafy.io /etc/letsencrypt/archive/k5d105.p.ssafy.io/

EXPOSE 3030

CMD ["npm","start"]
