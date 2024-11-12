# Usa una imagen base de Node.js
FROM node:18

# Instala FFmpeg
RUN apt-get update && \
    apt-get install -y ffmpeg

# Define el directorio de trabajo
WORKDIR /app

# Copia los archivos de tu aplicación
COPY package.json package-lock.json ./
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Expón el puerto de la aplicación (si es necesario)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
