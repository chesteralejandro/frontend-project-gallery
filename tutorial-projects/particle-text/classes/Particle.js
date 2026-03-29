class Particle {
	constructor(canvas, x, y, color) {
		this.canvas = canvas;
		this.x = Math.random() * this.canvas.width;
		this.y = 0;
		this.color = color;
		this.originX = x;
		this.originY = y;
		this.size = this.canvas.gap;
		this.distanceX = 0;
		this.distanceY = 0;
		this.velocityX = 0;
		this.velocityY = 0;
		this.force = 0;
		this.angle = 0;
		this.distance = 0;
		this.friction = Math.random() * 0.6 + 0.15;
		this.ease = Math.random() * 0.05 + 0.02;
	}

	draw() {
		this.canvas.context.fillStyle = this.color;
		this.canvas.context.fillRect(this.x, this.y, this.size, this.size);
	}

	update() {
		this.distanceX = this.canvas.mouse.x - this.x;
		this.distanceY = this.canvas.mouse.y - this.y;
		this.distance =
			this.distanceX * this.distanceX + this.distanceY * this.distanceY;
		this.distance = Math.max(this.distance, 0.0001);
		this.force = this.canvas.mouse.radius / this.distance;

		if (this.distance < this.canvas.mouse.radius) {
			this.angle = Math.atan2(this.distanceY, this.distanceX);
			this.velocityX += this.force * Math.cos(this.angle);
			this.velocityY += this.force * Math.sin(this.angle);
		}

		this.x +=
			(this.velocityX *= this.friction) +
			(this.originX - this.x) * this.ease;
		this.y +=
			(this.velocityY *= this.friction) +
			(this.originY - this.y) * this.ease;
	}
}

export default Particle;
