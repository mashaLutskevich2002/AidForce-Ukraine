export function isEmpty<T>(obj: T[] | Record<string, T> | T | undefined): boolean {
    if (!obj) return true;
    return Array.isArray(obj) ? !obj.length : !Object.keys(obj).length;
}
