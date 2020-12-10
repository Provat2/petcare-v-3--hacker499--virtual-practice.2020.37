var database, dog, dogimg1, dogimg2, sadDog;
var foodS;
var feed, add;
var foodObject, feedTime, Lastfeed;
var namingSys;
var nameValue;
var nameGet;

var bedroom, garden, washroom;

var gameState, gameStateref;

function preload(){
    dogimg1 = loadImage('dogImg.png');
    dogimg2 = loadImage('dogImg1.png');
    bedroom = loadImage('Bed Room.png');
    garden = loadImage('Garden.png');
    washroom = loadImage('Wash Room.png');
}

function setup(){
    createCanvas(1000,600);
    database = firebase.database();

    gameStateref = database.ref('gameState');
    gameStateref.on('value', (data)=>{
        gameState = data.val();
    })  
    
    

    foodObject = new Food();
    dog = createSprite(700, 200, 10, 10);
    dog.addImage(dogimg2);
    dog.scale = 0.3;

    var dogref = database.ref("Food");
    dogref.on('value', readPosition);
    feed = createButton("Feed");
    feed.position(500, 120);
    feed.mousePressed(FeedDog);
    add = createButton("Add food");
    add.position(600, 120);
    add.mousePressed(AddFood);


    namingSys = new Form();
}

function draw(){
    background("green");
    //foodObject.display();

    namingSys.display();

    fill("black");
    textSize(20);
    text("Use buttons to add and feed the food", 500, 20);

    var currentTime = hour();
    if (currentTime === (Lastfeed)/* || currentTime === (Lastfeed + 1)*/){
        updateState("Playing");
        foodObject.garden();
    }
    else if (currentTime === (Lastfeed + 1)){
        updateState("Sleeping");
        foodObject.bedroom();
    }
    else if (currentTime > (Lastfeed + 2) && currentTime <= (Lastfeed + 4)){
        updateState("Bathing");
        foodObject.washroom()
    }
    else{
        updateState("Hungry");
        foodObject.display();
    }

    feedTime = database.ref("FeedTime");
    feedTime.on("value", function(data){
        Lastfeed = data.val();
    })

    if (Lastfeed > 12){
        text("Last Feed: " + Lastfeed%12 + "PM", 150, 30);
    }
    else if(Lastfeed === 0){
        text("Last Feed: 12 PM", 150, 30); 
    }
    else{
        text("Last Feed: " + Lastfeed + "AM", 150, 30);
    }

    drawSprites();

    if (gameState !== "Hungry"){
        feed.hide();
        add.hide();
        dog.remove();
    }
    else{
        feed.show();
        add.show();
        dog.addImage(dogimg1);
    }
}

function readPosition(data){
    foodS = data.val();
    foodObject.updateFoodStock(foodS);
}

function writePosition(n){
    if(n > 0){
        n -= 1;
    }
    else{
        n = 0;
    }
    database.ref('/').set({
        'Food': n
    });
}

function AddFood(){
    foodS++;
    database.ref('/').update({
        Food: foodS
    });
}

function FeedDog(){
    dog.addImage(dogimg2);
    foodObject.updateFoodStock(foodObject.getFoodStock() - 1)
    database.ref('/').update({
        Food: foodObject.getFoodStock(),
        FeedTime: hour()
    });
}

function updateState(state){
    database.ref('/').update({
        gameState: state
    })
}