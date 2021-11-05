# Dotlang

Dotlang is the official library yua uses to parse the .lang translation files and utilize them

## Installation

```npm
npm i dotlang
```

## Usage

```js
const dotlang = require('dotlang')

const single = dotlang.parse('path/to/dotlang/file.lang')
console.log(single)

const multiple = dotlang.parseMultiple([
  'path/to/dotlang/file.lang',
  'path/to/another/dotlang/file.lang'
])
console.log(multiple)

const dir = dotlang.parseAllInDir('path/to/dir')
console.log(dir)
```
### Functions
#### `parse(path)` `Map<string, string>`
|Parameters|Type|Description|
|:---      |:---|:---       |
|`path`|`string`|Path to .lang file|
> *Parse lang file and return map*


#### `parseMultiple(paths)` `Map<string, Map<string, string>>`
|Parameters|Type|Description|
|:---      |:---|:---       |
|`paths`|`string[]`|Array of .lang file paths|

> *Parse multiple lang files and return map*

#### `parseAllInDir(dir)` `Map<string, Map<string, string>>`
|Parameters|Type|Description|
|:---      |:---|:---       |
|`dir`|`string`|Path to directory|
 
> *Finds all lang files in a directory and parses them*

### Returns

#### `Map<string, string>`
```
Map(int) {
  'key' => 'value'
}
```

#### `Map<string, Map<string, string>>`
```
Map(int) {
  'fileName' => Map(int) {
     'key' => 'value'
  }
}
```
## Dotlang File

#### `en_US.lang`
```lang
# Parser Will Ignore comments, use hashtag to comment

dotlang.hello=Hi, I am grateful you found dis lib :)
dotlang.abnormal   =   Spaces Will Not Affect Parser

# Extra
dotlang.meta.description = Pretty Quickly thrown together lib probably has issues

```

## Extra

If you would like your .lang files to be colorized try using our extension [dotlang](https://marketplace.visualstudio.com/items?itemName=Nobuwu.dotlang)

Also something to note, keys are not required to be concatenated with dots
eg: `dotlang-weird=lel` will work too. I just prefer dots :)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[AGPL-3.0](https://choosealicense.com/licenses/agpl-3.0/)
