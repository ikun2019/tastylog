const colors = require('colors');

// * 1データベース設定の読み込み
const sequelize = require('./config/database');
// * AppConfigの読み込み
const appconfig = require('./config/application.config');
// * AccessControlの読み込み
const accesscontrol = require('./config/security/accesscontrol');
// * 1connect-flashの読み込みエラー表示
const flash = require('connect-flash');
// * 1Sessionの読み込み
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
// * 1cookie-paraserの読み込み
const cookie = require('cookie-parser');

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

// * モデルの読み込み
const Shop = require('./models/Shop');
const Review = require('./models/Review');
const User = require('./models/User');

// * 1ルーターの読み込み
const indexRouter = require('./routes/index');
const searchRouter = require('./routes/search');
const shopsRouter = require('./routes/shops');
const adminRouter = require('./routes/admin');
const accountRouter = require('./routes/account');

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


// * 2Cookieミドルウェア組み込み
app.use(cookie());
// * 2Sessionの読み込み
app.use(session({
  store: new MySQLStore({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '02151353',
    database: 'mysql'
  }),
  secret: appconfig.security.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  name: 'sid'
}));
// * フォームの読み込み
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(...accesscontrol.initialize());


// * ユーザー情報のミドルウェア
app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      console.log(err);
    });
});

// * 2ルーティングのマウント
app.use('/search', searchRouter);
app.use('/shops', shopsRouter);
app.use('/admin', adminRouter);
app.use('/account', accountRouter);
app.use('/', indexRouter);

// * アソシエーション
Shop.hasMany(Review);
Review.belongsTo(Shop, { constraints: true, onDelete: 'CASCADE' });

// User.hasMany(Review);
// Review.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });

// * ApplicationLoggerの設置
app.use(applicationLogger());

// * 2データベースとappを同期
sequelize
  // .sync({ force: true })
  .sync({ alter: true })
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