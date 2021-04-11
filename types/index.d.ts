declare module "dotlang" {
    export function parse(path: string): Map<string, string>
    export function parseMultiple(paths: stringp[]): Map<string, string>
    export function parseAllInDir(dir: string): Map<string, string>
    export function parseAllInProject(): Map<string, string>
}