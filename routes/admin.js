// ルート
const router = require('express').Router();
const adminController = require('../controllers/admin');

// * GET => /admin/add
router.get('/add-shop', adminController.getAddShop);
// * POST => /admin/create-shop
router.post('/add-shop', adminController.postAddShop);

module.exports = router;