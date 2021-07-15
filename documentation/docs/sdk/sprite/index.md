# Sorse Sprites
To create a new game sprite create a file with the following:
```ts
new SorseScript({
    Script options
});
```

## Sprite options
**Options that have a ? are optional**
```yml
position: Sprite X & Y position
disabled?: Disable Sprite
priority?: Sprite Priority (Higher means more priority)
id?: Sprite id (For Sorse#getSpriteByID)
onReady?: Function that runs when the sprite is ready
onRender: Function that runs every frame
onInput?: Function that runs on key presses & mouse interactions
```