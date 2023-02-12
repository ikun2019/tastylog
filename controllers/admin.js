const Shop = require('../models/Shop');

// ショップの新規作成メソッド
exports.getAddShop = (req, res, next) => {
  res.render('admin/add-shop', {
    pageTitle: 'Index Page'
  });
};
// ショップの保存メソッド
exports.postAddShop = (req, res, next) => {
  Shop.create(req.body)
  .then(result => {
    console.log('Create Product');
    res.redirect('/shops');
  })
  .catch(err => {
    console.log(err);
  });
}