const { DataTypes } = require('sequelize');
const connection = require('./db-connection');

const Games = connection.define(
  'Game',
  {
    gameName: { type: DataTypes.STRING, allowNull: false },
    publishDate: DataTypes.DATEONLY,
    fileSize: DataTypes.INTEGER,
    genre: DataTypes.STRING,
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
    .sync({})
    .then(() => {
        console.log("Models Ran On Database")
    })
    .catch(err => {
        console.error(`Unable to connect to db ${err}`)
    })

module.exports = { Games, Platforms, Publishers, Genres };
