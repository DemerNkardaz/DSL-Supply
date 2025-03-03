class Locale {
	constructor() {
		this.usrLanguage = Locale.supportedLanguages.includes(navigator.language.slice(0, 2)) ? navigator.language.slice(0, 2) : "en";
	}

	static supportedLanguages = ['ru', 'en'];

	static instance = new Locale();
	static translations = {};

	static getInstance() {
		return Locale.instance;
	}

	static async loadTranslations() {
		if (Object.keys(Locale.translations).length === 0) {
			const response = await fetch('./locales.json');
			const data = await response.json();
			Locale.translations = data;
		}
	}

	static async read(key) {
		await Locale.loadTranslations();
		const language = Locale.instance.usrLanguage;
		return Locale.translations[language]?.[key] || key;
	}
}

class Panel {
	constructor() {
		this.render();
	}

	async render() {
		const frame = await Panel.renderUI();
		document.body.innerHTML = frame;
	}

	static async renderUI() {
		const preConstructedFrame = `
			<div class="panel-container">
				<div class="panel-frame">
					<div class="panel-tabs">
						<button class="panel-tab">@{miscellaneous}</button>
						<button class="panel-tab">@{letters}</button>
						<button class="panel-tab">@{scripts}</button>
					</div>
				</div>
			</div>
		`;

		const matches = [...preConstructedFrame.matchAll(/@\{(.*?)\}/g)];
		const keysToReplace = matches.map(match => match[1]);

		const translations = await Promise.all(keysToReplace.map(key => Locale.read(key)));

		let postConstructedFrame = preConstructedFrame;
		keysToReplace.forEach((key, index) => {
			const translation = translations[index];
			const regex = new RegExp(`@{${key}}`, 'g');
			postConstructedFrame = postConstructedFrame.replace(regex, translation);
		});

		return postConstructedFrame;
	}
}

(async () => {
	const locale = Locale.getInstance();
	const panel = new Panel();
})();
