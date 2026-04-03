export default class WhiteCell {
	constructor(WHITE_CELL_CONFIG, WHITE_CELL_ELEMENT, MAP) {
		this.element = WHITE_CELL_ELEMENT;
		this.map = MAP;

		this.x = WHITE_CELL_CONFIG.X;
		this.y = WHITE_CELL_CONFIG.Y;
		this.z = WHITE_CELL_CONFIG.Z;
		this.size = WHITE_CELL_CONFIG.SIZE;

		this.renderX = this.x;
		this.renderY = this.y;

		this.keys = WHITE_CELL_CONFIG.KEYS;
		this.currentDirection = null;
		this.nextDirection = null;
		this.moveDelay = 150;
		this.lastMove = 0;
	}

	isWall(x, y) {
		return this.map[y][x] === 1;
	}

	canMove(direction, tileLayout) {
		let testX = this.x;
		let testY = this.y;

		switch (direction) {
			case this.keys.ArrowUp:
				testY--;
				break;
			case this.keys.ArrowDown:
				testY++;
				break;
			case this.keys.ArrowLeft:
				testX--;
				break;
			case this.keys.ArrowRight:
				testX++;
				break;
		}

		const maxX = tileLayout[0].length - 1;
		const maxY = tileLayout.length - 1;

		// Boundary Check
		if (testX < 0 || testX > maxX || testY < 0 || testY > maxY) {
			return false;
		}

		// Wall Check
		if (this.isWall(testX, testY)) return false;

		return true;
	}

	update(tileLayout, time) {
		if (time - this.lastMove < this.moveDelay) return;
		this.lastMove = time;

		if (
			this.nextDirection &&
			this.canMove(this.nextDirection, tileLayout)
		) {
			this.currentDirection = this.nextDirection;
			this.nextDirection = null;
		}

		let nextX = this.x;
		let nextY = this.y;

		switch (this.currentDirection) {
			case this.keys.ArrowUp:
				nextY--;
				this.z = -90;
				break;
			case this.keys.ArrowDown:
				nextY++;
				this.z = 90;
				break;
			case this.keys.ArrowLeft:
				nextX--;
				this.z = 180;
				break;
			case this.keys.ArrowRight:
				nextX++;
				this.z = 0;
				break;
		}

		const maxX = tileLayout[0].length - 1;
		const maxY = tileLayout.length - 1;

		// Boundary Check
		if (nextX < 0 || nextX > maxX || nextY < 0 || nextY > maxY) return;
		// Wall Check
		if (this.isWall(nextX, nextY)) return;

		this.x = nextX;
		this.y = nextY;
	}

	animate() {
		const lerpFactor = 0.2;

		this.renderX += (this.x - this.renderX) * lerpFactor;
		this.renderY += (this.y - this.renderY) * lerpFactor;

		const positionX = this.renderX * this.size;
		const positionY = this.renderY * this.size;

		const style = `transform: translate(${positionX}px, ${positionY}px) rotateZ(${this.z}deg)`;

		this.element.setAttribute('style', style);
	}

	changeDirection(newDirection) {
		this.nextDirection = newDirection;
	}
}
