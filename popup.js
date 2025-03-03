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
	
		setTimeout(() => {
			document.addEventListener('click', (e) => {
				const target = e.target;
				if (target.classList.contains('panel-tab-button')) {
					const activeTab = document.querySelector('.panel-tab-button.active');
					if (activeTab) {
						activeTab.classList.remove('active');
					}

					target.classList.add('active');
				}

				if (target.id === 'openPopupButton') {
						Panel.openPopupWindow();
				}
			});

			document.querySelector('.panel-tab-button').click();
		}, 150);
	}

	static async getManifestData() {
		const response = await fetch('./manifest.json');
		const data = await response.json();
		return data;
	}

	static async renderUI() {
		const manifest = await Panel.getManifestData();
		
		const preConstructedFrame = `
			<div class="panel-container">
				<div class="panel-frame">
					<header class="panel-header">
						<div class="panel-tabs">
							<button class="panel-tab-button" data-tab-target="misc">@{miscellaneous}</button>
							<button class="panel-tab-button" data-tab-target="letters">@{letters}</button>
							<button class="panel-tab-button" data-tab-target="scripts">@{scripts}</button>
						</div>
						<div class="panel-options">
							<button class="panel-tab-button" id="openPopupButton">Open Popup</button>
						</div>
					</header>
					<main class="panel-content">
						<div class="panel-tab-content" id="misc">

						</div>
					</main>
					<footer class="panel-footer">
						${manifest.name}&hairsp;<sup>${manifest.version}</sup>
					</footer
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

	static openPopupWindow() {
		browser.windows.create({
			url: browser.runtime.getURL("popup.html"),
			type: "popup",
			width: 816,
			height: 640
		});
}
}

(async () => {
	const locale = Locale.getInstance();
	const panel = new Panel();
})();
