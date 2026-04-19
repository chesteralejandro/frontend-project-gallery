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
});
