class Food{
    constructor(){
        this.foodStock = 0;
        this.image = loadImage("Milk.png");
    }
    

    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }
    
    getFoodStock(){
        return this.foodStock;
    }

    deductFoodStock(){
        if(this.foodStock > 0){
            this.foodStock -= 1;
        }
    }

    bedroom(){
        background(bedroom);
    }
    garden(){
        background(garden);
    }
    washroom(){
        background(washroom);
    }

    display(){
        var x = 80, y = 100;
        imageMode(CENTER);
        if (this.foodStock !== 0){
            for(var i = 0; i <this.foodStock; i++){
                if(i % 10 === 0){
                    x = 80;
                    y += 50;
                }
                image(this.image, x, y, 50, 50);
                x += 30; 
            }
        }
    }
}