import { TILE_LAYOUT_1 } from './constants/tilesLayouts.js';
import { TILES_ELEMENTS } from './constants/tiles.js';
import WhiteCell from './entities/whiteCell.js';
import WHITE_CELL_CONFIG from './constants/whiteCellConfig.js';
import { TILES_CONTAINER, SCREENS, CHARACTERS } from './constants/elements.js';

const whiteCell = new WhiteCell(WHITE_CELL_CONFIG, CHARACTERS.WHITE_CELL);

function drawTilesLayout() {
	let tilesString = '';

	for (const tileRow of TILE_LAYOUT_1) {
		for (const tile of tileRow) {
			tilesString += TILES_ELEMENTS[tile];
		}
		tilesString += '<br />';
	}

	TILES_CONTAINER.innerHTML = tilesString;
}

function loop() {
	whiteCell.update();
	whiteCell.animate();
	requestAnimationFrame(loop);
}

drawTilesLayout();
loop();

window.addEventListener('keyup', (e) => {
	if (e.code !== 'Enter') return;

	SCREENS.START.classList.add('hidden');
	SCREENS.GAME.classList.remove('hidden');
});

window.addEventListener('keydown', (event) => {
	whiteCell.changeDirection(event.key);
});
