# Sorse Scripts
To create a new game script create a file with the following:
```ts
new SorseScript({
    Script options
});
```

## Script options
**Options that have a ? are optional**
```yml
name: Script Name
author?: Script Developer
description?: Script Description
version?: Script Version
disabled?: Disable Script
priority?: Script Priority (Higher means more priority)
sprites?: Array of SorseScripts
onReady?: Function that runs when the script is ready
onRender: Function that runs every frame
onInput?: Function that runs on key presses & mouse interactions
```