var PlayerState;
var player,rocks;
var rocksGroup;
var edges;
var bonus,bonusGroup;
var gameState = "play";
var restart;
var counter;

function setup() {
  createCanvas(800,400);
  player = createSprite(100,100,50,50);
  player.shapeColor = "white";
  
  counter = 0;

  edges = createEdgeSprites();

  rocksGroup = createGroup();
  bonusGroup = createGroup();
}

function draw() {
  background("black");  

  player.bounceOff(edges);
  player.y = mouseY;

  if(gameState === "play"){
      PlayerState = "normal";
      createRocks();
      Bonus();
      if(player.isTouching(bonusGroup)){
        PlayerState = "invincible";
      }
      if(PlayerState === "invincible" ){
        counter = counter + 1;
        bonusGroup.setVelocityXEach(0);
        bonusGroup.setLifetimeEach(-1);
        text("invincibility: "+counter,400,10);

      }
      if(PlayerState === "normal"&&player.isTouching(rocksGroup)){
        gameState = "END";
          textSize(40); 
          text("GameOver",400,200);
      }
      if(gameState === "END"){
        rocksGroup.setVelocityXEach(0);
        rocksGroup.setLifetimeEach(-1);
        GameEnd();
      }
  }
  

  drawSprites();

  
}

function createRocks(){
  if(frameCount%120 === 0){
    rocks = createSprite(900,random(0,400),30,30);
    rocks.velocityX = -6;
    rocks.lifetime = 200;
    rocks.shapeColor = "red";
    rocksGroup.add(rocks);
  }
}

function Bonus(){
  if(frameCount%300 === 0){
    bonus = createSprite(900,random(0,400),30,30);
    bonus.velocityX = -9;
    bonus.lifetime = 150;
    bonus.shapeColor = rgb(212,175,55);
    bonusGroup.add(bonus);
  }
}

function GameEnd(){
  gameState === "End";

  restart = createButton("RESTART")
  restart.position(400,350);
  restart.mousePressed(()=>{
    gameState = "play"
  })
  bonusGroup.destroyEach();
  rocksGroup.destroyEach();
}