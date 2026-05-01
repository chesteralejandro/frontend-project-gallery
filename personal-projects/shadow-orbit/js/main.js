import getElements from './constants/elements.js';

const ELEMENTS = getElements();
const ctx = ELEMENTS.GAME_CANVAS.getContext('2d');

let currentState = 'menu';

function startGame() {
	currentState = 'playing';
	showGameScreen();
	resizeCanvas();
	gameLoop();
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
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// temporary test drawing
	ctx.fillStyle = 'white';
	ctx.fillRect(canvas.width / 2 - 10, canvas.height - 40, 20, 20);

	requestAnimationFrame(gameLoop);
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
