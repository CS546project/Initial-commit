const name = document.getElementById("username")
const email = document.getElementById("email")
const pass = document.getElementById("password")
const pass2 = document.getElementById("confirm_password")
const form = document.getElementById("register-form")
var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

form.addEventListener('submit', (e) =>{
    if(name.value.length < 4 ){
        alert("Error: Name must be atleast 4 characters long")
        e.preventDefault()
    }

    else if(re.test(String(email.value).toLowerCase()) == false){
        alert("Invalid email id, Please enter a valid email id")
        e.preventDefault()
    }

    else if(!(pass.value.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/))){
        alert("Password must be minimum of eight characters, contain at least one uppercase letter, one lowercase letter and one number")
        e.preventDefault()
    }

    else if(pass.value != pass2.value){
        alert("Error:Password and Conformed Password do not match")
        e.preventDefault()
    }

})