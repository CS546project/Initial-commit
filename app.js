const mongoCollections = require('./config/mongoCollections');
const users = mongoCollections.users

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const static = express.static(__dirname + '/public');
app.use("/public", static);


app.use(bodyParser.urlencoded({extended: true}))

const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


app.get('/', async(req, res) =>{
    res.render('login')
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
         return res.render('dashboard')
         
      }
      
    }
    
    return res.render('login',{msg:"Error: invalid username or password"})

})

app.get('*', async(req, res) => {
    res.status(404).json({ error: "Not found" })
})

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
  })