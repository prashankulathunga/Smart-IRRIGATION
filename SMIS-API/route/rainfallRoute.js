const rainfallController = require('../controller/rainfallController');
const express = require('express');

const router = express.Router();

router.get('/find-latest', rainfallController.findLatest)
router.get('/find-by-id/:id', rainfallController.findByID);


module.exports = router;