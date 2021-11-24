const { parse, parseMultiple, parseAllInDir } = require('../lib/main')

console.log("--- Single Parse ---")
const map = parse('tests/lang/en_US.lang')
console.log(map)

console.log("--- Multiple Parse ---")
const multiple = parseMultiple([ 'tests/lang/en_US.lang', 'tests/lang/en_ES.lang' ])
console.log(multiple)

console.log("--- All Parse ---")
const dir = parseAllInDir('tests/')
console.log(dir)