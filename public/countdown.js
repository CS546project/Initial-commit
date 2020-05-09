let myForm = document.getElementById('myForm');
//let h = document.getElementById('hour');
let m = document.getElementById("minute");
let s = document.getElementById("second");
let expired = document.getElementById('expired');
let clock = document.getElementById('clockdiv');
let submitBtn= document.getElementById('btnSubmit');
let btnNewGame = document.getElementById('btnNewGame');
const countdown = window.addEventListener('load', (event) => {
// var deadline = new Date("April 19, 2020 21:10:05").getTime(); 
// var deadline = new Date(Date.now() + (1 * 60 * 1000));
var deadline = new Date(Date.now() + (1 * 30 * 1000));
var x = setInterval(function() { 
var now = new Date().getTime(); 
var t = deadline - now; 
var days = Math.floor(t / (1000 * 60 * 60 * 24)); 
var hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60)); 
var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)); 
var seconds = Math.floor((t % (1000 * 60)) / 1000); 

//h.innerText = hours;
m.innerText = minutes;
s.innerText = seconds 
 
    if (t < 0) { 
        clearInterval(x); 
        document.getElementById("clockdiv").style.visibility = "hidden";
        expired.hidden=false;
        expired.innerText = "Your time is Over for this question, now try next!!"
        myForm.submit();        
      } 

}, 1000); 
})

btnNewGame.addEventListener('click',(event)=>{
  myForm.submit();
//location.reload();
})
  
  setTimeout(countdown, 1000);


