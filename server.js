const colors = require('colors');

// * 1データベース設定の読み込み
const sequelize = require('./config/database');
// * 1body-parserの読み込み
const bodyParser = require('body-parser');

// * loggerの読み込み
const logger = require('./util/logger');
const applicationLogger = require('./middlewares/applicationlogger');
const accessLogger = require('./middlewares/accesslogger');

// * pathの読み込み
const path = require('path');
// * expressの読み込み
const express = require('express');
// * 1faviconの読み込み
const favicon = require('serve-favicon');

// * 1ルーターの読み込み
const indexRouter = require('./routes/index');
const shopsRouter = require('./routes/shops');
const adminRouter = require('./routes/admin');

// * 環境変数の使用に関する設定
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// * ejsをappにマウントする
app.set('view engine', 'ejs');
app.set('views', 'views');
// * サーバー情報の隠蔽
app.disable('x-powered-by');

// * 2faviconの設定
app.use(favicon(path.join(__dirname, '/public/favicon.ico')));
// * 静的ファイルの読み込み
app.use('/public', express.static(path.join(__dirname, '/public')));

// * AccessLoggerの設置
app.use(accessLogger());

// * body-parserの設置
app.use(bodyParser.urlencoded({ extended: false }));

// * 2ルーティングのマウント
app.use('/', indexRouter);
app.use('/shops', shopsRouter);
app.use('/admin', adminRouter);

// * ApplicationLoggerの設置
app.use(applicationLogger());

// * 2データベースとappを同期
sequelize
  // .sync({ force: true })
  .sync()
  .then(result => {
    console.log(result);
    app.listen(process.env.PORT, () => {
      // logger.console.info(`Server is running PORT:${process.env.PORT}`.bgGreen);
      logger.application.info(`Server is running PORT:${process.env.PORT}`.bgGreen);
    });
  })
  .catch(err => {
    console.log(`${err}`.bgRed);
  });

  // app.listen(process.env.PORT, () => {
  //   logger.console.info(`Application listening at ${process.env.PORT}`);
  // });