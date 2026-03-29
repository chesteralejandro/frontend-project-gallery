import Canvas from '../classes/Canvas.js';

const input = document.getElementById('text-input');

const CANVAS = {
	ID: 'canvas',
	MESSAGE: 'Hover Over the Text to See Animation',
	TEXT: {
		FAMILY: 'arial',
		SIZE: 80,
		COLOR: '#FFF',
		SPACING: 5,
	},
	STROKE: {
		COLOR: 'orange',
		WIDTH: 3,
	},
};

let canvasInstance;

function drawCanvas() {
	if (canvasInstance) {
		canvasInstance.destroy();
	}

	const canvas = new Canvas(CANVAS.ID);

	canvas.setScreenFull();
	canvas.setTextCenter();

	canvas.setFontStyle(CANVAS.TEXT.SIZE, CANVAS.TEXT.FAMILY);
	canvas.setLetterSpacing(CANVAS.TEXT.SPACING);

	canvas.setTextGradient('#74ebd5', '#ff00ff', '#9face6');

	canvas.wrapText(CANVAS.MESSAGE, CANVAS.TEXT.SIZE);
	canvas.render();

	// Debounce keyup
	let timeout;
	input.addEventListener('keyup', (event) => {
		if (event.code === 'Space') return;
		clearTimeout(timeout);

		timeout = setTimeout(() => {
			canvas.setTextGradient('#74ebd5', '#ff00ff', '#9face6');
			canvas.wrapText(event.target.value, CANVAS.TEXT.SIZE);
			canvas.render();
		}, 500);
	});

	window.addEventListener('mousemove', (event) => {
		canvas.setMouseAxis(event);
	});
}

window.addEventListener('load', drawCanvas);
window.addEventListener('resize', drawCanvas);
