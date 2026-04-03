export default class WhiteCell {
	constructor(WHITE_CELL_CONFIG, WHITE_CELL_ELEMENT) {
		this.whiteCell = WHITE_CELL_CONFIG;
		this.element = WHITE_CELL_ELEMENT;

		this.x = WHITE_CELL_CONFIG.X;
		this.y = WHITE_CELL_CONFIG.Y;
		this.z = WHITE_CELL_CONFIG.Z;
		this.size = WHITE_CELL_CONFIG.SIZE;

		this.key = WHITE_CELL_CONFIG.KEY;
		this.direction = 'no_direction';
	}

	update() {
		switch (this.direction) {
			case this.key.ArrowUp:
				if (this.y == 0) return;
				this.y--;
				this.z = -90;
				break;
			case this.key.ArrowDown:
				if (this.y == 10) return;
				this.y++;
				this.z = 90;
				this.rotate = 0;
				break;
			case this.key.ArrowLeft:
				if (this.x == 0) return;
				this.x--;
				this.z = 180;
				break;
			case this.key.ArrowRight:
				if (this.x == 19) return;
				this.x++;
				this.z = 0;
		}
	}

	animate() {
		const positionX = this.x * this.size;
		const positionY = this.y * this.size;
		const style = `transform: translate(${positionX}px, ${positionY}px) rotateZ(${this.z}deg)`;

		this.element.setAttribute('style', style);
	}

	changeDirection(newDirection) {
		this.direction = newDirection;
	}
}
