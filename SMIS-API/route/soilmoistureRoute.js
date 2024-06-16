const soilMoistureController = require('../controller/soilmoistureController');
const express = require('express');

const router = express.Router();

// router.get('/find-all', soilMoistureController.findAll);
router.get('/find-by-id/:id', soilMoistureController.findByID);
// router.get('/find-soil-moisture-AVG', soilMoistureController.soilMoistureLevelAVG);

module.exports = router;