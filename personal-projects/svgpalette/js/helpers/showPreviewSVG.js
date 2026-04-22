import ELEMENTS from '../constants/elements.js';

function showPreviewSVG(svgCode) {
	ELEMENTS.preview.innerHTML = svgCode;
}

export default showPreviewSVG;
