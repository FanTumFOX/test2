const express = require('express');
const {
    loginCheck,
    addUser
} = require('../controllers/login-controller');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

router.post('/login', loginCheck);
router.post('/add-user', addUser);

module.exports = router;