interface sorseEngineScriptInterface {
	name: string;
	author?: string;
	description?: string;
	version?: string;
	disabled?: boolean;

	priority?: number;

	sprites?: SorseSprite[];

	onReady?: (engine: Sorse) => void | Promise<void>;
	onRender: (engine: Sorse) => void | Promise<void>;
	onInput?: (engine: Sorse, event: KeyboardEvent | MouseEvent) => void | Promise<void>;
}

interface sorseEngineSpriteInterface {
	position: { x: number; y: number };
	disabled?: boolean;

	priority?: number;

    id?: string;

	onReady?: (engine: Sorse) => void | Promise<void>;
	onRender: (engine: Sorse) => void | Promise<void>;
	onInput?: (engine: Sorse, event: KeyboardEvent | MouseEvent) => void | Promise<void>;
}