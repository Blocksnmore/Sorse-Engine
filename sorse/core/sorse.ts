var sorse: Sorse;

class Sorse {
	public canvas: HTMLCanvasElement;
	public ctx: CanvasRenderingContext2D;
	public isDoneLoading: boolean = false;

	public width: number;
	public height: number;

	public scripts: SorseScript[] = [];
	public sprites: SorseSprite[] = [];

	constructor(init?: boolean) {
		if (init) {
			this.canvas = sorseMakeElement('canvas') as HTMLCanvasElement;
			this.ctx = this.canvas.getContext('2d');
			this.canvas.id = 'sorse_game';
			this.canvas.width = 1280;
			this.canvas.height = 720;
			this.canvas.style.display = 'block';
			this.canvas.style.margin = 'auto';
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
		for (const sprite of script.scriptData.sprites) {
			this.addSprite(sprite);
		}
		return this;
	}

	addSprite(sprite: SorseSprite) {
		this.sprites.push(sprite);
		return this;
	}

	// Script Render Methods
	renderAllScripts() {
		const scriptPriority = this.scripts.sort(
			(a, b) =>
				(a.scriptData.priority ?? 0) - (b.scriptData.priority ?? 0)
		);
		for (const script of scriptPriority) {
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
			sprite.spriteData.onReady(this);
		}
		return this;
	}

	// Set Methods
	setDefaultColor(color: string | CanvasGradient | CanvasPattern) {
		this.ctx.fillStyle = color;
		this.ctx.strokeStyle = color;
		return this;
	}

	setFillColor(color: string | CanvasGradient | CanvasPattern) {
		this.ctx.fillStyle = color;
		return this;
	}

	setStrokeColor(color: string | CanvasGradient | CanvasPattern) {
		this.ctx.strokeStyle = color;
		return this;
	}

	setFont(font: string, size: number) {
		this.ctx.font = `${size}px ${font}`;
		return this;
	}

	setLineDash(dash: number[]) {
		this.ctx.setLineDash(dash);
		return this;
	}

	// Drawing Methods
	drawRect({ x, y, width, height, color }: sorseEngineDrawRectInterface) {
		if (!this.isDoneLoading) return;
		const previousColor: string | CanvasGradient | CanvasPattern =
			Object.assign('', this.ctx.fillStyle);
		this.ctx.fillStyle = color ?? this.ctx.fillStyle;
		this.ctx.fillRect(x, y, width, height);
		this.ctx.fillStyle = previousColor;
		return this;
	}

	drawCircle({ x, y, radius, color }: sorseEngineDrawCircleInterface) {
		if (!this.isDoneLoading) return;
		const previousColor: string | CanvasGradient | CanvasPattern =
			Object.assign('', this.ctx.fillStyle);
		this.ctx.fillStyle = color ?? this.ctx.fillStyle;
		this.ctx.beginPath();
		this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
		this.ctx.fill();
		this.ctx.fillStyle = previousColor;
		return this;
	}

	drawImage({ image, x, y, width, height }: sorseEngineDrawImageInterface) {
		if (!this.isDoneLoading) return;
		if (typeof image === 'string') {
			const img = sorseMakeElement('img') as HTMLImageElement;
			img.src = image;
			this.ctx.drawImage(img, x, y, width, height);
			img.remove();
		} else {
			this.ctx.drawImage(image, x, y, width, height);
		}
		return this;
	}

	drawText({ text, size, font, x, y, color }: sorseEngineDrawTextInterface) {
		if (!this.isDoneLoading) return;
		const previousColor: string | CanvasGradient | CanvasPattern =
			Object.assign('', this.ctx.fillStyle);
		this.ctx.fillStyle = color ?? this.ctx.fillStyle;
		const previousFont = Object.assign('', this.ctx.font);
		this.ctx.font = `${size}px ${font ?? this.ctx.font.split('px ')[1]}`;
		this.ctx.fillText(text, x, y);
		this.ctx.font = previousFont;
		this.ctx.fillStyle = previousColor;
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
		if (!this.isDoneLoading) return;
		const previousColor: string | CanvasGradient | CanvasPattern =
			Object.assign('', this.ctx.strokeStyle);
		const previousDash: number[] = Object.assign(
			[],
			this.ctx.getLineDash()
		);
		if (typeof dash !== 'undefined' && typeof dash[0] !== 'undefined') {
			this.ctx.setLineDash(dash);
		}
		this.ctx.strokeStyle = color ?? this.ctx.strokeStyle;
		this.ctx.lineWidth = size;
		this.ctx.beginPath();
		this.ctx.moveTo(x1, y1);
		this.ctx.lineTo(x2, y2);
		this.ctx.stroke();
		this.ctx.setLineDash(previousDash);
		this.ctx.strokeStyle = previousColor;
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
		if (!this.isDoneLoading) return;

		const previousColor: string | CanvasGradient | CanvasPattern =
			Object.assign('', this.ctx.strokeStyle);
		this.ctx.strokeStyle = color ?? this.ctx.strokeStyle;
		this.ctx.beginPath();
		this.ctx.ellipse(x, y, radiusX, radiusY, rotation, 0, 2 * Math.PI);
		this.ctx.fill();
		this.ctx.strokeStyle = previousColor;
		return this;
	}
}

(async () => {
	sorseLog('Loading Sorse engine', 'Core');

	sorse = new Sorse(true);

	sorse.setDefaultColor(getHexFromName('black'));
	sorse.isDoneLoading = true;
	sorse.drawRect({
		x: 0,
		y: 0,
		width: sorse.width,
		height: sorse.height,
		color: getHexFromName('black'),
	});
	sorse.isDoneLoading = false;
	sorse.setFont('Arial', 24);
	sorseLog('Loaded Sorse engine', 'Core');
})();
