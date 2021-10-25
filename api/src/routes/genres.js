const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Genre } = require('../db');
const { APIKEY } = process.env;

router.get('/', async (req, res, next) => {
    try {
        let genreList = await Genre.findAll();
        if(genreList.length === 0) {
            //if first time = 
            genres = await axios.get(`https://api.rawg.io/api/genres?key=${APIKEY}`);    
            mappedGenres = genres.data.results.map((g) => {
                return {
                    name: g.name,
                }
            })
            genreList = await Genre.bulkCreate(mappedGenres);
            res.send(genreList);
        } else {
            //if database already filled
            res.send(genreList);
        }
    } catch (error) {
        next(error);
    }
})

module.exports = router;


