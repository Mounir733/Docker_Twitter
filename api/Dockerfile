# Utilisez une image de base avec Node.js préinstallé
FROM node:latest

# Définissez le répertoire de travail
WORKDIR /app

# Copiez les fichiers package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez tous les fichiers dans le répertoire de travail
COPY . .

# Exposez le port 3000 pour l'API
EXPOSE 3000

# Démarrez l'API
CMD ["npm", "start"]