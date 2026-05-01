class Player {
	constructor() {
		this.x = 0;
		this.y = 0;
		this.size = 20;
		this.speed = 4;
	}

	init(canvas) {
		this.x = canvas.width / 2 - this.size / 2;
		this.y = canvas.height - 60;
	}

	update(canvas, controller) {
		if (controller.w) this.y -= this.speed;
		if (controller.s) this.y += this.speed;
		if (controller.a) this.x -= this.speed;
		if (controller.d) this.x += this.speed;

		// boundaries
		if (this.x < 0) this.x = 0;
		if (this.x + this.size > canvas.width)
			this.x = canvas.width - this.size;

		if (this.y < 0) this.y = 0;
		if (this.y + this.size > canvas.height)
			this.y = canvas.height - this.size;
	}
}

export default new Player();
