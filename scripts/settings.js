$(document).ready(function() {

    // Get references to DOM elements
  //  let $avatarPicker = $('ul#avatar-picker li');
    //let $avatarPickerUrl = $('ul#avatar-picker li.active img');
    let $settingsButtonProfile = $('#settingsUpdateProfile-button');
    let $userName = $('#user-name');
    let db = firebase.database();


/*
    // Set the chosen Avatar to active class.
    $avatarPicker.click(function () {
        $avatarPicker.removeClass('active');
        $(this).addClass('active');
    });
*/

    // Register new user.
/*    $settingsButton.click(function () {

        // Store Signup Details
        let userName = $userName.val();
        let userEmail = $userEmail.val();
        let userPassword = $userPassword.val();
      //  let userAvatar = $('ul#avatar-picker li.active img').attr('src');
*/


    $settingsButtonProfile.click(function () {
        let userName = $userName.val();

        // Update Profile.
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                 // User is signed in.
                 var user = firebase.auth().currentUser;
                  user.updateProfile({
                      displayName: userName
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
