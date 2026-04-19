const svgInput = document.getElementById('svg-input');
const preview = document.getElementById('svg-preview');

function showMessage(message) {
	preview.innerHTML = `<p style="color:#6B7280">${message}</p>`;
}

function isValidSVG(svgCode) {
	return svgCode.startsWith('<svg') && svgCode.endsWith('</svg>');
}

function renderSVG(svgCode) {
	preview.innerHTML = svgCode;
}

function extractColors(svgCode) {
	const hexColorRegex = /#([0-9a-fA-F]{3,6})\b/g;

	const matches = svgCode.match(hexColorRegex);

	if (!matches) {
		return [];
	}

	const uniqueColors = [...new Set(matches)];

	return uniqueColors;
}

svgInput.addEventListener('input', (e) => {
	const svgCode = e.target.value.trim();

	if (!svgCode) {
		showMessage('No SVG to display');
		return;
	}

	if (!isValidSVG(svgCode)) {
		showMessage('Invalid SVG');
		return;
	}

	renderSVG(svgCode);

	const colors = extractColors(svgCode);
	console.log(colors);
});
