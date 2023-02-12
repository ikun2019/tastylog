const colors = require('colors');

// * 1データベース設定の読み込み
const sequelize = require('./util/database');

// * pathの読み込み
const path = require('path');

const express = require('express');

const dotenv = require('dotenv');
dotenv.config();

const app = express();

// * 静的ファイルの読み込み
app.use(express.static(path.join(__dirname, 'public')));

// * 2データベースとアプリを同期
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