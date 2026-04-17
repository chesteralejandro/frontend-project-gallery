import ELEMENTS from './constants/elements.js';
import { TILE_LAYOUT_1 } from './constants/tilesLayouts.js';
import { TILES_ELEMENTS } from './constants/tiles.js';
import WHITE_CELL_CONFIG from './constants/whiteCellConfig.js';
import ENEMY_CONFIG from './constants/enemyConfig.js';
import GAME_CONFIG from './constants/gameConfig.js';

import WhiteCell from './entities/whiteCell.js';
import Enemy from './entities/enemy.js';

class Game {
	constructor() {
		this.state = GAME_CONFIG.STATE.READY;

		this.whiteCell = new WhiteCell(
			WHITE_CELL_CONFIG,
			ELEMENTS.CHARACTERS.WHITE_CELL,
			TILE_LAYOUT_1,
		);

		this.enemies = [
			new Enemy(
				ENEMY_CONFIG.BIRU,
				ELEMENTS.CHARACTERS.BIRU,
				TILE_LAYOUT_1,
			),
			new Enemy(
				ENEMY_CONFIG.BACU,
				ELEMENTS.CHARACTERS.BACU,
				TILE_LAYOUT_1,
			),
			new Enemy(
				ENEMY_CONFIG.GEMRU,
				ELEMENTS.CHARACTERS.GEMRU,
				TILE_LAYOUT_1,
			),
		];

		this.drawTilesLayout();
		this.setListeners();
	}

	drawTilesLayout() {
		let tilesString = '';

		for (const tileRow of TILE_LAYOUT_1) {
			for (const tile of tileRow) {
				tilesString += TILES_ELEMENTS[tile];
			}
		}

		ELEMENTS.TILES_CONTAINER.innerHTML = tilesString;
	}

	showStartScreen() {
		ELEMENTS.SCREENS.GAME.classList.add('hidden');
		ELEMENTS.SCREENS.START.classList.remove('hidden');

		this.resetGame();
	}

	triggerGameOver() {
		this.state = GAME_CONFIG.STATE.GAME_OVER;

		setTimeout(() => {
			alert('Game Over! You were infected 💀');
			this.showStartScreen();
		}, 100);
	}

	resetGame() {
		this.state = GAME_CONFIG.STATE.READY;

		// reset player
		this.whiteCell.x = WHITE_CELL_CONFIG.X;
		this.whiteCell.y = WHITE_CELL_CONFIG.Y;
		this.whiteCell.renderX = this.whiteCell.x;
		this.whiteCell.renderY = this.whiteCell.y;
		this.whiteCell.currentDirection = null;
		this.whiteCell.nextDirection = null;

		// reset enemies
		const configs = [
			ENEMY_CONFIG.BIRU,
			ENEMY_CONFIG.BACU,
			ENEMY_CONFIG.GEMRU,
		];

		this.enemies.forEach((enemy, i) => {
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
					TILE_LAYOUT_1[y][x] = 8;
				}
			});
		});

		this.drawTilesLayout();
	}

	loop(time) {
		if (this.state !== GAME_CONFIG.STATE.RUNNING) {
			requestAnimationFrame((time) => this.loop(time));
			return;
		}

		this.whiteCell.update(time, TILE_LAYOUT_1, this.drawTilesLayout);
		this.whiteCell.animate();

		for (const enemy of this.enemies) {
			enemy.update(time, TILE_LAYOUT_1, this.whiteCell);
			enemy.animate();

			if (enemy.x === this.whiteCell.x && enemy.y === this.whiteCell.y) {
				this.triggerGameOver();
			}
		}

		requestAnimationFrame((time) => this.loop(time));
	}

	setListeners() {
		ELEMENTS.MENU_BUTTONS.START.addEventListener('click', () => {
			if (this.state === GAME_CONFIG.STATE.GAME_OVER) {
				this.resetGame();
			}

			ELEMENTS.SCREENS.START.classList.add('hidden');
			ELEMENTS.SCREENS.GAME.classList.remove('hidden');

			this.state = GAME_CONFIG.STATE.RUNNING;
		});

		window.addEventListener('keydown', (e) => {
			if (this.state !== GAME_CONFIG.STATE.RUNNING) return;

			if (Object.hasOwn(WHITE_CELL_CONFIG.KEYS, e.code)) {
				this.whiteCell.changeDirection(e.code);
			}
		});
	}
}

window.addEventListener('DOMContentLoaded', () => {
	const game = new Game();
	game.loop();
});
