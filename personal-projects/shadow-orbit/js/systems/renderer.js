class Renderer {
	clearGameScreen(ctx, canvas) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	drawPlayer(ctx, player) {
		ctx.fillStyle = '#00aeef';
		ctx.fillRect(player.x, player.y, player.size, player.size);
	}
}

export default new Renderer();
