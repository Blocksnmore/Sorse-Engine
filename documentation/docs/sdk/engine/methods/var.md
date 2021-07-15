## Var methods

Sorse Engine offers a simple way to do global variables with Sorse Var

### createVar(name, data)

Create a variable

```ts
sorse.createVar('example', { engine: 'Sorse' });
```

### deleteVar(name)

Delete a variable

```ts
sorse.deleteVar('example');
```

### hasVar(name)

Check if a var exsists

```ts
const hasVar = sorse.hasVar("example") ? "Has" : "Doesn't have"
```

### getVar(name)

Get a variable

```ts
console.log(sorse.getVar('example'));
```
