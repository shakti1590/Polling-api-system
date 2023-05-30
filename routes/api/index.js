/**
 * API routing file
 */

const express = require('express');
const router = express.Router();

// api version 1.0
router.use('/v1', require('./v1/index'));


module.exports = router