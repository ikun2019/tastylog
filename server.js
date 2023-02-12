const colors = require('colors');

// * 1データベース設定の読み込み
const sequelize = require('./util/database');

// * 1ejsの読み込み
const ejs = require('ejs');

// * pathの読み込み
const path = require('path');
// * expressの読み込み
const express = require('express');

const dotenv = require('dotenv');
dotenv.config();

const app = express();

// * 2ejsをappにマウントする
app.set('view engine', 'ejs');
app.set('views', 'views');

// * 静的ファイルの読み込み
app.use(express.static(path.join(__dirname, 'public')));

// * ルーティング
app.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Hello World'
  });
});

// * 2データベースとappを同期
sequelize
  .sync()
  .then(result => {
    console.log(result);
    app.listen(process.env.PORT, () => {
      console.log(`Server is running PORT:${process.env.PORT}`.bgGreen);
    });
  })
  .catch(err => {
    console.log(`${err}`.bgRed);
  });