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
   
    const langMap = new Map();

    fs.readFileSync(fullPath)
        .toString()
        .replace(/^#.*$/gm, '')
        .split(/\r\n|\n/)
        .filter(Boolean)
        .forEach(element => {
            let data = element.split('=');
            data = [data.shift(), data.join('=')];

            if(data[0] && data[1]) langMap.set(data[0].trim(), data[1].replace(/\\n/g, '\n').trim());
        });

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
function parseDir(dir) {
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
 * Asynchronously parse .lang file
 * @param {string} path
 * @returns {Promise<Map<string, string>>} Promise<Map<key, value>>
 */
 async function parseAsync(path) {
    try {
        return Promise.resolve(parse(path));
    } catch (error) {
        return Promise.reject(error);
    }
}
/**
 * Asynchronously parse multiple .lang file
 * @param {string[]} paths
 * @returns {Promise<Map<string, Map<string, string>>>} Promise<Map<fileName, Map<key, value>>>
 */
async function parseMultipleAsync(paths) {
    try {
        return Promise.resolve(parseMultiple(paths));
    } catch (error) {
        return Promise.reject(error);
    }
}
/**
 * Asynchronously parse all .lang files in dir
 * @param {string} paths
 * @returns {Promise<Map<string, Map<string, string>>>} Promise<Map<fileName, Map<key, value>>>
 */
async function parseDirAsync(dir) {
    try {
        return Promise.resolve(parseDir(dir));
    } catch (error) {
        return Promise.reject(error);
    }
}

/**
 * Replace templates in string (%s)
 * @param {string} orig String to replace templates in
 * @param {any[]} replacements Replacement values
 * @returns {string}
 */
function replaceTemplates(orig, ...replacements) {
    return orig.split(/%s/g).map((c, i) => c + (replacements[i] ?? "")).join("");;
}

/**
 * Asynchronously replace templates in string (%s)
 * @param {string} orig String to replace templates in
 * @param {any[]} replacements Replacement values
 * @returns {Promise<string>}
 */
function replaceTemplatesAsync(orig, ...replacements) {
    try {
        return Promise.resolve(replaceTemplates(orig, ...replacements))
    } catch (error) {
        return Promise.reject(error)
    }
}

/**
 * @deprecated in favor of `dotlang.parseDir()`
 */
const parseAllInDir = parseDir;

module.exports = {
    parse,
    parseAsync,
    parseMultiple,
    parseMultipleAsync,
    parseDir,
    parseDirAsync,
    replaceTemplates,
    replaceTemplatesAsync,
    
    parseAllInDir,
};
