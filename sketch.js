var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage,trex,sound,ss,ssa,lo,terex,terexe;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;

var score=0;
var jumpSound, collidedSound;

var gameOver, restart;

var l,r,m


function preload(){

   ssa = loadImage("net.png")
  terex = loadSound("terex.wav")
  terexe = loadSound("run.m4a")
  trex_running = loadImage("trex.png");
  trex_collided = loadImage("trex_collid.png");
  
  sounding = loadSound("goe.mp3")
  ss = loadSound("gs.mp3")

  
  groundImage = loadImage("d.jpg");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("o1.png");
  obstacle2 = loadImage("o2.png");
  obstacle3 = loadImage("o3.png");
  obstacle4 = loadImage("o4.png");
  
  gameOverImg = loadImage("gameover.png");
  restartImg = loadImage("r.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
 ground = createSprite(width/1,height-300,width,2);
  ground.addImage("ground",groundImage);
  ground.x = width/1
  ground.velocityX = -(7 + 3*score/100);
  ground.scale = 1.5
  trex = createSprite(100,height-70,20,50);
  
  l = createSprite(250,height-300,50,10)
   r = createSprite(250,height-100,50,10)
   m = createSprite(250,height-150,10,10)
  
  l.visible = false
  r.visible = false
  m .visible = false
  
  trex.addImage("running", trex_running);
 trex. addImage("collided", trex_collided);
  trex.setCollider('circle',0,0,400)
  trex.scale = 0.09
 //trex.debug=true
  
  
  
  invisibleGround = createSprite(width/2,height-10,width,125);  
  invisibleGround.shapeColor = "#f4cbaa";
  invisibleGround.visible = false
  
   lo = createSprite(100,height-70)
    lo.addImage(ssa)
    lo.scale = 0.5
    lo.visible = false
  
  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  
 
  // invisibleGround.visible =false

  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
 
  m.setVelocity(0,4.5) 
}

function draw() {
  
  background("white");
  
 
  
  
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()%1%1);
    ground.velocityX = -(6 + 3*score/100);
    if(score%100 === 0 && score>0){
      terex.play()
      
      
    }
  
     if (m.isTouching(l)){
     terexe.play()
     
   }
     if (m.isTouching(r)){
     terexe.play()
     
   }
    if (trex.y <343.5) {
      terexe.stop()
      
    }
     
   
    
    if(score%100 === 0 && score>0){
    }
    if((touches.length > 0 || keyDown("SPACE")) && trex.y  >= height-120) {
     
      trex.velocityY = -15;
       touches = [];
      ss.play()
    }
    
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
       
    }
  
    trex.collide(invisibleGround);
   
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(trex)){
       sounding.play()
        gameState = END;
      
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    m.setVelocity(0,0)
   
    lo.visible = true
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided)
    trex.scale = 1;
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(touches.length>0 || keyDown("SPACE")) {      
      reset();
      touches = []
    }
    if (mousePressedOver(restart)||touches.length > 0 ){
   
   reset()
   touches = []
 } 
  }
 
  m.bounceOff(r)
  m.bounceOff(l)
  
  
  drawSprites();
  textSize(20);
  fill("black")
  text("Score: "+ score,30,50);
  
}


function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,height-95,20,30);
    obstacle.setCollider('circle',0,0,45)
    // obstacle.debug = true
  
    obstacle.velocityX = -(7 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    obstacle.depth = trex.depth;
    trex.depth +=1;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    
  }
}

function reset(){
  gameState = PLAY;
  trex.y = height-70
  trex.scale = 0.1
   m.setVelocity(0,4.5)
  m.y = height-150
   lo.visible = false
   trex.depth = lo.depth;
    lo.depth = lo.depth + 1;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;
  
}
