# Exemple Vue JS + Nginx mode dev

# Lancement des container
```bash
docker compose up -d
```

# Installation des dépendances Node JS
```bash
docker compose exec node npm install
```

# Lancement du server node JS
```bash
docker compose exec node npm run dev -- --host --port 5000
```

