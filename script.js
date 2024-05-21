//run sound
var runSound = new Audio("run.mp3");
runSound.loop = true

//jump sound

var jumpSound = new Audio("jump.mp3");

//Dead sound

var deadSound = new Audio("dead.mp3");






//key Event


function keyCheck(event) {

    // check Enter key
    if (event.which == 13) {

        if (runWorkerId == 0) {

            runWorkerId = setInterval(run, 100);
            runSound.play();
            moveBackgroundWorkId = setInterval(moveBackground, 100);
            CreateBlockWorkerId = setInterval(CreateBlock, 100);
            moveBlockWorkId = setInterval(movdBlock, 100);
            scoreWorkerId = setInterval(updateScore, 100);
        }


    }


    //check space key
    if (event.which == 32) {

        if (jumpWorkerId == 0) {

            clearInterval(runWorkerId);
            runWorkerId = -1;
            runSound.pause();

            jumpWorkerId = setInterval(jump, 100);
            jumpSound.play();

        }

    }



}


var boyId = document.getElementById("boy");
var runImageNumber = 1;
var runWorkerId = 0;

//Boy run
function run() {

    runImageNumber++;

    if (runImageNumber == 9) {
        runImageNumber = 1;
    }

    boyId.src = " Run (" + runImageNumber + ").png";
}

// Boy Jump
var jumpImageNumber = 1;
var jumpWorkerId = 0;
var boyMarginTop = 420;

function jump() {

    jumpImageNumber++;

    //Jump Fly
    if (jumpImageNumber <= 7) {
        boyMarginTop = boyMarginTop - 30;
        boyId.style.marginTop = boyMarginTop + "px";
    }

    //Jump Landing
    if (jumpImageNumber >= 8) {
        boyMarginTop = boyMarginTop + 30;
        boyId.style.marginTop = boyMarginTop + "px";
    }
    if (jumpImageNumber == 13) {
        jumpImageNumber = 1;

        clearInterval(jumpWorkerId);
        jumpWorkerId = 0;
        runSound.play();



        runWorkerId = setInterval(run, 100);

        if (scoreWorkerId == 0) {
            scoreWorkerId = setInterval(updateScore, 100);
        }

        if (moveBackgroundWorkId == 0) {
            moveBackgroundWorkId = setInterval(moveBackground, 100);
        }
        if (CreateBlockWorkerId == 0) {
            CreateBlockWorkerId = setInterval(CreateBlock, 100);
        }
        if (moveBlockWorkId == 0) {
            moveBlockWorkId = setInterval(movdBlock, 100);
        }

    }

    boyId.src = "jump (" + jumpImageNumber + ").png";

}
//Move Background
var backgroundId = document.getElementById("background");
var backgroundX = 0;
var moveBackgroundWorkId = 0;

function moveBackground() {
    backgroundX = backgroundX - 20;
    backgroundId.style.backgroundPositionX = backgroundX + "px";
}

// Create block
var blockMarginLeft = 500;
var CreateBlockWorkerId = 0;
var blockId = 1;

function CreateBlock() {

    var block = document.createElement("div");
    block.className = "block";
    block.id = "block" + blockId;

    blockId++;

    var gap = Math.random() * (1000 - 400) + 400;

    blockMarginLeft = blockMarginLeft + gap;
    block.style.marginLeft = blockMarginLeft + "px";

    document.getElementById("background").appendChild(block);

}

// Move Block 
var moveBlockWorkId = 0

function movdBlock() {

    for (var i = 1; i <= blockId; i++) {

        var currentBlock = document.getElementById("block" + i);
        var currentBlockMarginLeft = currentBlock.style.marginLeft;
        var newBlockMarginLeft = parseInt(currentBlockMarginLeft) - 20;

        currentBlock.style.marginLeft = newBlockMarginLeft + "px";

        //alert(newBlockMarginLeft);
        //112-12

        if (newBlockMarginLeft < 112 & newBlockMarginLeft > 12) {
            // alert(boyMarginTop);
            //330

            if (boyMarginTop > 330) {

                //alert("YOU DEAD");

                clearInterval(runWorkerId);
                runSound.pause();
                clearInterval(jumpWorkerId);
                jumpWorkerId = -1;
                clearInterval(scoreWorkerId);
                clearInterval(moveBackgroundWorkId);
                clearInterval(CreateBlockWorkerId);
                clearInterval(moveBlockWorkId);



                deadWorkerId = setInterval(dead, 100);
                deadSound.play();
            }


        }





    }



}




// Dead
var deadImageNumber = 1;
var deadWorkerId = 0;

function dead() {

    deadImageNumber++;

    if (deadImageNumber == 11) {
        deadImageNumber = 10;

        boyId.style.marginTop = "400px"
        document.getElementById("endscreen").style.visibility = "visible";
        document.getElementById("endscore").innerHTML = newScore;
    }


    boyId.src = "Dead (" + deadImageNumber + ").png";


}

//score 
var scoreId = document.getElementById("score");
var newScore = 0;
var scoreWorkerId = 0;
function updateScore() {

    newScore++;

    scoreId.innerHTML = newScore;



}

//reload
function reload() {
    location.reload();
}