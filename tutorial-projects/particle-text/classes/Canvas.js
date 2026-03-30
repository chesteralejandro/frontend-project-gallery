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

	clear() {
		this.context.clearRect(0, 0, this.width, this.height);
	}

	clearParticles() {
		this.particles = [];
	}

	destroy() {
		cancelAnimationFrame(this.animationId);
	}

	render() {
		this.animationId = requestAnimationFrame(() => this.render());

		this.clear();

		this.particles.forEach((particle) => {
			particle.update();
			particle.draw();
		});
	}

	generateParticlesFromText() {
		const { gap, height, width } = this;

		const imageData = this.context.getImageData(0, 0, width, height);
		const pixels = imageData.data;

		this.clear();
		this.clearParticles();

		for (let y = 0; y < height; y += gap) {
			for (let x = 0; x < width; x += gap) {
				const index = (y * width + x) * 4;
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

	setFontStyle(size, family) {
		this.context.font = `${size}px ${family}`;
	}

	setLetterSpacing(letterSpacing) {
		this.context.letterSpacing = `${letterSpacing}px`;
	}

	setMouseAxis(event) {
		this.mouse.x = event.x;
		this.mouse.y = event.y;
	}

	setScreenFull() {
		this.width = window.innerWidth;
		this.height = window.innerHeight;

		this.element.width = this.width;
		this.element.height = this.height;
	}

	setTextCenter() {
		this.context.textAlign = 'center';
		this.context.textBaseline = 'middle';
	}

	setTextGradient(color1, color2, color3) {
		const { height, width } = this;

		const gradient = this.context.createLinearGradient(0, 0, width, height);

		gradient.addColorStop(0.3, color1);
		gradient.addColorStop(0.5, color2);
		gradient.addColorStop(0.7, color3);

		this.context.fillStyle = gradient;
	}

	wrapText(words, lineHeight) {
		this.clear();

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

		this.generateParticlesFromText();
	}
}

export default Canvas;
