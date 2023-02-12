const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index.ejs', {
    pageTitle: 'Index Page'
  });
});

module.exports = router;