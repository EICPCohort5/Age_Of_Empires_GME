var express = require('express')
var router = express.Router();
var {Games, Platforms, Genres, Publishers} = require('../orm/models')

router.get('/', (req,res) => {
    Publishers.findAll()
        include: [{
            model: Genres, as: 'GenreRef'
        },
        {
            model: Platforms, as: 'PlatformRef'
        },
        {
            model: Games, as: 'All_Games',
            attributes: ['gameName']
        }
        ]
    .then(Publishers => {
        res.json(Publishers);
    })
    .catch(error => {
        console.log(error);
        res.status(404).send(error);
    })
})

router.get('/:id', (req,res) => {
    Publishers.findByPk(req.params.id)
    .then(publishers => {
        res.json(publishers);
    })
    .catch(error => {
        console.log(error);
        res.status(404).send(error);
    })
})

module.exports = router;