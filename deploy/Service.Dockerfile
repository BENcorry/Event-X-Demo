FROM node:12.18.4 as build

WORKDIR /tmp

COPY . .

RUN npm cache verify \
   npm cache clean -f

RUN npm ci --registry https://registry.npm.taobao.org && npm run build

RUN npm run start

