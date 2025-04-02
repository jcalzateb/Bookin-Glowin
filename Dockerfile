# Etapa 1: Construcción del frontend
FROM node:20.10.0-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# Pasar la variable de entorno durante el build
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

RUN npm run build

# Etapa 2: Servir con Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
