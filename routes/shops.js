// ルート
const router = require('express').Router();
const Shop = require('../models/Shop');
const Review = require('../models/Review');

// * GET => /shops/index.ejs
router.get('/:id', (req, res, next) => {
  const shopID = parseInt(req.params.id);
  Shop.findByPk(shopID, {
    include: [{ model: Review }]
  })
    .then(shop => {
      if (!shop) {
        res.redirect('/');
      }
      res.render('shops/index', {
        shop: shop
      });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get('/', (req, res, next) => {
  Shop
    .findAll({
      include: Review
    })
    .then(shops => {
      res.render('shops/index', {
        shop: shops[0]
      });
    })
    .catch(err => {
      console.log(err);
    });
});



module.exports = router;