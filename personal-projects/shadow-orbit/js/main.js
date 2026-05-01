import getElements from './constants/elements.js';

const ELEMENTS = getElements();
let currentState = 'menu';

function startGame() {
	currentState = 'playing';
	showGameScreen();
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

ELEMENTS.BUTTONS.START_GAME.addEventListener('click', startGame);
ELEMENTS.BUTTONS.HOW_TO.addEventListener('click', openPanel);
ELEMENTS.BUTTONS.CLOSE_PANEL.addEventListener('click', closePanel);
ELEMENTS.BUTTONS.EXIT_GAME.addEventListener('click', closeGame);
