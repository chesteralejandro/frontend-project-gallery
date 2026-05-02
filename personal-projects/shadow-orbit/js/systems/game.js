class Game {
	constructor(canvas, ctx, player, controller, renderer) {
		this.currentState = 'menu';
		this.isRunning = false;
		this.canvas = canvas;
		this.ctx = ctx;
		this.player = player;
		this.controller = controller;
		this.renderer = renderer;
	}

	start() {
		if (this.isRunning) return;

		this.currentState = 'playing';
		this.isRunning = true;

		this.player.init(this.canvas);

		this.loop();
	}

	resize() {
		const container = this.canvas.parentElement;
		this.canvas.width = container.clientWidth;
		this.canvas.height = container.clientHeight;
	}

	loop() {
		if (!this.isRunning) return;

		this.renderer.clearGameScreen(this.ctx, this.canvas);

		this.player.update(this.canvas, this.controller);

		this.renderer.drawPlayer(this.ctx, this.player);

		requestAnimationFrame(() => this.loop());
	}
}

export default Game;
