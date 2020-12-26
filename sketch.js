const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1;
var backgroundImg,platform;
var bird = [], slingShot, birdArrPos = 0;
var score = 0;
var flag = false, gameState = "onSling";
var reloadImage;
var backgroundImg2;
var blueBird, bombBird, redBird;
var flying, select, snort;

function preload() 
{
    backgroundImg = loadImage("sprites/bg.png");
    backgroundImg2 = loadImage("sprites/bg2.jpg");
    reloadImage = loadImage("sprites/reloadImage.png")
    blueBird = loadImage("sprites/blueBird.png");
    bombBird = loadImage("sprites/bombBird.png");
    redBird = loadImage("sprites/bird.png");
    flying = loadSound("sounds/bird_flying.mp3");
    select = loadSound("sounds/bird_select.mp3");
    snort = loadSound("sounds/pig_snort.mp3");
}

function setup()
{
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    var xPos = 100;
    for(let i=0; i<3;i++)
    {
        if(i == 0)
        {
            bird[i] = new Bird(xPos,50,redBird);
        }
        else
        {
            if(i == 1)
            {
                bird[i] = new Bird(xPos,100,blueBird);
            }
            if(i == 2)
            {
                bird[i] = new Bird(xPos,100,bombBird);
            }
            xPos -= 20;
        }
    }

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new Slingshot(bird[0].body,{x: 200, y: 100});
}

function draw()
{
    // background(backgroundImg);

    if(hour >= 06 && hour<=19)
    {
        background(backgroundImg);
    }
    else
    {
        background(backgroundImg2);
    }

    textSize(20);
    fill("yellow")
    text(score,1100,50);

    if(score >= 400)
    {
        textSize(30);
        text("you Win!",600,200);
    }

    image(reloadImage,20,30,50,50);
    
    Engine.update(engine);
    strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    for(let i=0; i<3;i++)
    {
        bird[i].display();
    }
    platform.display();
    //log6.display();
    slingshot.display();
    
    getBackground();
}

function mouseDragged()
{
    if(gameState == "onSling")
    {
        Matter.Body.setPosition(bird[birdArrPos].body,{x: mouseX, y: mouseY});
    }
}

function mouseReleased()
{
    //console.log(false)
    if(mouseX>20 && mouseX<70 && mouseY<55 && mouseY>5)
    {
        //console.log(false)
    }
    else
    {
        slingshot.launch();
        gameState = "launched";
        flying.play();
    }
}

// function keyPressed()
// {
//     if(keyCode == 32)
//     {
//         // flag = false;
//         // slingshot.chain.bodyA = bird.body;

//         // Matter.Body.setPosition(bird.body,{x: 200, y: 200});
//         // Matter.Body.setAngle(bird.body,0);

//         // bird.trejectory = [];
//     }
// }

function mousePressed()
{
    if(mouseX>20 && mouseX<70)
    {
        if(mouseY<55 && mouseY>5)
        {
            select.play();
            if(birdArrPos!=2)
            {
                birdArrPos++;
                console.log(birdArrPos);
            }

            flag = false;
            slingshot.chain.bodyA = bird[birdArrPos].body;

            Matter.Body.setPosition(bird[birdArrPos].body,{x: 200, y: 200});
            Matter.Body.setAngle(bird[birdArrPos].body,0);

            bird[birdArrPos].trejectory = [];

            gameState = "onSling";
        }
    }
}

async function getBackground()
{
    var time = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");

    var timeJSON = await time.json();

    var dateTime = timeJSON.currentDateTime;

    var hour = dateTime.slice(11,13);
}
