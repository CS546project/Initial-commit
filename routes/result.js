const express = require("express");
const router = express.Router();
const data = require("../data");
const questionData = data.questions;
const resultData = data.result;
const path = require('path');


router.get("/result", async (req, res,next) => {
    try {
        const resultData = await resultData.generateResult();
    }
    catch(e){

    }
})

module.exports = router;