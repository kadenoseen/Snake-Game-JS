// Set up the arrow key handler

let done = false
let timer
// Check if there is a high score stored in local storage
let highScore = localStorage.getItem('highScore') || 0;
let interval = 1000 /10

// Set up the canvas and grab the 2D context
const canvas = document.getElementById('snake-game');
//canvas.width = window.innerWidth-17;
//canvas.height = window.innerHeight-17;
const ctx = canvas.getContext('2d');

// Get the document body
var body = document.body;

// Set the overflow property to "hidden" to disable the scrollbars
body.style.overflow = "hidden";

// Set the initial position of the snake
let snake = [{ x: 150, y: 150 }, { x: 140, y: 150 }, { x: 130, y: 150 }, { x: 120, y: 150 }, { x: 110, y: 150 }];

// Set the initial direction of the snake
let dx = 30;
let dy = 0;

// Set the initial position of the food
let foodX = Math.round(Math.random() * (canvas.width - 30) / 30) * 30;
let foodY = Math.round(Math.random() * (canvas.height - 30) / 30) * 30;
      

// Set the initial score
let score = 0;

// Set the initial game state
let gameState = 'playing';

const handleKeyDown = function(e) {
  
  if (e.keyCode === 37 && dx === 0) {
    dx = -30;
    dy = 0;
  } else if (e.keyCode === 38 && dy === 0) {
    dx = 0;
    dy = -30;
  } else if (e.keyCode === 39 && dx === 0) {
    dx = 30;
    dy = 0;
  } else if (e.keyCode === 40 && dy === 0) {
    dx = 0;
    dy = 30;
  }
  // Check if the "w" key was pressed
  else if (e.keyCode === 87) {
    // Set the snake's direction to up
    dx = 0;
    dy = -30;
  }
  // Check if the "s" key was pressed
  else if (e.keyCode === 83) {
    // Set the snake's direction to down
    dx = 0;
    dy = 30;
  }
  // Check if the "a" key was pressed
  else if (e.keyCode === 65) {
    // Set the snake's direction to left
    dx = -30;
    dy = 0;
  }
  // Check if the "d" key was pressed
  else if (e.keyCode === 68) {
    // Set the snake's direction to right
    dx = 30;
    dy = 0;
  }
  else if (e.key === 'f' ){
    clearInterval(timer);
    console.log(interval)
    if(interval >= 500 / 10){
      interval -= 250 / 10
    }else if(interval >= 50 / 10){
      interval -= 100 / 10
    }else if(interval >= 20 / 10){
      interval -= 10 / 10
    }else {
      interval -= 1 / 10
    }
    timer = setInterval(gameLoop, interval)
  }
  else if (e.key === 'g' ) {
    clearInterval(timer);
    // Increase the interval by different amounts depending on its current value
    
    if (interval >= (500 / 10)) {
      interval += (250 / 10); 
    } else if (interval >= (250 / 10)) {
      interval += (100 / 10);
    } else if (interval >= (20 / 10)) {
      interval += (10 / 10);
    } else {
      interval += (1 / 10);
    }
    // Set the new interval for the game loop
    timer = setInterval(gameLoop, interval);
  }
  else if(gameState === 'game-over'){
    resetGame()
  }

};


// Set up the game loop
const gameLoop = function() {
  

  // Clear the canvas
  ctx.fillStyle = '#232323';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // If the game state is "playing", update the game
  if (gameState === 'playing') {
    // Update the snake's position
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
    if (didEatFood) {
      // Increase the score
      score += 10;
      if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
      }

      // Generate new food
      foodX = Math.round(Math.random() * (canvas.width - 30) / 30) * 30;
      foodY = Math.round(Math.random() * (canvas.height - 30) / 30) * 30;
      
    } else {
      // Remove the tail
      snake.pop();
    }

    // Check if the snake hit the wall or itself
    if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height || checkCollision(snake)) {
      gameState = 'game-over';
    }
  }


  ctx.fillStyle = "blue";
  // Draw the snake
  snake.forEach(function(segment) {
    ctx.fillRect(segment.x, segment.y, 30, 30);
  });


  // Draw the food
  ctx.fillStyle = '#ff0000';
  ctx.fillRect(foodX, foodY, 30, 30);

  // Draw the score
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 15px sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('Score: ' + score, 10, 25);
  ctx.fillText(`High Score: ${highScore}`, 10, 50);

  // If the game state is "game-over", show the game over screen
  if (gameState === 'game-over') {
    clearInterval(timer);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    ctx.font = '48px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
    ctx.font = '30px sans-serif';
    ctx.fillText('Press r to restart', canvas.width * 0.50, canvas.height * 0.57);

  }

}

// Reset the game state and start the game again
const resetGame = function() {
  // Set the game state to "playing"
  gameState = 'playing';

  // Reset the score
  score = 0;

  // Reset the snake's position and direction
  snake = [{ x: 150, y: 150 }, { x: 140, y: 150 }, { x: 130, y: 150 }, { x: 120, y: 150 }, { x: 110, y: 150 }];
  dx = 30;
  dy = 0;
  interval = 1000 / 10
  timer = setInterval(gameLoop, interval)
  // Generate new food
  foodX = Math.round(Math.random() * (canvas.width - 30) / 30) * 30;
  foodY = Math.round(Math.random() * (canvas.height - 30) / 30) * 30;
};

// Check if the snake has collided with itself
const checkCollision = function(snake) {
    for (let i = 1; i < snake.length; i++) {
      if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
        return true;
      }
    }
    return false;
  };

// Attach the event listener to the window
window.addEventListener('keydown', handleKeyDown);

window.addEventListener('click', handleClick);

function handleClick(event) {
  var x = event.clientX;
  var y = event.clientY;
  // Determine the location of the click relative to the snake's current position
  // and change the snake's direction accordingly
}


// Register an event listener for the "resize" event
window.addEventListener("resize", function() {
  // Update the size of the canvas to match the user's browser window size
  if (gameState !== "playing"){
    canvas.width = window.innerWidth-17;
    canvas.height = window.innerHeight-17;
  }
});

const preGame = function (){
  ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fff';
  ctx.font = '48px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Welcome', canvas.width / 2, canvas.height / 2);
  ctx.font = '28px sans-serif';
  ctx.fillText('Snakes', canvas.width * 0.50, canvas.height * 0.57);

  ctx.fillText(`High Score: ${highScore}`, 10, 50);
}


interval = 1000 / 10
timer = setInterval(gameLoop, interval);