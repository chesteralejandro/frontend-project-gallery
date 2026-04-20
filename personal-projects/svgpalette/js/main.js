const svgInput = document.getElementById('svg-input');
const preview = document.getElementById('svg-preview');
const colorPickers = document.getElementById('color-pickers');

import ensureSVGNamespace from './helpers/ensureSVGNamespace.js';

function showMessage(message) {
	preview.innerHTML = `<p style="color:#6B7280">${message}</p>`;
}

function isValidSVG(svgCode) {
	return svgCode.startsWith('<svg') && svgCode.endsWith('</svg>');
}

function renderSVG(svgCode) {
	preview.innerHTML = svgCode;
}

function escapeRegex(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function extractSVGColors(svgCode) {
	const attrRegex = /(fill|stroke)="([^"]+)"/g;

	const colors = [];
	let match;

	while ((match = attrRegex.exec(svgCode)) !== null) {
		const value = match[2];

		// Skip "none"
		if (value === 'none') continue;

		colors.push(value);
	}

	return [...new Set(colors)];
}

function renderColorPickers(colors = [], specialColors = []) {
	colorPickers.innerHTML = '';

	if (colors.length === 0 && specialColors.length === 0) {
		colorPickers.innerHTML = `
      <p id="placeholder">
        No colors detected yet. Paste an SVG to edit its colors.
      </p>
    `;
		return;
	}

	colors.forEach((color) => {
		const wrapper = document.createElement('div');
		wrapper.style.display = 'flex';
		wrapper.style.alignItems = 'center';
		wrapper.style.gap = '8px';

		const input = document.createElement('input');
		input.type = 'color';
		input.value = normalizeHex(color);

		const label = document.createElement('span');
		label.textContent = color;
		label.style.fontFamily = 'JetBrains Mono';
		label.style.fontSize = '12px';

		wrapper.appendChild(input);
		wrapper.appendChild(label);

		colorPickers.appendChild(wrapper);

		let currentColor = color;

		input.addEventListener('input', (e) => {
			const newColor = e.target.value;

			updateSVGColor(currentColor, newColor);

			// Update reference so next change works
			currentColor = newColor;
		});

		input.addEventListener('change', () => {
			// re-sync UI after user finishes picking
			const allColors = extractSVGColors(svgInput.value);
			const specialColors = allColors.filter((c) => c === 'currentColor');
			const hexColors = allColors.filter((c) =>
				/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(c),
			);

			renderColorPickers(hexColors, specialColors);
		});
	});

	specialColors.forEach((color) => {
		const wrapper = document.createElement('div');
		wrapper.style.display = 'flex';
		wrapper.style.alignItems = 'center';
		wrapper.style.gap = '8px';

		const label = document.createElement('span');
		label.textContent = 'currentColor';
		label.style.fontFamily = 'JetBrains Mono';
		label.style.fontSize = '12px';

		const button = document.createElement('button');
		button.textContent = 'Convert';
		button.style.padding = '4px 8px';
		button.style.cursor = 'pointer';

		button.addEventListener('click', () => {
			convertCurrentColor();
		});

		wrapper.appendChild(label);
		wrapper.appendChild(button);

		colorPickers.appendChild(wrapper);
	});
}

function convertCurrentColor(defaultColor = '#ffffff') {
	let svgCode = svgInput.value;

	// Replace ALL currentColor with default
	svgCode = svgCode.replace(/currentColor/g, defaultColor);

	svgInput.value = svgCode;
	renderSVG(svgCode);

	// Re-run full pipeline
	const allColors = extractSVGColors(svgCode);
	const specialColors = allColors.filter((c) => c === 'currentColor');
	const hexColors = allColors.filter((c) =>
		/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(c),
	);

	renderColorPickers(hexColors, specialColors);
}

function normalizeHex(hex) {
	if (hex.length === 4) {
		return '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
	}
	return hex;
}

function updateSVGColor(oldColor, newColor) {
	const regex = new RegExp(escapeRegex(oldColor), 'g');
	let updatedSVG = svgInput.value.replace(regex, newColor);

	svgInput.value = updatedSVG;
	renderSVG(updatedSVG);
}

svgInput.addEventListener('input', (e) => {
	const svgCode = e.target.value.trim();
	const svgWithNamespace = ensureSVGNamespace(svgCode);

	svgInput.value = svgWithNamespace;

	if (!svgWithNamespace) {
		return showMessage('No SVG to display');
	}

	if (!isValidSVG(svgWithNamespace)) {
		return showMessage('Invalid SVG');
	}

	renderSVG(svgWithNamespace);

	const allColors = extractSVGColors(svgWithNamespace);
	const specialColors = allColors.filter((c) => c === 'currentColor');
	const hexColors = allColors.filter((c) =>
		/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(c),
	);

	renderColorPickers(hexColors, specialColors);
});
