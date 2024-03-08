const createPath = require('../helpers/create-path');
const getData = require('../helpers/get-data');
const post = require('../helpers/edit-data');

const handleError = (res, error) => {
    console.log(error);
    res.render(createPath('./pages/error'), { title: 'Error' });
}

const loginCheck = (req, res) => {
    try {
        // const title = 'Home';
        // const memes = memesData[1];
        const userCheck = req.body;
        const usersData = getData.usersArray;
        const user = usersData.find(usersData => usersData.login == req.body.login);

        if ((user.login == userCheck.login) && (user.password == userCheck.password)) {
            res.redirect('/home');
        }
    } catch (error) {
        handleError(res, error);
    }
}

const addUser = (req, res) => {
    try {
        const usersData = getData.usersArray;
        const userId = usersData.length > 0 ? Math.max(...usersData.map(user => user.id)) + 1 : 1;

        const userInfo = req.body;

        const newUser = {
            id: userId,
            login: userInfo.login,
            password: userInfo.password,
            email: userInfo.email,
            name: userInfo.login,
            isAdmin: false
        }

        usersData.push(newUser);
        post.postUser(usersData);

        res.redirect('/home');
    } catch (error) {
        handleError(res, error);
    }
}

module.exports = {
    loginCheck,
    addUser
};