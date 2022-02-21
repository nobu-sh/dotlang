# Dotlang

Dotlang is a simple library for easily parsing and reading `.lang` files.

## Installation

```
$ npm i dotlang
```

For VsCode color tokenization check out [dotlang](https://marketplace.visualstudio.com/items?itemName=Nobuwu.dotlang) on the vscode marketplace.

## Usage

See the [methods](#methods) for more usage info.

### Reading A File
```js
const dotlang = require('dotlang')

const parsedFile = dotlang.parse("path/to/file.lang")
console.log(parsedFile)
```

### Reading Multiple Files
```js
const dotlang = require('dotlang')

const parsedFile = dotlang.parseMultiple(["path/to/file.lang", "path/to/anotherFile.lang"])
console.log(parsedFile)
```

### Reading Entire Directory
```js
const dotlang = require('dotlang')

const parsedFile = dotlang.parseDir("path/to/dir")
console.log(parsedFile) // Map(int) => { 'key' => 'value' }
```

## Methods

### parse(`path: string`): `Map<string, string>`
parses dotlang file and returns a map fo keys values.

|Parameters|Type|Description|
|:--- |:--- |:--- |
|`path`|`string`|Path to .lang file|

```js
const parsed = dotlang.parse("path/to/file.lang")
console.log(parsed) // Map(int) => { 'fileName' => Map(int) { 'key' => 'value' } }
```

### parseMultiple(`paths: string[]`): `Map<string, Map<string, string>>`
Parses multiple dotlang files and returns a map of file names with their corresponding keys/values

|Parameters|Type|Description|
|:--- |:--- |:--- |
|`path`|`string[]`|Array of .lang file paths|

```js
const parsed = dotlang.parseMultiple(["path/to/file.lang", "path/to/anotherFile.lang"])
console.log(parsed) // Map(int) => { 'fileName' => Map(int) { 'key' => 'value' } }
```
### parseDir(`dir: string`): `Map<string, Map<string, string>>`
Finds all lang files in specified dir and returns a map of file names with their corresponding keys/values

|Parameters|Type|Description|
|:--- |:--- |:--- |
|`dir`|`string`|Path to directory|

```js
const parsed = dotlang.parseDir("/path/to/dir")
console.log(parsed)
```
### replaceTemplates(`orig: string, ...replacements: any[]`): `string`
Replaces templates in given string and return new string

|Parameters|Type|Description|
|:--- |:--- |:--- |
|`orig`|`string`|Orignal string with *%s* templates|
|`...replacements`|`any[]`|List of replacements|

```js
const str = "Hi my name is %s and I like %s"
const newStr = dotlang.replaceTemplates(str, "Nobu", "pizza")
console.log(newStr) // Hi my name is Nobu and I like pizza
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[AGPL-3.0](https://choosealicense.com/licenses/agpl-3.0/)
