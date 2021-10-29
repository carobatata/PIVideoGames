const { Router } = require('express');
const router = Router();


const PLATFORMS = ["Android", "Linux", "Nintendo 3DS", "Nintendo Switch", "PC", "PS Vita", "PlayStation 2", "PlayStation 3", "PlayStation 4", "PlayStation 5", "Web", "Wii U", "Xbox", "Xbox 360", "Xbox One", "Xbox Series S/X", "iOS", "macOS"];


router.get('/', (req, res) => {
    res.send(PLATFORMS);
})

module.exports = router;


