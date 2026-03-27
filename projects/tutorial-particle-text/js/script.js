import Canvas from '../classes/Canvas.js';
import Input from '../classes/Input.js';

const CANVAS = {
	ID: 'canvas',
	MESSAGE: 'This is how you can do multiline centered text',
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

window.addEventListener('load', drawCanvas);
window.addEventListener('resize', drawCanvas);

function drawCanvas() {
	const canvas = new Canvas(CANVAS.ID);
	const input = new Input();

	canvas.setScreenFull();
	canvas.setTextCenter();

	canvas.setFontStyle(CANVAS.TEXT.SIZE, CANVAS.TEXT.FAMILY);
	canvas.setLetterSpacing(CANVAS.TEXT.SPACING);

	canvas.setTextGradient('#74ebd5', 'fuchsia', '#9face6');

	// canvas.setFillText(CANVAS.MESSAGE);
	// canvas.setFillColor(CANVAS.TEXT.COLOR);

	// canvas.setStrokeText(CANVAS.MESSAGE);
	// canvas.setStrokeColor(CANVAS.STROKE.COLOR);
	// canvas.setStrokeWidth(CANVAS.STROKE.WIDTH);

	// canvas.drawVerticalLine();
	// canvas.drawHorizontalLine();

	canvas.wrapText(CANVAS.MESSAGE, CANVAS.TEXT.SIZE);
	canvas.render();

	input.element.addEventListener('keyup', (event) => {
		if (event.code === 'Space') return;

		canvas.setTextGradient('#74ebd5', 'fuchsia', '#9face6');
		canvas.wrapText(event.target.value, CANVAS.TEXT.SIZE);
		canvas.render();
	});

	window.addEventListener('mousemove', (event) => {
		canvas.setMouseAxis(event);
	});
}
