const questionRoutes = require("./questions");
const resultRoutes = require("./result");
const registerData = require("./register");
const loginData = require("./login");
const forgetPassword = require("./forgetPassword");
const leaderBoradData = require("./leaderBoard");
const logoutData = require("./logout");
// const path = require('path');
const xss = require("xss");

const constructorMethod = app => {

app.use("/register", registerData);

app.use("/login", loginData);

app.use("/forgetPassword",forgetPassword);

app.use("/logout",logoutData);

app.use("/leaderBoard",leaderBoradData);

app.use("/dashboard", questionRoutes);

app.use("/result", resultRoutes);

app.get('/', (req, res) => {
    //res.sendFile(path.resolve('public/index.html'));
    res.render('MultiPlayerGame/login');
});

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;