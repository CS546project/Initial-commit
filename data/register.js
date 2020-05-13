const collection = require('../config/mongoCollections');
const ObjectId = require('mongodb').ObjectID;
const playerCollection = collection.player;
const bcrypt = require("bcryptjs");
const saltRounds = 5;

async function registerPlayer(uname, email, pass ){
let error;
    if(!uname || !email || !pass || !pass)    
    throw "please provide data for all input feilds."

  let parts = pass.split(',', 2);
  const pass1 = parts[0];
  const pass2 = parts[1];

    if(uname.length < 4)
    throw "Username should be atleast 4 letters long"
        
    
      const playerCollVal = await playerCollection();

      const playerList = await playerCollVal.find({}).toArray();
      for(i = 0;i<playerList.length;i++){
        if(uname == playerList[i].UserName){
         throw "Username already exists, please enter new username"
          
        }
        if(email == playerList[i].Email){
          throw "mail already exists, please enter new Email"
    
        }
      }
    
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(email).toLowerCase()) == false){
           throw "Please enter a valid email"
        }
    
      if (!(pass1.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/))){
        throw "Password must be minimum of eight characters, contain at least one uppercase letter, one lowercase letter and one number"
      }
      
      if(pass1 !== pass2){
       throw "Password and confirm password do not match"
      }
    
       const hashPassword = await bcrypt.hash(pass1, saltRounds);
       console.log(hashPassword);
      
      let newPlayer = {
          "UserName": uname.toLowerCase(),
          "Email": email,   
          "Password": hashPassword
      };
    
      const insertInfo = await playerCollVal.insertOne(newPlayer);
      if (insertInfo.insertedCount === 0) throw 'Could not add player';
}

async function getRegisteredPlayer(userName,userPassword){

  const playerCollVal = await playerCollection();

  const getDetails = await playerCollVal.findOne({UserName :userName.toLowerCase()});
  if(getDetails != null){
  const dbPassword = getDetails.Password;
  return await bcrypt.compareSync(userPassword,dbPassword);
  }
  else
  {
throw `${userName} player does not exists`
  }

}

//Priya: update password for forgetPassword. 
async function updatePassword(email,pass){

  if(!email || !pass)    
  throw "please provide data for all input feilds."

  // if(!Array.isArray(pass))
  // throw "please provide valid password"

  let parts = pass.split(',', 2);
  const pass1 = parts[0];
  const pass2 = parts[1];


  const playerCollVal = await playerCollection();

  const getDetails = await playerCollVal.findOne({Email :email});
  if(getDetails == null)
  throw "email does not exists, please enter a valid email id."
    else{
      if (!(pass1.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/))){
        throw "Password must be minimum of eight characters, contain at least one uppercase letter, one lowercase letter and one number"
      }
      
      if(pass1 !== pass2){
       throw "Password and confirm password do not match"
      }

  //const getDetails = playerCollVal.findOne({Email :email});
  const UserID = getDetails._id;
  console.log(UserID);

  if(typeof UserID != "object"){
    UserID  = ObjectId.createFromHexString(UserID);
  }

  //hashing the password
  const hashPassword = await bcrypt.hash(pass1, saltRounds);
  console.log(hashPassword);

  const updatedInfo = await playerCollVal.updateOne({_id:UserID },  { $set:{Password: hashPassword}})
  
  if(updatedInfo.modifiedCount === 0){
      throw `could not update password ${email}`;
  }
 return true;
    }

}

module.exports={
    registerPlayer,
    getRegisteredPlayer,
    updatePassword
}