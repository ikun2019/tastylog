const router = require('express').Router();
const Shop = require('../models/Shop');
const { Op } = require('sequelize');
const MAX_ITEMS = require('../config/application.config').search.MAX_ITEMS;
// const sequelize = require('../config/database');

router.get('/', async (req, res, next) => {
  let page = req.query.page ? parseInt(req.query.page) : 1;
  let keyword = req.query.keyword || '';
  let results;
  try {
    if (keyword) {
      results = await Shop.findAndCountAll({
        where: {
          name: {
            [Op.like]: `%${keyword}%`
          }
        },
        order: [
          ['score', 'DESC']
        ],
        limit: MAX_ITEMS,
        offset: (page - 1) * MAX_ITEMS
      });
    } else {
      results = await Shop.findAndCountAll({
        order: [
          ['score', 'DESC']
        ],
        limit: MAX_ITEMS,
        offset: (page - 1) * MAX_ITEMS
      });
    }
    res.render('search/list.ejs', {
      keyword: keyword,
      results: results.rows,
      pagination: {
        max: Math.ceil(results.count / MAX_ITEMS),
        current: page
      }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;