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
            // videogame = await Videogame.findByPk(idVideogame);

            videogame = await Videogame.findByPk(idVideogame, {
                include:[{
                    model:Genre,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }]
  
            });
  
            videogame = {
                    id: videogame.id,
                    name: videogame.name,
                    description: videogame.description,
                    image: videogame.image,
                    releaseDate: videogame.released,
                    rating: videogame.rating,
                    platforms: videogame.platforms,
                    genres: videogame.genres.map(g => g.name),
                    createdInDb: videogame.createdInDb
            }

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
                platforms: videogame.platforms.map(p => p.platform?.name),
                genres: videogame.genres.map(g => g.name)
            }
        }
        res.send(videogame);
        
    } catch (error) {
        next(error);
    }
})

router.post('/', async (req, res, next) => {
    const { genres, name, image, description, releaseDate, rating, platforms, createdInDb } = req.body;
    
    if(!name || !description || !platforms) return res.status(400).send({error:'Name, description and platforms are required'});
        
    try {
        let  newVideogame = await Videogame.create({
            name,
            image,
            description,
            releaseDate,
            rating,
            platforms,
            createdInDb
        })
        let genreDb = await Genre.findAll({
            where: {name: genres }
        })
    
        await newVideogame.addGenres(genreDb);
            res.send(newVideogame);
    
     } catch (error) {
         next(error);
     }
    });
 
module.exports = router;

