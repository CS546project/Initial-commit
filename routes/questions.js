const express = require("express");
const router = express.Router();
const data = require("../data");
const questionData = data.questions;
const resultData = data.result;
const scoreData = data.score;
const path = require('path');
const xss = require("xss");

let totalRequests = 0;
let firstTimePlayer;
//let totalTime = new Date();
router.get("/", async (req, res,next) => {
  try {
if(req.session.user){
  const player = req.session.user;
  const totalReq = await questionData.getQuestions();

  //for getting players previous game detail.
  const gameDetails = await scoreData.getScore(player);
  if(gameDetails.length > 0){
    firstTimePlayer = "no"
  }
  else{
    firstTimePlayer = "yes";
  }
  if(totalReq.length > 0)
      {
        if(req.session.totalRequests <= totalReq.length)
        {
          const question = await questionData.getQuestionsbyId(req.session.totalRequests);
          const answer = await questionData.getAnswers(question.question_id);
         
          //res.render('MultiPlayerGame/test')
          res.render('MultiPlayerGame/dashboard', { 'question': question, 'answers':answer, 'question_no':req.session.totalRequests+1, 'firstTimePlayer':firstTimePlayer, 'gameDetails':gameDetails,'user':player, 'reqNo':req.session.totalRequests});
          req.session.totalRequests ++;
        }
        else{
          const getResult = await resultData.getResult();
          const totalMarks = await resultData.countTotalMarks();
          req.session.destroy();
          res.clearCookie('AuthCookie');
          req.session.totalRequests = 0;
          res.render('MultiPlayerGame/result',{'data':getResult , 'totalMarks':totalMarks});
        }
      }
      else{
        res.status(400).render('MultiPlayerGame/error', { 'err': "there is no question in the database. do npm run seed or export files to the database"});
      }
  }
  else
  res.status(400).render('MultiPlayerGame/login', { 'error': 'please login' });
 } catch (e) {
  req.session.totalRequests = 0;
  req.session.destroy();
  res.clearCookie('AuthCookie');
  res.render('MultiPlayerGame/result',{'data':"no value" , 'totalMarks':0});
  }
});

//let totalRequests = 0;
router.post("/", async (req, res,next) => {
    try {
      if(req.session.user){
      const player = req.session.user;
      const totalReq = await questionData.getQuestions();
  // for getting previous game details
  const gameDetails = await scoreData.getScore(player);
  if(gameDetails.length > 0){
    firstTimePlayer = "no"
  }
  else{
    firstTimePlayer = "yes";
  }

      // for checking if there is any question in database.
      if(totalReq.length > 0 ){

      // for saving the question and getting the next question and answer
      if(req.session.totalRequests < totalReq.length)
      {
      constQuesId = xss(req.body.question);
      constAnsId = xss(req.body.selcRadio);
      const saveAns = await questionData.saveAnswers(constQuesId,constAnsId,true,req.session.totalRequests,player);
      const question = await questionData.getQuestionsbyId(req.session.totalRequests);
      const answer = await questionData.getAnswers(question.question_id);
      
      //res.render('MultiPlayerGame/test')
      res.render('MultiPlayerGame/dashboard', { 'question': question, 'answers':answer, 'question_no':req.session.totalRequests+1, 'firstTimePlayer':firstTimePlayer, 'gameDetails':gameDetails, 'user':player, 'reqNo':req.session.totalRequests});
      req.session.totalRequests++;
      }

      // for saving the last question
      else if(req.session.totalRequests == totalReq.length){
        constQuesId = xss(req.body.question);
        constAnsId = xss(req.body.selcRadio);
        const saveAns = await questionData.saveAnswers(constQuesId,constAnsId,true,req.session.totalRequests,player);
        req.session.totalRequests++;
        const result = await resultData.generateResult(player);

        const getResult = await resultData.getResult(player);

         const totalMarks = await resultData.countTotalMarks(player);

         req.session.totalRequests = 0;
       // const totalMarks  = 0;
        req.session.destroy();
        res.clearCookie('AuthCookie');
        res.render('MultiPlayerGame/result',{'data':getResult , 'totalMarks':totalMarks});
      }
      else{
        const getResult = await resultData.getResult(player);

        const totalMarks = await resultData.countTotalMarks(player);
       // const totalMarks  = 0;
       
       req.session.totalRequests = 0;
        req.session.destroy();
        res.clearCookie('AuthCookie');
        res.render('MultiPlayerGame/result',{'data':getResult , 'totalMarks':totalMarks});
      }
    } 
    else{
      res.status(400).render('MultiPlayerGame/error', { 'err': "there is no question in the database. do npm run seed or export files to the database" });
    }
  }}catch (e) {
      res.status(400).render('MultiPlayerGame/error', { 'err': e });
    }
  });


  
  module.exports = router;