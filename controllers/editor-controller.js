const createPath = require('../helpers/create-path');
const getData = require('../helpers/get-data');
const post = require('../helpers/edit-data');

const handleError = (res, error) => {
    console.log(error);
    res.render(createPath('./pages/error'), { title: 'Error' });
}

const getEditor = (req, res) => {
    const title = 'New post';
    res.render(createPath('./pages/editor'), { title });
}

const addPost = (req, res) => {
    try {
        const content = getData.contentArray;
        const postId = content.length > 0 ? Math.max(...content.map(post => post.id)) + 1 : 1;

        // const folder = req.body.folder;
        // const title = req.body.title;
        // const text = req.body.text;
        // const imgSrc = req.body.imgSrc;

        const postInfo = req.body;

        const newPost = {
            id: postId,
            location: 'lists',
            visibility: true,
            title: postInfo.title,
            description: postInfo.description,
            text: JSON.stringify(postInfo.text),
            imgSrc: postInfo.imgSrc,
            view_count: 0,
            upvotes: 0,
            downvotes: 0
        };

        content.push(newPost);
        post.postContent(content);

        res.redirect('/home');

    } catch (error) {
        handleError(res, error);
    }
}

const getEditPost = (req, res) => {
    try {
        const contentData = getData.contentArray;
        const content = contentData.filter(contentData => contentData.id == req.params.id);
        const title = `Edit post | ${content[0].title}`;
        res.render(createPath('./pages/edit-post'), { title, content });
    } catch (error) {
        handleError(res, error);
    }
}

const editPost = (req, res) => {
    try {
        const content = getData.contentArray;
        const contentToUpdate = content.find(content => content.id == req.body.id);

        const postInfo = req.body;

        contentToUpdate.title = postInfo.title;
        contentToUpdate.description = postInfo.description;
        contentToUpdate.text = JSON.stringify(postInfo.text);
        contentToUpdate.imgSrc = postInfo.imgSrc;

        post.postContent(content);

        res.redirect('/home');

    } catch (error) {
        handleError(res, error);
    }
}

const deletePost = (req, res) => {
    try {
        const content = getData.contentArray;
        const contentToDelete = content.findIndex(content => content.id == req.params.id);

        if (contentToDelete !== -1) {
            content.splice(contentToDelete, 1);

            post.postContent(content);
            res.redirect('/home');
        } else {
            res.status(404).json({ success: false, message: 'Пост с указанным id не найден' });
        }
    } catch (error) {
        handleError(res, error);
    }
}

const changeVisibilityPost = (req, res) => {
    try {
        const content = getData.contentArray;
        const contentToUpdate = content.find(content => content.id == req.params.id);

        if (contentToUpdate.visibility == true) {
            contentToUpdate.visibility = false;
        } else if (contentToUpdate.visibility == false) {
            contentToUpdate.visibility = true;
        }

        post.postContent(content);
        res.redirect('/home');

    } catch (error) {
        handleError(res, error);
    }
}

const voteUpdate = (req, res) => {
    try {
        const content = getData.contentArray;
        const contentToUpdate = content.find(content => content.id == req.params.id);
        const action = req.params.action;


        if (action == "chevron-up") {
            contentToUpdate.upvotes += 1;
        } else if (action == "chevron-down") {
            contentToUpdate.downvotes += 1;
        }

        post.postContent(content);

    } catch (error) {
        handleError(res, error);
    }
}

const viewCount = (req, res) => {
    try {
        const content = getData.contentArray;
        const contentToUpdate = content.find(content => content.id == req.params.id);

        contentToUpdate.view_count += 1;

        post.postContent(content);

    } catch (error) {
        handleError(res, error);
    }
}

module.exports = {
    getEditor,
    addPost,
    getEditPost,
    editPost,
    deletePost,
    changeVisibilityPost,
    voteUpdate,
    viewCount
};