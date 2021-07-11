class SorseScript {
	public scriptData: sorseEngineScriptInterface;

	constructor(data: sorseEngineScriptInterface) {
		this.scriptData = data;
		sorse.addScript(this);
	}
}