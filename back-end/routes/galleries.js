var express = require('express');
var router = express.Router();
const { getAllGalleries, createGalleries, updateGalleries } = require('../controller/galleriesController');

router.get('/', function(req, res, next) {
  res.send('nice');
});

// Define the route to fetch data
router.get('/get', getAllGalleries);
router.post('/post', createGalleries);
router.put('/edit/:id', updateGalleries);


module.exports = router;