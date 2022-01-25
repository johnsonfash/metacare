const express = require('express');
const getMovies = require('./controllers/getMovies');
const getComments = require('./controllers/getComments');
const { mysql } = require('./models/mysql');
const addComment = require('./controllers/addComment');
const characterController = require('./controllers/characterController');
const getIP = require('./middlewares/getIP');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.get('/movies', getMovies);
app.get('/movies/:id/comments', getComments);
app.post('/movies/:id/comments', getIP, addComment);
app.use('/movies/:id/characters', characterController);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  // mysql.connect();
  console.log(`Server started at port : ${port}`)
});