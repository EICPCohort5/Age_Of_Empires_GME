var express = require('express')
var router = express.Router();
var {Games, Platforms, Genres, Publishers} = require('../orm/models')

router.get('/', (req,res) => {
    Games.findAll({
        include: [{
            model: Genres, as: 'GenreRef'
        },
        {
            model: Publishers, as: 'Publishers',
            attributes: ['publisherName']
        },
        {
            model: Platforms, as: 'Platforms',
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
})

router.get('/:id', (req,res) => {
    Games.findByPk(req.params.id)
    .then(games => {
        res.json(games);
    })
    .catch(error => {
        console.log(error);
        res.status(404).send(error);
    })
})

router.post('/', async (req, res) => {
    const newGame = req.body;
    Games.create({
        gameName: newGame.gameName,
        genreId: newGame.Genre,
    })
    .then(game => {
        newGame.Platforms.forEach(function(plaform) {
            game.setPlatforms([plaform])
        })
        console.log(newGame)
        game.setPublishers([newGame.Publisher])
        res.json(game);
    })
    .catch(error => {
        console.log(error);
        res.status(404).send(error);
    })
});

module.exports = router;