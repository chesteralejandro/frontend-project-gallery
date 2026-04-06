const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const orbitariumScreen = document.getElementById('orbitarium-screen');
const bgMusic = document.getElementById('bg-music');

startBtn.addEventListener('click', () => {
	bgMusic.volume = 0;
	bgMusic.play();

	const fade = setInterval(() => {
		if (bgMusic.volume >= 0.09) {
			return clearInterval(fade);
		}

		bgMusic.volume += 0.01;
	}, 300);

	startScreen.classList.remove('active');
	orbitariumScreen.classList.add('active');
});
