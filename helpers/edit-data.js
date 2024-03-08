const fs = require('fs');

function postContent(content) {
    fs.writeFileSync('./views/data/content.json', JSON.stringify(content, null, 2), 'utf-8');
}

function postUser(usersData) {
    fs.writeFileSync('./views/data/users.json', JSON.stringify(usersData, null, 2), 'utf-8');
}

module.exports = {
    postContent,
    postUser
};