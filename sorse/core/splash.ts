(async () => {
	sorseLog('Loading Sorse', 'PostEngineLoad');
	sorse.isDoneLoading = false;
	const video = sorseMakeElement('video') as HTMLVideoElement;
	video.src = '/sorse/assets/splash.mp4';
	video.controls = false;
	video.style.display = 'none';
	sorseLog('Loaded Sorse', 'PostEngineLoad');

	video.addEventListener('loadeddata', () => {
		video.play();
		function videoLoop() {
			sorse.isDoneLoading = false;
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
		sorse.isDoneLoading = true;
		sorseLog('Finished loading engine!', 'PostEngineLoad');
		sorseLog('Loading all Game scripts!', 'PostEngineLoad');
		let loaded = 0;
		function loadedScript() {
			if (loaded === sorseInternalGameData.gameScripts.length) {
				sorseLog('Loaded all Game scripts!', 'Loader');
				sorse.readyAllScripts();
				sorse.renderAllScripts();
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
