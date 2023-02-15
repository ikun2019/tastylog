const router = require('express').Router();
const Shop = require('../models/Shop');

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

module.exports = router;