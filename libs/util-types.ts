export type ExtractClassMethodReturnTypes<T> = {
  [K in keyof T]: T[K] extends (...args: never[]) => infer R
    ? Awaited<R>
    : never;
};

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
