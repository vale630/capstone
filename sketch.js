const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,candy,ground;
var comida_con
var comida_con_2;
var comida_con_3;
var comida;

var bg_img;
var rope2,rope3,Rope;


var button,button2,button3;
var rana,comer,comiendo,triste;
var mute_btn;

var fr;

var game_song;
var cut_rope
var cortar_sound;
var triste_sound;
var comiendo_sound;

function preload()
{
  bg_img = loadImage('background.png');
  comida = loadImage('candy.png');
  rana = loadImage('rana.png');
  
  game_song = loadSound('cut_rope.mp3');
  triste_sound = loadSound("triste.mp3")
  cortar_sound = loadSound('cortar.mp3');
  comiendo_sound = loadSound('comiendo.mp3');
  
  
  rana = loadAnimation("rana.png","om3.png","om1.png");
  comer = loadAnimation("eat_0.png" , "eat_1.png");
  triste = loadAnimation("triste1.png","triste2.png");
  feliz = loadAnimation("ranafeliz.png","ranafeliz1.png","ranasaludo.png");

  star = createSprite(320,50,20,20);
  star.addImage(star_img);
  star.scale(0.03);

  star1 = createSprite(50,370,20,20);
  star1.addImage(star1_img);
  star1.scale(0.03);

  star_img = loadImage("star.png");
  star1_img = loadImage("star1.png");

  rana.playing = true;
  saludo.playing = true;
  triste.playing = true;
  comiendo.playing = true;
}

function setup() 
{
  createCanvas(600,700);
  frameRate(80);

  candy_con = new Link(rope,candy); 
  candy_con_2 = new Link(rope2,candy);
  candy_con_3 = new Link(rope3,candy);

  game_song.play();
  game_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  button = createImg('cut_button.png');
  button.position(100,90);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg('cut_button.png');
  button2.position(450,90);
  button2.size(60,60);
  button2.mouseClicked(drop2);

  
  button3 = createImg('cut_button.png');
  button3.position(360,200);
  button3.size(60,60);
  button3.mouseClicked(drop3);
 
  mute_btn = createImag("mute.png");
  mute_btn.position(width-50,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute); 

  rope = new Rope(7,{x:120,y:90});
  rope2 = new Rope(7,{x:490, y:90});
  rope3 = new Rope(4,{x:400, y:225});
  ground = new Ground(300,width,height,20);

  

  rana.frameDelay = 20;
  triste.frameDelay = 20;
  comiendo.frameDelay = 20;

  rana = createSprite(120,620,100,100);
  rana.scale = 0.2;

  rana.addAnimation('ranita',rana);
  rana.addAnimation('comiendo',comer);
  rana.addAnimation('llorando',triste);
  rana.changeAnimation('ranita');

  
  candy = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,comida);

  comida_con = new Link(rope,candy);
  

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);

  push();
  imageMode(CENTER);
  if(candy!=null){
    image(comida,candy.position.x,candy.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();
  rope3.show();

  Engine.update(engine);
  ground.show();

  if(collide(candy,rana)==true)
  {
  rana.changeAnimation("triste");  
  }
  if(collide(candy.ground.body)==true)
  {
    rana.changeAnimation("om");
  }
  
  drawSprites();

  //*if(collide(candy,rana)==true)
  //{
    //World.remove(engine.world,fruit);
   // candy = null;
    //rana.changeAnimation('comiendo');
    //comiendo_sound.play();
 // }

  //if(candy!=null && candy.position.y>=650)
  //{
   // rana.changeAnimation('llorando');
    //game_song.stop();
    //triste_sound.play();
    //candy=null;
   //*}
  


}

function drop()
{
  cortar_sound.play();
  rope.break();
  candy_con.dettach();
  candy_con = null; 
}

function drop2()
{
  cortar_sound.play();
  rope2.break();
  candy_con_2.dettach();
  candy_con_2 = null;
}

function drop3()
{
  cortar_sound.play
  rope3.break();
  candy_con_3.detach();
  candy_con_3 = null; 
}

function collide(body,sprite){
  if(body!=null)
  {
  var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);  
  if(d<=80)
  {
  World.remove(engine.world.candy);
  candy=null;
  return true;  
  }
  else{
  return false;
  } 
  }
}



function mute()
{
  if(game_song.isPlaying())
     {
      game_song.stop();
     }
     else{
      game_song.play();
     }
}

