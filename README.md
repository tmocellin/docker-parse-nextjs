# Next.js with Parse Server / Dashboard, Docker & NGINX

This repo contain a sample Next.js application wich use Parse Server as backend.

Every thing run inside Docker and use NGINX as reverse proxy and Let's Encrypt for HTTPS.

### How to use  

1- Clone this repo

```
git clone https://github.com/DWA-Studio/docker-parse-nextjs
```

2- Replace variables in docker-compose.yml and in web-app/config.js

3- Run docker-compose

```
docker-compose up
```

If you dont want to use it with NGINX and Let's Encrypt remove

```
nginx-proxy:
    image: jwilder/nginx-proxy
    container_name: nginx-proxy
    ports:
      - '80:80'
      - '443:443'
      volumes:
      - /var/run/docker.sock:/tmp/docker.sock:ro
      - /etc/nginx/vhost.d
      - /usr/share/nginx/html
      - /apps/web/ssl:/etc/nginx/certs:ro
ssl-companion:
    image: jrcs/letsencrypt-nginx-proxy-companion
    container_name: ssl-companion
    volumes:
      - /apps/web/ssl:/etc/nginx/certs:rw
      - /var/run/docker.sock:/var/run/docker.sock:ro
    volumes_from:
      - nginx-proxy
    depends_on:
      - nginx-proxy
```

You can read the article series [here](https://blog.dwastudio.fr/creer-une-application-web-avec-docker-parse-next-partie-1-introduction/)


* [NGINX Reverse Proxy](https://github.com/jwilder/nginx-proxy)
* [Let's Encrypt](https://github.com/JrCs/docker-letsencrypt-nginx-proxy-companion)
