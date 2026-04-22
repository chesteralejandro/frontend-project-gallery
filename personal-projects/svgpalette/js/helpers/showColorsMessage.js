import ELEMENTS from '../constants/elements.js';

function showColorsMessage() {
	ELEMENTS.colorPickers.innerHTML = `<p id="placeholder">
        No colors detected yet. Paste an SVG to edit its colors.
      </p>`;
}

export default showColorsMessage;
