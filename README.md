# app

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# quick start

1. Download the image package.
2. Transfer the image package to the server and import it into the Docker environment.
3. Execute through the containerized environment

```
[root@archlinux tmp]# md5sum coordinates_player.v1.0.0-slim.tar 
bdc26f178eca84b494140e15ef9d6c2b  coordinates_player.v1.0.0-slim.tar
[root@archlinux tmp]# docker load -i coordinates_player.v1.0.0-slim.tar 
78561cef0761: Loading layer [==================================================>]  8.082MB/8.082MB
c028c01f43bc: Loading layer [==================================================>]  4.447MB/4.447MB
b65aff7ee426: Loading layer [==================================================>]  3.584kB/3.584kB
16f2939def51: Loading layer [==================================================>]  4.608kB/4.608kB
9a2d14b22cbe: Loading layer [==================================================>]   2.56kB/2.56kB
f3719eb0da5e: Loading layer [==================================================>]   5.12kB/5.12kB
2cdd4bacf827: Loading layer [==================================================>]  7.168kB/7.168kB
9eb5c2a804cc: Loading layer [==================================================>]  2.811MB/2.811MB
5f70bf18a086: Loading layer [==================================================>]  1.024kB/1.024kB
Loaded image: coordinates_player:v1.0.0-slim
[root@archlinux tmp]# docker images | grep coordinates_player
coordinates_player                               v1.0.0-slim                                     3c44eb99d9ba   16 minutes ago   14.6MB
[root@archlinux tmp]# docker run -p 80:80 coordinates_player:v1.0.0-slim  
/docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
/docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
/docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
10-listen-on-ipv6-by-default.sh: info: Getting the checksum of /etc/nginx/conf.d/default.conf
10-listen-on-ipv6-by-default.sh: info: Enabled listen on IPv6 in /etc/nginx/conf.d/default.conf
/docker-entrypoint.sh: Sourcing /docker-entrypoint.d/15-local-resolvers.envsh
/docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
/docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
/docker-entrypoint.sh: Configuration complete; ready for start up
2024/09/04 08:27:24 [notice] 1#1: using the "epoll" event method
2024/09/04 08:27:24 [notice] 1#1: nginx/1.27.1
2024/09/04 08:27:24 [notice] 1#1: built by gcc 13.2.1 20240309 (Alpine 13.2.1_git20240309) 
2024/09/04 08:27:24 [notice] 1#1: OS: Linux 6.6.4-arch1-1
2024/09/04 08:27:24 [notice] 1#1: getrlimit(RLIMIT_NOFILE): 1073741816:1073741816
2024/09/04 08:27:24 [notice] 1#1: start worker processes
2024/09/04 08:27:24 [notice] 1#1: start worker process 29
2024/09/04 08:27:24 [notice] 1#1: start worker process 30
10.0.2.2 - - [04/Sep/2024:08:28:16 +0000] "GET / HTTP/1.1" 200 654 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36" "-"
10.0.2.2 - - [04/Sep/2024:08:28:16 +0000] "GET /css/chunk-vendors.b858ba48.css HTTP/1.1" 200 23003 "http://127.0.0.1:1280/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36" "-"
10.0.2.2 - - [04/Sep/2024:08:28:16 +0000] "GET /css/app.b3f20c27.css HTTP/1.1" 200 92611 "http://127.0.0.1:1280/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36" "-"
10.0.2.2 - - [04/Sep/2024:08:28:16 +0000] "GET /js/app.c2386d97.js HTTP/1.1" 200 136758 "http://127.0.0.1:1280/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36" "-"
10.0.2.2 - - [04/Sep/2024:08:28:16 +0000] "GET /js/chunk-vendors.12cb63d5.js HTTP/1.1" 200 400007 "http://127.0.0.1:1280/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36" "-"
10.0.2.2 - - [04/Sep/2024:08:28:17 +0000] "GET /favicon.ico HTTP/1.1" 200 4286 "http://127.0.0.1:1280/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36" "-"
```
