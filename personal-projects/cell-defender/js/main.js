import ELEMENTS from './constants/elements.js';
import { TILE_LAYOUT_1 } from './constants/tilesLayouts.js';
import { TILES_ELEMENTS, TILES_CODES } from './constants/tiles.js';
import WHITE_CELL_CONFIG from './constants/whiteCellConfig.js';
import ENEMY_CONFIG from './constants/enemyConfig.js';
import GAME_CONFIG from './constants/gameConfig.js';

import WhiteCell from './entities/whiteCell.js';
import Enemy from './entities/enemy.js';

import AudioManager from './audio/audioManager.js';

class Game {
	constructor() {
		this.state = GAME_CONFIG.STATE.READY;
		this.score = GAME_CONFIG.SCORE;

		this.audio = new AudioManager();

		this.originalMap = structuredClone(TILE_LAYOUT_1);
		this.map = structuredClone(this.originalMap);

		this.totalPills = this.countPills(this.map);
		this.remainingPills = this.totalPills;

		this.whiteCell = new WhiteCell(
			WHITE_CELL_CONFIG,
			ELEMENTS.CHARACTERS.WHITE_CELL,
		);
		this.enemies = [
			new Enemy(ENEMY_CONFIG.BIRU, ELEMENTS.CHARACTERS.BIRU),
			new Enemy(ENEMY_CONFIG.BACU, ELEMENTS.CHARACTERS.BACU),
			new Enemy(ENEMY_CONFIG.GEMRU, ELEMENTS.CHARACTERS.GEMRU),
		];

		this.updateScoreUI();
		this.updateTilesUI();
		this.setListeners();
	}

	updateScoreUI() {
		ELEMENTS.SCORE.textContent = `Score: ${this.score}`;
	}

	updateTilesUI() {
		let tilesUIString = '';

		for (const tileRow of this.map) {
			for (const tile of tileRow) {
				tilesUIString += TILES_ELEMENTS[tile];
			}
		}

		ELEMENTS.TILES_CONTAINER.innerHTML = tilesUIString;
	}

	setListeners() {
		ELEMENTS.BUTTONS.START.addEventListener('click', () => {
			if (this.state === GAME_CONFIG.STATE.GAME_OVER) {
				this.resetGame();
			}

			ELEMENTS.SCREENS.START.classList.add('hidden');
			ELEMENTS.SCREENS.GAME.classList.remove('hidden');

			this.state = GAME_CONFIG.STATE.RUNNING;

			this.audio.fadeInBGM(2000);
		});

		ELEMENTS.BUTTONS.RESTART.addEventListener('click', () => {
			ELEMENTS.OVERLAYS.GAME_OVER.classList.add('hidden');
			this.resetGame();
			this.state = GAME_CONFIG.STATE.RUNNING;
			this.audio.fadeInBGM(2000);
		});

		ELEMENTS.BUTTONS.WIN_RESTART.addEventListener('click', () => {
			ELEMENTS.OVERLAYS.WIN.classList.add('hidden');
			this.resetGame();
			this.state = GAME_CONFIG.STATE.RUNNING;
			this.audio.fadeInBGM(2000);
		});

		window.addEventListener('keydown', (e) => {
			if (this.state !== GAME_CONFIG.STATE.RUNNING) return;

			if (Object.hasOwn(WHITE_CELL_CONFIG.KEYS, e.code)) {
				this.whiteCell.changeDirection(e.code);
			}
		});
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

		this.score = GAME_CONFIG.SCORE;
		this.remainingPills = this.totalPills;
		this.map = structuredClone(this.originalMap);

		this.updateScoreUI();
		this.updateTilesUI();
		this.updateFinalScoreUI();
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

			this.audio.playSFX('pill', { overlap: true, volume: 0.5 });

			this.remainingPills--;
			this.score += GAME_CONFIG.POINTS;

			this.updateScoreUI();
			this.updateTilesUI();

			// 🏅 check win
			if (this.remainingPills === 0) {
				this.triggerWin();
			}
		}

		if (
			this.state === GAME_CONFIG.STATE.RUNNING &&
			this.checkCollision(this.whiteCell, this.enemies)
		) {
			this.triggerGameOver();
		}

		requestAnimationFrame((time) => this.loop(time));
	}

	triggerGameOver() {
		if (this.state !== GAME_CONFIG.STATE.RUNNING) return;

		this.audio.fadeOutBGM(1000);

		this.updateFinalScoreUI();
		this.state = GAME_CONFIG.STATE.GAME_OVER;
		ELEMENTS.OVERLAYS.GAME_OVER.classList.remove('hidden');
	}

	triggerWin() {
		if (this.state !== GAME_CONFIG.STATE.RUNNING) return;

		this.audio.fadeOutBGM(1000);

		this.updateFinalScoreUI();
		this.state = GAME_CONFIG.STATE.WIN;
		ELEMENTS.OVERLAYS.WIN.classList.remove('hidden');
	}

	updateFinalScoreUI() {
		ELEMENTS.FINAL_SCORE.textContent = `Final Score: ${this.score}`;
		ELEMENTS.WIN_SCORE.textContent = `Final Score: ${this.score}`;
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

	countPills(map) {
		let count = 0;

		for (const row of map) {
			for (const tile of row) {
				if (tile === TILES_CODES.PILL) count++;
			}
		}

		return count;
	}
}

window.addEventListener('DOMContentLoaded', () => {
	const game = new Game();
	game.loop();
});
