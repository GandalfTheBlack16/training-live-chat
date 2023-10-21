FROM nginx:stable-alpine3.17

RUN ["apk", "add", "--update", "nodejs", "npm"]

RUN ["npm", "i", "-g", "pnpm"]

WORKDIR /var/app

COPY . .

RUN ["pnpm", "i"]

RUN ["pnpm", "build"]

RUN ["cp", "-rf", "dist/.", "/usr/share/nginx/html/"]