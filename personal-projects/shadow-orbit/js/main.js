import getElements from './constants/elements.js';

import Game from './systems/game.js';
import controller from './systems/controller.js';
import renderer from './systems/renderer.js';

import player from './entities/player.js';

const ELEMENTS = getElements();
const canvas = ELEMENTS.GAME_CANVAS;
const ctx = ELEMENTS.GAME_CANVAS.getContext('2d');
const game = new Game(canvas, ctx, player, controller, renderer);

function startGame() {
	showGameScreen();
	game.resize();
	game.start();
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
window.addEventListener('resize', () => game.resize());
