/**
 * LLD: Branded Types Utility
 * Used to mitigate "Primitive Obsession" by creating distinct types for primitives.
 */
export type Brand<K, T> = T & { __brand: K };
