//Global variables
let wins = 0;
let losses = 0;
let ties = 0;
let playerOne;
let playerTwo;
let computer;

//functions
const startPZ = () =>{
    $(".signIn").css("display", "none");
    $(".playZone").css("display", "inline-block");
}
const returnPlay = () =>{
    $(".signIn").css("display","none");
    console.log("sign in");
    $(".returningPlay").css("display","inline-block");
    console.log("returning");
}

$('#returning').on('click', returnPlay);
$('#submit').on('click', startPZ);