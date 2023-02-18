const router = require('express').Router();
const accountReviews = require('./account.reviews');

router.get('/login', (req, res, next) => {
  res.render('./account/login');
});

router.use('/reviews', accountReviews);

module.exports = router;