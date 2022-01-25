require('dotenv').config();
const { host, user, password, database, timezone } = process.env;
const mysql = require('mysql2').createConnection({ host, user, password, database, timezone, insecureAuth : true });

class MYSQL {
  getCommentCount(url) {
    let count = 0;
    return new Promise((resolve) => {
      mysql.query(`SELECT COUNT(*) AS count FROM comments WHERE film_url = ?`, url, (err, result) => {
        if (!err && result.length) {
          count = result[0].count;
        }
        resolve(count);
      })
    })
  }

  getComment(url) {
    return new Promise((resolve) => {
      mysql.query(`SELECT * FROM comments WHERE film_url = ? ORDER BY id DESC`, url, (err, results) => {
        if (err) {
          resolve({ error: true, results: [] });
        } else {
          resolve({ error: false, results });
        }
      })
    })
  }

  addComment(comment, ip_address, id, date) {
    return new Promise((resolve) => {
      mysql.query(`INSERT INTO comments SET ?`, { film_url: `https://swapi.py4e.com/api/films/${id}/`, comment, ip_address, date }, (err) => {
        resolve(!err)
      })
    })
  }
}

module.exports = { mysqlFunc: new MYSQL(), mysql }