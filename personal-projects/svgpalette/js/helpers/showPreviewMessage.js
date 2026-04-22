import ELEMENTS from '../constants/elements.js';

function showPreviewMessage(message) {
	ELEMENTS.preview.innerHTML = `
  <div class="preview-empty">
    <img src="./assets/icons/preview.svg" alt="" class="preview-icon" />
    <p class="preview-title">${message}</p>
    <p class="preview-hint">Paste an SVG above to see it rendered here</p>
  </div>
`;
}

export default showPreviewMessage;
