import ELEMENTS from './constants/elements.js';

let currentState = 'menu';

function startGame() {
	currentState = 'playing';
	console.log('Start mission');
}

function openPanel() {
	ELEMENTS.PANEL_OVERLAY.classList.remove('hidden');
}
function closePanel() {
	ELEMENTS.PANEL_OVERLAY.classList.add('hidden');
}

ELEMENTS.BUTTONS.START_GAME.addEventListener('click', startGame);
ELEMENTS.BUTTONS.HOW_TO.addEventListener('click', openPanel);
ELEMENTS.BUTTONS.CLOSE_PANEL.addEventListener('click', closePanel);
ELEMENTS.BUTTONS.EXIT_GAME.addEventListener('click', () => window.close());
