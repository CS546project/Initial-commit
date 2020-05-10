const collection = require('../config/mongoCollections');
const quesCollection = collection.question;
const ansCollection = collection.answer;
const ObjectId = require('mongodb').ObjectID;
const playerAnsCollection = collection.playerAnswers;
const gameSummmaycollection = collection.gameSummary;

async function generateResult(){

    let gameDay = new Date().getDate();

    const resultVal = await playerAnsCollection();
    const ansVal = await ansCollection();
    const quesVal = await quesCollection();
    const resultdata = await resultVal.find({}).toArray();
    const answerData = await ansVal.find({}).toArray();
    const quesdata = await quesVal.find({}).toArray();
    const resultSet = {};
    for(let j=0;j<=resultdata.length-1;j++){
        for(let k=0; k<=answerData.length-1; k++){
            for(let i=0; i <= quesdata.length-1; i++){
        //for getting question level from question collection.
             if(resultdata[j].questionId == quesdata[i].question_id){

            console.log(quesdata[i].level);
            const level = quesdata[i].level;
            //need to implement with this.
            //const ques = await quesdata[i].find({question_id : quesNo});

         //if pljayer has missed the question.
            if(resultdata[j].answerID == "")
            {
                resultSet["Question No :"+ resultdata[i].questionId] = "you missed that question";

                addGameSummary("priya",level,resultdata[j].questionId, "you missed it",gameDay);
            }
            else{
            if(resultdata[j].answerID == answerData[k]._id)
            {
                //if pljayer has coorect question he will get +20.
                if(answerData[k].isCorrect == 1){
                    resultSet["Question No :"+ resultdata[j].questionId] = "+20";
                    addGameSummary("priya",level, resultdata[j].questionId, "+20", gameDay);
                }
                else{

                    //if pljayer has wrong question he will get -5.
                    resultSet["Question No :"+ resultdata[j].questionId] = "-5";
                    addGameSummary("priya",level,resultdata[j].questionId, "-5",gameDay);
                }
            }
        }
        }
    }
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
console.log("i am here");
    const insertInfo = await gameSumVal.insertOne(newSummary);
    if (insertInfo.insertedCount === 0) throw 'Could not add band';

    const newId = insertInfo.insertedId;
    console.log(newId);
}

module.exports = {
    generateResult,
    addGameSummary

}