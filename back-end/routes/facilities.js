var express = require('express');
var router = express.Router();
const { getAllFacilities, createFacilities, updateFacilities } = require('../controller/facilitiesController');

router.get('/', function(req, res, next) {
  res.send('nice');
});

// Define the route to fetch data
router.get('/get', getAllFacilities);
router.post('/post', createFacilities);
router.put('/edit/:id', updateFacilities);


module.exports = router;