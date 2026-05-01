const getElements = () => ({
	SPLASH_SCREEN: document.querySelector('.splash-screen'),
	GAME_SCREEN: document.getElementById('game-screen'),
	PANEL_OVERLAY: document.getElementById('panel-screen-overlay'),

	BUTTONS: {
		START_GAME: document.getElementById('btn-start-game'),
		HOW_TO: document.getElementById('btn-how-to'),
		EXIT_GAME: document.getElementById('btn-exit-game'),
		CLOSE_PANEL: document.getElementById('btn-close-panel'),
	},
});

export default getElements;
