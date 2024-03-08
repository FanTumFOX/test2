// load the things we need
const fs = require('fs');
const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const editorRoutes = require('./routes/editor-routes');
const listsRoutes = require('./routes/lists-routes');
const loginRoutes = require('./routes/login-routes');
const analyticsRoutes = require('./routes/analytics-routes');
const getData = require('./helpers/get-data');
// const postApiRoutes = require('./routes/api-post-routes');
// const contactRoutes = require('./routes/contact-routes');
const createPath = require('./helpers/create-path');

const app = express();
const PORT = 5500;


// set the view engine to ejs
app.set('view engine', 'ejs');

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`)
});

app.use(express.urlencoded({ extended: false }));
app.use(express.static('views/styles'));
app.use(express.static('views/data'));


app.use(methodOverride('_method'));

// index page
app.get('/home', function (req, res) {
    const title = 'Home';
    const description = 'Описание';
    const memesData = getData.memesArray;
    const memes = memesData[0];

    const contentData = getData.contentArray;
    const content = contentData;
    res.render(createPath('./pages/index'), { title, description, memes, content });
});

// register page
app.get('/', function (req, res) {
    const title = 'Login';

    res.render(createPath('./pages/login'), { title });
});

app.get('/registration', function (req, res) {
    const title = 'Registration';

    res.render(createPath('./pages/register'), { title });
});

app.use(loginRoutes);
app.use(editorRoutes);
app.use(listsRoutes);
app.use(analyticsRoutes);
// app.use(contactRoutes);
// app.use(postApiRoutes);

app.use((req, res) => {
    const title = 'Error Page';
    res
        .status(404)
        .render(createPath('./pages/error'), { title });
});