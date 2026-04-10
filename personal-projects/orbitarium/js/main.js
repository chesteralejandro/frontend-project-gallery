const startScreen = document.querySelector('.start-screen');
const orbitariumScreen = document.querySelector('.orbitarium-screen');
const orbitariumCamera = document.querySelector('.orbitarium-camera');
const panel = document.querySelector('.planet-panel');

const planets = document.querySelectorAll('.planet');
const orbits = document.querySelectorAll('.orbit');

const bgMusic = document.getElementById('bg-music');
const welcomeVoice = document.getElementById('welcome-voice');
const planetVoice = document.getElementById('planet-voice');
const startBtn = document.getElementById('start-btn');
const planetName = document.getElementById('planet-name');
const planetDesc = document.getElementById('planet-description');

import PLANET_DATA from './constants/planetData.js';

let isIntroPlaying = true;
let activePlanet = null;
let panelRAF = null;

const BG_VOLUME = 0.09;
const VOICE_VOLUME = 0.3;

planetVoice.onended = () => {
	bgMusic.volume = BG_VOLUME;
};

document.body.addEventListener('click', (e) => {
	if (isIntroPlaying) return;

	// Only reset if clicking outside planets
	if (!e.target.closest('.planet')) {
		focusPlanetOrbitState('running');
		resetView();
	}
});

planets.forEach((planet) => {
	planet.addEventListener('mouseenter', () => {
		if (activePlanet || isIntroPlaying) return;
		planet.closest('.orbit').style.animationPlayState = 'paused';
	});

	planet.addEventListener('mouseleave', () => {
		if (activePlanet || isIntroPlaying) return;
		planet.closest('.orbit').style.animationPlayState = 'running';
	});

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
		showPanel(planet);

		if (planet.dataset.planet === 'sun') {
			orbitariumCamera.style.transform = `translate(0, 0) scale(1.2)`;
			return;
		}

		focusCamera(planet);
	});
});

startBtn.addEventListener('click', () => {
	startBtn.style.transform = 'scale(0.95)';

	// UI transition
	setTimeout(() => {
		startScreen.classList.remove('active');
		orbitariumScreen.classList.add('active');
	}, 150);

	// Lock interaction
	isIntroPlaying = true;

	// --- Background music ---
	bgMusic.volume = 0;
	bgMusic.play();

	// Smooth fade-in (very subtle, cinematic)
	const fade = setInterval(() => {
		if (bgMusic.volume >= 0.05) {
			return clearInterval(fade);
		}
		bgMusic.volume += 0.005;
	}, 300);

	// --- Start orbital motion slightly delayed ---
	setTimeout(() => {
		focusPlanetOrbitState('running');
	}, 1200);

	// --- Voice timing (key part) ---
	setTimeout(() => {
		welcomeVoice.currentTime = 0;
		welcomeVoice.volume = VOICE_VOLUME;
		welcomeVoice.play();

		// Lower music under narration
		bgMusic.volume = 0.03;
	}, 800);

	// --- When narration ends ---
	welcomeVoice.onended = () => {
		isIntroPlaying = false;

		// Bring music back up slightly
		const rise = setInterval(() => {
			if (bgMusic.volume >= BG_VOLUME) {
				return clearInterval(rise);
			}
			bgMusic.volume += 0.005;
		}, 200);
	};
});

function focusPlanetOrbitState(animationState) {
	orbits.forEach((o) => (o.style.animationPlayState = animationState));
}

function focusPlanetDim(focusPlanet) {
	planets.forEach((p) => p.classList.add('dim'));
	focusPlanet.classList.remove('dim');
}

function focusCamera(focusPlanet) {
	// Get focusPlanet's position
	const rect = focusPlanet.getBoundingClientRect();
	const centerX = window.innerWidth / 2;
	const centerY = window.innerHeight / 2;

	const planetX = rect.left + rect.width / 2;
	const planetY = rect.top + rect.height / 2;

	const offsetX = centerX - planetX;
	const offsetY = centerY - planetY;

	// Focus camera effect
	orbitariumCamera.style.transform = `
			translate(${offsetX}px, ${offsetY}px) scale(1.4)
		`;
}

function resetView() {
	activePlanet = null;
	orbitariumCamera.style.transform = `translate(0, 0) scale(1)`;
	planets.forEach((planet) => planet.classList.remove('dim'));

	// 🔊 stop voice
	planetVoice.pause();
	planetVoice.currentTime = 0;

	bgMusic.volume = BG_VOLUME;

	hidePanel();
}

function showPanel(planet) {
	const key = planet.dataset.planet;
	const data = PLANET_DATA[key];

	planetName.textContent = data.name;
	planetDesc.textContent = data.desc;

	panel.classList.add('active');

	// 🔊 STOP previous voice
	planetVoice.pause();
	planetVoice.currentTime = 0;

	bgMusic.volume = 0.02;

	// 🔊 PLAY new voice
	if (data.name) {
		console.log(data.name);
		planetVoice.src = `./assets/audio/voice/${key}.mp3`;
		planetVoice.volume = VOICE_VOLUME;
		planetVoice.play();
	}

	cancelAnimationFrame(panelRAF);
	trackPanelPosition();
}

function hidePanel() {
	panel.classList.remove('active');
	cancelAnimationFrame(panelRAF);
}

function trackPanelPosition() {
	if (!activePlanet) return;

	const rect = activePlanet.getBoundingClientRect();
	const panelRect = panel.getBoundingClientRect();

	let x = rect.left + rect.width / 2;
	let y = rect.top;

	// Default: above the planet
	let offsetY = -20;
	let translateY = -100;

	// 🧠 Flip if too close to top
	if (y - panelRect.height < 20) {
		offsetY = rect.height + 10;
		translateY = 0;
	}

	// Clamp horizontally
	const padding = 16;

	if (x - panelRect.width / 2 < padding) {
		x = panelRect.width / 2 + padding;
	}

	if (x + panelRect.width / 2 > window.innerWidth - padding) {
		x = window.innerWidth - panelRect.width / 2 - padding;
	}

	panel.style.transform = `
    translate(${x}px, ${y + offsetY}px)
    translate(-50%, ${translateY}%)
  `;

	panelRAF = requestAnimationFrame(trackPanelPosition);
}
