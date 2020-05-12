const name = document.getElementById("userName")
const pass = document.getElementById("password")
const form = document.getElementById("loginForm")

form.addEventListener('submit', (e) =>{
    if(name.value.length < 4 ){
        alert("Error: Name must be atleast 4 characters long")
        e.preventDefault()
    }
    
    else if(pass.value.length == 0){
        alert("Error: Please enter the password")
        e.preventDefault()
    }
})
