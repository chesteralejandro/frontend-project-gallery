const gameScreen = document.getElementById('game-screen');
const startScreen = document.getElementById('start-screen');

window.addEventListener('keyup', (e) => {
	if (e.code !== 'Enter') return;

	startScreen.classList.add('hidden');
	gameScreen.classList.remove('hidden');
});
