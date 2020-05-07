const mongoCollections = require('./config/mongoCollections');
const users = mongoCollections.users

const express = require('express')
const session = require('express-session')
const app = express()
const bodyParser = require('body-parser')

const static = express.static(__dirname + '/public');
app.use("/public", static);


app.use(bodyParser.urlencoded({extended: true}))

const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const configRoutes = require("./routes");
configRoutes(app);



app.get('*', async(req, res) => {
    res.status(404).json({ error: "Not found" })
})

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
  })