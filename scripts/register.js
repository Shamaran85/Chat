$(document).ready(function() {


    // Set the chosen Avatar to active class.
    $('ul#avatarPicker li').click(function () {
        $('ul#avatarPicker li').removeClass('active');
        $(this).addClass('active');
    });


    // Register new user.
    $("#registerButton").click(function () {
        // Store Signup Details
        let userName = $("#user-name").val();
        let userEmail = $("#user-email").val();
        let userPassword = $("#user-password").val();
        let userAvatar = $('ul#avatarPicker li.active img').attr('src');

        // Register user and update profile.
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword)
            .then(function () {
                user = firebase.auth().currentUser;
            })
            .then(function () {
                user.updateProfile({
                    displayName: userName,
                    photoURL: userAvatar
                });
            })
            .then(function () {
                window.location = 'index.html';
            })
            .catch(function (error) {
                alert(error.message);
            });
    });


    // Redirect user to chat if already logged in.
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            //window.location = 'index.html'; // Problem med updateProfile
        }
    });

});
