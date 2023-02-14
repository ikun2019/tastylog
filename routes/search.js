const router = require('express').Router();
const Shop = require('../models/Shop');
const { Op } = require('sequelize');
// const sequelize = require('../config/database');

router.get('/', async (req, res, next) => {
  let keyword = req.query.keyword || '';
  let results;
  try {
    if (keyword) {
      results = await Shop.findAll({
        where: {
          name: {
            [Op.like]: `%${keyword}%`
          }
        },
        order: [
          ['score', 'DESC']
        ]
      });
    } else {
      results = await Shop.findAll();
    }
    res.render('search/list.ejs', {
      keyword: keyword,
      results: results
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;