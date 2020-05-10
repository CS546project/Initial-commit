const mongoCollections = require('./config/mongoCollections')

const quiz = mongoCollections.quiz;

async function abc(){

const quizCollection = await quiz()
const quizList = await quizCollection.find({}).toArray()
//const abc = await playerCollection.find({}).toArray();
var question = []
for(i=0;i<quizList.length;i++){
    var newQ = [quizList[i].Question, quizList[i].Options, quizList[i].RightAnswer]
    question.push(newQ)       
}
 console.log(question) 
}
abc()