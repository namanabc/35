//variables 
var balloon, bImage;
var bg;
var database;
var balloonPosition;

function preload(){
  //loading the background image
  bg = loadImage("Hot Air Ballon-01.png");
  //loading the animation to the hot air balloon
  bImage = loadAnimation("Hot Air Ballon-02.png", "Hot Air Ballon-03.png", "Hot Air Ballon-04.png");

}
function setup() {
  //creating a canvas
  createCanvas(800,500);
  database = firebase.database();

  //creating a balloon sprite and adding animation
  balloon = createSprite();
  balloon.addAnimation("moving",bImage);

  //referring to the database
  balloonPosition = database.ref('balloon/position');
  balloonPosition.on("value", readHeight, showError);
}

function draw() {
  //background = bg
  background(bg);  

  //writing information text
  fill(0);
  stroke(0);
  textSize(20);
  text("**Use the arrow keys to move the hot air balloon!", 360, 100)

  //drawing the sprites
  drawSprites();

  //writing the position on the database, making the balloon move with arrow keys
  //changing scale of the balloon when it goes up or down
  if(keyDown(LEFT_ARROW)){
    updateHeight(-10, 0);
  } else if(keyDown(RIGHT_ARROW)){
      updateHeight(10, 0);                                                      
    } else if(keyDown(UP_ARROW)){
      if (balloon.scale <1){ 
        updateHeight(0, -10); 
      }
      if (balloon.scale >0.1){ 
        balloon.scale = balloon.scale-0.05;
      }
    } else if(keyDown(DOWN_ARROW)){ 
      updateHeight(0, 10);
      if (balloon.scale <1){ balloon.scale = balloon.scale+0.05; 
      }
    }
 }

//function to write the position onto the database
function updateHeight(x, y){
  database.ref('balloon/position').set({
    'x' : position.x + x,
    'y' : position.y + y
  })
}

//function to read the position
function readHeight(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

//function to show a string in the console if there is an error
function showError(){
  console.log("Error in writing to the database");
}