// **************************** CLASSES **************************

// ~~~~~~~~~~~~~~~~~~~~ DEFAULT CHARACTER ATTRIBUTES! ~~~~~~~~~~~~~~~~~~~~~
class Characters { // Characters refers to all entities such as bugs, player and boat.    
    constructor(x, y, width, height) {
        this.sprite = "images/";
        this.x = 2 * 101;
        this.y = 5 * 80;
    }
    // ~~~~ This function draws out the images on the canvas ~~~~
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    update(dt) {
        this.outOfBoundsX = this.x > 5 * 104;// Sets X boundary
        this.negativeX = this.x <= -94//- 70;// Sets the start point for the bugs going opposite direciton.
        this.outOfBoundsY = this.y < 0 * 83;// Sets Y boundary
    }
}

// ~~~~~~~~~~~~~~~~~~~ CODE FOR PLAYER CHARACTER! ~~~~~~~~~~~~~~~~~~
class Player extends Characters {
    constructor() {
        super();
        this.height = 77;
        this.width = 69;
        this.sprite += "char-boy.png";
    }

update(dt) {
    super.update();
// ~~~~ This function awards points when a water block is reached. ~~~~
    if (this.outOfBoundsY) {
        setTimeout(function() { //setTimeOut Allows the boat to
            scoreCount();       //be registered when a player 
            playerReset();      //lands on it.
        }, 1);  

    console.log("+50 points!")
    }
// ~~~~ If all lives are lost, Losing Modal opens ~~~~
    if (lifeCounter <= 0) {
        stopTimer();
        loseGame();
    }
// ~~~~ If timer reaches "00:00", Victory Modal opens ~~~~
    if (min.innerText === "00" && sec.innerText === "00") {
        stopTimer();
        winGame();
    }

}

render() {
    super.render(); // Draws out player character
}
// ~~~~ Function that handles the key inputs ~~~~
handleInput(input){
//If the character is NOT the default character or if any
//modal is NOT open, the character can move
    if (this.sprite != char2 && 
        !modal.classList.contains("modal-open") &&
        !winModal.classList.contains("modal-open") &&
        !losingModal.classList.contains("modal-open")) {
        switch (input) {
            case 'left':
                this.x = this.x > 0 ? this.x - 1 * 101 : this.x;
                break;

            case 'up':
                this.y = this.y > 0 ? this.y - 1 * 83 : this.y;
                break;

            case 'right':
                this.x = this.x < 4 * 101 ? this.x + 1 * 101 : this.x;
                break;

            case 'down':
                this.y = this.y < 4 * 83 ? this.y + 1 * 83 : this.y;
                break;  

            default:
                break;
        }
    }   
        // Disables keys from moving character if any above
        //conditions are met
        else {
            switch (input) {
            case 'left', 'up', 'right', 'down':
                undefined;
                break;
            default:
            break;
            }
        }
    }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~ CODE FOR BUGS! ~~~~~~~~~~~~~~~~~~~~~~~~~~
class Enemy extends Characters {
    constructor(x, y) {
        super();
        this.sprite += "enemy-bug.png";
        this.height = 67;
        this.width = 99;
        this.x = -1 * 101;
        this.y = y * 84;
        //Randomizes the speed of the bugs by pulling a random number
        //from the speedArray under the Global Variables.
        this.dx = speedArray[Math.floor(Math.random() * speedArray.length)];
    }

    update(dt) { //Allows anmation for bugs
        super.update();
        //Array for bugs moving towards the right
        const positiveBugs = ["images/enemy-bug.png", "images/enemy-bug-yellow.png", "images/enemy-bug-green.png"];
        //Array for bugs moving towards the left
        const negativeBugs = ["images/enemy-bug2.png", "images/enemy-bug2-purple.png", "images/enemy-bug2-blue.png"];

        if (this.outOfBoundsX) {
            this.x = -95;//-69;
            //Sets the bugs to go the the right
            this.dx = speedArray[Math.floor(Math.random() * speedArray.length)]
            //Randomizes which bug appears from the bugs array
            //going to the right
            this.sprite = positiveBugs[Math.floor(Math.random() * positiveBugs.length)];
        }

        if (this.negativeX) {
            this.x = 5 * 105;
            //Sets the bug to go to the left
            this.dx = -speedArray[Math.floor(Math.random() * speedArray.length)];
            //Randomizes which bug appears from the bugs array
            //going to the left
            this.sprite = negativeBugs[Math.floor(Math.random() * negativeBugs.length)];;
        }
        // This if statement randomized the direction the bugs wiil go
        if (this.outOfBoundsX || this.negativeX) {
            const randomPath = [possitivePath, negativePath];

            this.x += randomPath[Math.floor(Math.random() * randomPath.length)];
        }
        
        this.x += this.dx; // Gives bugs their moving aniamtions!

        if (getDistance(this.x, this.y, player.x, player.y) < this.width / 2.25 + player.width / 2.25 && this.height / 2 + player.height / 2) {
            player.sprite = char2;

            setTimeout (function() { //Delays the playerReset function
                lifeLost();          //so the character with wincing
                playerReset();       //face has a chance to be shown
            }, 900);                 //and gives the player some time to
                                     //realize that a collision has occured
        }
    }

        render() { //Function that draws bugs.
            super.render();
    }

}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~ CODE FOR BOAT! ~~~~~~~~~~~~~~~~~~~~~~~~~~
class Boat extends Characters {
    constructor() {
        super();
        this.dx = 1; // Sets the speed of the boat
        this.sprite += "Boat.png";
        this.x = 0 * 101;
        this.y = 0 * 60;
        this.height = 55;
        this.width = 99;
    }

    render() { //Draws out the boat
        super.render();
    }

    update(dt) { //Allows boat Animations
        super.update();
        //If the boat reached either boundaries on the X axis, it
        //it starts to go to the other direction
        if (this.x > 4 * 101 || this.x < 0) {
            this.dx = -this.dx;
        }
        this.x += this.dx; //gives the boat its movement
        //If player collides with boat, 250 points is awarded.
        if(getDistance(this.x, this.y, player.x, player.y) < this.width / 2.5 + player.width / 2.5 && this.height / 3 + player.height / 3) {
            console.log("Boat Ride! + 250 points!");
            scoreCounter += 200;
            playerReset();
        }
    }
}