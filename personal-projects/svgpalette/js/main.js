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

function renderColorPickers(colors) {
	// Clear previous UI
	colorPickers.innerHTML = '';

	if (colors.length === 0) {
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
	});
}

function normalizeHex(hex) {
	if (hex.length === 4) {
		return '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
	}
	return hex;
}

svgInput.addEventListener('input', (e) => {
	let svgCode = e.target.value.trim();
	svgCode = ensureSVGNamespace(svgCode);

	if (!svgCode) {
		showMessage('No SVG to display');
		return;
	}

	if (!isValidSVG(svgCode)) {
		showMessage('Invalid SVG');
		return;
	}

	renderSVG(svgCode);

	const allColors = extractSVGColors(svgCode);

	const hexColors = allColors.filter((c) => c.startsWith('#'));
	const specialColors = allColors.filter((c) => !c.startsWith('#'));

	renderColorPickers(hexColors);

	console.log('SPECIAL:', specialColors);
});
