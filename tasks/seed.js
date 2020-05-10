const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const question = data.questions;
const answer = data.answers;
const collection = require('../config/mongoCollections');
const quescollection = collection.question;
const anscollection = collection.answer;
const useranscollection = collection.playerAnswers;

const main = async () => {
	const db = await dbConnection();
    await db.dropDatabase();
    console.log("start");
 
    // Insert 1st question and answer   
    const firstQuestion = await question.addQuestion(
        "1", "What is the HTML tag under which one can write the JavaScript code?",'1',[]
            );

      const firstAnswer1 = await answer.addAnswer(
        "1","<scripted>",0
      );
      const firstAnswer2 = await answer.addAnswer(
        "1","<script>",1
      );
      const firstAnswer3 = await answer.addAnswer(
        "1","<javaScript>",0
      );
      const firstAnswer4 = await answer.addAnswer(
        "1","<js>",0
      );

    // Insert 2nd question and answer
      const secondQuestion = await question.addQuestion(
      "2", " Which built-in method removes the last element from an array and returns that element"
      ,'1',[]
          );

        const secondAnswer1 = await answer.addAnswer(
          "2","last()",0
        );
        const secondAnswer2 = await answer.addAnswer(
          "2","get()",0
        );
        const secondAnswer3 = await answer.addAnswer(
          "2","pop()",1
        );
        const secondAnswer4 = await answer.addAnswer(
          "2","None of the above",0
        );

        // Insert 3rd question and answer
      const thirdQuestion = await question.addQuestion(
        "3", " Which of the following is correct about features of JavaScript?" ,'1',[]);
  
          const thirdAnswer1 = await answer.addAnswer(
            "3","JavaScript is a lightweight, interpreted programming language.",1
          );
          const thirdAnswer2 = await answer.addAnswer(
            "3","JavaScript is designed for creating network-centric applications.",0
          );
          const thirdAnswer3 = await answer.addAnswer(
            "3","JavaScript is complementary to and integrated with Java.",1
          );
          const thirdAnswer4 = await answer.addAnswer(
            "3","All of the above.",0
          );
    await db.serverConfig.close();
};

main();
