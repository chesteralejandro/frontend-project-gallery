import { MAP1 } from './constants/maps.js';
import TILES from './constants/tiles.js';

const gameScreen = document.getElementById('game-screen');
const startScreen = document.getElementById('start-screen');
const map = document.getElementById('map');

window.addEventListener('keyup', (e) => {
	if (e.code !== 'Enter') return;

	startScreen.classList.add('hidden');
	gameScreen.classList.remove('hidden');
});

function drawMap() {
	let tilesString = '';

	for (const arr of MAP1) {
		for (const tile of arr) {
			tilesString += TILES[tile];
		}
		tilesString += '<br />';
	}

	map.innerHTML = tilesString;
}

drawMap();
