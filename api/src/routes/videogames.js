const { Router } = require('express');
const { Videogame } = require('../db');
const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const videogames = await Videogame.findAll();
        res.json(videogames);
    } catch (error) {
        next(error);
    }
})



module.exports = router;

// [ ] GET /videogames:
// Obtener un listado de los videojuegos
// Debe devolver solo los datos necesarios para la ruta principal
// [ ] GET /videogames?name="...":
// Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
// Si no existe ningún videojuego mostrar un mensaje adecuado
