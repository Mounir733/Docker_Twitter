const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// création de l'application express
const app = express();

// utilisation de bodyParser pour analyser les requêtes POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// utilisation de cors pour permettre les requêtes cross-domain
app.use(cors());

// connexion à la base de données PostgreSQL
const Sequelize = require('sequelize');
const sequelize = new Sequelize('twitter', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// définition d'un modèle pour les utilisateurs
const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

// définition d'un modèle pour les tweets
const Tweet = sequelize.define('tweet', {
  text: {
    type: Sequelize.STRING,
    allowNull: false
  },
  likes: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});

// définition d'une relation entre les utilisateurs et les tweets
User.hasMany(Tweet);
Tweet.belongsTo(User);

// synchronisation des modèles avec la base de données
sequelize.sync({ force: true }).then(() => {
  console.log('Base de données synchronisée !');
});

// définition d'une route pour récupérer tous les tweets
app.get('/tweets', (req, res) => {
  Tweet.findAll({
    include: [User]
  }).then(tweets => {
    res.json(tweets);
  });
});

// définition d'une route pour ajouter un tweet
app.post('/tweets', (req, res) => {
  Tweet.create({
    text: req.body.text,
    userId: req.body.userId
  }).then(tweet => {
    res.json({ message: 'Tweet créé !' });
  });
});

// définition d'une route pour liker un tweet
app.put('/tweets/:id/like', (req, res) => {
  Tweet.findByPk(req.params.id).then(tweet => {
    tweet.likes += 1;
    tweet.save().then(() => {
      res.json({ message: 'Tweet liké !' });
    });
  });
});

// démarrage du serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});