const userRouter = require("./userRouter");
const selectRouter = require("./selectRouter")
const myPageRouter = require("./myPageRouter")
const resetPwRouter = require("./resetPwRouter")
const educationRouter = require("./educationRouter")
const userPageRouter = require("./userPageRouter")
const certificationRouter = require("./certificationRouter")
const awardRouter = require("./awardRouter")
const projectRouter = require("./projectRouter")

const serviceError = require("../errors/serviceError");

// 라우터 exports
module.exports = {
    userRouter,
    selectRouter,
    myPageRouter,
    resetPwRouter,
    educationRouter,
    userPageRouter,
    certificationRouter,
    awardRouter,
    projectRouter,
    serviceError,
};

