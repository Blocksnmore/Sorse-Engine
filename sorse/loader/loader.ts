interface sorseGameDataInterface {
	name: string;
	author: string;
	version: string;
	description: string;
	gameScripts: string[];
}

var sorseInternalGameData: sorseGameDataInterface = {
	name: 'Sorse Engine Game',
	gameScripts: [],
	author: 'Sorse Engine Developers',
	version: '1.0.0',
	description:
		'A Game using Sorse Engine, a 2D game engine written in Typescript.',
};

function sorseLog(text: string, file: string = 'Core') {
	console.log(
		`[Sorse:${file.substring(0, 1).toUpperCase()}${file
			.substring(1)
			.toLowerCase()}] ${text}`
	);
}

function sorseMakeElement(type: keyof HTMLElementTagNameMap) {
	const element = document.createElement(type);
	document.getElementsByTagName('body')[0].appendChild(element);
	return element;
}

function sorseLoadScriptFile(path: string) {
	const element = sorseMakeElement('script') as HTMLScriptElement;
	element.src = path;
	element.className = 'sorse_loaded_script';
	return element;
}

class SorseGame {
	constructor({
		name,
		gameScripts,
		author,
		version,
		description,
	}: sorseGameDataInterface) {
		sorseLog(`Loading ${name} Version ${version} by ${author}`, 'Loader');
		sorseInternalGameData = {
			name,
			gameScripts,
			author,
			version,
			description,
		};
		this.loadGame();
	}
	async loadGame() {
		if (!document.getElementsByTagName('body')[0]) {
			throw new Error(
				'[Sorse:Loader] No body tag found! The engine needs this to load the game!'
			);
		}

		document.title = `${sorseInternalGameData.name} | Created with Sorse Engine`;
		document.getElementsByTagName('body')[0].style.backgroundColor =
			'#181a1b';

		const directions = sorseMakeElement('div') as HTMLDivElement;
		directions.id = 'sorse_load_directions';

		const dir = sorseMakeElement('p') as HTMLParagraphElement;
		dir.innerHTML =
			'Due to browser limitations you need to click on this site to start the game load!';
		dir.style.color = 'white';
		dir.style.fontFamily = 'Arial';
		dir.style.textAlign = 'center';

		directions.appendChild(dir);

		sorseLog('Waiting for input to start loading!', 'Loader');
		sorseLog('This is to prevent browser limitations!', 'Loader');
		let clicked = false;
		document.onclick = () => {
			if (clicked) return;
			clicked = true;
			directions.remove();
			sorseLog('Loading all Sorse files', 'Loader');
			const internalFiles: string[] = [
				'sorse/deps/color.js',

				'sorse/core/deps/interfaces.js',

				'sorse/core/script.js',
				'sorse/core/sprite.js',

				'sorse/core/sorse.js',
				'sorse/core/events.js',
				'sorse/core/splash.js',
			];
			let loaded = 0;
			loadFile(internalFiles[loaded]);
			function loadedScript() {
				if (loaded === internalFiles.length) {
					sorseLog('Loaded all scripts!', 'Loader');
				} else {
					loadFile(internalFiles[loaded]);
				}
			}
			function loadFile(file: string) {
				sorseLog(`Loading ${file}`, 'Loader');
				const script = sorseLoadScriptFile(file);
				script.onload = () => {
					sorseLog(`Finished loading ${file}`, 'Loader');
					loaded++;
					loadedScript();
				};
			}
		};
	}
}
