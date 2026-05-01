import getElements from './constants/elements.js';

import controller from './systems/controller.js';
import renderer from './systems/renderer.js';

const ELEMENTS = getElements();
const ctx = ELEMENTS.GAME_CANVAS.getContext('2d');
const player = {
	x: 0,
	y: 0,
	size: 20,
	speed: 4,
};

let currentState = 'menu';

function startGame() {
	currentState = 'playing';
	showGameScreen();
	resizeCanvas();
	gameLoop();
	initPlayer();
}

function initPlayer() {
	player.x = ELEMENTS.GAME_CANVAS.width / 2 - player.size / 2;
	player.y = ELEMENTS.GAME_CANVAS.height - 60;
}

function showGameScreen() {
	ELEMENTS.SPLASH_SCREEN.classList.add('hidden');
	ELEMENTS.GAME_SCREEN.classList.remove('hidden');
}

function showMenu() {
	ELEMENTS.GAME_SCREEN.classList.add('hidden');
	ELEMENTS.SPLASH_SCREEN.classList.remove('hidden');
}

function openPanel() {
	ELEMENTS.PANEL_OVERLAY.classList.remove('hidden');
}
function closePanel() {
	ELEMENTS.PANEL_OVERLAY.classList.add('hidden');
}

function closeGame() {
	// window.close();
	console.log('Shutting down...');
}

function gameLoop() {
	const canvas = ELEMENTS.GAME_CANVAS;

	renderer.clearGameScreen(ctx, canvas);
	updatePlayer();
	renderer.drawPlayer(ctx, player);

	requestAnimationFrame(gameLoop);
}

function updatePlayer() {
	const canvas = ELEMENTS.GAME_CANVAS;

	if (controller.w) player.y -= player.speed;
	if (controller.s) player.y += player.speed;
	if (controller.a) player.x -= player.speed;
	if (controller.d) player.x += player.speed;

	// boundaries
	if (player.x < 0) player.x = 0;
	if (player.x + player.size > canvas.width)
		player.x = canvas.width - player.size;

	if (player.y < 0) player.y = 0;
	if (player.y + player.size > canvas.height)
		player.y = canvas.height - player.size;
}

function resizeCanvas() {
	const container = ELEMENTS.GAME_CANVAS.parentElement;

	ELEMENTS.GAME_CANVAS.width = container.clientWidth;
	ELEMENTS.GAME_CANVAS.height = container.clientHeight;
}

ELEMENTS.BUTTONS.START_GAME.addEventListener('click', startGame);
ELEMENTS.BUTTONS.HOW_TO.addEventListener('click', openPanel);
ELEMENTS.BUTTONS.CLOSE_PANEL.addEventListener('click', closePanel);
ELEMENTS.BUTTONS.EXIT_GAME.addEventListener('click', closeGame);

window.addEventListener('resize', resizeCanvas);
