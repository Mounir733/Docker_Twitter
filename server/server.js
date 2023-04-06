const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { authenticate } = require('./auth'); // import du fichier auth.js
const jwt = require('jsonwebtoken');

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

// définition d'une route pour créer un utilisateur
app.post('/users', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }).then(user => {
    res.json({ message: 'Utilisateur créé !' });
  });
});

// définition d'une route pour récupérer tous les tweets
app.get('/tweets', (req, res) => {
  Tweet.findAll({
    include: [User]
  }).then(tweets => {
    res.json(tweets);
  });
});

// // définition d'une route pour ajouter un tweet
// app.post('/tweets', (req, res) => {
//   Tweet.create({
//     text: req.body.text,
//     userId: req.body.userId
//   }).then(tweet => {
//     res.json({ message: 'Tweet créé !' });
//   });
// });

// définition d'une route pour créer un tweet
app.post('/tweets', (req, res) => {
  Tweet.create({
    text: req.body.text,
    likes: 0, // par défaut
    userId: req.body.userId
  }).then(tweet => {
    res.json(tweet);
  }).catch(error => {
    console.error(error);
    res.status(500).json({ error: 'Impossible de créer le tweet.' });
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

// définition d'une route pour la connexion d'un utilisateur
app.post('/login', (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
      password: req.body.password
    }
  }).then(user => {
    if (!user) {
      res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect.' });
    } else {
      const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '1h' });
      res.json({ token });
    }
  }).catch(error => {
    console.error(error);
    res.status(500).json({ error: 'Impossible de se connecter.' });
  });
});


