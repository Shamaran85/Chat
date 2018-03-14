$(document).ready(function() {

    // Get references to DOM elements
    let $avatarPicker = $('ul#avatar-picker li');
    //let $avatarPickerUrl = $('ul#avatar-picker li.active img');
    let $settingsButtonProfile = $('#settingsUpdateProfile-button');
    let $userName = $('#user-name');
    let db = firebase.database();

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
                 // User is signed in.
                 var user = firebase.auth().currentUser;
                  user.updateProfile({
                      displayName: userName,
                      photoURL: userAvatar
                      $userName.val(''); // Empty Username Input Field.
                    } else {
                        alert("The Username can not be emty.")
                    }
                    //  photoURL: userAvatar
                  }).then(function () {
                    location.reload();
                      //window.location.href = "index.html";
                      //console.log(user);
                  });
            }
        });
    });
});
