const canvas = document.getElementById('starfield');
const btnHowTo = document.getElementById('btn-how-to');
const btnClosePanel = document.getElementById('btn-close-panel');
const btnExitGame = document.getElementById('btn-exit');
const panelOverlay = document.getElementById('panel-screen-overlay');

const ctx = canvas.getContext('2d');

const STAR_COLOR = 'white';
const STAR_LAYERS = [
	{ count: 80, speed: 0.3, size: 1 },
	{ count: 50, speed: 0.6, size: 1.5 },
	{ count: 30, speed: 1, size: 2 },
];

const STARS = [];

STAR_LAYERS.forEach((layer) => {
	for (let i = 0; i < layer.count; i++) {
		STARS.push({
			x: Math.random() * window.innerWidth,
			y: Math.random() * window.innerHeight,
			speed: layer.speed,
			size: layer.size,
		});
	}
});

function setCanvasSize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = STAR_COLOR;

	STARS.forEach((star) => {
		star.y += star.speed;

		if (star.y > canvas.height) {
			star.y = 0;
			star.x = Math.random() * canvas.width;
		}

		ctx.fillRect(star.x, star.y, star.size, star.size);
	});

	requestAnimationFrame(animate);
}

setCanvasSize();
animate();

// Resize Fix
window.addEventListener('resize', setCanvasSize);

btnExitGame.addEventListener('click', () => window.close());

btnHowTo.addEventListener('click', () =>
	panelOverlay.classList.remove('hidden'),
);

btnClosePanel.addEventListener('click', () =>
	panelOverlay.classList.add('hidden'),
);
