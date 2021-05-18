const { parse, parseMultiple, parseAllInDir } = require('../lib/main')

const map = parse('tests/lang/en_US.lang')
console.log(map)

const multiple = parseMultiple([ 'tests/lang/en_US.lang', 'tests/lang/en_ES.lang' ])
console.log(multiple)

const dir = parseAllInDir('tests/')
console.log(dir)