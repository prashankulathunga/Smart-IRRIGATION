const waterLevelController = require('../controller/waterLevelController');
const express = require('express');

const router = express.Router();

router.get('/find-all', waterLevelController.findAll);
router.get('/find-by-id/:id', waterLevelController.findByID);
router.get('/find-water-level-AVG', waterLevelController.waterLevelAVG);


module.exports = router;