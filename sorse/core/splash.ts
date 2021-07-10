(async () => {
	sorseLog('Loading Post Engine Load Manager', 'PostEngineLoad');
	const video = sorseMakeElement('video') as HTMLVideoElement;
	video.src = '/sorse/assets/splash.mp4';
	video.controls = false;
	video.style.display = 'none';
	sorseLog('Loaded Post Engine Load Manager', 'PostEngineLoad');

	video.addEventListener('loadeddata', () => {
		video.play();
		function videoLoop() {
			if (video && !video.paused && !video.ended) {
				sorse.ctx.drawImage(
					video,
					0,
					0,
					sorse.canvas.width,
					sorse.canvas.height
				);
				requestAnimationFrame(videoLoop);
			}
		}
		requestAnimationFrame(videoLoop);
	});
	video.addEventListener('ended', () => {
		sorse.ctx.fillRect(0, 0, sorse.canvas.width, sorse.canvas.height);
		video.remove();
		sorseLog('Finished loading engine!', 'PostEngineLoad');
		sorseLog('Loading all Game scripts!', 'PostEngineLoad');
		let loaded = 0;
		function loadedScript() {
			if (loaded === sorseInternalGameData.gameScripts.length) {
				sorseLog('Loaded all Game scripts!', 'Loader');
				startSorseEvents();
			} else {
				loadFile(sorseInternalGameData.gameScripts[loaded]);
			}
		}
		function loadFile(file: string) {
			sorseLog(`Loading Game script ${file}`, 'PostEngineLoad');
			const script = sorseLoadScriptFile(file);
			script.onload = () => {
				sorseLog(
					`Finished loading Game script ${file}`,
					'PostEngineLoad'
				);
				loaded++;
				loadedScript();
			};
		}
		if (sorseInternalGameData.gameScripts.length > 0) {
			loadFile(sorseInternalGameData.gameScripts[0]);
		} else {
			loadedScript();
		}
	});
})();
