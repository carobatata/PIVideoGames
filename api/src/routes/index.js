const { Router } = require('express');
const videogamesRoute = require('./videogames');
const videogameRoute = require('./videogame');
const genreRoute = require('./genre');


const router = Router();


router.use('/videogames', videogamesRoute);
router.use('/videogame', videogameRoute);
router.use('/genre', genreRoute);


module.exports = router;
