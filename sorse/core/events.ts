function startSorseEvents() {
	const inputEvent = (event) => {
		const scriptPriority = sorse.scripts.sort(
			(a, b) =>
				(a.scriptData.priority ?? 0) - (b.scriptData.priority ?? 0)
		);
		for (const script of scriptPriority) {
			if (
				script.scriptData.disabled ||
				typeof script.scriptData.onReady === 'undefined'
			)
				continue;
			script.scriptData.onInput(sorse, event);
		}

		const spritePriority = sorse.sprites.sort(
			(a, b) =>
				(a.spriteData.priority ?? 0) - (b.spriteData.priority ?? 0)
		);

		for (const sprite of spritePriority) {
			if (
				sprite.spriteData.disabled ||
				typeof sprite.spriteData.onReady === 'undefined'
			)
				continue;
			sprite.spriteData.onInput(sorse, event);
		}
	};
	document.addEventListener('keydown', inputEvent);
	document.addEventListener('click', inputEvent);
	(() => {
		let delay = 1000 / sorse.fps;
		let lastDelay = Date.now();
		sorse.gameStartTime = lastDelay;
		sorse.readyAllScripts();
		sorse.renderAllScripts();

		sorse.readyAllSprites();
		sorse.renderAllSprites();
		function renderLoop() {
			if (lastDelay + delay <= Date.now()) {
				sorse.renderedGameFrames++;
				sorse.renderAllScripts();
				lastDelay = Date.now();
				delay = 1000 / sorse.fps;
			}
			requestAnimationFrame(renderLoop);
		}
		requestAnimationFrame(renderLoop);
	})();
}
