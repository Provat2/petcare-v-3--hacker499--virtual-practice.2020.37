class Form {
    constructor() {  
        this.nameref = database.ref('Name');
        this.nameref.on("value", (data)=>{
            this.nameGet = data.val();
            this.plsGet(this.nameGet);
        });
        this.text = createElement('h3');
        this.text.html("Enter Pet's Name: ");
        this.input = createInput("");
        this.button = createButton('Play');

        this.showName = createElement('h3');
        
    }

    entryName(x){
        database.ref('/').update({
            'Name': x
        });
    }

    hide(){
        this.input.hide();
        this.button.hide();
        this.text.hide();
    }
  
    plsGet(y){
        this.petName = y;
    }

    display(){
        
        if(this.petName === ""){
            this.text.position(860, 560);
            this.input.position(1010, 580);
            this.button.position(1170, 580);

            this.button.mousePressed(()=>{
                this.button.hide();
                this.input.hide();
                this.text.hide();

                this.nameValue = this.input.value();
                
                
                this.showName.position(600, 580);

                this.entryName(this.nameValue);

                this.showName.html("Pet Name: " + this.petName);
            });
        }
        else{
            this.showName.position(600, 580);
            this.showName.html("Pet Name: " + this.petName);
        }
        
       
  }
}