
FROM node:alpine as build


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


RUN npm run build


FROM nginx:stable-alpine AS production-stage


COPY --from=build-stage /app/dist /usr/share/nginx/html


EXPOSE 3000 


CMD ["nginx", "-g", "daemon off;"]