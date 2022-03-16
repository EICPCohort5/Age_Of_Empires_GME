var express = require('express');
var router = express.Router();
let dao = {};

(async () => {
  const module = await import('../persistence/lowdb-persistence.mjs');
  dao = module.dao;
})();

// GET /games/ -> [ array of games ]
router.get('/', (req, res) => {
  res.json(dao.findgames());
});

router.post('/', async (req, res) => {
  // title, author, year, no ids
  console.log('req.body:', req.body);
  let gameProto = req.body;

  let resultsgame = await dao.addgame(gameProto);
  res.json(resultsgame);
});

router.get('/halo', (req, res) => {
  res.send('Halo');
});

router.get('/pokemon', (req, res) => {
  res.send('Pokemon Red');
});

module.exports = router;
