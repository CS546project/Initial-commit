const express = require("express");
const router = express.Router();
const data = require("../data");
const score = data.score;
const path = require('path');
const xss = require("xss");


router.post("/", async (req, res,next) => {
    try {
    if(req.session.user || req.body['player']){

        const player1 = req.session.user;
        if(req.body['player']!=null){
        
        //setting session from ajax request.
        req.session.user = req.body['player'];
        }
       const getLeaderBoardData = await score.getTopPlayer();
       res.render("MultiPlayerGame/leaderBoard",{'winnerData':getLeaderBoardData ,'user' : player1}});

    }
    else{
        res.status(400).render('MultiPlayerGame/error', { 'error': 'please login' });
    }
}
    catch(e){
        res.status(400).render('MultiPlayerGame/error', { 'err': e });
    }
})

router.get("/", async (req, res,next) => {
    try {
        if(req.session.user || req.body['player']){
            const player = req.session.user;
       const getLeaderBoardData = await score.getTopPlayer();

       res.render("MultiPlayerGame/leaderBoard",{'winnerData':getLeaderBoardData,'user' : player});

        }
        else{
            res.status(400).render('MultiPlayerGame/login', { 'error': 'please login' });
        }
    }
    catch(e){
        res.status(400).render('MultiPlayerGame/error', { 'err': e });
    }
})

module.exports = router;