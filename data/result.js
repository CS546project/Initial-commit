const collection = require('../config/mongoCollections');
const quesCollection = collection.question;
const ansCollection = collection.answer;
const ObjectId = require('mongodb').ObjectID;
const playerAnsCollection = collection.playerAnswers;
const gameSummmaycollection = collection.gameSummary;
const scoreCollection = collection.score;

async function generateResult(player){

    //let gameDay = new Date().getDate();
    let gameDay = getTodaysDate();

    const resultVal = await playerAnsCollection();
    const ansVal = await ansCollection();
    const quesVal = await quesCollection();
    const resultdata = await resultVal.find({'player': player, 'counted':false}).toArray();
    const answerData = await ansVal.find({}).toArray();
    const quesdata = await quesVal.find({}).toArray();
    const resultSet = {};
    const level = 1;
    for(let j=0;j<=resultdata.length-1;j++){
        for(let k=0; k<=answerData.length-1; k++){
            if(resultdata[j].answerID == answerData[k]._id)
            {
                //if pljayer has coorect question he will get +20.
                if(answerData[k].isCorrect == 1){
                    resultSet["Question No :"+ resultdata[j].questionId] = "+20";
                    addGameSummary(player,level, resultdata[j].questionId, "+20", gameDay, resultdata[j]._id);
                }
                else  {

                    //if pljayer has wrong question he will get -5.
                    resultSet["Question No :"+ resultdata[j].questionId] = "-5";
                    addGameSummary(player,level,resultdata[j].questionId, "-5",gameDay,resultdata[j]._id);
                }

                
            }
    }

    if(resultdata[j].answerID == "")
    {
        resultSet["Question No :"+ resultdata[j].questionId] = "you missed that question";

        addGameSummary(player,level,resultdata[j].questionId, "0",gameDay, resultdata[j]._id);
    }

    }

   return resultSet;

}

async function addGameSummary(player, level, questionId, marks, timetaken, sumId ){

    if (!player || !level || !questionId || !marks || !timetaken) throw 'input data is provided';

    const gameSumVal = await gameSummmaycollection();
    const playerAns = await playerAnsCollection();

    let newSummary = {
        playerid:player , 
        questionId: questionId,
        level:level,
        marks:marks,
        gameDay:timetaken
    };
    const insertInfo = await gameSumVal.insertOne(newSummary);
    if (insertInfo.insertedCount === 0) throw 'Could not add band';

    const newId = insertInfo.insertedId;

    // const getDetails = await playerAns.findOne({answerID : String(ansId)});
    // console.log(getDetails);

    if(typeof sumId !="object")
    {
        sumId = ObjectId.createFromHexString(sumId);
    }
   
    const updatedInfo = await playerAns.updateOne({_id:sumId }, { $set: { counted: true} })
     if(updatedInfo.modifiedCount === 0){
         throw `could not update question ${question_id}`;
     }
}

async function getResult(player){

    const gameSumVal = await gameSummmaycollection();
    const gameSummary = await gameSumVal.find({playerid :player }).toArray();
    if (gameSummary === null) throw 'No band with that id';      
    return gameSummary;
    
}

async function countTotalMarks(player){

    const gameSumVal = await gameSummmaycollection();
    const result = await gameSumVal.find({playerid : player }).toArray();

    let totalMarks = 0;
    for(let i =0; i<=result.length-1; i++){
       if(result[i].marks != "0"){
           let sign = result[i].marks.slice(0,1);
           let str = 0;
           if(sign === "+"){
             str = result[i].marks.replace("+","");
            totalMarks = parseInt(totalMarks) + parseInt(str);
            await clearPlayerSummary(result[i]._id);
           }
           else if(sign === "-"){
            str = result[i].marks.replace("-","");
            totalMarks = parseInt(totalMarks) - parseInt(str);
            await clearPlayerSummary(result[i]._id);
           }
       }
       else if(result[i].marks == "0"){
       await clearPlayerSummary(result[i]._id);
       }
    }

    await addGameScore(player,totalMarks,getTodaysDate());

    return totalMarks;
}

 function getTodaysDate(){
    let today =  new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    
    today = mm + '/' + dd + '/' + yyyy;
    return today;
}
async function addGameScore(playerid,totalMarks, gameDay ){

    if (!playerid || !gameDay) throw 'input data is not provided';
    const gameScoreVal = await scoreCollection();

    let newScore = {
        playerid: playerid, 
        totalMarks:totalMarks,
        gameDay:gameDay
    };
    const insertInfo = await gameScoreVal.insertOne(newScore);
    if (insertInfo.insertedCount === 0) throw 'Could not add band';

    const newId = insertInfo.insertedId;
}

async function clearPlayerSummary(playerSumId){

    const gameSumVal = await gameSummmaycollection();

    if(typeof playerSumId !="object"){
        playerSumId = ObjectId.createFromHexString(playerSumId);
    }
    const playerSummary = await gameSumVal.removeOne({_id:playerSumId})
    if (playerSummary.deletedCount === 0) {
        throw `Could not remove player ${player}`;
    }

} 

module.exports = {
    generateResult,
    addGameSummary,
    getResult,
    countTotalMarks

}