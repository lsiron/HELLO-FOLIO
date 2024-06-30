const myPageService = require('../services/myPageService');

const getMyPage = async (req, res, next) => {
  try {
    const data = await myPageService.getMyPageData(req.user.email);
    res.render('myPage.ejs', data);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await myPageService.deleteUser(req.user.email);
    res.status(200).redirect('/login');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMyPage,
  deleteUser,
};
