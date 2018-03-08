$(document).ready(function() {

    // Set Global Variables.
    let auth = firebase.auth();

    // Get references to DOM elements
    let $loginButton = $('#login-button');
    let $loginEmail = $('#login-email');
    let $loginPassword = $('#login-password');
    let $loginContainer = $('#login-container');

    // Check if user is signed in or not and show correct div.
    auth.onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            $loginContainer.hide();
            window.location.href = "index.html";
        } else {
            // User is NOT signed in.
            $loginContainer.show();
        }
    });

    // Login user.
    $loginButton.click(function () {
        let loginEmail = $loginEmail.val();
        let loginPassword = $loginPassword.val();
        firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword).catch(function (error) {
            alert(error.message);
        });
    });

});