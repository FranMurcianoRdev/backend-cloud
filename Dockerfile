# Usa la imagen de Node.js basada en Alpine
FROM node:18-alpine

# Crea y establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de definición de dependencias
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm ci

# Copia el resto del código fuente
COPY . .

# Ejecuta el build de TypeScript
RUN npm run build --loglevel verbose

# Expone el puerto de la aplicación
EXPOSE 3001

# Comando para iniciar la aplicación
CMD ["npm", "start"]

ENV USE_MOCKS=true
# Instala jq en Alpine
RUN apk update && apk add jq

# Modifica el archivo package.json usando jq, manejando el caso donde .imports no existe o es null
RUN updatedImports="$(jq '.imports // [] | map(sub("./src"; "./dist"))' ./package.json)" && echo "${updatedImports}" > ./package.json
