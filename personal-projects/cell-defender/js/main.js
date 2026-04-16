import ELEMENTS from './constants/elements.js';
import { TILE_LAYOUT_1 } from './constants/tilesLayouts.js';
import { TILES_ELEMENTS } from './constants/tiles.js';
import WHITE_CELL_CONFIG from './constants/whiteCellConfig.js';
import ENEMY_CONFIG from './constants/enemyConfig.js';

import WhiteCell from './entities/whiteCell.js';
import Enemy from './entities/enemy.js';

const whiteCell = new WhiteCell(
	WHITE_CELL_CONFIG,
	ELEMENTS.CHARACTERS.WHITE_CELL,
	TILE_LAYOUT_1,
);

const GAME_STATE = {
	READY: 'ready',
	RUNNING: 'running',
	GAME_OVER: 'game_over',
};

let gameState = GAME_STATE.READY;

const enemies = [
	new Enemy(ENEMY_CONFIG.BIRU, ELEMENTS.CHARACTERS.BIRU, TILE_LAYOUT_1),
	new Enemy(ENEMY_CONFIG.BACU, ELEMENTS.CHARACTERS.BACU, TILE_LAYOUT_1),
	new Enemy(ENEMY_CONFIG.GEMRU, ELEMENTS.CHARACTERS.GEMRU, TILE_LAYOUT_1),
];

function drawTilesLayout() {
	let tilesString = '';

	for (const tileRow of TILE_LAYOUT_1) {
		for (const tile of tileRow) {
			tilesString += TILES_ELEMENTS[tile];
		}
	}

	ELEMENTS.TILES_CONTAINER.innerHTML = tilesString;
}

function showStartScreen() {
	ELEMENTS.SCREENS.GAME.classList.add('hidden');
	ELEMENTS.SCREENS.START.classList.remove('hidden');

	resetGame();
}

function triggerGameOver() {
	gameState = GAME_STATE.GAME_OVER;

	setTimeout(() => {
		alert('Game Over! You were infected 💀');
		showStartScreen();
	}, 100);
}

function resetGame() {
	gameState = GAME_STATE.READY;

	// reset player
	whiteCell.x = WHITE_CELL_CONFIG.X;
	whiteCell.y = WHITE_CELL_CONFIG.Y;
	whiteCell.renderX = whiteCell.x;
	whiteCell.renderY = whiteCell.y;
	whiteCell.currentDirection = null;
	whiteCell.nextDirection = null;

	// reset enemies
	const configs = [BIRU_CONFIG, BACU_CONFIG, GEMRU_CONFIG];

	enemies.forEach((enemy, i) => {
		enemy.x = configs[i].X;
		enemy.y = configs[i].Y;
		enemy.renderX = enemy.x;
		enemy.renderY = enemy.y;
		enemy.direction = 'ArrowRight';
	});

	// reset map (IMPORTANT — deep copy)
	TILE_LAYOUT_1.forEach((row, y) => {
		row.forEach((tile, x) => {
			if (tile === 0 && Math.random() < 0.2) {
				TILE_LAYOUT_1[y][x] = 8; // restore pills loosely (simple reset)
			}
		});
	});

	drawTilesLayout();
}

function loop(time) {
	if (gameState !== GAME_STATE.RUNNING) {
		requestAnimationFrame(loop);
		return;
	}

	whiteCell.update(time, TILE_LAYOUT_1, drawTilesLayout);
	whiteCell.animate();

	for (const enemy of enemies) {
		enemy.update(time, TILE_LAYOUT_1, whiteCell, triggerGameOver);
		enemy.animate();

		if (enemy.x === whiteCell.x && enemy.y === whiteCell.y) {
			triggerGameOver();
		}
	}

	requestAnimationFrame(loop);
}

ELEMENTS.MENU_BUTTONS.START.addEventListener('click', () => {
	if (gameState === GAME_STATE.GAME_OVER) {
		resetGame();
	}

	ELEMENTS.SCREENS.START.classList.add('hidden');
	ELEMENTS.SCREENS.GAME.classList.remove('hidden');

	gameState = GAME_STATE.RUNNING;
});

window.addEventListener('keydown', (e) => {
	if (gameState !== GAME_STATE.RUNNING) return;

	if (Object.hasOwn(WHITE_CELL_CONFIG.KEYS, e.code)) {
		whiteCell.changeDirection(e.code);
	}
});

window.addEventListener('DOMContentLoaded', () => {
	drawTilesLayout();
	loop();
});
