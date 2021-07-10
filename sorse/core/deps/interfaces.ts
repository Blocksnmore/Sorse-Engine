interface sorseEngineDrawTextInterface {
	text: string;
	size: number;
	font?: string;
	x: number;
	y: number;
	color?: string | CanvasGradient | CanvasPattern;
	dash?: number[];
}

interface sorseEngineDrawLineInterface {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
	size: number;
	color?: string;
	dash?: number[];
}

interface sorseEngineDrawImageInterface {
	image: HTMLImageElement | string;
	x: number;
	y: number;
	width: number;
	height: number;
}

interface sorseEngineDrawCircleInterface {
	x: number;
	y: number;
	radius: number;
	color?: string | CanvasGradient | CanvasPattern;
}

interface sorseEngineDrawRectInterface {
	x: number;
	y: number;
	width: number;
	height: number;
	color?: string | CanvasGradient | CanvasPattern;
}

interface sorseEngineDrawOvalInterface {
	x: number;
	y: number;
	radiusX: number;
	radiusY: number;
	rotation: number;
	startAngle: number;
	endAngle: number;
	color?: string | CanvasGradient | CanvasPattern;
}

interface sorseEngineScriptInterface {
	name: string;
	author?: string;
	description?: string;
	version?: string;

	priority?: number;

	sprites?: SorseSprite[];

	// Script methods
	onReady?: (engine: Sorse) => void | Promise<void>;
	onRender?: (engine: Sorse) => void | Promise<void>;
	onInput?: (engine: Sorse) => void | Promise<void>;
}

interface sorseEngineSpriteInterface {
	position: { x: number; y: number };
	active?: boolean;

	priority?: number;

	onReady?: (engine: Sorse) => void | Promise<void>;
	onRender?: (engine: Sorse) => void | Promise<void>;
	onInput?: (engine: Sorse) => void | Promise<void>;
}