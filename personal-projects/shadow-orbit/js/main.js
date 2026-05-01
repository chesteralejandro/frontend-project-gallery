const btnHowTo = document.getElementById('btn-how-to');
const btnClosePanel = document.getElementById('btn-close-panel');
const btnExitGame = document.getElementById('btn-exit');
const panelOverlay = document.getElementById('panel-screen-overlay');

btnExitGame.addEventListener('click', () => window.close());

btnHowTo.addEventListener('click', () =>
	panelOverlay.classList.remove('hidden'),
);

btnClosePanel.addEventListener('click', () =>
	panelOverlay.classList.add('hidden'),
);
