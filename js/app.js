function init(){
   app.innerHTML +=`<div class="player" style="left: ${player.x}px;top: ${player.y}px;"></div>`;
   player.el = document.querySelector(".player")
}

function addBullet(){
    if (player.side == 1){
        const bolletLeft = (player.x + (player.w / 2)) -7;
        const bolletTop = player.y - 16;
        app.innerHTML +=`<div class="bullet" direction="top" style="left: ${bolletLeft}px; top: ${bolletTop}px;"></div>`;
    }
    if (player.side == 2){
        const bolletLeft = player.x + player.w ;
        const bolletTop = player.y + 30;
        app.innerHTML +=`<div class="bullet" direction="right" style="left: ${bolletLeft}px; top: ${bolletTop}px;"></div>`;
    }
    if (player.side == 3){
        const bolletLeft = (player.x + (player.w / 2)) -7;
        const bolletTop = player.y + player.h;
        app.innerHTML +=`<div class="bullet" direction="bottom" style="left: ${bolletLeft}px; top: ${bolletTop}px;"></div>`;
    }
    if (player.side == 4){
        const bolletLeft = player.x - 16
        const bolletTop = (player.y + (player.h / 2)) -10;
        app.innerHTML +=`<div class="bullet" direction="left" style="left: ${bolletLeft}px; top: ${bolletTop}px;"></div>`;
    }
    

    player.el = document.querySelector(".player")
}
function controllers(){
    document.addEventListener("keydown" , e => {
        switch(e.keyCode) {
            case 38: //top
                player.el.style.backgroundImage = `url(${player.sprites.top})`;
                player.run = true;
                player.side = 1
                break;
            case 39: //top
                player.el.style.backgroundImage = `url(${player.sprites.right})`;
                player.run = true;
                player.side = 2;
                break;
            case 40: //top
                player.el.style.backgroundImage = `url(${player.sprites.bottom})`;
                player.run = true;
                player.side = 3;
                break;
            case 37: //top
                player.el.style.backgroundImage = `url(${player.sprites.left})`;
                player.run = true;
                player.side = 4;
                break;
            case 32:
                addBullet();
                break;

        }
    })   
    document.addEventListener("keyup", e => {
        // if([37, 38, 39, 40].)
        player.run = false;
    })   
}
function randomInt (min, max) {
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}



