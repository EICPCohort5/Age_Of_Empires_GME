var express = require('express')
var router = express.Router();
var {Games, Platforms, Genres, Publishers} = require('../orm/models')

router.get('/', (req,res) => {
    Platforms.findAll({
        include: [ {
            model: Games, as: 'Games',
            attributes: ['gameName']
        }]
    })
    .then(Publishers => {
        res.json(Publishers);
    })
    .catch(error => {
        console.log(error);
        res.status(404).send(error);
    })
})

router.get('/:id', (req,res) => {
    Platforms.findByPk(req.params.id)
    .then(platform => {
        res.json(platform);
    })
    .catch(error => {
        console.log(error);
        res.status(404).send(error);
    })
})

router.post('/', async (req, res) => {
    const newPlatform = req.body;
    Platforms.create({
        platformName: newPlatform.platformName,
    })
    .then(platform => {
        res.json(platform);
    })
    .catch(error => {
        console.log(error);
        res.status(404).send(error);
    })
});

module.exports = router;