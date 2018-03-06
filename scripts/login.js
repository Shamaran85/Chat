$(document).ready(function() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            window.location = 'index.html';
        } else {
            // No user is signed in.

            $("#loginButton").click(function () {
                // Store Login Details
                let loginEmail = $("#login-email").val();
                let loginPassword = $("#login-password").val();

                firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword).catch(function (error) {
                    let errorMessage = error.message;
                    alert(errorMessage);
                });
            });
        }});
});