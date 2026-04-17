const ELEMENTS = {
	TILES_CONTAINER: document.getElementById('tiles-container'),
	SCREENS: {
		START: document.getElementById('start-screen'),
		GAME: document.getElementById('game-screen'),
		GAME_OVER: document.getElementById('game-over-screen'),
		WIN: document.getElementById('win-screen'),
	},
	CHARACTERS: {
		WHITE_CELL: document.getElementById('white-cell'),
		BIRU: document.getElementById('biru'),
		BACU: document.getElementById('bacu'),
		GEMRU: document.getElementById('gemru'),
	},
	BUTTONS: {
		START: document.getElementById('start-btn'),
		HOW: document.getElementById('how-btn'),
		EXIT: document.getElementById('exit-btn'),
		RESTART: document.getElementById('restart-btn'),
		WIN_RESTART: document.getElementById('win-restart-btn'),
	},
};

export default ELEMENTS;
