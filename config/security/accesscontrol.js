const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const sequelize = require('../database');
const User = require('../../models/User');
const PRIVILEGE = {
  NORMAL: 'normal'
};

let initialize, authenticate, authorize;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  'local-strategy',
  new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, username, password, done) => {
    let results, user;
    try {
      results = await User.findOne({ where: { name: req.body.username } });
    } catch (err) {
      return done(err);
    }

    if (results && password === results.password) {
      user = {
        id: results.id,
        name: results.name,
        email: results.email,
        permissions: [PRIVILEGE.NORMAL]
      };
      // ログインの度にsessionを再作成
      req.session.regenerate(err => {
        if (err) {
          done(err);
        } else {
          done(null, user);
        }
      })
    } else {
      done(null, false, req.flash('message', 'ユーザー名またはパスワードが間違っています'));
    }
  })
);

initialize = function () {
  return [
    passport.initialize(),
    passport.session(),
    function (req, res, next) {
      if(req.user) {
        res.locals.user = req.user;
      }
      next();
    }
  ];
};

authenticate = function () {
  return passport.authenticate(
    'local-strategy',
    {
      successRedirect: '/account',
      failureRedirect: '/account/login'
    }
  );
};

authorize = function (privilege) {
  return function (req, res, next) {
    if (req.isAuthenticated() && ((req.user.permissions || []).indexOf(privilege) >= 0)) {
      next();
    } else {
      res.redirect('/account/login');
    }
  };
};


module.exports = {
  initialize,
  authenticate,
  authorize,
  PRIVILEGE
};