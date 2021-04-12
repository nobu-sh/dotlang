const { parse, parseMultiple, parseAllInDir } = require('../lib/main')

const map = parse('./lang/en_US.lang')
console.log(map)

const multiple = parseMultiple([ './lang/en_US.lang' ])
console.log(multiple)

const dir = parseAllInDir('./')
console.log(dir)