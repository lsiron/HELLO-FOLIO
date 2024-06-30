const userService = require('../services/userService');
const passport = require('passport');
const ServiceError = require('../errors/serviceError');

const renderRegisterPage = (req, res) => {
  res.render('register.ejs');
};

const registerUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    await userService.registerUser(email, password, name);
    res.status(201).redirect('/login');
  } catch (error) {
    next(error);
  }
};

const renderLoginPage = (req, res) => {
  res.render('home.ejs');
};

const loginUser = (req, res, next) => {
  passport.authenticate('local', { session: false }, async (err, user, info) => {
    if (err) {
      return next(new ServiceError('로그인 에러', 500));
    }
    if (!user) {
      return next(new ServiceError(info.message, 401, 'home.ejs'));
    }
    try {
      const { accessToken, refreshToken } = await userService.generateTokens(user);

      res.cookie('accessToken', accessToken, { httpOnly: true });
      res.cookie('refreshToken', refreshToken, { httpOnly: true });

      res.redirect('/myPage');
    } catch (error) {
      next(error);
    }
  })(req, res, next);
};

const logoutUser = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    await userService.logoutUser(refreshToken);

    res.cookie('accessToken', '', { maxAge: 0, httpOnly: true });
    res.cookie('refreshToken', '', { maxAge: 0, httpOnly: true });
    res.redirect('/');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  renderRegisterPage,
  registerUser,
  renderLoginPage,
  loginUser,
  logoutUser,
};
