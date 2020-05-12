let loginForm = document.getElementById('loginForm');
let btnLogin = document.getElementById('btnLogin');
let myForm = document.getElementById('loginForm');

function onSignIn(googleUser){
    let profile = googleUser.getBasicProfile();
    let name = profile.getName();
    let email = profile.getEmail();
    localStorage.setItem('player', name);

    var url = '/leaderBoard';
   $.ajax({
    url: url,
    type: 'POST',
    data: {'player': name },
    success: function(res)
    { 
        alert("gmail sign in sucessfull ");
        myForm.submit();       
 },

});

var auth2 = gapi.auth2.getAuthInstance();
auth2.signOut().then(function () {
});
auth2.disconnect();

}
