const { Router } = require('express');
const { Videogame, Genre } = require('../db');
const router = Router();
const axios = require('axios');
const { APIKEY } = process.env;
const {Op} = require('sequelize');
// const { Genre } = require('../models/Genre');

router.get('/', async (req, res, next) => {
    const { name } = req.query;
    let videogamePromiseApi;
    let videogamePromiseDb;
    let allVideogames;
    try {
        if(name) {
            videogamePromiseApi = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${APIKEY}`);
            videogamePromiseApi = videogamePromiseApi.data.results.map((v) => {
                return {
                    id: v.id,
                    name: v.name,
                    description: v.description,
                    image: v.background_image,
                    releaseDate: v.released,
                    rating: v.rating,
                    platforms: v.platforms.map(p => p.platform.name),
                    genres: v.genres.map(g => g.name)
                }})

            videogamePromiseDb = await Videogame.findAll({
                where: {
                    name: {
                        [Op.iLike]: "%" + name + "%"
                    }
                },
            });

            allVideogames = [...videogamePromiseDb, ...videogamePromiseApi];
            allVideogames = allVideogames.slice(0, 15);
    
        } else {
            
            videogamePromiseDb = await Videogame.findAll({
                include: [{
                    model: Genre,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }]
            })
            
            var promises = [
                axios.get(`https://api.rawg.io/api/games?key=${APIKEY}`),
                axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=2`),
                axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=3`),
                axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=4`),
                axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=5`),
            ]
    
            videogamePromiseApi = await Promise.all(promises);
            videogamePromiseApi = videogamePromiseApi.map((v) => v.data.results)
            videogamePromiseApi = videogamePromiseApi.flat().map((v) => {
                return {
                    id: v.id,
                    name: v.name,
                    description: v.description,
                    image: v.background_image,
                    releaseDate: v.released,
                    rating: v.rating,
                    platforms: v.platforms.map(p => p.platform.name),
                    genres: v.genres.map(g => g.name)
                }
            })
            allVideogames = [...videogamePromiseApi, ...videogamePromiseDb];
        }
            res.send(allVideogames);
       

    }
        catch (error) {
        next(error);
    }   
})


module.exports = router;
