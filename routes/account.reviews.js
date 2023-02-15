const router = require('express').Router();
const Shop = require('../models/Shop');
const moment = require('moment');
const DATE_FORMAT = 'YYYY/MM/DD';

let date;

let createReviewData = function (req) {
  return {
    shopId: req.body.shopId,
    score: parseInt(req.body.score),
    visit: (date = moment(req.body.visit, DATE_FORMAT)) && date.isValid() ? date.toDate() : null,
    post: new Date(),
    description: req.body.description
  };
};

// * GET => /account/reviews/regist/:shopId
router.get('/regist/:shopId(\\d+)', async (req, res, next) => {
  let shopId = req.params.shopId;
  let shop, shopName, review, results;
  try {
    results = await Shop.findByPk(shopId);
    console.log(results);
    res.render('account/reviews/regist-form.ejs', {
      shopId: shopId,
      shopName: results.name,
      shop: results
    });
  } catch (err) {
    next(err);
  }
});

// * POST => /account/reviews/regist
router.post('/regist/confirm', (req, res, next) => {
  let review = createReviewData(req);
  console.log('review:' ,review);
  let { shopId, shopName } = req.body;

  res.render('account/reviews/regist-confirm', {
    shopId,
    shopName,
    review
  })
});

module.exports = router;