const collection = require('../config/mongoCollections');
const quesCollection = collection.question;
const ansCollection = collection.answer;
const ObjectId = require('mongodb').ObjectID;
const playerAnsCollection = collection.playerAnswers;

async function addAnswer(question_id, answer, isCorrect ){
   // if (!question_id || !answer || !isCorrect) throw 'input data is not provided';
    const ansVal = await ansCollection();
    let newAnswer = {
        question_id: question_id, 
        answer:answer,
        isCorrect:isCorrect
    };

    const insertInfo = await ansVal.insertOne(newAnswer);
    if (insertInfo.insertedCount === 0) throw 'Could not add band';

    const newId = insertInfo.insertedId;
    
    const addAnswerToQues = await this.addAnswerToQuestion(question_id, newId);
}

async function addAnswerToQuestion(question_id, answer_id){
    const quesVal = await quesCollection();
    const quesId = await quesVal.findOne({question_id :question_id });
    const id = quesId._id;

     const updatedInfo = await quesVal.updateOne({_id:id }, { $addToSet: { answers: {answer_id}} })
     if(updatedInfo.modifiedCount === 0){
         throw `could not update question ${question_id}`;
     }
    return true;

}

module.exports = {
    addAnswer,
    addAnswerToQuestion
}



