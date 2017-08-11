window.onload = init;

var map, ctxMap;
var player, ctxPlayer;
var enemy, ctxEnemy;
var drawBtn, clearBtn;
var gameWidth = 800,
    gameHeight = 500;

var bg = new Image();
bg.src = 'images/bg.jpg';

var tiles = new Image();
tiles.src = 'images/sprite.png';

var playerObj,
    enemyObj;

var isPlaying;

var requestAnimFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame;

function init() {
    map = document.getElementById('map');
    ctxMap = map.getContext('2d');

    player = document.getElementById('player');
    ctxPlayer = player.getContext('2d');

    enemy = document.getElementById('enemy');
    ctxEnemy = enemy.getContext('2d');

    map.width = gameWidth;
    map.height = gameHeight;

    player.width = gameWidth;
    player.height = gameHeight;

    enemy.width = gameWidth;
    enemy.height = gameHeight;

    drawBtn = document.getElementById('drawBtn');
    clearBtn = document.getElementById('clearBtn');

    drawBtn.addEventListener('click', drawRect, false);
    clearBtn.addEventListener('click', clearRect, false);

    playerObj = new Player();
    enemyObj = new Enemy();

    drawBg();

    startLoop();
}

function draw() {
    playerObj.draw();
    enemyObj.draw();
}

function update() {
    playerObj.update();
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
}

function Enemy() {
    this.srcX = 0;
    this.srcY = 147;
    this.drawX = 600;
    this.drawY = 50;
    this.width = 164;
    this.height = 147;

    this.speed = 8;
}

Player.prototype.draw = function () {
    clearCtxPlater();
    ctxPlayer.drawImage(tiles, this.srcX, this.srcY, this.width, this.height,
        this.drawX, this.drawY, this.width, this.height);
};

Player.prototype.update = function () {
    this.drawX += this.speed;
};

Enemy.prototype.draw = function () {
    ctxEnemy.drawImage(tiles, this.srcX, this.srcY, this.width, this.height,
        this.drawX, this.drawY, this.width, this.height);
};

function drawRect() {
    ctxMap.fillStyle = '#3d3d3d';
    ctxMap.fillRect(10, 10, 100, 100);
}

function clearRect() {
    ctxMap.clearRect(0, 0, 800, 500);
}

function clearCtxPlater() {
    ctxPlayer.clearRect(0, 0, gameWidth, gameHeight);
}

function drawBg() {
    ctxMap.drawImage(bg, 0, 0, 1600, 1000,
        0, 0, gameWidth, gameHeight);
}