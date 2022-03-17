const { DataTypes } = require('sequelize');
const connection = require('./db-connection');

const Games = connection.define(
  'Game',
  {
    gameName: { type: DataTypes.STRING, allowNull: false },
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
    },
    {
      underscored: true,
      timestamps: false,
    }
);  

Games.belongsToMany(Publishers, { as: 'Publishers', through: 'GamePublishers'});
Publishers.belongsToMany(Games, { as: 'Games', through: 'GamePublishers'});
Games.belongsTo(Genres, { as: 'GenreRef', foreignKey: 'genreId'}); 
Games.belongsToMany(Platforms, { as: 'Platforms', through: 'GamePlatforms'});
Platforms.belongsToMany(Games, { as: 'Games', through: 'GamePlatforms'});

connection
    .sync({
      
    })
    /*.then(() => {
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
        genreId: 2
      }).then((games) => {
        games.setPlatform([2])
        games.setPlatform([1])
        games.setPublisher([2])
      })
    })
    .then(() => {
      Games.create({
        gameName: 'Age Of Empires',
        genreId: 1
      }).then((games) => {
        games.setPlatform([1])
         games.setPlatform([3])
        games.setPublisher([1])
      })
    })
    .then(() => {
      Games.create({
        gameName: 'Halo',
        genreId: 2
      }).then((games) => {
        games.setPlatform([1])
        games.setPlatform([2])
        games.setPlatform([3])
        games.setPublisher([1])
      })
    })*/
    .then(() => {
        console.log("Models Ran On Database")
    })
    .catch(err => {
        console.error(`Unable to connect to db ${err}`)
    })

module.exports = { Games, Platforms, Publishers, Genres };
