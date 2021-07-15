# Getting started

## Requirements

To use sorse engine you require the following:

```yml
- A webserver
- The ability to run TSC
- A way to edit TS/JS code
```

## Setting up Sorse Engine

Download the latest release of Sorse Engine from the [Releases Page](https://github.com/Blocksnmore/Sorse-Engine/releases) and place the sorse folder in your root directory. Once that is completed place the folowing code inside of your html file for said game:
```html
<body>
	<script
		src="/sorse/loader/loader.js"
		onload=
		"(()=>{
			new SorseGame({
				name: 'Game name',
				gameScripts: ['Game scripts'],
				author: 'Game author',
				version: 'Game version',
				description: 'Game description',
			});
		})()">
	</script>
</body>
```
Once you configure your game sorse will be fully set up!

### Configuration options
**All these fields are required**
```yml
name: Game Name
gameScripts: An array of paths to Game Scripts
author: Game Author
version: Game Version
description: Game Description
```

### Configuration example
```yml
name: MyFirstGame
gameScripts: ['/gamescript/1.js', '/gamescript/2.js']
author: Blocks_n_more
version: 1.0.0
description: My first Sorse Engine game
```
