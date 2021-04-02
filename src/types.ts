import type { typecheck } from './index';
import { ObjUtil } from './index';

export function isObjectNonNull(
  obj: unknown,
): obj is { [key: string]: unknown } {
  return typeof obj === 'object' && !!obj;
}

export function isObject(
  obj: unknown,
): obj is { [key: string]: unknown } | null {
  return typeof obj === 'object';
}

export function isArray(obj: unknown): obj is unknown[] {
  return Array.isArray(obj);
}

export function isString(obj: unknown): obj is string {
  return typeof obj === 'string';
}

export function asString(obj: unknown, notStr: string): string {
  return isString(obj) ? obj : notStr;
}

export function isNumber(obj: unknown): obj is number {
  return typeof obj === 'number' && !isNaN(obj - 0);
}

export function asNumber(obj: unknown, notNum: number): number {
  return isNumber(obj) ? obj : notNum;
}

export function isNumberOrString(obj: unknown): obj is number | string {
  return isString(obj) || isNumber(obj);
}

export function asNumberOrString(
  obj: unknown,
  notNumOrStr: number | string,
): number | string {
  return isNumberOrString(obj) ? obj : notNumOrStr;
}

export function isBoolean(obj: unknown): obj is boolean {
  return typeof obj === 'boolean';
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(obj: unknown): obj is Function {
  return (
    (obj !== null &&
      typeof obj === 'object' &&
      obj!.hasOwnProperty('constructor') &&
      obj!.hasOwnProperty('call') &&
      obj!.hasOwnProperty('apply')) ||
    typeof obj === 'function'
  );
}

export function isRegex(obj: unknown): obj is RegExp {
  return obj !== null && typeof obj === 'object' && obj instanceof RegExp;
}

export function isMap(obj: unknown): obj is Map<unknown, unknown> {
  return isObjectNonNull(obj) && obj instanceof Map;
}

export function isSet(obj: unknown): obj is Set<unknown> {
  return isObjectNonNull(obj) && obj instanceof Set;
}

export function isArrayOf<T>(obj: unknown, chk: typecheck<T>): obj is T[] {
  if (!isArray(obj)) return false;
  for (const t of obj) {
    if (!chk(t)) return false;
  }
  return true;
}

export function isArrayOfString(obj: unknown): obj is string[] {
  return isArrayOf(obj, isString);
}

export function asArrayOfString(
  obj: unknown,
  defVal: string[] | string | null,
): string[] {
  if (!isArray(obj)) {
    return isArray(defVal) ? defVal : [];
  }
  if (isArray(defVal)) {
    return isArrayOf(obj, isString) ? obj : defVal;
  } else {
    return defVal === null
      ? (obj.filter((val) => isString(val)) as string[])
      : obj.map((val) => asString(val, defVal));
  }
}

export function isMapOf<K, V>(
  obj: unknown,
  key: typecheck<K>,
  val: typecheck<V>,
): obj is Map<K, V> {
  if (!isMap(obj)) return false;

  for (const [k, v] of obj) {
    if (!key(k)) return false;
    if (!val(v)) return false;
  }
  return true;
}

export function isMapOfStrings(obj: unknown): obj is Map<string, string> {
  return isMapOf(obj, isString, isString);
}

export function isSetOf<T>(obj: unknown, chk: typecheck<T>): obj is Set<T> {
  if (!isSet(obj)) return false;
  for (const t of obj) {
    if (!chk(t)) return false;
  }
  return true;
}

export function isSetOfString(obj: unknown): obj is Set<string> {
  return isSetOf(obj, isString);
}

export function isObjectOf<T>(
  obj: unknown,
  chk: typecheck<T>,
): obj is { [key: string]: T } {
  if (!isObjectNonNull(obj)) return false;
  for (const k in obj) {
    if (ObjUtil.has(k, obj) && !chk(obj[k])) return false;
  }
  return true;
}

export function isObjectOfString(
  obj: unknown,
): obj is { [key: string]: string } {
  return isObjectOf(obj, isString);
}

export function isPromise<T>(obj: unknown): obj is Promise<T> {
  return has(obj, 'then') && isFunction(obj.then);
}

export function has<K extends string>(
  x: unknown,
  key: K,
  // eslint-disable-next-line no-shadow
): x is { [key in K]: unknown } {
  return isObjectNonNull(x) && key in x;
}

// eslint-disable-next-line no-shadow
export function hasStr<K extends string>(
  x: unknown,
  key: K,
  // eslint-disable-next-line no-shadow
): x is { [key in K]: string } {
  return isObjectNonNull(x) && has(x, key) && isString(x[key]);
}
