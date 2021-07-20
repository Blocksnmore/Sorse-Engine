var sorse: Sorse;

class Sorse {
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;

	public width: number;
	public height: number;

	public scripts: SorseScript[] = [];
	public sprites: SorseSprite[] = [];

	public fps: number = 60;

	public renderedGameFrames: number = 0;

	public gameStartTime: number = 0;

	private sorseGameVar: Map<string, any> = new Map<string, any>();

	private fillStyleColor: string | CanvasGradient | CanvasPattern = 'black';
	private strokeStyleColor: string | CanvasGradient | CanvasPattern = 'black';
	private fontStyle: string = '24px Arial';
	private lineDashStyle: number[] = [];

	constructor(init?: boolean) {
		if (init) {
			this.canvas = sorseMakeElement('canvas') as HTMLCanvasElement;
			this.ctx = this.canvas.getContext('2d');
			this.canvas.id = 'sorse_game';
			this.canvas.width = 1280;
			this.canvas.height = 720;
			this.canvas.style.display = 'block';
			this.canvas.style.margin = 'auto';
			this.canvas.style.backgroundColor = 'black';
			this.height = this.canvas.height;
			this.width = this.canvas.width;
		} else
			throw new Error(
				"[Sorse:Core] Multiple sorse instances aren't supported currently! Please use the `sorse` var instead!"
			);
	}

	// Script Methods
	addScript(script: SorseScript) {
		this.scripts.push(script);
		for (const sprite of script.scriptData.sprites ?? []) {
			this.addSprite(sprite);
		}
		return this;
	}

	createVar(name: string, value: any) {
		this.sorseGameVar.set(name, value);
		return this;
	}

	deleteVar(name: string) {
		this.sorseGameVar.delete(name);
		return this;
	}

	hasVar(name: string): boolean {
		return this.sorseGameVar.has(name);
	}

	getVar(name: string): any {
		return this.sorseGameVar.get(name);
	}

	// Sprite Methods
	addSprite(sprite: SorseSprite) {
		this.sprites.push(sprite);
		return this;
	}

	getSpriteByID(id: string): SorseSprite {
		for (const sprite of this.sprites) {
			if (sprite.spriteData.id === id) {
				return sprite;
			}
		}
		return null;
	}

	// Script Render Methods
	renderAllScripts() {
		const scriptPriority = this.scripts.sort(
			(a, b) =>
				(a.scriptData.priority ?? 0) - (b.scriptData.priority ?? 0)
		);
		for (const script of scriptPriority) {
			if (
				script.scriptData.disabled ||
				typeof script.scriptData.onRender === 'undefined'
			)
				continue;
			script.scriptData.onRender(this);
		}
		return this;
	}

	readyAllScripts() {
		const scriptPriority = this.scripts.sort(
			(a, b) =>
				(a.scriptData.priority ?? 0) - (b.scriptData.priority ?? 0)
		);
		for (const script of scriptPriority) {
			if (
				script.scriptData.disabled ||
				typeof script.scriptData.onReady === 'undefined'
			)
				continue;
			script.scriptData.onReady(this);
		}
		return this;
	}

	// Sprite Render Methods
	renderAllSprites() {
		const spritePriority = this.sprites.sort(
			(a, b) =>
				(a.spriteData.priority ?? 0) - (b.spriteData.priority ?? 0)
		);
		for (const sprite of spritePriority) {
			if (
				sprite.spriteData.disabled ||
				typeof sprite.spriteData.onReady === 'undefined'
			)
				continue;
			sprite.spriteData.onRender(this);
		}
		return this;
	}

	readyAllSprites() {
		const spritePriority = this.sprites.sort(
			(a, b) =>
				(a.spriteData.priority ?? 0) - (b.spriteData.priority ?? 0)
		);
		for (const sprite of spritePriority) {
			if (
				sprite.spriteData.disabled ||
				typeof sprite.spriteData.onReady === 'undefined'
			)
				continue;
			sprite.spriteData.onReady(this);
		}
		return this;
	}

	// Set Methods
	setDefaultColor(color: string | CanvasGradient | CanvasPattern) {
		this.setFillColor(color);
		this.setStrokeColor(color);
		return this;
	}

	setFillColor(color: string | CanvasGradient | CanvasPattern) {
		this.fillStyleColor = color;
		return this;
	}

	setStrokeColor(color: string | CanvasGradient | CanvasPattern) {
		this.strokeStyleColor = color;
		return this;
	}

	setFont({ font, size }: sorseEngineDefaultFont) {
		this.fontStyle = `${size}px ${font}`;
		return this;
	}

	setLineDash(dash: number[]) {
		this.lineDashStyle = dash;
		return this;
	}

	setGameFPS(fps: number) {
		this.fps = fps;
		return this;
	}

	// Drawing Methods
	drawRect({ x, y, width, height, color }: sorseEngineDrawRectInterface) {
		this.ctx.fillStyle = color ?? this.fillStyleColor;
		this.ctx.fillRect(x, y, width, height);
		this.ctx.fillStyle = this.fillStyleColor;
		return this;
	}

