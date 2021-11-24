declare module "dotlang" {
    export function parse(path: string): Map<string, string>
    export function parseAsync(path: string): Promise<Map<string, string>>
    export function parseMultiple(paths: string[]): Map<string, Map<string, string>>
    export function parseMultipleAsync(paths: string[]): Promise<Map<string, Map<string, string>>>
    export function parseDir(dir: string): Map<string, Map<string, string>>
    export function parseDirAsync(dir: string): Promise<Map<string, Map<string, string>>>
    export function replaceTemplates(orig: string, ...replacements: any[]): string
    export function replaceTemplatesAsync(orig: string, ...replacements: any[]): Promise<string>

    /**
     * @deprecated in favor of `dotlang.parseDir()`
     */
    export function parseAllInDir(dir: string): Map<string, Map<string, string>>
}
