const createPath = require('../helpers/create-path');
const getData = require('../helpers/get-data');

const handleError = (res, error) => {
    console.log(error);
    res.render(createPath('./pages/error'), { title: 'Error' });
}

const getLists = (req, res) => {
    try {
        const title = 'Lists';
        const path = 'lists';
        const memesData = getData.memesArray;
        const memes = memesData[1];

        const contentData = getData.contentArray;
        const content = contentData.filter(contentData => contentData.location == path.toLowerCase());
        res.render(createPath('./pages/lists'), { title, memes, content });
    } catch (error) {
        handleError(res, error);
    }
}

const getPost = (req, res) => {
    try {
        const path = 'lists';
        const memesData = getData.memesArray;
        const memes = memesData[1];

        const contentData = getData.contentArray;
        const content = contentData.filter(contentData => contentData.id == req.params.id);
        const title = `Lists | ${content[0].title}`;
        res.render(createPath('./pages/post'), { title, memes, content });
    } catch (error) {
        // handleError(res, error);
    }
}

module.exports = {
    getLists,
    getPost
};