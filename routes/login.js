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
        if(req.session.user){
            res.redirect("/leaderBoard");
            
        }
        else{
            res.render("MultiPlayerGame/login");
        }

    
    }
    catch(e){
        res.status(400).render('MultiPlayerGame/error', { 'err': e })
    }
})
router.post("/", async (req, res,next) => {
    try {

    req.session.totalRequests = 0;
    if(req.session.user){
        res.redirect("/leaderBoard");
    }
    else{
    const userName = xss(req.body['userName']);
    console.log(userName);
    const password = xss(req.body['password']);
    const IsPlayerExits = await regPlayer.getRegisteredPlayer(userName,password);

    if(IsPlayerExits){
    req.session.user = req.body.userName;
    res.redirect("/leaderBoard");
    }
    // res.redirect("/dashboard");
    else{
        res.render("MultiPlayerGame/login",{'error':"password does not match, please enter right password.",'data':req.body});
    }}

    }
    catch(e){
        res.status(400).render('MultiPlayerGame/login', { 'error': e })
    }
})

module.exports = router;