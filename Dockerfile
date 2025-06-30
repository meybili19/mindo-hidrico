# Etapa 1: Construcción
FROM node:20-alpine AS builder

WORKDIR /app

# Copia archivos necesarios antes de instalar dependencias
COPY package*.json ./
COPY tsconfig.json ./
COPY next.config.ts ./
COPY eslint.config.mjs ./

# Instala dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Compila el proyecto
RUN npm run build

# Etapa 2: Servidor optimizado de producción
FROM node:20-alpine AS runner

WORKDIR /app

# Copia los archivos necesarios desde la etapa builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts

# Expone el puerto
EXPOSE 3000

# Inicia el servidor de producción
CMD ["npm", "start"]
