class SorseSprite {
	public spriteData: sorseEngineSpriteInterface;
	
	constructor(data: sorseEngineSpriteInterface) {
		this.spriteData = data;
		sorse.addSprite(this);
	}
}
