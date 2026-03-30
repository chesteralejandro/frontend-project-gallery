const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const layers = [
	{ count: 80, speed: 0.3, size: 1 },
	{ count: 50, speed: 0.6, size: 1.5 },
	{ count: 30, speed: 1, size: 2 },
];

const stars = [];

layers.forEach((layer) => {
	for (let i = 0; i < layer.count; i++) {
		stars.push({
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height,
			speed: layer.speed,
			size: layer.size,
		});
	}
});

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = 'white';

	stars.forEach((star) => {
		star.y += star.speed;

		if (star.y > canvas.height) {
			star.y = 0;
			star.x = Math.random() * canvas.width;
		}

		ctx.fillRect(star.x, star.y, star.size, star.size);
	});

	requestAnimationFrame(animate);
}

animate();

/* Resize fix */
window.addEventListener('resize', () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});
