import { TILES_CONTAINER, SCREENS, CHARACTERS } from './constants/elements.js';
import { TILE_LAYOUT_1 } from './constants/tilesLayouts.js';
import { TILES_ELEMENTS } from './constants/tiles.js';
import WHITE_CELL_CONFIG from './constants/whiteCellConfig.js';

import WhiteCell from './entities/whiteCell.js';

const whiteCell = new WhiteCell(
	WHITE_CELL_CONFIG,
	CHARACTERS.WHITE_CELL,
	TILE_LAYOUT_1,
);

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
	whiteCell.update(TILE_LAYOUT_1, time);
	whiteCell.animate();

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