	drawCircle({ x, y, radius, color }: sorseEngineDrawCircleInterface) {
		this.ctx.fillStyle = color ?? this.fillStyleColor;
		this.ctx.beginPath();
		this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
		this.ctx.fill();
		this.ctx.fillStyle = this.fillStyleColor;
		return this;
	}

	drawImage({ image, x, y, width, height }: sorseEngineDrawImageInterface) {
		if (typeof image === 'string') {
			const img = sorseMakeElement('img') as HTMLImageElement;
			img.src = image;
			this.drawImage({ image: img, x, y, width, height });
			img.remove();
		} else {
			this.ctx.drawImage(image, x, y, width, height);
		}
		return this;
	}

	drawText({
		text,
		size,
		font,
		x,
		y,
		color,
		align = 'right',
		modifier = '',
	}: sorseEngineDrawTextInterface) {
		this.ctx.textAlign = align;
		this.ctx.fillStyle = color ?? this.fillStyleColor;
		this.ctx.font = `${modifier}${
			modifier.length > 1 && !modifier.endsWith(' ') ? ' ' : ''
		}${size}px ${font ?? this.fontStyle.split('px ')[1]}`;
		this.ctx.fillText(text, x, y);
		this.ctx.font = this.fontStyle;
		this.ctx.fillStyle = this.fillStyleColor;
		return this;
	}

	drawLine({
		x1,
		y1,
		x2,
		y2,
		size,
		color,
		dash,
	}: sorseEngineDrawLineInterface) {
		this.ctx.setLineDash(this.lineDashStyle);
		if (typeof dash !== 'undefined' && typeof dash[0] !== 'undefined') {
			this.ctx.setLineDash(dash);
		}
		this.ctx.strokeStyle = color ?? this.ctx.strokeStyle;
		this.ctx.lineWidth = size;
		this.ctx.beginPath();
		this.ctx.moveTo(x1, y1);
		this.ctx.lineTo(x2, y2);
		this.ctx.stroke();
		this.ctx.setLineDash(this.lineDashStyle);
		this.ctx.strokeStyle = this.strokeStyleColor;
		return this;
	}

	drawOval({
		x,
		y,
		radiusX,
		radiusY,
		rotation,
		startAngle,
		endAngle,
		color,
	}: sorseEngineDrawOvalInterface) {
		this.ctx.strokeStyle = color ?? this.strokeStyleColor;
		this.ctx.beginPath();
		this.ctx.ellipse(
			x,
			y,
			radiusX,
			radiusY,
			rotation,
			startAngle ?? 0,
			endAngle ?? 2 * Math.PI
		);
		this.ctx.fill();
		this.ctx.strokeStyle = this.strokeStyleColor;
		return this;
	}

	clearRect({ x, y, width, height }: sorseEngineClearRectInterface) {
		this.ctx.clearRect(x, y, width, height);
		return this;
	}

	clearScreen() {
		this.clearRect({
			x: 0,
			y: 0,
			width: this.width,
			height: this.height,
		});
		return this;
	}

	// Audio Methods
	playSound(path: string, loop: boolean = false) {
		return new SorseAudioPlayer(path, loop).play();
	}

	// Misc Methods
	getAvgFPS() {
		return parseInt(
			(
				((1000 / (this.gameStartTime / this.renderedGameFrames)) *
					100) /
				100
			)
				.toString()
				.split('.')[0]
		);
	}
}

class SorseAudioPlayer {
	private audioElement: HTMLAudioElement;
	private shouldRepeat: boolean;
	constructor(path: string, loop) {
		this.shouldRepeat = loop;
		this.audioElement = sorseMakeElement('audio') as HTMLAudioElement;
		this.audioElement.src = path;
		this.audioElement.style.display = 'none';
		this.audioElement.onended = () => {
			if (this.shouldRepeat) {
				this.play(0);
			}
		};
	}
	repeat(loop: boolean) {
		this.shouldRepeat = loop;
	}
	isPlaying() {
		return !this.audioElement.paused;
	}
	play(time: number = 0) {
		this.audioElement.currentTime = time;
		this.audioElement.play();
		return this;
	}
	pause() {
		this.audioElement.pause();
		return this;
	}
	stop() {
		this.audioElement.pause();
		this.audioElement.currentTime = 0;
		return this;
	}
	resume() {
		this.audioElement.play();
		return this;
	}
	getTime() {
		return this.audioElement.currentTime;
	}
}

(async () => {
	sorseLog('Loading Sorse engine', 'Core');

	sorse = new Sorse(true);

	sorse.setDefaultColor('black');
	sorse.drawRect({
		x: 0,
		y: 0,
		width: sorse.width,
		height: sorse.height,
		color: 'black',
	});
	sorse.setFont({
		font: 'Arial',
		size: 24,
	});
	sorseLog('Loaded Sorse engine', 'Core');
})();
