const express = require('express');
const getComments = require('../controllers/getComments');
const postComment = require('../controllers/postComment');
const router = express.Router();

router.get('/', getComments);
router.post('/', postComment);
module.exports = router;