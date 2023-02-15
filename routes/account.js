const router = require('express').Router();
const accountReviews = require('./account.reviews');

router.use('/reviews', accountReviews);

module.exports = router;