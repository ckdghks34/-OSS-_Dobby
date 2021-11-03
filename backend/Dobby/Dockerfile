From node:10.19.0

MAINTAINER SeungHyeop Chae <shchae.dev@gmail.com>

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY ../../../../../etc/letsencrypt/archive/k5d105.p.ssafy.io /app

EXPOSE 3030

CMD ["npm","start"]
