const hero = builtin("char12");
const heroA = builtin("char11");
const tramp = builtin("shape6");
const tramp3 = builtin("shape8");
const house = builtin("building2");

var score = 0;

var x = 20, y = 130, g = 4, vy = 0, vx = 0, tl = 70, tr = 142, ay = 0, ax = 0;


const trampY = 150;
var jumping = false, start = false;


window(16, 0, 205, 180);

function move(){
    if(pressed("LEFT")){
        vx-=2;
    }
    if(pressed("RIGHT")){
        vx+=2;
    }
    
    if(pressed("UP")){
        //jump
        if(!jumping){
            vy = -6;
            jumping = true;
        }
        ay = -8;
        if(vx > 0){
            ax = 2;
        }
        if(vx < 0){
            ax = -2;
        }
    }else{
        ay = 0;
    }
    
    if(vx > 0) {
        vx--;
    }
    if(vx < 0) {
        vx++;
    }
    
    
    y += (vy + ay);
    x += (vx + ax);
}

function render(){
    if(pressed("A") && start){
        sprite(x, y, heroA);
        score++;
    }else{
        sprite(x, y, hero);
    }
    
    for(var i = 0; i < 6; i++){
        sprite(i * 8 + 80, trampY, tramp);
        sprite(i * 8 + 98, trampY, tramp3);
    }
    
    
    sprite(16, 130, house);
    fill(86);
    background(1);
    cursor(20, 0);
    print("Score:");
    cursor(20,16);
    printNumber(score);
}

function update(){
    if(pressed("C")){
        exit();
    }
    
    if(!start){
        move();
        render();
        if(pressed("UP")){
            start = true;
        }
        
        return;
    }
    
    move();
    
    if(jumping){
        if(vy == 0){
            vy = g;
        }
        vy++;
    }
    
    if(!pressed("A")){
        if(y > 130){
            if((x > tl) && (x < tr)){
                for(var i = 2; i < 4; i++){
                    sprite(i * 8 + 80, trampY+4, tramp);
                    sprite(i * 8 + 98, trampY+4, tramp3);
                }
            }
        }
        
        if(y > 138) {
            if((x > tl) && (x < tr)){
                jumping = true;
                y = 100;
                vy = -6;
                if(x < 106){
                    vx = -4;
                }
                if(x > 110){
                    vx = 4;
                }
                
            }
        }
    }
    
    if(y > 140){
        score = 0;
    }
    

    
    render();
    
    // cursor(20, 40);
    // printNumber(x);
}