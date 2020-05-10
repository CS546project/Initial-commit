const data = require('./tasks/dataquestion') 
const mongoCollections = require('./config/mongoCollections');
const quiz = mongoCollections.quiz
//console.log(data[0].question)

async function addData(){
    for(i =0; i<2; i ++){
        let newQuestion = {
            "Question": data[i].question,
            "Options": data[i].answeroptions,   
            "RightAnswer": data[i].rightanswer, 
        };
    
        const quizCollection = await quiz()
        const insertInfo = await quizCollection.insertOne(newQuestion);
        return console.log("done")
      }
}


addData()
