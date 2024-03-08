const createPath = require('../helpers/create-path');
const getData = require('../helpers/get-data');

const handleError = (res, error) => {
    console.log(error);
    res.render(createPath('error'), { title: 'Error' });
}

const getAnalytics = (req, res) => {
    try {
        const title = 'Analytics';
        const description = 'Аналитика сайтов';
        const memesData = getData.memesArray;
        const memes = memesData[2];

        const contentData = getData.contentArray;
        const content = contentData.filter(contentData => contentData.location == title.toLowerCase());
        res.render(createPath('./pages/analytics'), { title, description, memes, content });
    } catch (error) {
        handleError(res, error);
    }
}

const getPost = (req, res) => {
    try {
        const path = 'Analytics';
        const memesData = getData.memesArray;
        const memes = memesData[2];

        const contentData = getData.contentArray;
        const content = contentData.filter(contentData => contentData.id == req.params.id);
        const title = `Analytics | ${content[0].title}`;
        res.render(createPath('./pages/post'), { title, memes, content });
    } catch (error) {
        handleError(res, error);
    }
}

module.exports = {
    getAnalytics,
    getPost
};