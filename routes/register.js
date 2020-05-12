const express = require("express");
const router = express.Router();
const data = require("../data");
const regPlayer = data.register;
const path = require('path');
const xss = require("xss");

router.get("/", async (req, res,next) => {
    try {
        if(req.session.user){
            res.redirect("/leaderBoard");
        }
        else{
            res.render("MultiPlayerGame/register");
        }
       
    }
    catch(e){
        res.status(400).render('MultiPlayerGame/error', { 'err': e })
    }
})

router.post("/", async (req, res,next) => {
    try {
        const uname = xss(req.body['username']);
        const email = xss(req.body['email']);
        const pass = xss(req.body['password']);

         const registraion = await regPlayer.registerPlayer(uname,email,pass); 
        //  res.redirect("MultiPlayerGame/index");
       // res.render("MultiPlayerGame/index");
       res.render('MultiPlayerGame/register', { 'success': "Registration successfull, please login", 'data':"" })

    }
    catch(e){
        res.status(400).render('MultiPlayerGame/register', { 'error': e, 'data':req.body })
    }
})

module.exports = router;