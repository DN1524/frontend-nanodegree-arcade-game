// ~~~~~~~~~~~~~~~~~~~~~~~~ GLOBAL VARIABLES! ~~~~~~~~~~~~~~~~~~~~
const score = document.querySelector("span");
const startButton = document.querySelector(".start-button");
const newGame = document.querySelector(".new-game");
const newGame2 = document.querySelector(".new-game2");
const modal = document.querySelector(".modal");
const winModal = document.querySelector(".modal-win");
const losingModal = document.querySelector(".modal-loss");
const scoreMessage = document.createElement("p");
const heartImg = '<img class = "heart" src="images/Heart2.png">';
const lives = $(".lives");

const speedArray = [2, 4, 3, 5, 6, 8,]//[4, 5, 6, 8, 10, 12];

const possitivePath = this.dx = speedArray[Math.floor(Math.random() * speedArray.length)];
const negativePath = this.dx = -speedArray[Math.floor(Math.random() * speedArray.length)];

const char1 = 'images/char-boy.png';
const char2 = 'images/char-boy-hit.png';

let scoreCounter = 0;
let lifeCounter = 3;

// ~~~~~~~~~~~~~~~~~~~~~~~ GLOBAL FUNCTIONS! ~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~ Function that calculates the distance between two objects ~~~~
function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
}
let executed = false;

//This Function calls LifeLost once while executed is = false.
const lifeLost = (function() {
    return function() {
        if (!executed) {
            executed = true;
            document.querySelector(".heart").remove();
            lifeCounter -= 1;
            console.log("You lost a life!");
        }
    };
})();

//~~~~ Score counter function ~~~~
function scoreCount() {
    scoreCounter += 50;
    score.innerHTML = scoreCounter;
}

//~~~~ Sets the player to default position with default character model.
function playerReset() {
    player.sprite = 'images/char-boy.png'
    player.x = 2 * 101;
    player.y = 5 * 80;
    setTimeout (function() { //Prevents the lifeLost function
        executed = false;    //to be called multiple times
    }, 1000);                //which causes a game over after only
                             //one collision.
}
// ~~~~ Function that opens up Victory Modal ~~~~
function winGame() {
    winModal.classList.add("modal-open");
    playerReset();
    scoreMessage.innerText = "Your final score was : " + score.innerText;
    document.querySelector(".winning-message").append(scoreMessage);
}
// ~~~~ Function that opens up Losing Modal ~~~~
function loseGame() {
    losingModal.classList.add("modal-open");
    playerReset();
    scoreMessage.innerText = "Your final score was : " + score.innerText;
    document.querySelector(".losing-message").append(scoreMessage);
}
//~~~~ function that resets lives counter and images. ~~~~
function resetLives() {
    if (lifeCounter === 3) {
        document.querySelector(".heart").remove();
        document.querySelector(".heart").remove();
        document.querySelector(".heart").remove();
        lives.append(heartImg);
        lives.append(heartImg);
        lives.append(heartImg);
    }

     else if (lifeCounter === 2) {
        document.querySelector(".heart").remove();
        document.querySelector(".heart").remove();
        lives.append(heartImg);
        lives.append(heartImg);
        lives.append(heartImg);
    }

    else if (lifeCounter === 1) {
        document.querySelector(".heart").remove();
        lives.append(heartImg);
        lives.append(heartImg);
        lives.append(heartImg);
    }

    else if (lifeCounter === 0) {
        lives.append(heartImg);
        lives.append(heartImg);
        lives.append(heartImg);
    }
}
// ~~~~ Reset Function ~~~~
function gameReset() {
    scoreCounter = 0;
    score.innerHTML = "0";
    totalSec = 60;
    min.innerHTML = "01";
    sec.innerHTML = "00";
    resetLives();
    lifeCounter = 3;
    stopTimer();
    startTimer();
    
    // for (i = 0; i < 3; i++) {

    // }
}
// ~~~~ Function for the "Start" button for the OPENING modal ~~~~
startButton.addEventListener("click", function() {
    modal.classList.remove("modal-open");
    startTimer();
});
// ~~~~ Function for the "NewGame" button for the LOSING modal ~~~~
newGame.addEventListener("click", function() {
    losingModal.classList.remove("modal-open");
    gameReset();
});
// ~~~~ Function for the "NewGame" button for the WINNING modal ~~~~
newGame2.addEventListener("click", function() {
    winModal.classList.remove("modal-open");
    gameReset();
});


const player = new Player();
const boat = new Boat();

const allEnemies = [...Array(4)].map((_,i)=> new Enemy(0,i + 0.7));

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    
    player.handleInput(allowedKeys[e.keyCode]);
});



// ~~~~ Function for Development testing only ~~~~
//This function stops all bugs and is not called within the game at
//all. It is used for testing collision and behaviors of characters.
//To call this function, use the web browser's Dev Tools.
function freezeBugs() {
    allEnemies[0].dx = 0;
    allEnemies[1].dx = 0;
    allEnemies[2].dx = 0;
    allEnemies[3].dx = 0;
}
