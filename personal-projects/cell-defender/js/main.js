import ELEMENTS from './constants/elements.js';
import { TILE_LAYOUT_1 } from './constants/tilesLayouts.js';
import { TILES_ELEMENTS, TILES_CODES } from './constants/tiles.js';
import WHITE_CELL_CONFIG from './constants/whiteCellConfig.js';
import ENEMY_CONFIG from './constants/enemyConfig.js';
import GAME_CONFIG from './constants/gameConfig.js';

import WhiteCell from './entities/whiteCell.js';
import Enemy from './entities/enemy.js';

class Game {
	constructor() {
		this.state = GAME_CONFIG.STATE.READY;
		this.originalMap = structuredClone(TILE_LAYOUT_1);
		this.map = structuredClone(this.originalMap);

		this.whiteCell = new WhiteCell(
			WHITE_CELL_CONFIG,
			ELEMENTS.CHARACTERS.WHITE_CELL,
		);

		this.enemies = [
			new Enemy(ENEMY_CONFIG.BIRU, ELEMENTS.CHARACTERS.BIRU),
			new Enemy(ENEMY_CONFIG.BACU, ELEMENTS.CHARACTERS.BACU),
			new Enemy(ENEMY_CONFIG.GEMRU, ELEMENTS.CHARACTERS.GEMRU),
		];

		this.drawTilesLayout();
		this.setListeners();
	}

	drawTilesLayout() {
		let tilesString = '';

		for (const tileRow of this.map) {
			for (const tile of tileRow) {
				tilesString += TILES_ELEMENTS[tile];
			}
		}

		ELEMENTS.TILES_CONTAINER.innerHTML = tilesString;
	}

	setListeners() {
		ELEMENTS.BUTTONS.START.addEventListener('click', () => {
			if (this.state === GAME_CONFIG.STATE.GAME_OVER) {
				this.resetGame();
			}

			ELEMENTS.SCREENS.START.classList.add('hidden');
			ELEMENTS.SCREENS.GAME.classList.remove('hidden');

			this.state = GAME_CONFIG.STATE.RUNNING;
		});

		ELEMENTS.BUTTONS.RESTART.addEventListener('click', () => {
			this.resetGame();
			this.state = GAME_CONFIG.STATE.RUNNING;
		});

		window.addEventListener('keydown', (e) => {
			if (this.state !== GAME_CONFIG.STATE.RUNNING) return;

			if (Object.hasOwn(WHITE_CELL_CONFIG.KEYS, e.code)) {
				this.whiteCell.changeDirection(e.code);
			}
		});
	}

	triggerGameOver() {
		if (this.state !== GAME_CONFIG.STATE.RUNNING) return;

		this.state = GAME_CONFIG.STATE.GAME_OVER;
		ELEMENTS.SCREENS.GAME_OVER.classList.remove('hidden');
	}

	resetGame() {
		this.state = GAME_CONFIG.STATE.READY;
		ELEMENTS.SCREENS.GAME_OVER.classList.add('hidden');

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
		this.map = structuredClone(this.originalMap);
		this.drawTilesLayout();
	}

	loop(time) {
		if (this.state !== GAME_CONFIG.STATE.RUNNING) {
			requestAnimationFrame((time) => this.loop(time));
			return;
		}

		this.whiteCell.update(time, this.map);
		this.whiteCell.animate();

		for (const enemy of this.enemies) {
			enemy.update(time, this.map, this.whiteCell);
			enemy.animate();
		}

		if (this.map[this.whiteCell.y][this.whiteCell.x] === TILES_CODES.PILL) {
			this.map[this.whiteCell.y][this.whiteCell.x] = TILES_CODES.NONE;
			this.drawTilesLayout();
		}

		if (
			this.state === GAME_CONFIG.STATE.RUNNING &&
			this.checkCollision(this.whiteCell, this.enemies)
		) {
			this.triggerGameOver();
		}

		requestAnimationFrame((time) => this.loop(time));
	}

	checkCollision(player, enemies) {
		return enemies.some((enemy) => {
			const sameTile = enemy.x === player.x && enemy.y === player.y;

			const crossedPath =
				enemy.x === player.prevX &&
				enemy.y === player.prevY &&
				enemy.prevX === player.x &&
				enemy.prevY === player.y;

			return sameTile || crossedPath;
		});
	}
}

window.addEventListener('DOMContentLoaded', () => {
	const game = new Game();
	game.loop();
});
