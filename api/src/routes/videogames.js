const { Router } = require('express');
const { Videogame } = require('../db');
const router = Router();
const axios = require('axios');
const { APIKEY } = process.env;
const {Op} = require('sequelize');

router.get('/', (req, res, next) => {
    const { name } = req.query;
    let videogamePromiseApi;
    let videogamePromiseDb;

    if(name) {
        videogamePromiseApi = axios.get(`https://api.rawg.io/api/games?search=${name}&key=${APIKEY}`);
        videogamePromiseDb = Videogame.findAll({
            where: {
                name: {
                    [Op.iLike]: "%" + name + "%"
                }
            },
            order: [
                ['name', 'ASC'],
            ],
        });

    } else {
        videogamePromiseApi = axios.get(`https://api.rawg.io/api/games?key=${APIKEY}`);
        videogamePromiseDb = Videogame.findAll();
    }
    Promise.all([
        videogamePromiseApi,
        videogamePromiseDb
    ])
    .then((response) => {
        const [videogameApi, videogameDb] = response;
        let filteredVideogameApi = videogameApi.data.results.map((v) => {
            return {
                id: v.id,
                name: v.name,
                description: v.description,
                image: v.background_image,
                releaseDate: v.released,
                rating: v.rating,
                platforms: v.platforms,
                // genres: v.genres.name
            }
        })
        let allVideogames = [... filteredVideogameApi, ... videogameDb];
        res.send(allVideogames.slice(0, 15));
    })

    .catch((error) => {
        next(error);
    })
        
})

module.exports = router;

