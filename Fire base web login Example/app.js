



firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        document.getElementById("login").style.display ="none";
        document.getElementById("logout").style.display ="initial";

        let user = firebase.auth().currentUser;
        let email_Id= user.email;
        if (email_Id !== null){
            document.getElementById("para").innerHTML = "Welcome  : " + email_Id;
        }
    } else {
        // No user is signed in.

        document.getElementById("login").style.display ="initial";
        document.getElementById("logout").style.display ="none";
    }
});

function login() {
    let userEmail = document.getElementById("email").value;
    let userPassword = document.getElementById("password").value;


    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
        // Handle Errors here.

        let errorMessage = error.message;
        window.alert("Error: " + errorMessage);
        // ...
    });

}
function logout() {

    let user = firebase.auth().currentUser;
    let email_Id= user.email;
    document.getElementById("para").innerHTML =   email_Id + " ----------" + " Left the chat ";
    firebase.auth().signOut();

}