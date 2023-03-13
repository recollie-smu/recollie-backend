const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api.ts');

/* GET sth. */
router.get('/', apiController.get);

module.exports = router;