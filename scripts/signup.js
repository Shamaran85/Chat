$(document).ready(function() {

    // Get references to DOM elements
    let $avatarPicker = $('ul#avatar-picker li');
    //let $avatarPickerUrl = $('ul#avatar-picker li.active img');
    let $signupButton = $('#signup-button');
    let $userName = $('#user-name');
    let $userEmail = $('#user-email');
    let $userPassword = $('#user-password');


    // Set the chosen Avatar to active class.
    $avatarPicker.click(function () {
        $avatarPicker.removeClass('active');
        $(this).addClass('active');
    });

    // Register new user.
    $signupButton.click(function () {

        // Store Signup Details
        let userName = $userName.val();
        let userEmail = $userEmail.val();
        let userPassword = $userPassword.val();
        let userAvatar = $('ul#avatar-picker li.active img').attr('src');

        // Signup.
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
            alert(error.message);
        });

        // Update Profile.
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                 // User is signed in.
                  user.updateProfile({
                      displayName: userName,
                      photoURL: userAvatar
                  }).then(function () {
                      window.location.href = "index.html";
                  });
            }
        });
    });
});