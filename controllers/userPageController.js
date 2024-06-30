const userPageService = require('../services/userPageService');

const getUserPage = async (req, res, next) => {
  try {
    const id = req.params.id;
    let page = parseInt(req.query.page) || 1;
    const loggedInUser = req.user;

    const data = await userPageService.getUserPageData(id, page);

    res.render('userPage.ejs', {
      ...data,
      loggedInUser
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserPage,
};
