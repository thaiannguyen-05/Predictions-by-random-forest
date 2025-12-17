/**
 * Mock chalk module for Jest tests
 * chalk@5+ is ESM-only, so we need to mock it for CommonJS tests
 */

type ChalkFunction = ((...args: unknown[]) => string) & {
  [key: string]: ChalkFunction;
};

const handler: ProxyHandler<ChalkFunction> = {
  get(_target: ChalkFunction, prop: string): ChalkFunction {
    if (prop === 'then') {
      return undefined as unknown as ChalkFunction;
    }
    return new Proxy(
      (...args: unknown[]): string => args.join(''),
      handler,
    ) as ChalkFunction;
  },
  apply(_target: ChalkFunction, _thisArg: unknown, args: unknown[]): string {
    return args.join('');
  },
};

const chalk: ChalkFunction = new Proxy(
  ((...args: unknown[]): string => args.join('')) as ChalkFunction,
  handler,
);

export default chalk;
export { chalk };
