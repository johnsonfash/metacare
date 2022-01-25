const { mysqlFunc } = require('../models/mysql');

const filmUrl = 'https://swapi.py4e.com/api/films/';

module.exports = (req, res) => {
  const movie_id = req.params.id;
  mysqlFunc.getComment(filmUrl + movie_id + '/').then((resp) => {
    res.status(resp.error ? 400 : 200).json(resp);
  })
}