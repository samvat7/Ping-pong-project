import Ball from "./Ball.js";

import Paddle from "./Paddle.js";

var playerScore = document.getElementById("player-score");

var highScore = document.getElementById("high-score");

var ball = new Ball(document.getElementById("ball"));

const playerPaddleLeft = new Paddle(document.getElementById("player-paddle-left"));

const playerPaddleRight = new Paddle(document.getElementById("player-paddle-right"));

var num = 0;

if(localStorage.getItem('highscore') == null){

  localStorage.setItem('higscore', '0');
}

var highscore = localStorage.getItem('highscore');

highScore.innerText = highscore;

let lastTime

function update(time){

  if(lastTime != null){

    var delta = time - lastTime;

    ball.update(delta, [playerPaddleLeft.rect(), playerPaddleRight.rect()]);

    var hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hue")
    );

    document.documentElement.style.setProperty("--hue", hue + 0.01 * delta);


    if(isLose()){

      handleLose();
    }
  }

  lastTime = time

  window.requestAnimationFrame(update);
}

function isLose(){

  const rect = ball.rect();

  return rect.left <= 0 || rect.right >= window.innerWidth;
}

function handleLose(){

  ball.reset();

  let score = playerScore.innerText;
          
  highscore = localStorage.getItem('highscore');

  if (score > highscore) {
          
    localStorage.setItem('highscore', score);
          
  }

  highScore.innerText = Math.max(highscore, score);

  playerScore.innerText = 0;
}

document.addEventListener("mousemove", e=>{

  playerPaddleLeft.position = (e.y / window.innerHeight)*100;

  playerPaddleRight.position = (e.y / window.innerHeight)*100;


})

window.requestAnimationFrame(update);