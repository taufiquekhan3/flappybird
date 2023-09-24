
let context;
let board;
let boardwidth=360;
let boardheight = 640;

let birdwidth = 34;
let birdheight = 24;
let birdX = boardwidth/8;
let birdY = boardheight/2;
let birdImg;

//BIRD COORDINATES AND SIZE
let bird = {
    x: birdX,
    y: birdY,
    width : birdwidth,
    height: birdheight
}
//pipes
let pipearray = [];
let pipewidth = 34;
let pipeheight = 512;
let pipeX = boardwidth;
let pipeY = 0;

//physics FOR PIPES IN MOTION
let velocityX = -2;//pipes moving left
let velocityY = 0;//bird jump speed
let gravity = 0.4;

let topPipeImg;
let bottomPipeImg;
let gameOver = false;
let score = 0;
window.onload = function() {
    board = document.getElementById('board');
    board.height = boardheight;//.HEIGHT HERE IS A FUNCTION TO MANIPULATE THE HEIGHT OF THE BOARD
    board.width  = boardwidth;
    context = board.getContext("2d");//getting the getContext method for drawing in 2d.

    /*drawing the bird fill.Rect a build in js method to draw on canvas
    context.fillStyle = "green"*/
    //context.fillRect(bird.x,bird.y,bird.width,bird.height);

    //drawing the bird
    birdImg = new Image();
    birdImg.src = "th (3).jpeg";
    birdImg.onload = function() {
    context.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height)
    }
    
    topPipeImg = new Image();
    topPipeImg.src = 'th (6).jpeg';

    bottomPipeImg = new Image();
    bottomPipeImg.src = 'th (6).jpeg';
    //updating frame everytime
    requestAnimationFrame(update);

    setInterval(placePipes,1200)//call function every 1.5s
    document.addEventListener("keydown",movebird);
}

    function update() {
        requestAnimationFrame(update)
        if (gameOver) {
            return;
         }
    context.clearRect(0,0,board.width,board.height);
     
    //bird
    velocityY += gravity;
    //bird.y += velocityY;
    bird.y = Math.max(bird.y + velocityY,0);
    context.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height)
    
    
    if(bird.y > board.height) {
        gameOver = true;
    }
    //pipes bring in motion 
    for(let i =0;i<pipearray.length;i++) {
        let pipe = pipearray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img,pipe.x,pipe.y,pipe.width,pipe.height);
       
        if (!pipe.passed && bird.x > pipe.x + pipe.width){
            score += 0.5;
            pipe.passed = true;
        } 

        if (detectCollision(bird,pipe)) {
          gameOver = true;
          context.fillStyle = "blue";
          context.font = "35px sans-serif";
          context.fillText("Game Over🤡",120,300);
        }
    }
    //score
    context.fillStyle = "yellow";
    context.font = "45px sans-serif";
    context.fillText(score, 10, 40);
    const emo = "😃";
    context.font = "30px sans-serif";
    context.fillText(emo,10,80)
}

    function placePipes() {

        if(gameOver) {
            return;
        }

        let randomPipeY = pipeY - pipeheight/4 - Math.random()*(pipeheight/2);
        let openingSpace = board.height/4;
        
        let topPipe = {
            img : topPipeImg,
            x : pipeX,  
            y : randomPipeY,
            width : pipewidth,
            height : pipeheight,
            passed : false
      }
      pipearray.push(topPipe);

      let bottomPipe = {
        img : bottomPipeImg,
        x : pipeX,
        y : randomPipeY + pipeheight + openingSpace,
        width : pipewidth,
        height : pipeheight,
        passed : false
      }
      pipearray.push(bottomPipe);
    }

    function movebird(e){
        if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX") {
            //jump
            velocityY = -6;
        }
    }

   function detectCollision(a,b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
   }