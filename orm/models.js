const { DataTypes } = require('sequelize');
const connection = require('./db-connection');

const Games = connection.define(
  'Game',
  {
    gameName: { type: DataTypes.STRING, allowNull: false },
    gameId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    underscored: true,
    timestamps: false,
  }
);

const Publishers = connection.define(
  'Publisher',
  {
    publisherName: { type: DataTypes.STRING, allowNull: false },
    publisherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    underscored: true,
    timestamps: false,
  }
);

const Platforms = connection.define(
    'Platform',
    {
      platformName: { type: DataTypes.STRING, allowNull: false },
      platformId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    {
      underscored: true,
      timestamps: false,
    }
);  

const Genres = connection.define(
    'Genre',
    {
      genreName: { type: DataTypes.STRING, allowNull: false },
      genreId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    {
      underscored: true,
      timestamps: false,
    }
);  

Games.belongsTo(Publishers, { as: 'PublisherRef', foreignKey: 'publisherId'}); 
Games.hasMany(Platforms, { as: "All_Platforms" }); 
Genres.hasMany(Games, { as: "All_Games" }); 
Games.belongsTo(Genres, { as: 'GenreRef', foreignKey: 'genreId'}); 
Publishers.hasMany(Games, { as: 'All_Games' }); 

connection
    .sync({force: true})
    .then(() => {
      Genres.create({
        genreName: 'Horror'
      })
    })
    .then(() => {
      Genres.create({
        genreName: 'Action'
      })
    })
    .then(() => {
      Platforms.create({
        platformName: 'Xbox'
      })
    })
    .then(() => {
      Platforms.create({
        platformName: 'Pc'
      })
    })
    .then(() => {
      Platforms.create({
        platformName: 'Playstation'
      })
    })
    .then(() => {
      Publishers.create({
        publisherName: 'Xbox Games Studios'
      })
    })
    .then(() => {
      Publishers.create({
        publisherName: 'Blizzard'
      })
    })
    .then(() => {
      Games.create({
        gameName: 'Overwatch',
        publisherId: 2,
        genreId: 2
      })
    })
    .then(() => {
      Games.create({
        gameName: 'Age Of Empires',
        publisherId: 1,
        genreId: 1
      })
    })
    .then(() => {
        console.log("Models Ran On Database")
    })
    .catch(err => {
        console.error(`Unable to connect to db ${err}`)
    })

module.exports = { Games, Platforms, Publishers, Genres };
