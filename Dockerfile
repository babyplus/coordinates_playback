FROM registry.cn-hangzhou.aliyuncs.com/babyplus/get:a2211240e2f7.git.2_37_1 as downloader
RUN mkdir -p /tmp/src
WORKDIR /tmp/src
RUN git clone https://github.com/babyplus/coordinates_player.git

FROM registry.cn-hangzhou.aliyuncs.com/babyplus/get:a240725cebee.node.20_16_0-bullseye as compiler
COPY --from=downloader /tmp/src/coordinates_player /tmp/src/coordinates_player
WORKDIR /tmp/src/coordinates_player
RUN yarn install
RUN yarn build

FROM registry.cn-hangzhou.aliyuncs.com/babyplus/get:a221123f5c48.nginx.1_23
COPY --from=compiler /tmp/src/coordinates_player/dist /usr/share/nginx/html
WORKDIR /usr/share/nginx/html

