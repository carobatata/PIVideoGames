const { Router } = require('express');
const { Videogame, Genre } = require('../db');
const router = Router();
const axios = require('axios');
const { APIKEY } = process.env;
const {Op} = require('sequelize');

async function getAllVideogamesFromApi() {
    var promises = [
        axios.get(`https://api.rawg.io/api/games?key=${APIKEY}`),
        axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=2`),
        axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=3`),
        axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=4`),
        axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=5`),
    ]

    let videogamePromiseApi = await Promise.all(promises);
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
    // console.log(videogamePromiseApi.map(v => v.platforms).flat().filter((value, index, self) => self.indexOf(value) === index))
    return videogamePromiseApi;
}

async function getAllVideogames() {
    let videogamePromiseDb = await Videogame.findAll({
        include: [{
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }]
    })
    videogamePromiseDb = videogamePromiseDb.map((v) => {
        return {
            id: v.id,
            name: v.name,
            description: v.description,
            image: v.background_image,
            releaseDate: v.released,
            rating: v.rating,
            platforms: v.platforms.map(p => p.platform?.name),
            genres: v.genres.map(g => g.name),
            createdInDb: v.createdInDb
        }})


    let videogamePromiseApi = await getAllVideogamesFromApi()

    return [...videogamePromiseApi, ...videogamePromiseDb];

}

router.get('/', async (req, res, next) => {
    const { name, genre } = req.query;

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
                    platforms: v.platforms.map(p => p.platform?.name),
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
        
        }
         else if(genre) {

            videogamePromiseApi = await getAllVideogamesFromApi()

            videogamePromiseApi = videogamePromiseApi.filter((v) => v.genres.includes(genre))

            videogamePromiseDb =  await Videogame.findAll({
                include: [{
                    model: Genre,
                    where: { name: genre },
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }]
            });

            videogamePromiseDb = videogamePromiseDb.map((v) => {
                return {
                    id: v.id,
                    name: v.name,
                    description: v.description,
                    image: v.background_image,
                    releaseDate: v.released,
                    rating: v.rating,
                    platforms: v.platforms.map(p => p.platform?.name),
                    genres: v.genres.map(g => g.name),
                    createdInDb: v.createdInDb
                }})

            allVideogames = [...videogamePromiseDb, ...videogamePromiseApi];
          
         }
    
        else {
            
            allVideogames = await getAllVideogames();
           
        }
            res.send(allVideogames);
       

    }
        catch (error) {
        next(error);
    }   
})




module.exports = router;
