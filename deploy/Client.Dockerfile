FROM node:12.18.4 as build

WORKDIR /tmp

COPY . .

RUN npm cache verify \
   npm cache clean -f

RUN npm ci --registry https://registry.npm.taobao.org && npm run build

FROM nginx:1.12.2

WORKDIR /usr/share/nginx/html
RUN rm -f *
COPY --from=build /tmp/dist .

# 替换default.conf文件，解决单页面部署后刷新404问题
COPY --from=build /deploy/default.conf /etc/nginx/conf.d/default.conf
