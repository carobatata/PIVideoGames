const { Router } = require('express');
const videogamesRoute = require('./videogames');
const videogameRoute = require('./videogame');
const genresRoute = require('./genres');
const platformsRoute = require('./platforms');


const router = Router();


router.use('/videogames', videogamesRoute);
router.use('/videogame', videogameRoute);
router.use('/genres', genresRoute);
router.use('/platforms', platformsRoute);


module.exports = router;
