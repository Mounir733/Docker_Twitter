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

# Exposez le port 8080
EXPOSE 7070

# Démarrez l'application
CMD [ "npm", "run", "dev" ]