const { Router } = require('express');
const videogamesRoute = require('./videogames');
const videogameRoute = require('./videogame');
const genresRoute = require('./genres');

const router = Router();

router.use('/videogames', videogamesRoute);
router.use('/videogame', videogameRoute);
router.use('/genres', genresRoute);

module.exports = router;
