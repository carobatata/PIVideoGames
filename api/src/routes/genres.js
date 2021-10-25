const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Genre } = require('../db');
const { APIKEY } = process.env;

router.get('/', async (req, res) => {
    try {

        //if first time = 
        genres = await axios.get(`https://api.rawg.io/api/genres?key=${APIKEY}`);
        
        filteredGenres = genres.data.results.map((g) => {
            return {
                id: g.id,
                name: g.name,
            }
        })
        // dataBaseGenres = Genre.create(filteredGenres);
        res.send(filteredGenres);

        //else



        
    } catch (error) {
        next(error);
    }
})

   
module.exports = router;

// [ ] GET /genres:
// Obtener todos los tipos de géneros de videojuegos posibles
// En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos
// y luego ya utilizarlos desde allí
