// see
const selectBox = document.querySelector(".start-game"),
selectX = selectBox.querySelector(".playerX"),
selectO = selectBox.querySelector(".playerO"),
gamePlay = document.querySelector(".game-play"),
playArea= document.querySelectorAll("section span"),
players = document.querySelector('.players'),
scoreBoard = document.querySelector('.result'),
wonText = scoreBoard.querySelector('.winner'),
replayBtn = scoreBoard.querySelector(".btn");



window.onload = () => {
    for (let i = 0; i < playArea.length; i++) {
        playArea[i].setAttribute("onclick", "clickedBox(this)");

    }

    selectX.onclick = () => {
        selectBox.classList.add('hide');
        gamePlay.classList.add('show')
    }
    selectO.onclick = () => {
        selectBox.classList.add('hide');
        gamePlay.classList.add('show')
        players.setAttribute('class', 'players active player');
    }
}
let playerXIcon = "fa fa-times";
let playerOcon = "fa fa-circle";
let playerSign = "X";      //supposing the player(X) will be USER 
let runBot = true;


//user click function
function clickedBox(element) {
    // adding circle/cross to game board
    if(players.classList.contains("player")){

        element.innerHTML = `<i>O</i>`;         //adding circle inside selected box.
        players.classList.add("active")
        playerSign = "O"; //since the player is 0, we attach the id of 'o' to it
        element.setAttribute("id", playerSign) 
        
     }
    else {
        element.innerHTML = `<i>X</i>`;         //adding circle inside selected box.
        players.classList.add("active")
        element.setAttribute("id", playerSign) 
    }

    selectWinner();
    gamePlay.style.pointerEvents = "none";
    element.style.pointerEvents = "none";       //once user selects , it cannot be selected again.
    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed();
    setTimeout(() => {
        bot(runBot)
    }, randomDelayTime);
    
} 

// bot click function
function bot(runBot) {
    if(runBot) {

        //changing the player sign so if user has X value in id then b0t will have O
    playerSign = "O";

    let array = [];  //creating empty array to store unselected boxes.
    for (let i = 0; i < playArea.length; i++) {
        if(playArea[i].childElementCount == 0){ 
            array.push(i)
            // console.log(i + " " + "has no children"); 
        }
    }
    let index = Math.floor(Math.random() * array.length);
    // console.log(index);
    let randomBox = array[index] //getting random index/box from array so bot will select
    console.log(randomBox);
    if (array.length > 0) {
        if (players.classList.contains("player")) // if the player element contain .player
            {
                playArea[randomBox].innerHTML = `<i>X</i>`;
                players.classList.remove("active");
                playerSign = "X"; //if user is 0, then the b0x id value is X.
                playArea[randomBox].setAttribute("id", playerSign);

            }
        else
            {
                playArea[randomBox].innerHTML = `<i>O</i>`;
                players.classList.remove("active");
                playArea[randomBox].setAttribute("id", playerSign);

            }
        selectWinner();
        }


        playArea[randomBox].style.pointerEvents = "none"
        gamePlay.style.pointerEvents = "auto"     //when bot selects a box,  a user can't select or click it anymore.
        playerSign = "X";
    }    
}


// Selecting Winner.

function getId(idname) {
    return document.querySelector(".box" + idname).id  //returning the id of the element [X / user y]

}

//Checking if three same id's occur consecutively either horizontally, vertically or across the diagonal.
function checkThreeIdnames(val1, val2, val3, sign) {
    if(getId(val1) == sign && getId(val2) == sign && getId(val3) == sign) {
        return true;
    }
}

function selectWinner() {
    if(checkThreeIdnames(1,2,3, playerSign) || checkThreeIdnames(4,5,6, playerSign) || checkThreeIdnames(7,8,9, playerSign) || checkThreeIdnames(1,5,9, playerSign) || checkThreeIdnames(3,5,7, playerSign) || checkThreeIdnames(1,4,7, playerSign) || checkThreeIdnames(2,5,8, playerSign) || checkThreeIdnames(3,6,9, playerSign)){
    console.log(playerSign + " " + "is the winner.");
    runBot = false; //stops play when there is a winner
        setTimeout(() => {
            gamePlay.classList.remove("show");
            scoreBoard.classList.add("show")
            
        }, 700);
    
        //once there is a winner, the result box is to be displayed.
        wonText.innerHTML = `Player <p>${playerSign}</p> won the game`;
    } else { //when there is a draw or deuce.
        if (getId(1) != "" && getId(2) != "" && getId(3) != "" && getId(4) != "" && getId(5) != "" && getId(6) != "" && getId(7) != "" && getId(8) != "" && getId(9) != "" ) {
            runBot = false; //stops play when there is a winner
            setTimeout(() => {
                gamePlay.classList.remove("show");
                scoreBoard.classList.add("show")
            }, 700);
            wonText.textContent = `Match has been drawn!`
        }
        
    }
};

replayBtn.onclick = () => {
    window.location.reload();
}


