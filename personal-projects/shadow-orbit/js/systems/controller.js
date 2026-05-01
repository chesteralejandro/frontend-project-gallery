class Controller {
	constructor() {
		this.w = false;
		this.a = false;
		this.s = false;
		this.d = false;

		this.initListeners();
	}

	initListeners() {
		window.addEventListener('keydown', (e) => {
			if (e.key === 'w') this.w = true;
			if (e.key === 'a') this.a = true;
			if (e.key === 's') this.s = true;
			if (e.key === 'd') this.d = true;
		});

		window.addEventListener('keyup', (e) => {
			if (e.key === 'w') this.w = false;
			if (e.key === 'a') this.a = false;
			if (e.key === 's') this.s = false;
			if (e.key === 'd') this.d = false;
		});
	}
}

export default new Controller();
