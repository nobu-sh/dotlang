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

    const cleanLangFile = langFile.split(/(\r\n|\n)/)
      .filter(item => !item.replace(/\s+/, "").startsWith('#'))
      .filter(item => !/(\r\n|\n)/.test(item))
      .filter(item => item.includes("="))
      .filter(item => item.length > 0);
    

    const langMap = new Map();
    
    for (const item of cleanLangFile) {
        const keyValue = item.split(/=/);

        if (keyValue[0] && keyValue[1]) {
            langMap.set(keyValue[0].trim(), keyValue[1]
                .split(/\\n/)
                .join("\n")
                .trim());
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

module.exports = {
    parse,
    parseMultiple,
    parseAllInDir,
};
