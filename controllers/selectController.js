const selectService = require('../services/selectService');

const getSelectPage = async (req, res, next) => {
  try {
    let page = parseInt(req.query.page) || 1;
    const email = req.user.email;

    const data = await selectService.getSelectPageData(email, page);

    res.render('select.ejs', data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSelectPage,
};
