const mongoCollections = require('../config/mongoCollections');


const express = require("express");
const users = mongoCollections.users
const static = express.static(__dirname + '/public');
const app = express.Router();


//const data = require("../data");
//const userData = data.user;
//const bcrypt = require("bcryptjs");

app.use("/public", static);


app.get('/', async(req, res) =>{
  if (req.session.user) {
		return res.redirect('/dashboard');
    }
    else{
        res.render('login')
    }        
})



  app.get('/register', async(req, res)=>{
    res.render('register')
  })
  
  
  app.post('/register',async(req, res)=>{
    const playerCollection = await users();
    const uname = req.body['username']
    const email = req.body['email']
    const pass = req.body['password']
    const pass2 = req.body['password2']
    
    if(uname.length<4){
      return res.render('register', {EMAIL:email, msg:"Error:Username should be atleast 4 letters long"})
    }
  
    const playerList = await playerCollection.find({}).toArray();
    for(i = 0;i<playerList.length;i++){
      if(uname == playerList[i].UserName){
        return res.render('register', {EMAIL:email, msg:"Error: Username already exists, please enter new username"})
        
      }
      if(email == playerList[i].Email){
        return res.render('register', {UserName:uname, msg:"Error: Email already exists, please enter new Email"})
  
      }
    }
  
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(String(email).toLowerCase()) == false){
         return res.render('register', {UserName:uname,msg:"Error: Please enter a valid email"})
      }
  
    if (!(pass.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/))){
      return res.render('register', {UserName:uname, EMAIL:email, msg:"Error: Password must be minimum of eight characters, contain at least one uppercase letter, one lowercase letter and one number"})
    }
    
    if(pass !== pass2){
      return res.render('register', {UserName:uname, EMAIL:email, msg:"Error: Password and confirm password do not match"})
    }
  
  
    
  
    let newPlayer = {
        "UserName": uname,
        "Email": email,   
        "Password": pass,
        "Score": 100 
    };
  console.log("new user created" + uname + email+ pass)
    const insertInfo = await playerCollection.insertOne(newPlayer);
    if (insertInfo.insertedCount === 0) throw 'Could not add player';
  
    //console.log(uname)
    //console.log(pass)
    return res.render('success')
  
  })
  
  app.post('/login',async(req, res)=>{
      const playerCollection = await users();
      const uname = req.body['username']
      const pass = req.body['password']
  
      const playerList = await playerCollection.find({}).toArray();
      
      for(i=0; i<playerList.length; i++ ){
        if(playerList[i].UserName == uname && playerList[i].Password == pass){
          req.session.user = 'user'
           return res.redirect('/dashboard')
           
        }
        
      }
      
      return res.render('login',{msg:"Error: invalid username or password"})
  
  })
  
  app.get('/dashboard', async(req, res) =>{
    if (!req.session.user) {
          return res.status(403).render('login', { msg: 'Error: You are not logged in'});
      }else{
         return res.render('dashboard')
      }
  })
  
  app.get('/logout', async(req, res) => {
    req.session.destroy()
  res.render('logout') 
    
  });

  module.exports= app;