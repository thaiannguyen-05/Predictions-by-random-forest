export type ChalkFunction = ((...args: unknown[]) => string) & {
  [key: string]: ChalkFunction;
};
