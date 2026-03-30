import Canvas from '../classes/Canvas.js';

const input = document.getElementById('text-input');

const CANVAS = {
	ID: 'canvas',
	MESSAGE: 'Hover Over the Text to See Animation',
	TEXT: {
		FAMILY: 'arial',
		SIZE: 80,
		COLORS: ['#74ebd5', '#ff00ff', '#9face6'],
		SPACING: 5,
	},
};
const DEBOUNCE_DELAY = 500;

const canvas = new Canvas(CANVAS.ID);
let timeout; // Debounce Drawing

function drawCanvas() {
	clearTimeout(timeout);

	timeout = setTimeout(() => {
		canvas.setScreenFull();
		canvas.setTextCenter();

		canvas.setFontStyle(CANVAS.TEXT.SIZE, CANVAS.TEXT.FAMILY);
		canvas.setLetterSpacing(CANVAS.TEXT.SPACING);

		canvas.setTextGradient(...CANVAS.TEXT.COLORS);

		canvas.wrapText(input.value || CANVAS.MESSAGE, CANVAS.TEXT.SIZE);
		canvas.render();
	}, DEBOUNCE_DELAY);
}

input.addEventListener('keyup', drawCanvas);
window.addEventListener('load', drawCanvas);
window.addEventListener('resize', drawCanvas);
window.addEventListener('mousemove', (e) => canvas.setMouseAxis(e));
