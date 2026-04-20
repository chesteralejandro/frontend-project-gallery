import ELEMENTS from '../constants/elements.js';

function showPreviewMessage(message) {
	ELEMENTS.preview.innerHTML = `<p style="color:#6B7280">${message}</p>`;
}

export default showPreviewMessage;
