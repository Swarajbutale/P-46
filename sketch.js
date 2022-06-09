var tiger, hunter, obstaclesGroup, tigerAm, tigerImg, bgImg,hunterAm,obstaclesImg1,obstaclesImg2,obstaclesImg3;
var gameOverImg, gameOver, restart, restartImg;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ground, invisibleGround, groundImage;
var score;
localStorage["Highest Score"]=0;

function preload() {
    tigerAm = loadAnimation("images/t1.png","images/t2.png","images/t3.png","images/t4.png","images/t5.png","images/t6.png","images/t7.png","images/t8.png","images/t9.png","images/t10.png");
    tigerImg = loadImage("images/t1.png")
    bgImg = loadImage("images/jungle1.png");
    hunterAm = loadAnimation("images/h1.png","images/h2.png","images/h3.png","images/h4.png","images/h5.png","images/h6.png","images/h7.png","images/h8.png","images/h9.png",);
    
    obstaclesImg1=loadImage("images/o1.1.png");
    obstaclesImg2=loadImage("images/o2.1.png");
    obstaclesImg3=loadImage("images/o3.1.png");

    gameOverImg=loadImage("images/gameOver.png");
    restartImg=loadImage("images/restart.png");
   
    
}

function setup() {
    createCanvas(1200,600);
    
    ground = createSprite(600,300,200,200);
    ground.scale=2;
    ground.addImage("ground",bgImg);
    ground.velocityX=-5;
    //ground.visible= false;

    tiger = createSprite(500,400);
    tiger.addAnimation("tigerRunning",tigerAm);
    //tiger.addImage(tigerImg);
    tiger.scale = 0.25;
    //tiger.addAnimation("tigerRunning",tigerAm);

    hunter = createSprite(50,500);
    hunter.addAnimation("hunterRunning",hunterAm);
    hunter.scale=0.75;
    
    obstaclesGroup=createGroup();
    
    //tiger.setCollider("circle",0,0,40);
    tiger.debug=true;
    
    invisibleGround = createSprite(600,500,1200,10);
    invisibleGround.visible = false;

    gameOver = createSprite(600,240);
    gameOver.addImage("gameOver", gameOverImg);

    restart = createSprite(600,360);
    restart.addImage("restart",restartImg);
    restart.scale=0.5;

    score=0;
}

function draw() {
    background(180);
    
    

 
    
    if(gameState = PLAY) {
        score = score+1;
        console.log(ground.x);
        if(ground.x<450) {
            ground.x=ground.width/2;
        }

     
    
    spawnObstacles();


        if(keyDown("space")&& tiger.y>=200) {
            tiger.velocityY=-12;
        }

        tiger.velocityY = tiger.velocityY+0.8; 
        
        if(obstaclesGroup.isTouching(tiger)){
            gameState=END;
            console.log('end');
        }

        gameOver.visible=false;
        restart.visible=false;
    }
      if(gameState==END){
        ground.velocityX=0;
        tiger.velocityY=0;

        gameOver.visible=true;
        restart.visible=true;

        obstaclesGroup.setLifetimeEach(-1);
        obstaclesGroup.setVelocityXEach(0);
     }

     if(mousePressedOver(restart)) {
        reset();
      }

      tiger.collide(invisibleGround);
    hunter.collide(invisibleGround);

    drawSprites();

    textSize(30);
    fill("black");
    text("Score: "+ score, 900,50);
    text("High Score: "+localStorage["Highest Score"],400,50);

}

function reset() {
    gameState=PLAY;
  obstaclesGroup.destroyEach();
  tiger.changeAnimation("tigerrunning",tigerAm);
 // tiger.velocityX=-12;
  ground.velocityX=-5;
  if(score>localStorage["Highest Score"]) {
    localStorage["Highest Score"]=score;
  }
  score=0;
}

 function spawnObstacles() {
     if(frameCount%150===0) {
         var obstacle=createSprite(1200,450)
         obstacle.velocityX=-5;

         var rand=Math.round(random(1,3));
         switch(rand){
             case 1:obstacle.addImage(obstaclesImg1);
             break;
             case 2:obstacle.addImage(obstaclesImg2);
             break;
             case 3:obstacle.addImage(obstaclesImg3);
             break;
             default: break;
            
         }
         obstacle.scale=0.25;
         obstacle.lifetime=300;
         obstaclesGroup.add(obstacle);
     }
 }
