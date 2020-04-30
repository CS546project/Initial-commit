let user = document.getElementById("username")
let pass = document.getElementById("password")

if(myform){
    myform.addEventListener('submit',(event) =>{
        event.preventDefault()

        if (!palen.value){
            err.hidden = false
        }

        if(palen.value){ 
            err.hidden = true 
           let str = palen.value.toLowerCase().replace(/[^a-zA-Z0-9]+/g,"")


           if (str.length == 0){
            let li = document.createElement('li')
            li.innerHTML = palen.value
            li.className = "not-palindrome"
            //palenlist.className = "np"
            palenlist.append(li)
            myform.reset() 
           } 
           else if (str == str.split("").reverse().join("")) {
               let li = document.createElement('li')
               li.className = "is-palindrome"
               li.innerHTML = palen.value
               //palenlist.className = "p"
               palenlist.append(li)
               myform.reset()  
           }
           else {
               let li = document.createElement('li')
               li.innerHTML = palen.value
               li.className = "not-palindrome"
               //palenlist.className = "np"
               palenlist.append(li)
               myform.reset()
           }

        
        }
        
        

    })
}