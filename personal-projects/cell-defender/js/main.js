import { TILES_CONTAINER, SCREENS, CHARACTERS } from './constants/elements.js';
import { TILE_LAYOUT_1 } from './constants/tilesLayouts.js';
import { TILES_ELEMENTS } from './constants/tiles.js';
import WHITE_CELL_CONFIG from './constants/whiteCellConfig.js';
import {
	BIRU_CONFIG,
	BACU_CONFIG,
	GEMRU_CONFIG,
} from './constants/enemyConfig.js';

import WhiteCell from './entities/whiteCell.js';
import Enemy from './entities/enemy.js';

const whiteCell = new WhiteCell(
	WHITE_CELL_CONFIG,
	CHARACTERS.WHITE_CELL,
	TILE_LAYOUT_1,
);

const biru = new Enemy(BIRU_CONFIG, CHARACTERS.BIRU, TILE_LAYOUT_1);
const bacu = new Enemy(BACU_CONFIG, CHARACTERS.BACU, TILE_LAYOUT_1);
const gemru = new Enemy(GEMRU_CONFIG, CHARACTERS.GEMRU, TILE_LAYOUT_1);

const enemies = [biru, bacu, gemru];

function drawTilesLayout() {
	let tilesString = '';

	for (const tileRow of TILE_LAYOUT_1) {
		for (const tile of tileRow) {
			tilesString += TILES_ELEMENTS[tile];
		}
	}

	TILES_CONTAINER.innerHTML = tilesString;
}

function loop(time) {
	whiteCell.update(time, TILE_LAYOUT_1, drawTilesLayout);
	whiteCell.animate();

	for (const enemy of enemies) {
		enemy.update(time, TILE_LAYOUT_1);
		enemy.animate();
	}
	// biru.update(time, TILE_LAYOUT_1);
	// biru.animate();

	// if (biru.x === whiteCell.x && biru.y === whiteCell.y) {
	// 	alert('Game Over');
	// }

	requestAnimationFrame(loop);
}

drawTilesLayout();
loop();

window.addEventListener('keydown', (e) => {
	if (e.code === 'Enter') {
		SCREENS.START.classList.add('hidden');
		SCREENS.GAME.classList.remove('hidden');
	}

	if (Object.hasOwn(WHITE_CELL_CONFIG.KEYS, e.code)) {
		whiteCell.changeDirection(e.code);
	}
});
