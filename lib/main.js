const fs = require('fs');
const { resolve } = require('path');


/**
 * Parse .lang file
 * @param {string} path
 * @returns {Map<string, string>} Map<key, value>
 */
function parse(path) {
    const fullPath = resolve(path);
    
    if (!path.endsWith('.lang') || !fs.existsSync(fullPath)) throw new Error(`Invalid file path: "${fullPath}"`);
   
    const langFile = fs.readFileSync(fullPath).toString();
    
    const cleanLangFile = langFile.split(/(\n|\r\n)/).filter(item => item.length > 0)
      .filter(item => !item.replace(/\s+/, "").startsWith('#'))
      .filter(item => item !== '\n');
    
    const langMap = new Map();
    
    for (const item of cleanLangFile) {
        const keyValue = item.split(/=/);
        keyValue[1] = parseString(keyValue[1]); //parses the string, returns original string if there was no line break, but returns string with line break if there was

        if (keyValue[0] && keyValue[1]) {
            langMap.set(keyValue[0].trim(), keyValue[1].trim());
        };
    };
  
    return langMap;
};

/**
 * Parse multiple .lang file
 * @param {string[]} paths
 * @returns {Map<string, Map<string, string>>} Map<fileName, Map<key, value>>
 */
function parseMultiple(paths) {
    const langMaps = new Map()
    
    for (const path of paths) {
        const fullPath = resolve(path);
        
        if (!path.endsWith('.lang') || !fs.existsSync(fullPath)) throw new Error(`Invalid file path: "${path}"`);
        
        const pathSplit = fullPath.split(/(\\|\/)/);
        const result = parse(path);
        
        langMaps.set(pathSplit[pathSplit.length - 1].replace(/.lang/, ""), result);
    };
    
    return langMaps;
};

/**
 * Parse all .lang files in dir
 * @param {string} paths
 * @returns {Map<string, Map<string, string>>} Map<fileName, Map<key, value>>
 */
function parseAllInDir(dir) {
    function getFiles(dir, _files) {
        _files = _files || [];
        dir = resolve(dir);
        
        const files = fs.readdirSync(dir);
        
        for (const file of files) {
            const name = resolve(dir + "/" + file);
            
            if (fs.statSync(name).isDirectory()) {
                getFiles(name, _files);
            } else if (name.endsWith('.lang')) {
                _files.push(name);
            }
        }
        return _files;
    };

    return parseMultiple(getFiles(dir));
};

/**
 * Parse line breaks
 * @param {String} str
 */
function parseString(str) {
    const slashN = '\\n '.replace(/\\/g, '\\');
    const slashNN = '\\n'.replace(/\\/g, '\\');

    function replaceAll(string, search, replace) {
        return string.split(search).join(replace);
    };

    var toReturn;
    var toUse;

    if (str.includes(slashN) == false) toUse = slashNN;
    else toUse = slashN;

    if (str.includes(toUse)) {
        const args = replaceAll(str, toUse, '\n') //replaces every instance of "\\n" in the original string with "\n" aka a line break
        delete args[0]; //deletes an empty string at the position 0, not really sure why it's even there tbh
        toReturn = args; //sets toReturn as the string put together
    } else {
        toReturn = str; //returns normal string if theres no line break
    };
    
    return toReturn;
};

module.exports = {
    parse,
    parseMultiple,
    parseAllInDir,
};
