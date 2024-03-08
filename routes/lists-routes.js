const express = require('express');
const {
    getLists,
    getPost,
} = require('../controllers/lists-controller');

const router = express.Router();

router.get('/lists', getLists);
router.get('/lists/:id', getPost);

module.exports = router;