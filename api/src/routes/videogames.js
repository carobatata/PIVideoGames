const { Router } = require('express');
const { Videogame } = require('../db');
const router = Router();
const axios = require('axios');
const { APIKEY } = process.env;
const {Op} = require('sequelize');
const { Genre } = require('../models/Genre');

router.get('/', async (req, res, next) => {
    const { name } = req.query;
    let videogamePromiseApi;
    let videogamePromiseDb;
    try {
        if(name) {
            videogamePromiseApi = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${APIKEY}`);
            videogamePromiseDb = await Videogame.findAll({
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
            
            videogamePromiseDb = await Videogame.findAll({include: Genre});
    
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
    
           // let filteredVideogameApi = videogameApi.data.results.map((v) => {
        }
            let allVideogames = [...videogamePromiseApi, ...videogamePromiseDb];
            res.send(allVideogames);
            // res.send(allVideogames.slice(0, 15));

    }
        catch (error) {
        next(error);
    }   
})


// router.get('/', (req, res, next) => {
//     const { name } = req.query;
//     let videogamePromiseApi;
//     let videogamePromiseDb;

//     if(name) {
//         videogamePromiseApi = axios.get(`https://api.rawg.io/api/games?search=${name}&key=${APIKEY}`);
//         videogamePromiseDb = Videogame.findAll({
//             where: {
//                 name: {
//                     [Op.iLike]: "%" + name + "%"
//                 }
//             },
//             order: [
//                 ['name', 'ASC'],
//             ],
//         });

//     } else {
//         videogamePromiseApi = axios.get(`https://api.rawg.io/api/games?key=${APIKEY}`);

//         videogamePromiseDb = Videogame.findAll({include: Genre});

//     }
//     Promise.all([
//         videogamePromiseApi,
//         videogamePromiseDb
//     ])
//     .then((response) => {
//         const [videogameApi, videogameDb] = response;
//         let filteredVideogameApi = videogameApi.data.results.map((v) => {
//             return {
//                 id: v.id,
//                 name: v.name,
//                 description: v.description,
//                 image: v.background_image,
//                 releaseDate: v.released,
//                 rating: v.rating,
//                 platforms: v.platforms.map(p => p.platform.name),
//                 genres: v.genres.map(g => g.name)
//             }
//         })
//         let allVideogames = [... filteredVideogameApi, ... videogameDb];
//         res.send(allVideogames);
//         // res.send(allVideogames.slice(0, 15));
//     })

//     .catch((error) => {
//         next(error);
//     })
        
// })

module.exports = router;

    // let response = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&limit=100`))
    //         apiVideogames=response.data.results
    //         console.log(apiVideogames)

    // let response2=await axios.get(response.data.next)
    //         const videoGame2 = response2.data.results
    //         console.log('TODO',response2)

    //         dbVideogames = await Videogame.findAll({ include: Genero })

    //         allVideo = dbVideogames.concat(apiVideogames.concat(videoGame2))