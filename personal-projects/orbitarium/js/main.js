const startScreen = document.querySelector('.start-screen');
const orbitariumScreen = document.querySelector('.orbitarium-screen');
const orbitariumCamera = document.querySelector('.orbitarium-camera');
const panel = document.querySelector('.planet-panel');

const planets = document.querySelectorAll('.planet');
const orbits = document.querySelectorAll('.orbit');

const bgMusic = document.getElementById('bg-music');
const startBtn = document.getElementById('start-btn');
const planetName = document.getElementById('planet-name');
const planetDesc = document.getElementById('planet-description');

import PLANET_DATA from './constants/planetData.js';

let activePlanet = null;
let isIntroPlaying = true;

document.body.addEventListener('click', (e) => {
	if (isIntroPlaying) return;

	// only reset if clicking outside planets
	if (!e.target.closest('.planet')) {
		focusPlanetOrbitState('running');
		resetView();
	}
});

planets.forEach((planet) => {
	planet.addEventListener('click', (e) => {
		e.stopPropagation();
		if (isIntroPlaying) return;

		if (activePlanet === planet) {
			focusPlanetOrbitState('running');
			hidePanel();
			resetView();
			return;
		}

		activePlanet = planet;

		focusPlanetOrbitState('paused');
		focusPlanetDim(planet);
		focusCamera(planet);
		showPanel(planet);
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

	setTimeout(() => focusPlanetOrbitState('running'), 1500);

	setTimeout(() => {
		isIntroPlaying = false;
	}, 7000);
});

function focusPlanetOrbitState(animationState) {
	orbits.forEach((o) => (o.style.animationPlayState = animationState));
}

function focusPlanetDim(focusPlanet) {
	planets.forEach((p) => p.classList.add('dim'));
	focusPlanet.classList.remove('dim');
}

function focusCamera(focusPlanet) {
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
}

function resetView() {
	activePlanet = null;
	orbitariumCamera.style.transform = `translate(0, 0) scale(1)`;
	planets.forEach((planet) => planet.classList.remove('dim'));
	hidePanel();
}

function showPanel(planet) {
	const key = planet.dataset.planet;
	const data = PLANET_DATA[key];

	planetName.textContent = data.name;
	planetDesc.textContent = data.desc;

	panel.classList.add('active');
}

function hidePanel() {
	panel.classList.remove('active');
}
