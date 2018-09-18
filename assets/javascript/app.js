
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
let One = firebase.database().ref().child('1');
let Two = firebase.database().ref().child('2');
let currentPlay = firebase.database().ref().child('currentPlay');
let turnRef = firebase.database().ref().child('turns');

let options = ['rock', 'paper', 'scissors'];
let wins = 0;
let losses = 0;
let ties = 0;
let playOneWins, playOneLosses, playOneTies;
let playTwoWins, playTwoLosses, playTwoTies;
let playUsrNm = '';
let playerOne = 0;
let playerTwo = 0;
let playerOneChoice = '';
let playerTwoChoice = '';
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
            let childData = childSnapshot.val();
            if (rtnUser === childData.username) {
                if (rtnPsw === childData.password) {
                    playUsrNm = rtnUser;
                    wins = childData.wins;
                    losses = childData.losses;
                    ties = childData.ties;
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
    playUsrNm = username;
    users.push({
        username: username,
        name: name,
        password: password,
        wins: wins,
        losses: losses,
        ties: ties
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
//fix this to register whether there is another player to play against to determine where info is displayed
const setPlayer = () => {
    database.on('value').then(function (snapshot) {
        if (snapshot.childExists("1")) {
            playerTwo = 2;
            addPlayer(playerTwo);
        } else {
            playerOne = 1;
            addPlayer(playerOne);
        }
    })
}

//sets the first player in position
const addPlayer = (player) => {
    let playerName = playUsrNm;
    $('.card-title1').append(playerName);
    playOneWins = wins;
    playOneLosses = losses;
    playOneTies = ties;
    userRef = users.child(player);
    userRef.onDisconnect().remove();
    userRef.set({
        'name': playerName,
        'wins': playOneWins,
        'losses': playOneLosses,
        'ties': playOneTies
    })
}
//sets the second player in position
const addSecond = (player) => {
    let playerName = playUsrNm;
    $('.card-title2').append(playerName);
    playTwoWins = wins;
    playTwoLosses = losses;
    playTwoTies = ties;
    userRef = users.child(player);
    userRef.onDisconnect().remove();
    userRef.set({
        'name': playerName,
        'wins': playTwoWins,
        'losses': playTwoLosses,
        'ties': playTwoTies
    })
}
const setChoice = (choice) => {
    $('.rock').css('display', 'none');
    $('.paper').css('display', 'none');
    $('.scissors').css('display', 'none');
    userRef.push({
        'choice': choice
    })
    checkChoice();
}

const checkChoice = () => {
    One.once('value', function (snapshot) {
        let childData = snapshot.val();
        playerOneChoice = childData.choice;
    })
    Two.once('value', function (snapshot) {
        let childData = snapshot.val();
        playerTwoChoice = childData.choice;
    })
    if (playerOneChoice === playerTwoChoice) {
        playOneTies++;
        one.ref('ties').set(playOneTies);
        playTwoTies++;
        two.ref('ties').set(playTwoTies);
        resetChoice();
    } else if (playerOneChoice === 'rock' && playerTwoChoice === 'paper'){
        playOneLosses++;
        one.ref('losses').set(playOneLosses);
        playTwoWins++;
        two.ref('wins').set(playTwoWins);
        resetChoice();
    } else if(playerOneChoice === 'rock' && playerTwoChoice === 'scissors'){
        playOneWins++;
        one.ref('wins').set(playOneWins);
        playTwoLosses++;
        two.ref('losses').set(playTwoLosses);
        resetChoice();
    }else if(playerOneChoice === 'paper' && playerTwoChoice === 'rock'){
        playOneWins++;
        one.ref('wins').set(playOneWins);
        playTwoLosses++;
        two.ref('losses').set(playTwoLosses);
        resetChoice();
    }else if(playerOneChoice === 'paper' && playerTwoChoice === 'scissors'){
        playOneLosses++;
        one.ref('losses').set(playOneLosses);
        playTwoWins++;
        two.ref('wins').set(playTwoWins);
        resetChoice();
    }else if(playerOneChoice === 'scissors' && playerTwoChoice === 'rock'){
        playOneLosses++;
        one.ref('losses').set(playOneLosses);
        playTwoWins++;
        two.ref('wins').set(playTwoWins);
        resetChoice();
    }else if(playerOneChoice === 'scissors' && playerTwoChoice === 'paper'){
        playOneWins++;
        one.ref('wins').set(playOneWins);
        playTwoLosses++;
        two.ref('losses').set(playTwoLosses);
        resetChoice();
    }
    }

const resetChoice = () => {
    $('.rock').css('display', 'inline-block');
    $('.paper').css('display', 'inline-block');
    $('.scissors').css('display', 'inline-block');
    playerOneChoice = '';
    playerTwoChoice = '';
}

$('#returning').on('click', returnPlay);
$('#submit').on('click', startPZ);
$('#submitRet').on('click', returnUser);
$('.rock').on('click', 'rock', setChoice);
$('.paper').on('click', 'paper', setChoice);
$('.scissors').on('click', 'scissors', setChoice);

userRef.onDisconnect().remove();