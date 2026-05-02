class Player {
	constructor() {
		this.x = 0;
		this.y = 0;
		this.width = 68;
		this.height = 60;
		this.speed = 4;

		this.image = new Image();
		this.image.src = './assets/images/player_ship.png';

		this.sprite = {
			x: 175,
			y: 65,
			width: 310,
			height: 275,
		};
	}

	init(canvas) {
		this.x = canvas.width / 2 - this.width / 2;
		this.y = canvas.height - this.height - 20;
	}

	update(canvas, controller) {
		if (controller.w) this.y -= this.speed;
		if (controller.s) this.y += this.speed;
		if (controller.a) this.x -= this.speed;
		if (controller.d) this.x += this.speed;

		// boundaries
		if (this.x < 0) this.x = 0;
		if (this.x + this.width > canvas.width)
			this.x = canvas.width - this.width;

		if (this.y < 0) this.y = 0;
		if (this.y + this.height > canvas.height)
			this.y = canvas.height - this.height;
	}
}

export default new Player();
