const collection = require('../config/mongoCollections');
const quesCollection = collection.question;
const ansCollection = collection.answer;
const ObjectId = require('mongodb').ObjectID;
const playerAnsCollection = collection.playerAnswers;
const gameSummmaycollection = collection.gameSummary;
const scoreCollection = collection.score;

async function generateResult(){

    //let gameDay = new Date().getDate();
    let gameDay = getTodaysDate();

    const resultVal = await playerAnsCollection();
    const ansVal = await ansCollection();
    const quesVal = await quesCollection();
    const resultdata = await resultVal.find({}).toArray();
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
                    addGameSummary("priya",level, resultdata[j].questionId, "+20", gameDay);
                }
                else  {

                    //if pljayer has wrong question he will get -5.
                    resultSet["Question No :"+ resultdata[j].questionId] = "-5";
                    addGameSummary("priya",level,resultdata[j].questionId, "-5",gameDay);
                }

                
            }
    }

    if(resultdata[j].answerID == "")
    {
        resultSet["Question No :"+ resultdata[j].questionId] = "you missed that question";

        addGameSummary("priya",level,resultdata[j].questionId, "0",gameDay);
    }

    }

   return resultSet;

}

async function addGameSummary(playerid, level, questionId, marks, timetaken ){

    if (!playerid || !level || !questionId || !marks || !timetaken) throw 'input data is provided';
    const gameSumVal = await gameSummmaycollection();

    let newSummary = {
        playerid: "priya", 
        questionId: questionId,
        level:level,
        marks:marks,
        gameDay:timetaken
    };
    const insertInfo = await gameSumVal.insertOne(newSummary);
    if (insertInfo.insertedCount === 0) throw 'Could not add band';

    const newId = insertInfo.insertedId;
    console.log(newId);
}

async function getResult(){

    const gameSumVal = await gameSummmaycollection();
    const gameSummary = await gameSumVal.find({playerid :"priya" }).toArray();
    if (gameSummary === null) throw 'No band with that id';      
    return gameSummary;
    
}

async function countTotalMarks(){
    const gameSumVal = await gameSummmaycollection();
    const result = await gameSumVal.find({playerid :"priya" }).toArray();

    let totalMarks = 0;
    for(let i =0; i<=result.length-1; i++){
       if(result[i].marks != "0"){
           let sign = result[i].marks.slice(0,1);
           let str = 0;
           if(sign === "+"){
             str = result[i].marks.replace("+","");
            totalMarks = parseInt(totalMarks) + parseInt(str);
           }
           else if(sign === "-"){
            str = result[i].marks.replace("-","");
            totalMarks = parseInt(totalMarks) - parseInt(str);
           }
       }
    }

    await addGameScore("priya",totalMarks,getTodaysDate());
    console.log(totalMarks);
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

    if (!playerid || !totalMarks || !gameDay) throw 'input data is provided';
    const gameScoreVal = await scoreCollection();

    let newScore = {
        playerid: "priya", 
        totalMarks:totalMarks,
        gameDay:gameDay
    };
    const insertInfo = await gameScoreVal.insertOne(newScore);
    if (insertInfo.insertedCount === 0) throw 'Could not add band';

    const newId = insertInfo.insertedId;
    console.log(newId);
}

module.exports = {
    generateResult,
    addGameSummary,
    getResult,
    countTotalMarks

}