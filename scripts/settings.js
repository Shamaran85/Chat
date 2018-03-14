$(document).ready(function() {


    // Get references to DOM elements
    let $avatarPicker = $('ul#avatar-picker li');
    let $settingsButtonProfile = $('#settingsUpdateProfile-button');
    let $userName = $('#user-name');


    // Set the chosen Avatar to active class.
    $avatarPicker.click(function () {
        $avatarPicker.removeClass('active');
        $(this).addClass('active');
    });


    $settingsButtonProfile.click(function () {
        let userName = $userName.val();
        let userAvatar = $('ul#avatar-picker li.active img').attr('src');

        // Update Profile.
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                if (userName !== "") {
                 // User is signed in.
                 let user = firebase.auth().currentUser;
                  user.updateProfile({
                      displayName: userName,
                      photoURL: userAvatar
                  }).then(function () {
                    window.location.href = "index.html";
                  })
                } else {
                    user.updateProfile({
                        photoURL: userAvatar
                    }).then(function () {
                        window.location.href = "index.html";
                    });
                }
            }
        });
    });
});
