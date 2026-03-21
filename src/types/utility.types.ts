/**
 * Utility Types
 *
 * Helper types for common TypeScript patterns
 */

/**
 * Make all properties of T nullable
 */
export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

/**
 * Make all properties of T optional and nullable
 */
export type Maybe<T> = {
  [P in keyof T]?: T[P] | null;
};

/**
 * Deep readonly - makes all properties readonly recursively
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/**
 * Deep partial - makes all properties optional recursively
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Deep required - makes all properties required recursively
 */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

/**
 * Extract keys of T where the value is of type U
 */
export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

/**
 * Make specific keys required
 */
export type RequireKeys<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;

/**
 * Make specific keys optional
 */
export type OptionalKeys<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;

/**
 * Omit keys by value type
 */
export type OmitByType<T, U> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K];
};

/**
 * Pick keys by value type
 */
export type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

/**
 * Mutable - removes readonly modifier
 */
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

/**
 * Non-nullable - removes null and undefined
 */
export type NonNullable<T> = T extends null | undefined ? never : T;

/**
 * Strict extract - ensures U is a subset of T
 */
export type StrictExtract<T, U extends T> = Extract<T, U>;

/**
 * Strict exclude
 */
export type StrictExclude<T, U extends T> = Exclude<T, U>;

/**
 * Value of - gets the value types of an object
 */
export type ValueOf<T> = T[keyof T];

/**
 * Awaited - unwraps promise type
 */
export type Awaited<T> = T extends Promise<infer U> ? U : T;

/**
 * Function that returns T
 */
export type Factory<T> = () => T;

/**
 * Async function that returns T
 */
export type AsyncFactory<T> = () => Promise<T>;

/**
 * Constructor type
 */
export type Constructor<T = unknown> = new (...args: unknown[]) => T;

/**
 * Abstract constructor type
 */
export type AbstractConstructor<T = unknown> = abstract new (...args: unknown[]) => T;

/**
 * Class type
 */
export type Class<T = unknown> = Constructor<T> | AbstractConstructor<T>;

/**
 * Predicate function
 */
export type Predicate<T> = (value: T) => boolean;

/**
 * Comparator function
 */
export type Comparator<T> = (a: T, b: T) => number;

/**
 * Mapper function
 */
export type Mapper<T, U> = (value: T) => U;

/**
 * Reducer function
 */
export type Reducer<T, U> = (accumulator: U, value: T) => U;

/**
 * Async predicate
 */
export type AsyncPredicate<T> = (value: T) => Promise<boolean>;

/**
 * JSON serializable types
 */
export type JsonPrimitive = string | number | boolean | null;
export type JsonObject = { [key: string]: JsonValue };
export type JsonArray = JsonValue[];
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

/**
 * Ensure type is serializable to JSON
 */
export type Jsonify<T> = T extends JsonValue
  ? T
  : T extends { toJSON(): infer U }
    ? U
    : T extends object
      ? { [K in keyof T]: Jsonify<T[K]> }
      : never;

/**
 * Type guard function
 */
export type TypeGuard<T, U extends T> = (value: T) => value is U;

/**
 * Branded type - for nominal typing
 */
export type Brand<T, B> = T & { __brand: B };

/**
 * Flavored type - weaker than branded
 */
export type Flavor<T, F> = T & { __flavor?: F };

/**
 * Entry tuple type
 */
export type Entry<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T];

/**
 * Entries type
 */
export type Entries<T> = Entry<T>[];

/**
 * Promise or value
 */
export type MaybePromise<T> = T | Promise<T>;

/**
 * Array or single value
 */
export type MaybeArray<T> = T | T[];

/**
 * Unwrap array type
 */
export type UnwrapArray<T> = T extends Array<infer U> ? U : T;

/**
 * Merge two types
 */
export type Merge<T, U> = Omit<T, keyof U> & U;

/**
 * Override properties in T with properties in U
 */
export type Override<T, U> = Omit<T, keyof U> & U;

/**
 * Intersection of two types
 */
export type Intersection<T, U> = Pick<T, Extract<keyof T, keyof U>>;

/**
 * Difference between two types
 */
export type Difference<T, U> = Pick<T, Exclude<keyof T, keyof U>>;

/**
 * Symmetric difference
 */
export type SymmetricDifference<T, U> = Difference<T, U> | Difference<U, T>;

/**
 * Flatten nested type one level
 */
export type Flatten<T> = T extends Array<infer U> ? U : T;

/**
 * Primitive types
 */
export type Primitive = string | number | boolean | null | undefined | symbol | bigint;

/**
 * Built-in types
 */
export type Builtin = Primitive | ((...args: unknown[]) => unknown) | Date | Error | RegExp;

/**
 * Is any type
 */
export type IsAny<T> = 0 extends 1 & T ? true : false;

/**
 * Is unknown type
 */
export type IsUnknown<T> = IsAny<T> extends true ? false : unknown extends T ? true : false;

/**
 * Is never type
 */
export type IsNever<T> = [T] extends [never] ? true : false;
