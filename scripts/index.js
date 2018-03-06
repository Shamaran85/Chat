$(document).ready(function() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {

            //var user = firebase.auth().currentUser;
            let name, email, photoUrl, uid;

            if (user != null) {
                name = user.displayName;
                email = user.email;
                photoUrl = user.photoURL;
                uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                                 // this value to authenticate with your backend server, if
                                 // you have one. Use User.getToken() instead.

                $('#user-info').append('<img src="' + photoUrl + '"> <p> Name: ' + name + '</p>' + '<p> Email: ' + email + '</p>' + '<p> Photo: ' + photoUrl + '</p>' + '<p> UID: ' + uid + '</p>');
            }

        } else {
            // No user is signed in.
            window.location = 'login.html';
        }
    });


// Logout Button
    $('#logoutButton').click(function () {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            window.location = 'login.html';
        }).catch(function (error) {
            // An error happened.
            alert('There was a problem signing you out. Try again.' + error);
        });
    });
});