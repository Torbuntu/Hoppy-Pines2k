const hero = builtin("char12");
const heroA = builtin("char11");
const tramp = builtin("shape6");
const tramp3 = builtin("shape8");
const house = builtin("building2");
const boon = builtin("shape2");

var x = 20, y = 140, g = 4, vy = 0, vx = 0, tl = 70, tr = 142, bx = 100, by = 60, bs = 0, score = 0;

const trampY = 150;

var jumping = false, start = false;

const HERO_IDX = 2;
const BOON_IDX = 1;

function collide(){
    console("WHOOP!");
    bx = random(30, 180);
    by = random(40, 100);
    score += 10;
}

window(16, 0, 205, 180);

function move(){
    //reset acceleration
    ay = 0;
    if(pressed("LEFT")){
        vx-=2;
    }
    if(pressed("RIGHT")){
        vx+=2;
    }

    if(jumping){
        if(vy == 0){
            vy = g;
        }
        if(vy < 0){
            vy++;
        }
    }
    
    if(vx > 0) {
        vx--;
    }
    if(vx < 0) {
        vx++;
    }
    
    y += vy;
    x += vx;
}

function updateBoon(){
    if(bs == 0){
        bs = 15;
        bx += random(-1, 1);
        by += random(-1, 1);
    }
    bs--;
}

function render(){
    fill(86);
    background(1);
    
    
    if(pressed("A") && start){
        io("COLLISION", HERO_IDX, 0);
        sprite(x, y, heroA);
        score++;
    }else{
        io("COLLISION", HERO_IDX, 0);
        sprite(x, y, hero);
    }


    
    for(var i = 0; i < 6; i++){
        color(40);
        sprite(i * 8 + 80, trampY, tramp);
        sprite(i * 8 + 98, trampY, tramp3);
    }
    color(0);
    
    sprite(16, 140, house);
    for(var i = 0; i < 30; i++){
        tile(i, 21, 32);
        tile(i, 20, 31);
        tile(i, 19, 31);
    }
    
    
    //boon
    io("COLLISION", BOON_IDX, HERO_IDX, collide);
    sprite(bx, by, boon);
    
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
            console("Start");
            start = true;
            jumping = true;
            vy = -10;
        }
        // don't continue main loop until jumped first time
        return;
    }
    
    move();
    updateBoon();

    
    if(!pressed("A")){
        // draw lower trampoline
        if(y > 130){
            if((x > tl) && (x < tr)){
                for(var i = 2; i < 4; i++){
                    color(40);
                    sprite(i * 8 + 80, trampY+4, tramp);
                    sprite(i * 8 + 98, trampY+4, tramp3);
                }
                color(0);
            }
        }
        // if trampoline bottom, start jump
        if(y > 138) {
            if((x > tl) && (x < tr)){
                jumping = true;
                y = 100;
                if(pressed("UP")){
                    vy = -14;
                }else{
                    vy = -6;
                }
                if(x < (tl+40)){
                    vx = -4;
                }
                if(x > (tr-40)){
                    vx = 4;
                }
                
            }
        }
    }
    
    // reset score if fall below trampoline
    if(y > 140){
        y = 140;
        vy = 0;
        score = 0;
    }
    
    render();
    
}
