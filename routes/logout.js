const express = require("express");
const router = express.Router();
const data = require("../data");
const regPlayer = data.register;
const path = require('path');
const xss = require("xss");
const storage = require('node-sessionstorage');
const localStorage = require("localStorage");


router.get("/", async (req, res,next) => {
    try {
    req.session.destroy();
    res.clearCookie('AuthCookie');
    res.render("MultiPlayerGame/login");
    }
    catch(e){
        res.status(400).render('MultiPlayerGame/error', { 'err': e })
    }
})

module.exports = router;