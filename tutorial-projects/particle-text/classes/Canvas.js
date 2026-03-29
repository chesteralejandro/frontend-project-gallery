import Particle from './Particle.js';

class Canvas {
	constructor(elementId) {
		this.element = document.getElementById(elementId);
		this.context = this.element.getContext('2d', {
			willReadFrequently: true,
		});
		this.textAxis = {
			x: window.innerWidth / 2,
			y: window.innerHeight / 2,
		};
		this.particles = [];
		this.verticalOffset = 0;
		this.gap = 2;
		this.mouse = {
			radius: 8000,
			x: 0,
			y: 0,
		};
	}

	setTextGradient(color1, color2, color3) {
		const gradient = this.context.createLinearGradient(
			0,
			0,
			this.width,
			this.height,
		);

		gradient.addColorStop(0.3, color1);
		gradient.addColorStop(0.5, color2);
		gradient.addColorStop(0.7, color3);

		this.context.fillStyle = gradient;
	}

	setMouseAxis(event) {
		this.mouse.x = event.x;
		this.mouse.y = event.y;
	}

	setTextCenter() {
		this.context.textAlign = 'center';
		this.context.textBaseline = 'middle';
	}

	setScreenFull() {
		this.width = window.innerWidth;
		this.height = window.innerHeight;

		this.element.width = this.width;
		this.element.height = this.height;
	}

	setLetterSpacing(letterSpacing) {
		this.context.letterSpacing = `${letterSpacing}px`;
	}

	setFontStyle(size, family) {
		this.context.font = `${size}px ${family}`;
	}

	render() {
		this.animationId = requestAnimationFrame(() => this.render());

		this.runCanvasClear();

		this.particles.forEach((particle) => {
			particle.update();
			particle.draw();
		});
	}

	destroy() {
		cancelAnimationFrame(this.animationId);
	}

	runCanvasClear() {
		this.context.clearRect(0, 0, this.width, this.height);
	}

	runParticlesConversion() {
		this.particles = [];

		const imageData = this.context.getImageData(
			0,
			0,
			this.width,
			this.height,
		);
		const pixels = imageData.data;

		this.runCanvasClear();

		for (let y = 0; y < this.height; y += this.gap) {
			for (let x = 0; x < this.width; x += this.gap) {
				const index = (y * this.width + x) * 4;
				const alpha = pixels[index + 3];

				if (alpha == 0) continue;

				const red = pixels[index];
				const green = pixels[index + 1];
				const blue = pixels[index + 2];

				const color = `rgb(${red}, ${green}, ${blue})`;
				this.particles.push(new Particle(this, x, y, color));
			}
		}
	}

	wrapText(words, lineHeight) {
		this.runCanvasClear();

		const maxTextWidth = this.width * (lineHeight / 100);

		const textLines = [];

		let counter = 0;
		let textLine = '';

		for (const word of words.split(' ')) {
			const currentLine = textLine + word;

			if (this.context.measureText(currentLine).width > maxTextWidth) {
				textLine = word + ' ';
				counter++;
			} else {
				textLine = currentLine + ' ';
			}

			textLines[counter] = textLine;
		}

		const textHeight = lineHeight * counter;
		const textY = this.height / 2 - textHeight / 2 + this.verticalOffset;

		textLines.forEach((text, index) =>
			this.context.fillText(
				text,
				this.width / 2,
				textY + lineHeight * index,
			),
		);

		this.runParticlesConversion();
	}
}

export default Canvas;
