const collection = require('../config/mongoCollections');
const quesCollection = collection.question;
const ansCollection = collection.answer;
const ObjectId = require('mongodb').ObjectID;
const playerAnsCollection = collection.playerAnswers;

async function addQuestion(question_id, question, level, answers ){

    if (!question_id || !question || !level || !answers) throw 'input data is provided';
    const quesVal = await quesCollection();
    let newQuestion = {
        question_id: question_id, 
        question: question,
        level:level,
        answers:[]
    };

    const insertInfo = await quesVal.insertOne(newQuestion);
    if (insertInfo.insertedCount === 0) throw 'Could not add band';
}

async function getQuestions(){ 
        const quesVal = await quesCollection();
        let mysort = { question_id: 1 };  
        let index = 0;
        const questionData = await quesVal.find({}).sort(mysort).toArray();
        //bandDetail.find
        if (questionData === null) throw 'No band with that id';      
        return questionData;
}

async function getQuestionsbyId(quesno){ 
const questions =  await this.getQuestions();
    return questions[quesno];
}

async function getAnswers(id){ 
    const ansVal = await ansCollection();
    let mysort = { _id: 1 };  
    let index = 0;
    const answerData = await ansVal.find({question_id : id}).sort(mysort).toArray();
    //bandDetail.find
    if (answerData === null) throw 'No band with that id';
    return answerData;
}

async function saveAnswers(questionId, answerID, isSiglePlayer,nextQues ){
    if(questionId || answerID || isSiglePlayer){
    //if(answerID !=null){

    const playerAnsCol = await playerAnsCollection();

    let newAnw={
        questionId : questionId,
        answerID : answerID,
        isSiglePlayer : isSiglePlayer
    };
    const insertInfo = await playerAnsCol.insertOne(newAnw);
    if (insertInfo.insertedCount === 0) throw 'Could not add ans';
    //   }

    }
}

module.exports = {
    getQuestions,
    getAnswers,
    getQuestionsbyId,
    saveAnswers,
    addQuestion
    
}