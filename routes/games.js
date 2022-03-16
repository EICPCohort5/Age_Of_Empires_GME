var express = require('express')
var router = express.Router();
var {Games, Platforms, Genres, Publishers} = require('../orm/models')

router.get('/', (req,res) => {
    Games.findAll()
    .then(Games => {
        res.json(Games);
    })
    .catch(error => {
        console.log(error);
        res.status(404).send(error);
    })
})

module.exports = router;