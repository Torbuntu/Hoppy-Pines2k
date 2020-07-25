const hero = builtin("char12");
const wep = builtin("sSword");
const tramp = builtin("shape6");
const tramp3 = builtin("shape8");
const house = builtin("building2");
const boon = builtin("char29");

const cloud = builtin("char28");

var x = 20, y = 140, g = 4, vy = 0, vx = 0, tl = 70, tr = 142, bx = 100, by = 60, bs = 0, score = 0;
var dx = 0, dy = 0;

var side = false;
const trampY = 150;

var jumping = false, start = false;

const HERO_IDX = 2;
const BOON_IDX = 1;

function collide(){
    console("X: ");
    console(bx);
    console("Y: ");
    console(by);
    dx = bx;
    dy = by;
    bx = random(30, 180);
    by = 0;
    score += 10;
}

window(16, 0, 205, 180);

function move(){
    //reset acceleration
    ay = 0;
    if(pressed("LEFT")){
        vx-=2;
        side = false;
    }
    if(pressed("RIGHT")){
        vx+=2;
        side = true;
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
    
    if(x < 30){
        x = 30;
        vx = 0;
    }
    if(x > 180){
        x = 180;
        vx = 0;
    }
    
    y += vy;
    x += vx;
}

function updateBoon(){
    if(by <  40){
        by+=3;
    }
    if(bs == 0){
        bs = 2;
        bx += random(-2, 2);
        by += random(-2, 2);
    }
    if(bx < 30) {
        bx+=3;
    }
    if(bx > 180){
        bx-=3;
    }
    
    bs--;
    
    //dead boon
    if(dy > -10){
        dy--;
    }
}

function render(){
    fill(130);
    background(1);
    
    if(pressed("A") && start){
        sprite(x, y, hero);
        
        io("COLLISION", HERO_IDX, 0);
        if(side){
            sprite(x+12, y+4, wep);
        }else{
            mirror(true);
            
            sprite(x-4, y+4, wep);
            mirror(false);
        }
    }else{
        sprite(x, y, hero);
        if(y > 130){
            if((x > tl) && (x < tr)){
                for(var i = 2; i < 4; i++){
                    color(248);
                    sprite(i * 8 + 80, trampY+4, tramp);
                    sprite(i * 8 + 98, trampY+4, tramp3);
                }
            }
        }
    }

    
    for(var i = 0; i < 6; i++){
        color(248);
        sprite(i * 8 + 80, trampY, tramp);
        sprite(i * 8 + 98, trampY, tramp3);
    }
    color(0);
    
    sprite(16, 140, house);
    for(var i = 0; i < 30; i++){
        tile(i, 21, 206);
        tile(i, 20, 206);
        tile(i, 19, 206);
    }
    
    
    //boon
    io("COLLISION", BOON_IDX, HERO_IDX, collide);
    sprite(bx, by, boon);
    
    sprite(dx, dy, cloud);
    
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
                    vx = -8;
                }
                if(x > (tr-40)){
                    vx = 8;
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
