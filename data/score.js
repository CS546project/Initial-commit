const collection = require('../config/mongoCollections');
const ObjectId = require('mongodb').ObjectID;
const scoreCollection = collection.score;


async function getScore(){ 
    const scoreVal = await scoreCollection();
    let mysort = { gameDay: 1 };  
    let index = 0;
    const scoreData = await scoreVal.find({playerid :"priya"}).sort(mysort).toArray();
    //bandDetail.find
    if (scoreData === null) throw 'No band with that id';      
    return scoreData;
}

module.exports = {
    getScore  
}
