const paddyFieldController = require('../controller/paddyFieldController');
const express = require('express');

const router = express.Router();

router.post('/create', paddyFieldController.create);
// router.get('/find-all', paddyFieldController.findAll);
router.get('/find-by-id/:id', paddyFieldController.findByID);
// router.delete('/delete-by-id/:id', paddyFieldController.deleteById);
// router.put('/update/:id', paddyFieldController.update);


module.exports = router;


