interface sorseEngineDrawTextInterface {
	text: string;
	size: number;
	font?: string;
	x: number;
	y: number;
	color?: string | CanvasGradient | CanvasPattern;
	align?: CanvasTextAlign;
	modifier?: string;
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
	image: HTMLImageElement | HTMLVideoElement | string;
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
	startAngle?: number;
	endAngle?: number;
	color?: string | CanvasGradient | CanvasPattern;
}

interface sorseEngineClearRectInterface {
	x: number;
	y: number;
	width: number;
	height: number;
}