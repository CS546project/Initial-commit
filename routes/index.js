const loginroutes = require("./login");


const loginroutesmethods = (app) => {
    app.use("/", loginroutes);
    //app.use("/result", resultRoutes)

    app.use("*", (req, res) => {
        res.redirect("/");
    })
};

module.exports = loginroutesmethods;