## Draw methods

Sorse Engine has multiple easy to use methods to draw to the screen

### drawRect(options)

Draw a Rectangle

```ts
sorse.drawRect({
	x: 0,
	y: 0,
	width: 100,
	height: 100,
});
```

### drawCircle(options)

Draw a Circle

```ts
sorse.drawCircle({
	x: 100,
	y: 100,
	radius: 50,
});
```

### drawImage(options)

Draw an Image

```ts
sorse.drawImage({
	image: './sorse.png',
	x: 0,
	y: 0,
	width: 100,
	height: 100,
});
```

### drawText(options)

Draw some Text

```ts
sorse.drawText({
	text: 'Hello from Sorse Engine!',
	x: 100,
	y: 100,
	size: 24,
});
```

### drawLine(options)

Draw a Line

```ts
sorse.drawLine({
	x1: 0,
	y1: 0,
	x2: 100,
	y2: 100,
	size: 10,
});
```

### drawOval(options)

Draw an Oval

```ts
sorse.drawOval({
	x: 100,
	y: 100,
	radiusX: 10,
	radiusY: 5,
	rotation: 0,
});
```

### clearRect(options)

Clear the selected region

```ts
sorse.clearRect({
	x: 0,
	y: 0,
	width: 10,
	height: 10,
});
```

### clearScreen(options)

Clear the entire screen

```ts
sorse.clearScreen();
```
