// Enemies our player must avoid
//  定义一般的类：游戏元素GameElement,在屏幕上显示enemy，用render的方法
class GameElement {
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// 这是一个应用到每个实例的类-enemy
class Enemy extends GameElement {
    constructor(enemyNumber){
    // enemy的图片/sprite已经用一个帮助程序来加载了
    this.sprite = 'images/enemy-bug.png';
    this.x = Math.random()*300 + 5;
    this.y = enemyNumber === 1 ? 55 : (enemyNumber === 2 ? 140 : 255);
    this.speed = 0;
    }

// 更新enemy的位置，用一个方法，参数dt，作为时间增量
    update(dt) {
        if (this.x >= 500 || this.speed === 0) {
            this.speed = Math.random()*3 + 2;
            this.x = -200;
        } else {
    // 所有的运动都应乘以参数dt，来保证游戏运动速度
            this.x = Math.floor(Math.random()*dt + this.speed) + this.x;
        }
    }
};


// 定义一个player类，具有： update(), render() ，handleInput()方法
class Player extends GameElement {
    //定义玩家初始位置
    constructor() {
        this.x = 200;
        this.y = 395;
        this.sprite = 'images/char-boy.png';
    }

    //update方法更新位置
    update() {
        for(i = 0; i < allEnemies.length; i++) {
            const eneLocX = Math.ceil(allEnemies[i].x);
            if (eneLocX >= this.x - 90 && eneLocX <= this.x + 80 && this.y === allEnemies[i].y) {
                this.x = 200;
                this.y = 395;
            }
        }
        // 游戏结束时的位置更新
        if (this.y === -30) {
            setTimeout(() => {
                this.x = 200;
                this.y = 395;
            }, 1000);
        }
    }

    //render方法可以继承，定义handleInput方法
    handleInput(key) {
        if (key === 'up') {
            this.y = this.y === -30 ? this.y : this.y - 85;
            this.update();
        } else if (key === 'down') {
            this.y = this.y === 395 ? this.y : this.y + 85;
        } else if (key === 'right') {
            this.x = this.x === 400 ? 0 : this.x + 100;
        } else if (key === 'left') {
            this.x = this.x === 0 ? 400 : this.x - 100; 
        }
    }
};

//实例化对象，把所有enemy对象放在allEnemies数组中，
const allEnemies = [new Enemy(3), new Enemy(2), new Enemy(1),
 new Enemy(1), new Enemy(2)];
//实例一个player对象，
const player = new Player();

// 监听按键，发送到player的handleInput（）方法，这个不用改
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
