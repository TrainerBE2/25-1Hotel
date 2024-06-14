var express = require('express')
var router = express.Router()

const {createReservation, getAllReservations, cancelBook} = require('../controller/ReservationController')

router.get('/book', getAllReservations)
router.post('/book', createReservation)
router.put('/cancelation', cancelBook)


module.exports = router;