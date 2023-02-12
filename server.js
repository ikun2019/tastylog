const colors = require('colors');

// * 1データベース設定の読み込み
const sequelize = require('./util/database');

// * pathの読み込み
const path = require('path');
// * expressの読み込み
const express = require('express');
// * 1faviconの読み込み
const favicon = require('serve-favicon');

// * 1ルーターの読み込み
const indexRouter = require('./routes/index');

// * 環境変数の使用に関する設定
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// * ejsをappにマウントする
app.set('view engine', 'ejs');
app.set('views', 'views');

// * 2faviconの設定
app.use(favicon(path.join(__dirname, '/public/favicon.ico')));
// * 静的ファイルの読み込み
app.use('/public', express.static(path.join(__dirname, '/public')));

// * 2ルーティングのマウント
app.use('/', indexRouter);

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