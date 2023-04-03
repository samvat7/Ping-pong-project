const INITIAL_VELOCITY = 0.025;
const VELOCITY_INCREASE = 0.00001;

var playerScore = document.getElementById("player-score");

var highScore = document.getElementById("high-score");


export default class Ball{

    constructor(ballElem) {
        this.ballElem = ballElem
        this.reset()
      }
    
      get x() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"))
      }
    
      set x(value) {
        this.ballElem.style.setProperty("--x", value)
      }
    
      get y() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"))
      }
    
      set y(value) {
        this.ballElem.style.setProperty("--y", value)
      }
    
      rect() {
        return this.ballElem.getBoundingClientRect()
      }
    
      reset() {
        this.x = 50
        this.y = 50
        this.direction = { x: 0 }
        while (Math.abs(this.direction.x) <= 0.2 || Math.abs(this.direction.x) >= 0.9
        ) {
          const heading = randomNumberBetween(0, 2 * Math.PI)
          this.direction = { x: Math.cos(heading), y: Math.sin(heading) }
        }
        this.velocity = INITIAL_VELOCITY
      }
    
      update(delta, paddleRects) {
        
        this.x += this.direction.x * this.velocity * delta;

        this.y += this.direction.y * this.velocity * delta;  

        this.velocity += VELOCITY_INCREASE * delta;
        
        const rect = this.rect();

        if(rect.bottom >= window.innerHeight || rect.top <= 0){

          this.direction.y *= -1;
        }

        if(paddleRects.some(r => isCollision(r, rect))){

          playerScore.innerText++;
        
          this.direction.x *= -1;
        }
      }
    }
    
    function randomNumberBetween(min, max) {
      return Math.random() * (max - min) + min
    }

    function isCollision(r, rect){

      return (rect.left <= r.right && rect.right >= r.left && rect.top <= r.bottom && rect.bottom >= r.top);
    }
