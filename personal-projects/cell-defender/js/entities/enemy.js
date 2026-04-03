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

		this.direction = null;

		this.moveDelay = 200;
		this.lastMove = 0;
	}

	isWall(x, y) {
		return this.map[y][x] === 1;
	}

	getRandomDirection() {
		const directions = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
		return directions[Math.floor(Math.random() * directions.length)];
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

	update(time, tileLayout) {
		if (time - this.lastMove < this.moveDelay) return;
		this.lastMove = time;

		// pick a valid random direction
		let tries = 0;
		let newDir;

		do {
			newDir = this.getRandomDirection();
			tries++;
		} while (!this.canMove(newDir, tileLayout) && tries < 10);

		this.direction = newDir;

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
			console.log('wall');
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
