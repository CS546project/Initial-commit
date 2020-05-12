const express = require("express");
const router = express.Router();
const data = require("../data");


//let totalTime = new Date();
router.get("/", async (req, res,next) => {
    try {
        console.log(req.body['player']);
    if(req.session.user || req.body['player']){
        const player = req.session.user;
       
       res.render("MultiPlayerGame/chatroom",{'user' : player});
    }
    else{
        res.status(400).render('MultiPlayerGame/error', { 'error': 'please login' });
    }
}
    catch(e){
        res.status(400).render('MultiPlayerGame/error', { 'err': e });
    }
});

//let totalRequests = 0;
router.post("/", async (req, res,next) => {
    try {
        if(req.session.user || req.body['player']){
            const player = req.session.user;
       const getLeaderBoardData = await score.getTopPlayer();
       console.log(getLeaderBoardData);
       res.render("MultiPlayerGame/chatrooom",{'user' : player});
        }
        else{
            res.status(400).render('MultiPlayerGame/login', { 'error': 'please login' });
        }
    }
    catch(e){
        res.status(400).render('MultiPlayerGame/error', { 'err': e });
    }
  });


  
  module.exports = router;