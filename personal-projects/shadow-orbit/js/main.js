import ELEMENTS from '../js/constants/elements.js';

ELEMENTS.BUTTONS.EXIT_GAME.addEventListener('click', () => {
	window.close();
});

ELEMENTS.BUTTONS.HOW_TO.addEventListener('click', () =>
	ELEMENTS.PANEL_OVERLAY.classList.remove('hidden'),
);

ELEMENTS.BUTTONS.CLOSE_PANEL.addEventListener('click', () =>
	ELEMENTS.PANEL_OVERLAY.classList.add('hidden'),
);
