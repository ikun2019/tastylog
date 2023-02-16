const router = require('express').Router();
const Shop = require('../models/Shop');
const Review = require('../models/Review');
const moment = require('moment');
const DATE_FORMAT = 'YYYY/MM/DD';
const sequelize = require('../config/database');

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

let validateReviewData = function (req) {
  let body = req.body;
  let isValid = true;
  let error = {};
  if (body.visit && !moment(body.visit, DATE_FORMAT).isValid()) {
    isValid = false;
    error.visit = '訪問日の日付文字列が不正です';
  }
  if (isValid) {
    return undefined;
  }
  return error;
}

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
  let error = validateReviewData(req);
  let review = createReviewData(req);
  console.log('review:' ,review);
  let { shopId, shopName } = req.body;

  if (error) {
    return res.render('account/reviews/regist-form', {
      shopId,
      shopName,
      review,
      error
    });
  }

  res.render('account/reviews/regist-confirm', {
    shopId,
    shopName,
    review,
    moment
  })
});

// * POST => /account/reviews/regist/:shopId
router.post('/regist/:shopId(\\d+)', (req, res, next) => {
  let review = createReviewData(req);
  let { shopId, shopName } = req.body;
  res.render('account/reviews/regist-form', {
    shopId,
    shopName,
    review
  });
});

// * POST => /account/reviews/regist/execute
router.post('/regist/execute', async (req, res, next) => {
  let error = validateReviewData(req);
  let review = createReviewData(req);
  let { shopId, shopName } = req.body;

  if (error) {
    return res.render('account/reviews/regist-form', {
      shopId,
      shopName,
      review,
      error
    });
  }
  await Shop.findByPk(shopId)
    .then(shop => {
      const description = req.body.description;
      const visit = req.body.visit;
      const rate = req.body.score;
      // const tUserId = req.user.id;
      Review.create({
        shopId,
        description,
        visit,
        rate
      });
    })
    .then(result => {
      res.render('account/reviews/regist-complete', {
        shopId,
        pageTitle: ''
      });
    })
    .catch(err => {
      console.log(err);
    })
});


module.exports = router;