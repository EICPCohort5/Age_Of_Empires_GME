var express = require('express')
var router = express.Router();
var {Games, Platforms, Genres, Publishers} = require('../orm/models')

router.get('/', (req,res) => {
    Genres.findAll()
    .then(genres => {
        res.json(genres);
    })
    .catch(error => {
        console.log(error);
        res.status(404).send(error);
    })
})

router.get('/:id', (req,res) => {
    Genres.findByPk(req.params.id)
    .then(genre => {
        res.json(genre);
    })
    .catch(error => {
        console.log(error);
        res.status(404).send(error);
    })
})

router.post('/', async (req, res) => {
    const newgenre = req.body;
    Genres.create({
        genreName: newgenre.genreName,
    })
    .then(genre => {
        res.json(genre);
    })
    .catch(error => {
        console.log(error);
        res.status(404).send(error);
    })
});

module.exports = router;