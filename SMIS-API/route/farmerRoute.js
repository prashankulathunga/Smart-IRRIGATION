const farmerController = require('../controller/farmerController');
const express = require('express');

const router = express.Router();

router.post('/create', farmerController.create);
router.get('/find-all', farmerController.findAll);
router.get('/find-by-id/:id', farmerController.findByID);
router.delete('/delete-by-id/:id', farmerController.deleteById);
router.put('/update/:id', farmerController.update);


module.exports = router;


