var AM = new AssetManager();
var spawnX = 0;
var spawnY = 0;
var baseX = 0;
var baseY = 0;
var lastX, lastY;
var distance = 24;
var temp1 = 0, temp2  = 0;
var map =  [['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', ],
            ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', ],
            ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', ],
            ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', ],
            ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', ],
            ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', ],
            ['s', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'p', ],
            ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', ],
            ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', ],
            ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', ],
            ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', ],
            ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', ],
            ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', ],
            ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', ],
            ];
var level1spawn = ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'];
var level2spawn = ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'];
function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

// no inheritance
function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.draw = function () {
    this.x = 0;
    this.y = 0;
    
    var i, j;
    for (i = 0; i < map.length; i++) {
        for (j = 0; j < map[0].length; j++) {
            var temp = map[i][j];
            if (temp == '-') {
                this.ctx.drawImage(AM.getAsset("./img/black.png"), this.x, this.y);
                this.x = this.x + 50;
            }
            if (temp == 'm') {
                this.ctx.drawImage(AM.getAsset("./img/white.png"), this.x, this.y);
                this.x = this.x + 50;
            }
            if (temp == 's') {
                this.ctx.drawImage(AM.getAsset("./img/yellow.png"), this.x, this.y);
                spawnX = this.x;
                spawnY = this.y;
                this.x = this.x + 50;
            }
            if (temp == 'p') {
                this.ctx.drawImage(AM.getAsset("./img/green.png"), this.x, this.y);
                baseX = this.x;
                baseY = this.y;
                this.x = this.x + 50;
            }
            if(temp == 'b') {
                this.ctx.drawImage(AM.getAsset("./img/blue.png"), this.x, this.y);
                this.x = this.x + 50;
            }
        }
        this.y = this.y + 50;
        this.x = 0;
    }
};

Background.prototype.update = function () {
};

function base(game, spritesheet) {
    this.animation = new Animation(spritesheet, 50, 50, 1, 0.15, 1, true, 1);
    this.ctx = game.ctx;
    this.health = 200;
    Entity.call(this, game, baseX, baseY);
}

base.prototype = new Entity();
base.prototype.constructor = base;

base.prototype.update = function () {
    //if the enemy is in the player's base die and decrease the base health
    Entity.prototype.update.call(this);
}

base.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}



function spawner(game, spritesheet, gameEngine) {
    this.animation = new Animation(spritesheet, 50, 50, 1, 0.15, 1, true, 1);
    this.ctx = game.ctx;
    this.gameEngine = gameEngine;
    Entity.call(this, game, spawnX - 50, spawnY - 50);
}

spawner.prototype = new Entity();
spawner.prototype.constructor = spawner;

spawner.prototype.update = function () {
    var spawn = ['1', '1', '1', '1', '1'];
    var i;
    Entity.prototype.update.call(this);
}

spawner.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}



function Enemy1(game, spritesheet) {
    this.animation = new Animation(spritesheet, 100, 55, 6, 0.15, 6, true, 1.0);
    this.speed = 100;
    this.ctx = game.ctx;
    this.damage = 10;
    this.sizeX = 25;
    this.sizeY = 25;
    this.isDead = 0;
    Entity.call(this, game, spawnX, spawnY);
}



Enemy1.prototype = new Entity();
Enemy1.prototype.constructor = Enemy1;

Enemy1.prototype.update = function () {
    if(this.isDead != 1) {
        this.x += this.game.clockTick * this.speed;
        if (baseX + 50 >= this.x + this.sizeX && this.x + this.sizeX >= baseX && baseY + 50 >= this.y + this.sizeY && this.y + this.sizeY >= baseY) {
            this.x = spawnX;
            this.isDead = 1;
            
        } 
        //if the enemy is in the player's base die and decrease the base health
            
        Entity.prototype.update.call(this);
    } else {
        //need to remove entity
        //this.animation.
        this.x = -50;
        this.y = -50;
    }
}

Enemy1.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

function setSpawnPoint() {
    for (i = 0; i < map.length; i++) {
        for (j = 0; j < map[0].length; j++) {
            var temp = map[i][j];
            if(temp == 's') {
                spawnX = (j * 50);
                spawnY = i * 50;
            }
        }
    }
}

function getBasePoint() {
    for (i = 0; i < map.length; i++) {
        for (j = 0; j < map[0].length; j++) {
            var temp = map[i][j];
            if(temp == 'p') {
                baseX = j * 50;
                baseY = i * 50;
            }
        }
    }
}

AM.queueDownload("./img/black.png");
AM.queueDownload("./img/white.png");
AM.queueDownload("./img/yellow.png");
AM.queueDownload("./img/green.png");
AM.queueDownload("./img/blue.png");
AM.queueDownload("./img/Enemy1walk.png");
AM.queueDownload("./img/runningcat.png");
AM.queueDownload("./img/guy.jpg");
AM.queueDownload("./img/base.png");
AM.queueDownload("./img/base2.png");
AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine, "maptest.txt"));
    setSpawnPoint();
    getBasePoint();
    gameEngine.addEntity(new base(gameEngine, AM.getAsset("./img/base.png")));
    gameEngine.addEntity(new spawner(gameEngine, AM.getAsset("./img/base2.png")));
    gameEngine.addEntity(new Enemy1(gameEngine, AM.getAsset("./img/Enemy1walk.png")));

    var j = 0;
    function Level1() {
        if(j > level1spawn.length) {
            return;
        }
        if (level1spawn[j] == '1') {
            gameEngine.addEntity(new Enemy1(gameEngine, AM.getAsset("./img/Enemy1walk.png")));
        }
        j++;
        setTimeout(Level1, 250);
    }
    Level1();
    var k;
    
    function pause() {
       // alert("TEST");
        //return;
        setTimeout(pause, 2000);s
    }
    pause();
    k = 0;
    function Level2() {
        if(k > level2spawn.length) {
            return;
        }
        if (level2spawn[k] == '1') {
            //alert("test");
            gameEngine.addEntity(new Enemy1(gameEngine, AM.getAsset("./img/Enemy1walk.png")));
        }
        k++;
        setTimeout(Level2, 250);
    }
    Level2();
    


    console.log("All Done!");
});