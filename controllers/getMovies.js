const axios = require('axios');
const { mysqlFunc } = require('../models/mysql');

const filmUrl = 'https://swapi.py4e.com/api/films/';

module.exports = (req, res) => {
  let response = { success: false, message: '', results: [] }
  try {
    axios.get(filmUrl).then((resp) => {
      let films = resp.data.results;
      if (!films.length) res.status(400).json(response)
      films = films.sort((one, two) => {
        let date1 = Number(one.release_date.substring(0, 4));
        let date2 = Number(two.release_date.substring(0, 4));
        return date1 - date2;
      })

      const asycFunc = async (callback) => {
        const unresolved = films.map((single) => {
          const url = single.url;
          return mysqlFunc.getCommentCount(url).then((comment_count) => {
            return { title: single.title, opening_crawl: single.opening_crawl, comment_count }
          })
        });
        const result = await Promise.all(unresolved);
        callback(result);
      }
      asycFunc((films) => res.status(200).json({ success: true, message: 'request successful', results: films }))
    }).catch((error) => {
      throw error.response;
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error, results: [] })
  }
}