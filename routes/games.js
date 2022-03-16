var express = require('express')
var router = express.Router();
var {Games, Platforms, Genres, Publishers} = require('../orm/models')

router.get('/', (req,res) => {
    Games.findAll({
        include: [{
            model: Genres, as: 'GenreRef'
        },
        {
            model: Publishers, as: 'PublisherRef'
        },
        {
            model: Platforms, as: 'All_Platforms',
            attributes: ['platformName']
        }
        ]
    })
    .then(Games => {
        res.json(Games);
    })
    .catch(error => {
        console.log(error);
        res.status(404).send(error);
    })
});

router.get('/:id', (req,res) => {
    Games.findByPk(req.params.id)
    .then(games => {
        res.json(games);
    })
    .catch(error => {
        console.log(error);
        res.status(404).send(error);
    })
});

router.post('/', async (req, res) => {
    const newGame = req.body.game;
    Games.create({
        gameName: newGame.gameName,
        publishDate: newGame.publishDate,
        fileSize: newGame.fileSize,
        genre: newGame.genre,
        gameId: newGame.gameId,
    })
    .then(user => {
        res.json(game);
    })
    .catch(error => {
        console.log(error);
        res.status(404).send(error);
    })
});

module.exports = router;