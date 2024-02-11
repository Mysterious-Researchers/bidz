export type ExtractClassMethodReturnTypes<T> = {
  [K in keyof T]: T[K] extends (...args: never[]) => infer R
    ? Awaited<R>
    : never;
};
