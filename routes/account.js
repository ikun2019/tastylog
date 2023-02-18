const router = require('express').Router();
const accountReviews = require('./account.reviews');
const { authenticate, authorize, PRIVILEGE } = require('../config/security/accesscontrol');

router.get('/login', (req, res, next) => {
  res.render('./account/login', { 'message': req.flash('message') });
});

router.post('/login', authenticate());
// ログイン後の画面
router.get('/', (req, res, next) => {
  res.render('./account/index');
});

router.use('/reviews', accountReviews);

module.exports = router;