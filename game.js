window.onload = init;

var map, ctxMap;
var player, ctxPlayer;
var drawBtn, clearBtn;
var gameWidth = 800,
    gameHeight = 500;

var bg = new Image();
bg.src = 'images/bg.jpg';

var tiles = new Image();
tiles.src = 'images/sprite.png';

function init() {
    map = document.getElementById('map');
    ctxMap = map.getContext('2d');

    player = document.getElementById('player');
    ctxPlayer = map.getContext('2d');

    map.width = gameWidth;
    map.height = gameHeight;

    player.width = gameWidth;
    player.height = gameHeight;

    drawBtn = document.getElementById('drawBtn');
    clearBtn = document.getElementById('clearBtn');

    drawBtn.addEventListener('click', drawRect, false);
    clearBtn.addEventListener('click', clearRect, false);

    drawBg();
    drawPlayer();
}

function drawRect() {
    ctxMap.fillStyle = '#3d3d3d';
    ctxMap.fillRect(10, 10, 100, 100);
}

function clearRect() {
    ctxMap.clearRect(0, 0, 800, 500);
}

function drawBg() {
    ctxMap.drawImage(bg, 0, 0, 1600, 1000,
        0, 0, gameWidth, gameHeight);
}

function drawPlayer() {
    ctxPlayer.drawImage(tiles, 0, 0, 200, 147,
        0, 0, 200, 147);
}