const questionRoutes = require("./questions");
const resultRoutes = require("./result");
const registerData = require("./register");
const loginData = require("./login");
const Chatroomdata = require("./chatroom");
const forgetPassword = require("./forgetPassword");
const leaderBoradData = require("./leaderBoard");
// const path = require('path');
const xss = require("xss");

const constructorMethod = app => {

app.use("/register", registerData);

app.use("/login", loginData);

app.use("/chatroom", Chatroomdata);

app.use("/forgetPassword",forgetPassword);

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