const moles = document.querySelectorAll(".mole");
const dirt = document.querySelectorAll(".dirt");
const scoreDisplay = document.querySelector(".score");
const startButton = document.querySelector("button");
const hammer = document.querySelector(".hammer");
const gameBoard = document.querySelector(".game");
const body = document.querySelector("body");
const countdown = document.querySelector(".countdown");
let score;
let gameTime;
let lastMole;
let interval;
let startLock = false;

function generateRandomHole(){
    let randomNum = Math.floor(Math.random() * moles.length);
    let randomMole = moles[randomNum];
    //if same hole gets generated twice in a row, re-calls function so same hole can't happen twice in a row
    if (randomMole === lastMole){
        return generateRandomHole();
    }
    lastMole = randomMole;
    return randomMole;
}

function generateRandomTime(max, min){
    //will generate a random amount of time between max and min
    randomTime = Math.random() * (max - min) + min;
    return randomTime;
}

function runGame(){
    //if startLock is true, do not run any other part of the function
    if (startLock === true) return;
    //sets everything back to defaults each time the function runs. 
    reset();
    interval = setInterval(function(){
        //once the interval starts running, it will set startLock to true so clicking on the start button won't re-call function
        startLock = true;
        gameTime--;
        countdown.textContent = `0${gameTime}`;
        let currentMole = generateRandomHole();
        currentMole.classList.add("up");
        setTimeout(function(){
            currentMole.classList.remove("up");
        }, generateRandomTime(1000, 350));
        if (gameTime === 0){
            clearInterval(interval);
            startButton.textContent = "PLAY AGAIN?"
            startLock = false;
        }
    }, 1000)
}

function reset(){
    startButton.textContent = "START!";
    gameTime = 10;
    score = 0;
    scoreDisplay.textContent = score;
}

startButton.addEventListener("click",runGame);

moles.forEach(function(mole){
    mole.addEventListener("mousedown", function(){
        score++;
        scoreDisplay.textContent = score;
    });
});

gameBoard.addEventListener("mousedown", function(){
    gameBoard.classList.remove("unclicked");
    gameBoard.classList.add("clicked");
});

gameBoard.addEventListener("mouseup", function(){
    gameBoard.classList.remove("clicked");
    gameBoard.classList.add("unclicked");
});
