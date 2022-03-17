var express = require('express')
var router = express.Router();
var {Games, Platforms, Genres, Publishers} = require('../orm/models')

router.get('/', (req,res) => {
    Publishers.findAll({
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
    Publishers.findByPk(req.params.id)
    .then(publishers => {
        res.json(publishers);
    })
    .catch(error => {
        console.log(error);
        res.status(404).send(error);
    })
})

router.post('/', async (req, res) => {
    const newPulisher = req.body;
    console.log(newPulisher)
    Publishers.create({
        publisherName: newPulisher.publisherName,
    })
    .then(game => {
        res.json(game);
    })
    .catch(error => {
        console.log(error);
        res.status(404).send(error);
    })
});

module.exports = router;