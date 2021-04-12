declare module "dotlang" {
    export function parse(path: string): Map<string, string>
    export function parseMultiple(paths: string[]): Map<string, Map<string, string>>
    export function parseAllInDir(dir: string): Map<string, Map<string, string>>
}