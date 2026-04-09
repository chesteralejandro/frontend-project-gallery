const bgMusic = document.getElementById('bg-music');
const startBtn = document.getElementById('start-btn');

const startScreen = document.querySelector('.start-screen');
const orbitariumScreen = document.querySelector('.orbitarium-screen');
const orbitariumCamera = document.querySelector('.orbitarium-camera');

const planets = document.querySelectorAll('.planet');

let isIntroPlaying = true;
let activePlanet = null;

document.body.addEventListener('click', () => {
	resetView();
});

planets.forEach((planet) => {
	planet.addEventListener('click', (e) => {
		e.stopPropagation();

		if (isIntroPlaying) return;
		if (activePlanet === planet) return resetView();

		activePlanet = planet;

		focusView(planet);
	});
});

startBtn.addEventListener('click', () => {
	startScreen.classList.remove('active');
	orbitariumScreen.classList.add('active');

	bgMusic.volume = 0;
	bgMusic.play();

	const fade = setInterval(() => {
		if (bgMusic.volume >= 0.09) {
			return clearInterval(fade);
		}

		bgMusic.volume += 0.01;
	}, 300);

	setTimeout(() => {
		isIntroPlaying = false;
	}, 7000);
});

function focusView(focusPlanet) {
	// mark focusPlanet as active
	planets.forEach((p) => p.classList.remove('active'));
	focusPlanet.classList.add('active');

	// get focusPlanet's position
	const rect = focusPlanet.getBoundingClientRect();
	const centerX = window.innerWidth / 2;
	const centerY = window.innerHeight / 2;

	const planetX = rect.left + rect.width / 2;
	const planetY = rect.top + rect.height / 2;

	const offsetX = centerX - planetX;
	const offsetY = centerY - planetY;

	// apply transform
	orbitariumCamera.style.transform = `
			translate(${offsetX}px, ${offsetY}px) scale(1.4)
		`;

	orbitariumCamera.classList.add('focus-active');
}

function resetView() {
	activePlanet = null;

	orbitariumCamera.style.transform = `translate(0, 0) scale(1)`;
	orbitariumCamera.classList.remove('focus-active');

	planets.forEach((planet) => planet.classList.remove('active'));
}
