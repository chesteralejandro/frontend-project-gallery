export default class WhiteCell {
	constructor(WHITE_CELL_CONFIG, WHITE_CELL_ELEMENT, MAP) {
		this.element = WHITE_CELL_ELEMENT;
		this.map = MAP;

		this.x = WHITE_CELL_CONFIG.X;
		this.y = WHITE_CELL_CONFIG.Y;
		this.z = WHITE_CELL_CONFIG.Z;

		this.renderX = this.x;
		this.renderY = this.y;

		this.size = WHITE_CELL_CONFIG.SIZE;
		this.keys = WHITE_CELL_CONFIG.KEYS;
		this.currentDirection = 'no_direction';

		this.moveDelay = 150;
		this.lastMove = 0;
	}

	isWall(x, y) {
		return this.map[y][x] === 1;
	}

	update(tileLayout, time) {
		if (time - this.lastMove < this.moveDelay) return;
		this.lastMove = time;

		const maxX = tileLayout[0].length - 1;
		const maxY = tileLayout.length - 1;

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
		this.currentDirection = newDirection;
	}
}
