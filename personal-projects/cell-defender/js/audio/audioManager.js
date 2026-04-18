class AudioManager {
	constructor() {
		this.bgm = new Audio('./assets/audio/bgm/arrival.mp3');
		this.bgm.loop = true;
		this.bgm.volume = 0.3;

		this.sfx = {
			pill: new Audio('./assets/audio/sfx/pill.mp3'),
			enemySwallow: new Audio('./assets/audio/sfx/enemy_swallow.mp3'),
			enemyTurn: new Audio('./assets/audio/sfx/enemy_turn.mp3'),
			win: new Audio('./assets/audio/sfx/win.mp3'),
			gameOver: new Audio('./assets/audio/sfx/game_over.mp3'),
			hover: new Audio('./assets/audio/sfx/button_hover.mp3'),
		};

		this.fadeInterval = null;

		this.enabled = {
			bgm: true,
			sfx: true,
			enemyTurn: false,
		};
	}

	// ---------- BGM ----------
	fadeInBGM(duration = 1000) {
		clearInterval(this.fadeInterval);

		this.bgm.volume = 0;
		this.bgm.play();

		const step = 0.05;
		const intervalTime = duration * step;

		this.fadeInterval = setInterval(() => {
			if (this.bgm.volume < 0.5) {
				this.bgm.volume = Math.min(this.bgm.volume + step, 0.5);
			} else {
				clearInterval(this.fadeInterval);
			}
		}, intervalTime);
	}

	fadeOutBGM(duration = 1000) {
		clearInterval(this.fadeInterval);

		const step = 0.05;
		const intervalTime = duration * step;

		this.fadeInterval = setInterval(() => {
			if (this.bgm.volume > 0) {
				this.bgm.volume = Math.max(this.bgm.volume - step, 0);
			} else {
				clearInterval(this.fadeInterval);
				this.bgm.pause();
				this.bgm.currentTime = 0;
			}
		}, intervalTime);
	}

	// ---------- SFX ----------
	playSFX(name, options = {}) {
		if (!this.enabled.sfx) return;
		if (name === 'enemyTurn' && !this.enabled.enemyTurn) return;

		const { overlap = false, volume = 0.6, rate = 1 } = options;
		const sound = this.sfx[name];
		if (!sound) return;

		if (overlap) {
			const clone = sound.cloneNode();
			clone.volume = volume;
			clone.play();
		} else {
			sound.currentTime = 0;
			sound.volume = volume;
			sound.play();
		}
	}
}

export default AudioManager;
