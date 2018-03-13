$(document).ready(function() {

    // Set Global Variables.
    let database = firebase.database();
    let auth = firebase.auth();
    let currentTime = new Date().toLocaleTimeString();
    let currentDate = new Date().toLocaleDateString();
    let currentTimestamp = currentTime +  " - " + currentDate;

    // Get references to DOM elements
    let $chatMsg = $("#chatMsg");
    let $sendMsgButton = $("#sendMsgButton");
    let $generalChat = $("#generalChat");
    let $socialChat = $("#socialChat");
    let $workChat = $("#workChat");
    let $mainAvatar = $('#main-avatar');
    let $mainUserName = $('#main-username');
    let $chatRooms = $('ul#chatRooms li');
    let $chatroomContent = $('.chatRoom-content');
    let $logoutButton = $('#logout-button');
    let $chatContainer = $('#chat-container');



    // Check if user is signed in or not and show correct div.
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            $chatContainer.show();
            showUserInfo();
            database.ref('loggedin/').child(user.uid).set({name: user.displayName, uid: user.uid});
            database.ref('loggedin/').child(user.uid).onDisconnect().remove();

        } else {
            // User is NOT signed in.
            $chatContainer.hide();
            window.location.href = "login.html";
        }
    });

    // Logout user.
    $logoutButton.click(function () {
        let user = auth.currentUser;
        database.ref('loggedin/').child(user.uid).remove();
        firebase.auth().signOut().then(function () {
            window.location = 'login.html';
        }).catch(function (error) {
            alert(error.message);
        });
    });


    // Toggle Channels & Sendbox
    $chatRooms.click(function () {

        // Get ID from clicked tab.
        let tab_id = $(this).attr('data-tab');

        // Remove 'current' class from all chat rooms.
        $chatRooms.removeClass('current');
        $chatroomContent.removeClass('current');

        // Add 'current' class to clicked chat room.
        $(this).addClass('current');
        $("#" + tab_id).addClass('current');

        // Change the Send message class for writing to database.
        $sendMsgButton.removeClass();
        $sendMsgButton.addClass(tab_id);

        // Scroll to bottom of Chat.
        scrollToBottom();
    });


    // Write to the active chatrooms database.
    function sendMsg() {
        let user = auth.currentUser;
        let activeChatroom = $sendMsgButton.attr('class');
        let chatLog = database.ref("chatroom/" + activeChatroom);
        let msgText = $chatMsg.val();

        if (msgText !== "") {
            chatLog.push({
                name: user.displayName,
                email: user.email,
                uid: user.uid,
                message: msgText,
                timestamp: currentTimestamp,
                photo: user.photoURL

            });
            scrollToBottom();
            $chatMsg.val(''); // Empty Message Input Field.
        } else {
            alert("Can't send empty message.")
        }
    }

    // Click Send button to write chat message.
    $sendMsgButton.click(function () {
        sendMsg();
    });


    // Press Enter to write chat message.
    $chatMsg.keypress(function( event ) {
        if (event.which == 13) {
            sendMsg();
        }
    });





    // Read Chat to correct Room.
    const generalDB = database.ref().child("chatroom/generalChat");
    const socialDB = database.ref().child("chatroom/socialChat");
    const workDB = database.ref().child("chatroom/workChat");


    generalDB.on('child_added', function(data) {
        $generalChat.append('<div class="chatMsgContainer">' +
            '<div class="userImage"><img class="userImage" src="' + data.val().photo + '"></div>' +
            '<span class="userName">' + data.val().name + '</span>' +
            '<span class="timeStamp">' + data.val().timestamp + '</span>' +
            '<p class="chatMessage">' + data.val().message + '</p>' +
            '</div>');
        scrollToBottom();
    });

    socialDB.on('child_added', function(data) {
        $socialChat.append('<div class="chatMsgContainer">' +
            '<div class="userImage"><img class="userImage" src="' + data.val().photo + '"></div>' +
            '<span class="userName">' + data.val().name + '</span>' +
            '<span class="timeStamp">' + data.val().timestamp + '</span>' +
            '<p class="chatMessage">' + data.val().message + '</p>' +
            '</div>');
        scrollToBottom();
    });

    workDB.on('child_added', function(data) {
        $workChat.append('<div class="chatMsgContainer">' +
            '<div class="userImage"><img class="userImage" src="' + data.val().photo + '"></div>' +
            '<span class="userName">' + data.val().name + '</span>' +
            '<span class="timeStamp">' + data.val().timestamp + '</span>' +
            '<p class="chatMessage">' + data.val().message + '</p>' +
            '</div>');
        scrollToBottom();
    });


    // Scroll to bottom of page.
    function scrollToBottom() {
        $('.chatRoom-content.current').scrollTop($('.chatRoom-content.current')[0].scrollHeight);
    }

    // Display User Photo and Name Top Left.
    function showUserInfo() {
        let user = auth.currentUser;
        $mainAvatar.html('<img src="' + user.photoURL + '"></div>');
        $mainUserName.html(user.displayName);
    }

    // Users Online
    const onlineUsers = database.ref().child("loggedin/");
    onlineUsers.on('child_added', function(data) {
        let user = auth.currentUser;
        if (data.val().uid === user.uid) {
        $('ul#usersStatus').append('<li class="userNameSelf ' + data.val().uid + '">' + data.val().name + '</li>');
        } else {
            $('ul#usersStatus').append('<li class="' + data.val().uid + '">' + data.val().name + '</li>');
        }
    });

    onlineUsers.on('child_removed', function(data) {
        $("." + data.val().uid).remove();
    });



});