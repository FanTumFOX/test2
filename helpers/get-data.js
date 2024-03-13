const fs = require('fs');

const dataMemes = fs.readFileSync('./views/data/memes.json', 'utf-8');
const memesArray = JSON.parse(dataMemes);

const dataContent = fs.readFileSync('./views/data/content.json', 'utf-8');
const contentArray = JSON.parse(dataContent);

const dataComments = fs.readFileSync('./views/data/comments.json', 'utf-8');
const commentsArray = JSON.parse(dataComments);

const dataUsers = fs.readFileSync('./views/data/users.json', 'utf-8');
const usersArray = JSON.parse(dataUsers);

module.exports = {
    contentArray,
    commentsArray,
    memesArray,
    usersArray
};
