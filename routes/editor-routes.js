const express = require('express');
const {
    getEditor,
    addPost,
    getEditPost,
    editPost,
    deletePost,
    changeVisibilityPost,
    voteUpdate,
    viewCount
} = require('../controllers/editor-controller');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

router.get('/editor', getEditor);
router.post('/add-post', addPost);
router.get('/edit-post/:id', getEditPost);
router.post('/edit-post', editPost);
router.delete('/delete-post/:id', deletePost);
router.post('/change-visibility/:id', changeVisibilityPost);
router.post('/vote/:id/:action', voteUpdate);
router.post('/view-count/:id', viewCount);

module.exports = router;