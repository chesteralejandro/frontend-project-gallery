import ELEMENTS from './constants/elements.js';

import ensureSVGNamespace from './helpers/ensureSVGNamespace.js';
import showPreviewSVG from './helpers/showPreviewSVG.js';
import showPreviewMessage from './helpers/showPreviewMessage.js';
import isValidSVG from './helpers/isValidSVG.js';
import escapeRegex from './helpers/escapeRegex.js';
import normalizeHex from './helpers/normalizeHex.js';

function downloadSVG() {
	const svgContent = ELEMENTS.svgInput.value.trim();

	if (!svgContent) {
		return showPreviewMessage('Nothing to download');
	}

	if (!isValidSVG(svgContent)) {
		return showPreviewMessage('Invalid SVG. Cannot download.');
	}

	const blob = new Blob([svgContent], { type: 'image/svg+xml' });
	const url = URL.createObjectURL(blob);

	const a = document.createElement('a');
	a.href = url;
	a.download = 'svgpalette.svg';

	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);

	URL.revokeObjectURL(url);
}

function uploadSVG() {
	const svgContent = ELEMENTS.svgInput.value.trim();
	const svgWithNamespace = ensureSVGNamespace(svgContent);

	if (!svgWithNamespace) {
		return showPreviewMessage('No SVG to display');
	}

	if (!isValidSVG(svgWithNamespace)) {
		return showPreviewMessage('Invalid SVG');
	}

	ELEMENTS.svgInput.value = svgWithNamespace;

	showPreviewSVG(svgWithNamespace);

	const allColors = extractSVGColors(svgWithNamespace);
	const specialColors = allColors.filter((c) => c === 'currentColor');
	const hexColors = allColors.filter((c) =>
		/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(c),
	);

	renderColorPickers(hexColors, specialColors);
}

function extractSVGColors(svgCode) {
	const attrRegex = /(fill|stroke)="([^"]+)"/g;

	const colors = [];
	let match;

	while ((match = attrRegex.exec(svgCode)) !== null) {
		const value = match[2];

		if (value === 'none') continue;

		colors.push(value);
	}

	return [...new Set(colors)];
}

function renderColorPickers(colors = [], specialColors = []) {
	ELEMENTS.colorPickers.innerHTML = '';

	if (colors.length === 0 && specialColors.length === 0) {
		ELEMENTS.colorPickers.innerHTML = `
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

		ELEMENTS.colorPickers.appendChild(wrapper);

		let currentColor = color;

		input.addEventListener('input', (e) => {
			const newColor = e.target.value;

			updateSVGColor(currentColor, newColor);

			// Update reference so next change works
			currentColor = newColor;
		});

		input.addEventListener('change', () => {
			// re-sync UI after user finishes picking
			const allColors = extractSVGColors(ELEMENTS.svgInput.value);
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

		ELEMENTS.colorPickers.appendChild(wrapper);
	});
}

function convertCurrentColor(defaultColor = '#ffffff') {
	let svgCode = ELEMENTS.svgInput.value;

	// Replace ALL currentColor with default
	svgCode = svgCode.replace(/currentColor/g, defaultColor);

	ELEMENTS.svgInput.value = svgCode;
	showPreviewSVG(svgCode);

	// Re-run full pipeline
	const allColors = extractSVGColors(svgCode);
	const specialColors = allColors.filter((c) => c === 'currentColor');
	const hexColors = allColors.filter((c) =>
		/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(c),
	);

	renderColorPickers(hexColors, specialColors);
}

function updateSVGColor(oldColor, newColor) {
	const regex = new RegExp(escapeRegex(oldColor), 'g');
	let updatedSVG = ELEMENTS.svgInput.value.replace(regex, newColor);

	ELEMENTS.svgInput.value = updatedSVG;
	showPreviewSVG(updatedSVG);
}

ELEMENTS.btnDownload.addEventListener('click', downloadSVG);
ELEMENTS.svgInput.addEventListener('input', uploadSVG);