function intervals(){
    const appBottom = app.getBoundingClientRect().bottom;
    const appRight  = app.getBoundingClientRect().right;
    const appWidth = app.getBoundingClientRect().width;
    const appHeight = app.getBoundingClientRect().height

    ints.run = setInterval(() => {
        if (player.run) {
            if (player.side == 1){
                if (player.y > 0){
                    player.y -= player.step;
                    player.el.style.top = `${player.y}px`
                }
            }
            else if (player.side == 3){
                if (player.y < appBottom - player.h){
                    player.y += player.step;
                    player.el.style.top = `${player.y}px`;
                }
            }
            else if (player.side == 2){
                if (player.x < appRight - player.w){
                    player.x += player.step;
                    player.el.style.left = `${player.x}px`;
                }
            }
            if (player.side == 4){
                if(player.x > 0){
                    player.x -= player.step;
                    player.el.style.left = `${player.x}px`
                }
            }
        }
    },fps);
    ints.bullet = setInterval(() => {
        let bullets = document.querySelectorAll(".bullet");

        bullets.forEach(bullet => {
            let direction = bullet.getAttribute("direction");

            const bulletTop = bullet.getBoundingClientRect().top
            const bulletBottom = bullet.getBoundingClientRect().bottom
            const bulletright = bullet.getBoundingClientRect().right
            const bulletleft = bullet.getBoundingClientRect().left
            
            if (direction == "top") {
                if (bulletTop < 0){
                    bullet.parentNode.removeChild(bullet);
                }
                else {
                    bullet.style.top = bulletTop - bulletSpeed + "px";
                
                }
            }
            else if (direction == "bottom") {
                if (bulletBottom > appHeight) {
                    bullet.parentNode.removeChild(bullet);
                }
                else{
                    bullet.style.top = bulletTop + bulletSpeed + "px";
                }
            }
            else if (direction == "left") {
                if (bulletleft < 0) {
                    bullet.parentNode.removeChild(bullet);
                }
                else{
                    bullet.style.left = bulletleft - bulletSpeed + "px";
                }
            } else if (direction == "right") {
                if (bulletleft > appWidth) {
                    bullet.parentNode.removeChild(bullet);
                }
                else{
                    bullet.style.left = bulletleft + bulletSpeed + "px";
                }
            }

          
            
        })
    }, fps);
    ints.enemy = setInterval(() => { 
        let enemies = document.querySelectorAll(".enemy");
        enemies.forEach(enemy =>{
            const direction = enemy.getAttribute("direction");
            
            const enemyTop = enemy.getBoundingClientRect().top
            const enemyLeft = enemy.getBoundingClientRect().left
            const enemyBottom = enemy.getBoundingClientRect().bottom
            const enemyRight = enemy.getBoundingClientRect().right

            const bullets = document.querySelectorAll(".bullet")
            bullets.forEach(bullet => {

                const direction = bullet.getAttribute.direction;

                const bulletTop = bullet.getBoundingClientRect().top;
                const bulletLeft = bullet.getBoundingClientRect().left;
                const bulletRight = bullet.getBoundingClientRect().right;
                const bulletBottom = bullet.getBoundingClientRect().bottom; 

                if(["top","left","right"].includes(direction)) {
                    if (bulletTop < enemyBottom && bulletBottom > enemyTop && bulletRight > enemyLeft && bulletLeft > enemyRight) {
                        
                    }
                }
            })
        

            if(direction == "top") {
                if(enemyTop <= 0){
                    enemy.parentNode.removeChild(enemy);//вверх
                }
                else{
                    enemy.style.top = enemyTop - 3 + "px";
                    
                }
    
            }
            else if(direction == "right"){
                if(enemyLeft >= appWidth){
                    enemy.parentNode.removeChild(enemy);//вправо
                }
                else{
                    enemy.style.left = enemyLeft + 3 + "px";
                    console.log(player)
                }

            }
            else if(direction == "bottom"){
                if(enemyTop >= appHeight){
                    enemy.parentNode.removeChild(enemy);//вниз
                }
                else{
                    enemy.style.top = enemyTop + 3 + "px";
                }

            }
            else if(direction == "left"){
                if(enemyLeft <= 0){
                    enemy.parentNode.removeChild(enemy);//влево
                }
                else{
                    enemy.style.left = enemyLeft - 3 + "px";
                }

            }
            

        })
    }, fps);
    ints.generateEnemy = setInterval(() => {
        const direction = randomInt(1, 4);
        if (direction == 1) {
            const enemyTop = appHeight - player.h;
            const enemyleft = randomInt(0, appWidth - player.w);
            app.innerHTML += `<div class="enemy" direction="top" style="transform: rotate(-90deg); top: ${enemyTop}px; left: ${enemyleft}px"></div>`

        
        }
        else if(direction == 3){
            const enemyTop = 0;
            const enemyleft  = randomInt(0, appWidth - player.w);
            app.innerHTML += `<div class="enemy" direction="bottom" style="transform: rotate(90deg); top: ${enemyTop}px; left: ${enemyleft}px"></div>`
        }
        else if(direction == 2){
            const enemyTop = randomInt(0, appHeight - player.h);
            const enemyleft = 0;
            app.innerHTML += `<div class="enemy" direction="right" style="; top: ${enemyTop}px; left: ${enemyleft}px"></div>`
        }
        else if(direction == 4){
            const enemyTop = randomInt(0, appHeight - player.h)
            const enemyleft = appWidth - player.w;
            app.innerHTML += `<div class="enemy" direction="left" style="transform: rotate(180deg); top: ${enemyTop}px; left: ${enemyleft}px"></div>`
        }
        player.el = document.querySelector(".player");
    
    }, 1000 )
}
let app = document.querySelector(".app"), fps = 1000 / 60, player = {
    sprites: {
        top: "img/player-top.png",
        right: "img/player-right.png",
        bottom: "img/player-bottom.png",
        left: "img/player-left.png",
    },
    el: false,
    x: 500,
    y: 400,
    step: 10,
    run: false,
    side: 1,
    w: 78,
    h: 77,
}, ints = {
    run: false,
    enemy: false,
    bullet: false,
    generateEnemy: false
}, 
bulletSpeed = 11
poits = 0
init();
controllers();
intervals();