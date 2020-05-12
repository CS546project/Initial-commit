const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
const configRoutes = require("./routes");
const session = require('express-session')
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.json());

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

let totalRequests = 0;

app.use(
	session({
		name: 'AuthCookie',
		secret: "This is a secret.. shhh don't tell anyone",
		saveUninitialized: true,
		resave: false
	})
);

app.use(async (req, res, next) => {
	totalRequests++;
	console.log(totalRequests);
	console.log(`There have been ${totalRequests} requests made to the server`);
	console.log(new Date().toUTCString()+ " " + req.method +" "+req.originalUrl);
	next();
});

configRoutes(app);

http.listen(3000, () => {
	console.log("We've now got a server!");
	console.log('Your routes will be running on http://localhost:3000');
});

var roomno=Math.floor(Math.random() * 100000);
var roomnoarray=[];
var username;
io.sockets.on('connection',function(socket){
  
  console.log('a new client connected')
  if(io.nsps['/'].adapter.rooms[roomno] && io.nsps['/'].adapter.rooms[roomno].length > 4)
  {roomno=Math.floor(Math.random() * 100000);} 
  socket.join(roomno);
  io.sockets.in(roomno).emit('connectToRoom', roomno);
  
  //io.sockets.in(roomno).emit('activeusers', clients(socket.rooms[Object.keys(socket.rooms)[0]]).length);
  console.log(io.nsps['/'].adapter.rooms)
  console.log(__dirname)

var users=[];  

socket.on('adduser',function(user){
	socket.user = user;
	users.push(user);
	updateClients();
})
  

  socket.on('sendmsg',function(data){
	 
	  
	console.log(socket.rooms[Object.keys(socket.rooms)[0]])
	console.log(socket.rooms[Object.keys(socket.rooms)[0]].length)
	//console.log(io.sockets.manager.roomClients[socket.id])
	//io.sockets.in(socket.rooms).emit('updateHeader',data)
	//socket.broadcast.to(socket.rooms).emit('updateHeader',data)
	io.sockets.in(socket.rooms[Object.keys(socket.rooms)[0]]).emit('updateHeader',data)
	
	
	
})
  socket.on('updatepname',function(data){
	  console.log(data)
	  username = data;
	socket.to(socket.rooms[Object.keys(socket.rooms)[0]]).emit('updateotherpname', username);
  })
})