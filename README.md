# Sorse Engine
Sorse Engine is a ~~good~~ 2D game engine written using TS (With Tsc) & JS

## Usage
Sorse is likely not usable at the moment but if you want to,
Create an HTML file for your game and add this to the file:
```html
<body>
	<script
		src="sorse/loader/loader.js"
		onload="(()=>{
					new SorseGame({
						name: 'Game name',
						gameScripts: ['Script paths (More info soon), Leave this field as []'],
						author: 'Author name',
						version: 'Game version',
						description: 'Game description',
					});
				})()"
	></script>
</body>
```
And put the `sorse` folder in your root directory (for the webserver)

## Docs
Documention coming ~~never~~ soon:tm:
