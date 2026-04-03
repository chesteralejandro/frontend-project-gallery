export default class Enemy {
	constructor(config, element, map) {
		this.element = element;
		this.map = map;

		this.x = config.X;
		this.y = config.Y;
		this.z = config.Z;
		this.size = config.SIZE;

		// For Smooth Movement
		this.renderX = this.x;
		this.renderY = this.y;

		this.direction = 'ArrowRight'; // default
		this.opposites = {
			ArrowUp: 'ArrowDown',
			ArrowDown: 'ArrowUp',
			ArrowLeft: 'ArrowRight',
			ArrowRight: 'ArrowLeft',
		};

		this.moveDelay = 200;
		this.lastMove = 0;
	}

	isWall(x, y) {
		return this.map[y][x] === 1;
	}

	getValidDirections(tileLayout) {
		const directions = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

		return directions.filter((dir) => {
			// ❌ don't reverse unless no choice
			if (dir === this.opposites[this.direction]) return false;

			return this.canMove(dir, tileLayout);
		});
	}

	getBestDirection(player, tileLayout) {
		const validDirs = this.getValidDirections(tileLayout);

		if (validDirs.length === 0) {
			// allow reverse if stuck
			return this.opposites[this.direction];
		}

		let bestDir = validDirs[0];
		let shortestDistance = Infinity;

		for (const dir of validDirs) {
			let x = this.x;
			let y = this.y;

			switch (dir) {
				case 'ArrowUp':
					y--;
					break;
				case 'ArrowDown':
					y++;
					break;
				case 'ArrowLeft':
					x--;
					break;
				case 'ArrowRight':
					x++;
					break;
			}

			// distance to player
			const dx = player.x - x;
			const dy = player.y - y;
			const distance = Math.abs(dx) + Math.abs(dy); // Manhattan distance

			if (distance < shortestDistance) {
				shortestDistance = distance;
				bestDir = dir;
			}
		}

		return bestDir;
	}

	canMove(direction, tileLayout) {
		let x = this.x;
		let y = this.y;

		switch (direction) {
			case 'ArrowUp':
				y--;
				break;
			case 'ArrowDown':
				y++;
				break;
			case 'ArrowLeft':
				x--;
				break;
			case 'ArrowRight':
				x++;
				break;
		}

		const maxX = tileLayout[0].length - 1;
		const maxY = tileLayout.length - 1;

		if (x < 0 || x > maxX || y < 0 || y > maxY) return false;

		if (this.isWall(x, y)) return false;

		return true;
	}

	update(time, tileLayout, player) {
		if (time - this.lastMove < this.moveDelay) return;
		this.lastMove = time;

		// 👻 choose smarter direction
		this.direction = this.getBestDirection(player, tileLayout);

		let nextX = this.x;
		let nextY = this.y;

		switch (this.direction) {
			case 'ArrowUp':
				nextY--;
				this.z = -90;
				break;
			case 'ArrowDown':
				nextY++;
				this.z = 90;
				break;
			case 'ArrowLeft':
				nextX--;
				this.z = 180;
				break;
			case 'ArrowRight':
				nextX++;
				this.z = 0;
				break;
		}

		const maxX = tileLayout[0].length - 1;
		const maxY = tileLayout.length - 1;

		if (nextX < 0 || nextX > maxX || nextY < 0 || nextY > maxY) return;

		if (this.isWall(nextX, nextY)) {
			return;
		}

		this.x = nextX;
		this.y = nextY;
	}

	animate() {
		const lerp = 0.2;

		this.renderX += (this.x - this.renderX) * lerp;
		this.renderY += (this.y - this.renderY) * lerp;

		const x = this.renderX * this.size;
		const y = this.renderY * this.size;

		this.element.style.transform = `translate(${x}px, ${y}px) rotateZ(${this.z}deg)`;
	}
}
