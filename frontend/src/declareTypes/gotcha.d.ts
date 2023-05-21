declare module '@evo/gotcha-log' {
    export function initGotchaLogger(site: string, host: string, txid: string): void;

    export function error(message: string, options: Record<string, unknown>): void;
    export function log(message: string): void;
}
