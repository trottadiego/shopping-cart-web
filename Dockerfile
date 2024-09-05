# Usa una imagen base de Node.js
FROM node:18 AS build

# Define el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY package*.json ./
COPY . .

# Instala las dependencias
RUN npm install

# Construye la aplicación para producción
RUN npm run build

# Usa una imagen base para servir la aplicación
FROM nginx:alpine

# Copia los archivos construidos a la imagen de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expon el puerto que usa Nginx
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
