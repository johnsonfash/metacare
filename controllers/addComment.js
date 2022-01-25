const { mysqlFunc } = require('../models/mysql');

module.exports = (req, res) => {
  const { comment } = req.body;
  const ip_address = req.ip_address;
  const movie_id = req.params.id;
  let date = new Date();
  date = date.toUTCString();
  mysqlFunc.addComment(comment, ip_address, movie_id, date).then((inserted) => {
    if (inserted) {
      res.status(200).json({ success: true, message: 'comment sent successfully' })
    } else {
      res.status(400).json({ success: false, message: 'Unable to save comment', })
    }
  })
}