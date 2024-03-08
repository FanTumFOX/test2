const express = require('express');
const {
    getAnalytics,
    getPost
} = require('../controllers/analytics-controller');

const router = express.Router();

router.get('/analytics', getAnalytics);
router.get('/analytics/:id', getPost);

module.exports = router;