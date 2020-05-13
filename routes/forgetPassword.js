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
            res.render("MultiPlayerGame/forgetPassword");
        }
       
    }
    catch(e){
        res.status(400).render('MultiPlayerGame/error', { 'err': e })
    }
})

router.post("/", async (req, res,next) => {
    try {
        const email = xss(req.body['email']);
        const pass = xss(req.body['password']);

       const registraion = await regPlayer.updatePassword(email,pass); 

       res.render('MultiPlayerGame/forgetPassword', { 'success': "Password updated successfully.", 'data':"" })

    }
    catch(e){
        res.status(400).render('MultiPlayerGame/forgetPassword', { 'error': e, 'data':req.body })
    }
})

module.exports = router;