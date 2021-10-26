const { Router } = require('express');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const { Videogame, Genre } = require('../db');
const { APIKEY } = process.env;
const router = Router();

router.get('/:idVideogame', async (req, res, next) => {
    try {
        const { idVideogame } = req.params;
        let videogame;
        if(typeof idVideogame === 'string' && idVideogame.length > 7) {
            //es mi id
            videogame = await Videogame.findByPk(idVideogame);
            res.send(videogame);

        } else {
            //es de la API
            videogame = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${APIKEY}`);
            videogame = videogame.data;
            videogame = {
                id: videogame.id,
                name: videogame.name,
                description: videogame.description,
                image: videogame.background_image,
                releaseDate: videogame.released,
                rating: videogame.rating,
                platforms: videogame.platforms.map(p => p.platform.name)
                // genre: videogame.genres.map(g => g.name)
            }
            res.send(videogame);
        }
    } catch (error) {
        next(error);
    }
})

router.post('/', async (req, res, next) => {
 try {
    const videogame = req.body;
    const newVideogame = await Videogame.create(videogame)
     res.send(newVideogame);
 } catch (error) {
     next(error);
 }
})


module.exports = router;

// ] GET /videogame/{idVideogame}:
// Obtener el detalle de un videojuego en particular
// Debe traer solo los datos pedidos en la ruta de detalle de videojuego
// Incluir los géneros asociados
// [ ] POST /videogame:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
// Crea un videojuego en la base de datos