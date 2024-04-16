document.addEventListener('DOMContentLoaded', async function () {
  const paddle = document.getElementById('paddle');
  const ball = document.getElementById('ball');
  const background = document.getElementById('game-container');
  const _lives = document.getElementById('lives');
  const _score = document.getElementById('score');

  let paddlePosition = 0;
  const paddleLength = 100;
  var ballSpeedY = 1;
  var ballSpeedX = 1;
  var started = false;
  let lives = 3
  let score = 0

  const {
    top: t,
    left: l,
    bottom: b,
    right: r
  } = background.getBoundingClientRect();
  console.log(t, l, b, r)

  var vw = window.innerWidth || document.documentElement.clientWidth;
  var vh = window.innerHeight || document.documentElement.clientHeight;

  function movePaddle() {
    paddle.style.left = paddlePosition + 'px';
  }

  function pause(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  function restart(){
    var directions = [1,-1]
    var randomIndex = Math.floor(Math.random() * directions.length);
    
    // Return the element at the random index
    var dir = directions[randomIndex];
    ballSpeedX = dir;
    ballSpeedY = 0;

    ball.style.top = 0 + 'px';
    ball.style.left = (r/2) + 'px';
  }

  setInterval(10000, ()=>{
    ballSpeedY *= 2;
    ballSpeedX *= 2;
  })

  async function moveBall() {
    // let ballSpeed = 1;

    let ballPositionX = parseInt(ball.style.left) || 0;
    let ballPositionY = parseInt(ball.style.top) || 0;

    // Move ball downwards
    ballPositionX += ballSpeedX;
    ballPositionY += ballSpeedY;
    ball.style.top = ballPositionY + 'px';
    ball.style.left = ballPositionX + 'px';
    // let ballSpeed = 1;

    if(lives<=0){
      var gameover = document.getElementById('gameover');
      gameover.style.display = 'block'
      return "Game Over"
    }

    // Reverse direction when ball reaches bottom
    if (ballPositionY >= b) {
      // ballSpeed = -ballSpeed;
      // ballSpeedX +=1;
      ballSpeedY -=1;
      var child =_lives.children[_lives.children.length -1]
      child && _lives.removeChild(child)
      lives--
      restart()
      var restartpause = await pause(3000)
      await moveBall()
    }

    // Reverse direction when ball reaches top
    if (ballPositionY <= 0 && started == true) {
      // ballSpeedX += 1;
      ballSpeedY += 1;
    }

    // Reverse direction when ball reaches the left wall
    if (ballPositionX <= l && started == true) {
      ballSpeedX += 1;
      // ballSpeedY += 1;
    }

    // Reverse direction when ball reaches the right wall
    if (ballPositionX >= r && started == true) {
      ballSpeedX -= 1;
      // ballSpeedY += 1;
    }

    // Check for collision with paddle
    if (ballPositionY >= (b-20) && ballPositionY <= b && 
      paddlePosition <= ball.offsetLeft && 
      paddlePosition + paddleLength >= ball.offsetLeft) {
      ballSpeedY = -ballSpeedY;
      score++
      _score.innerHTML = score
      
      if(paddlePosition + (paddleLength/2) >= ball.offsetLeft){
        ballSpeedX = -ballSpeedX;
      }
      else{
        ballSpeedX = +ballSpeedX;
      }
    }

    // ballSpeedX*=1.0005
    // ballSpeedY*=1.0005
    started = true;

    requestAnimationFrame(moveBall);
  }

  await moveBall();

  document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
      paddlePosition -= 10;
      if (paddlePosition < 0) {
        paddlePosition = 0;
      }
      movePaddle();
    } else if (event.key === 'ArrowRight') {
      paddlePosition += 10;
      if (paddlePosition > b) {
        paddlePosition = b;
      }
      movePaddle();
    }
  });
});
