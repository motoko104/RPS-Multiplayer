
var config = {
    apiKey: "AIzaSyBYEjnM6dL2UshG_0_Tiite2a95jalbLRY",
    authDomain: "rps-multi-2f6a4.firebaseapp.com",
    databaseURL: "https://rps-multi-2f6a4.firebaseio.com/",
    projectId: "rps-multi-2f6a4",
    storageBucket: "rps-multi-2f6a4.appspot.com",
    messagingSenderId: "805188843311"
};

firebase.initializeApp(config);

//Global variables
let database = firebase.database();
let users = firebase.database().ref().child('users');
let currentPlay = firebase.database().ref().child('currentPlay');
let turnRef = firebase.database().ref().child('turns');

let options = ['rock', 'paper', 'scissors'];
let wins1 = 0;
let wins2 = 0;
let losses1 = 0;
let losses2 = 0;
let ties1 = 0;
let ties2 = 0;
let playUsrNm;
let playerOne = 0;
let playerTwo = 0;
let userRef;

//functions
//changing to playing screen once player has created username
const startPZ = () => {
    $(".signIn").css("display", "none");
    $(".playZone").css("display", "inline-block");
    addUser();
    setPlayer();
    opponentThere();
}
//changing sign up to sign in screen
const returnPlay = () => {
    $(".signIn").css("display", "none");
    $(".returningPlay").css("display", "inline-block");
}
//What to do with a returning user signing in
const returnUser = () => {
    let rtnUser = $("#username-inputRet").val().trim();
    let rtnPsw = $("#password-inputRet").val().trim();
    users.once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            $('.errorMsg').empty();
            let childKey = childSnapshot.key;
            let childData = childSnapshot.val();
            if (rtnUser === childData.username) {
                if (rtnPsw === childData.password) {
                    playUsrNm = rtnUser;
                    $(".returningPlay").css("display", "none");
                    $(".playZone").css("display", "inline-block");
                    setPlayer();
                }
            } else {
                $('.errorMsg').append('Username does not exist, please try again or create an account');
            }
        })
    })
}
// Adds user to database
const addUser = () => {
    let username = $('#username-input').val().trim();
    let name = $('#name-input').val().trim();
    let password = $('#password-input').val().trim();
    users.push({
        username: username,
        name: name,
        password: password
    })
}
//checks if there is an opponent to play against
const opponentThere = () => {
    database.on("value", function (snapshot) {
        let turnVal = snapshot.child('turn').val();
        if (turnVal !== null && playerOne === undefined) {
            // to insert what to do if there are more than 2 players waiting to play
        }
    })
}

//sets the players in position to play
const setPlayer = () => {
        if (playerOne === 0) {
            playerOne = 1;
            addPlayer(playerOne);
        } else if (playerOne === 1){
            playerTwo = 1;
            addSecond(playerTwo);
        }else{
            console.log('ERROR!!');
        }
    }

//sets the first player in position
const addPlayer = (player) => {
    let playerName = playUsrNm;
    $('.card-title1').append(playerName);
    userRef = users.child(player);
    userRef.onDisconnect().remove();
    userRef.set({
        'name': playerName,
        'wins': 0,
        'losses': 0,
        'ties': 0
    })
}
//sets the second player in position
const addSecond = (player) => {
    let playerName = playUsrNm;
    $('.card-title2').append(playerName);
    userRef = users.child(player);
    userRef.onDisconnect().remove();
    userRef.set({
        'name': playerName,
        'wins': 0,
        'losses': 0,
        'ties': 0
    })
}

$('#returning').on('click', returnPlay);
$('#submit').on('click', startPZ);
$('#submitRet').on('click', returnUser);