window.onload = init;

var map, ctxMap;
var playerCanvas, ctxPlayerCanvas;
var enemyCanvas, ctxEnemyCanvas;
var drawBtn, clearBtn;
var gameWidth = 800,
    gameHeight = 500;

var bg = new Image();
bg.src = 'images/bg.jpg';

var tiles = new Image();
tiles.src = 'images/sprite.png';

var player,
    enemies = [];

var isPlaying;

// For creating enemies
var spawnInterval,
    spawnTime = 6000,
    spawnAmount = 3;

var requestAnimFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame;

function init() {
    map = document.getElementById('map');
    ctxMap = map.getContext('2d');

    playerCanvas = document.getElementById('player');
    ctxPlayerCanvas = playerCanvas.getContext('2d');

    enemyCanvas = document.getElementById('enemy');
    ctxEnemyCanvas = enemyCanvas.getContext('2d');

    map.width = gameWidth;
    map.height = gameHeight;

    playerCanvas.width = gameWidth;
    playerCanvas.height = gameHeight;

    enemyCanvas.width = gameWidth;
    enemyCanvas.height = gameHeight;

    drawBtn = document.getElementById('drawBtn');
    clearBtn = document.getElementById('clearBtn');

    drawBtn.addEventListener('click', drawRect, false);
    clearBtn.addEventListener('click', clearRect, false);

    player = new Player();

    drawBg();

    startLoop();

    document.addEventListener('keydown', checkKeyDown, false);
    document.addEventListener('keyup', checkKeyUp, false);
}

function spawnEnemy(count) {
    for (var i = 0; i < count; i++) {
        enemies[i] = new Enemy();
    }
}

function startCreatingEnemies() {
    stopCreatingEnemies();
    spawnInterval = setInterval(function () {
        spawnEnemy(spawnAmount)
    }, spawnTime);
}

function stopCreatingEnemies() {
    clearInterval(spawnInterval);
}

function draw() {
    player.draw();

    clearCtxEnemyCanvas();
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].draw();
    }
}

function update() {
    player.update();
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].update();
    }
}

function loop() {
    if (isPlaying) {
        draw();
        update();
        requestAnimFrame(loop);
    }
}

function startLoop() {
    isPlaying = true;
    loop();
    startCreatingEnemies();
}

function stopLoop() {
    isPlaying = false;
}

// Objects
function Player() {
    this.srcX = 0;
    this.srcY = 0;
    this.drawX = 0;
    this.drawY = 0;
    this.width = 200;
    this.height = 147;

    this.speed = 5;

    //For keys
    this.isUp = false;
    this.isDown = false;
    this.isLeft = false;
    this.isRight = false;
}

function Enemy() {
    this.srcX = 0;
    this.srcY = 147;
    this.width = 164;
    this.height = 147;
    this.drawX = Math.floor(Math.random() * gameWidth) + gameWidth;
    this.drawY = Math.floor(Math.random() * (gameHeight - this.height));

    this.speed = 7;
}

Player.prototype.draw = function () {
    clearCtxPlater();
    ctxPlayerCanvas.drawImage(tiles, this.srcX, this.srcY, this.width, this.height,
        this.drawX, this.drawY, this.width, this.height);
};

Player.prototype.update = function () {
    if (this.drawX < 0) this.drawX = 0;
    if (this.drawX > gameWidth - this.width) this.drawX = gameWidth - this.width;
    if (this.drawY < 0) this.drawY = 0;
    if (this.drawY > gameHeight - this.height) this.drawY = gameHeight - this.height;
    this.chooseDirection();
};

Player.prototype.chooseDirection = function () {
    if (this.isUp) this.drawY -= this.speed;
    if (this.isDown) this.drawY += this.speed;
    if (this.isLeft) this.drawX -= this.speed;
    if (this.isRight) this.drawX += this.speed;
};

Enemy.prototype.draw = function () {
    ctxEnemyCanvas.drawImage(tiles, this.srcX, this.srcY, this.width, this.height,
        this.drawX, this.drawY, this.width, this.height);
};

Enemy.prototype.update = function () {
    this.drawX -= this.speed;
    if (this.drawX < -this.width) {
        this.destroy();
    }
};

Enemy.prototype.destroy = function () {
    enemies.splice(enemies.indexOf(this), 1);
};

function checkKeyDown(e) {
    var keyID = e.keyCode || e.which;
    var keyChar = String.fromCharCode(keyID);

    switch (keyChar) {
        case "W":
            player.isUp = true;
            e.preventDefault();
            break;
        case "S":
            player.isDown = true;
            e.preventDefault();
            break;
        case "A":
            player.isLeft = true;
            e.preventDefault();
            break;
        case "D":
            player.isRight = true;
            e.preventDefault();
            break;
        //default:
        //   return;
    }
}

function checkKeyUp(e) {
    var keyID = e.keyCode || e.which;
    var keyChar = String.fromCharCode(keyID);

    switch (keyChar) {
        case "W":
            player.isUp = false;
            e.preventDefault();
            break;
        case "S":
            player.isDown = false;
            e.preventDefault();
            break;
        case "A":
            player.isLeft = false;
            e.preventDefault();
            break;
        case "D":
            player.isRight = false;
            e.preventDefault();
            break;
        //default:
        //   return;
    }
}

function drawRect() {
    ctxMap.fillStyle = '#3d3d3d';
    ctxMap.fillRect(10, 10, 100, 100);
}

function clearRect() {
    ctxMap.clearRect(0, 0, 800, 500);
}

function clearCtxPlater() {
    ctxPlayerCanvas.clearRect(0, 0, gameWidth, gameHeight);
}

function clearCtxEnemyCanvas() {
    ctxEnemyCanvas.clearRect(0, 0, gameWidth, gameHeight);
}

function drawBg() {
    ctxMap.drawImage(bg, 0, 0, 1600, 1000,
        0, 0, gameWidth, gameHeight);
}