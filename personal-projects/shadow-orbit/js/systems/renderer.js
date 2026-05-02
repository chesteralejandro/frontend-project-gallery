class Renderer {
	clearGameScreen(ctx, canvas) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	drawPlayer(ctx, player) {
		if (!player.image.complete) return;
		ctx.strokeStyle = 'red';
		ctx.strokeRect(player.x, player.y, player.size, player.size);

		ctx.drawImage(
			player.image,

			// source (from spritesheet)
			player.sprite.x,
			player.sprite.y,
			player.sprite.width,
			player.sprite.height,

			// destination (on canvas)
			player.x,
			player.y,
			player.size,
			player.size,
		);
	}
}

export default new Renderer();
