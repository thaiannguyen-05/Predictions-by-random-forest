
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model UserDevice
 * 
 */
export type UserDevice = $Result.DefaultSelection<Prisma.$UserDevicePayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Code
 * 
 */
export type Code = $Result.DefaultSelection<Prisma.$CodePayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Oauth2User
 * 
 */
export type Oauth2User = $Result.DefaultSelection<Prisma.$Oauth2UserPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const AccountType: {
  EMAIL: 'EMAIL',
  OAUTH2: 'OAUTH2'
};

export type AccountType = (typeof AccountType)[keyof typeof AccountType]


export const Provider: {
  FACEBOOK: 'FACEBOOK',
  GOOGLE: 'GOOGLE'
};

export type Provider = (typeof Provider)[keyof typeof Provider]


export const CodeType: {
  VERIFICATION: 'VERIFICATION',
  PASSWORD_RESET: 'PASSWORD_RESET',
  EMAIL_CHANGE: 'EMAIL_CHANGE',
  PHONE_CHANGE: 'PHONE_CHANGE'
};

export type CodeType = (typeof CodeType)[keyof typeof CodeType]


export const Status: {
  ACTIVE: 'ACTIVE',
  SOLTDELETE: 'SOLTDELETE',
  PENDING: 'PENDING'
};

export type Status = (typeof Status)[keyof typeof Status]


export const UserVisibility: {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
  CONTACT_ONLY: 'CONTACT_ONLY'
};

export type UserVisibility = (typeof UserVisibility)[keyof typeof UserVisibility]

}

export type AccountType = $Enums.AccountType

export const AccountType: typeof $Enums.AccountType

export type Provider = $Enums.Provider

export const Provider: typeof $Enums.Provider

export type CodeType = $Enums.CodeType

export const CodeType: typeof $Enums.CodeType

export type Status = $Enums.Status

export const Status: typeof $Enums.Status

export type UserVisibility = $Enums.UserVisibility

export const UserVisibility: typeof $Enums.UserVisibility

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more UserDevices
 * const userDevices = await prisma.userDevice.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more UserDevices
   * const userDevices = await prisma.userDevice.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.userDevice`: Exposes CRUD operations for the **UserDevice** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserDevices
    * const userDevices = await prisma.userDevice.findMany()
    * ```
    */
  get userDevice(): Prisma.UserDeviceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.code`: Exposes CRUD operations for the **Code** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Codes
    * const codes = await prisma.code.findMany()
    * ```
    */
  get code(): Prisma.CodeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.oauth2User`: Exposes CRUD operations for the **Oauth2User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Oauth2Users
    * const oauth2Users = await prisma.oauth2User.findMany()
    * ```
    */
  get oauth2User(): Prisma.Oauth2UserDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.2
   * Query Engine version: 1c57fdcd7e44b29b9313256c76699e91c3ac3c43
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    UserDevice: 'UserDevice',
    Session: 'Session',
    Code: 'Code',
    User: 'User',
    Oauth2User: 'Oauth2User'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "userDevice" | "session" | "code" | "user" | "oauth2User"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      UserDevice: {
        payload: Prisma.$UserDevicePayload<ExtArgs>
        fields: Prisma.UserDeviceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserDeviceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDevicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserDeviceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDevicePayload>
          }
          findFirst: {
            args: Prisma.UserDeviceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDevicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserDeviceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDevicePayload>
          }
          findMany: {
            args: Prisma.UserDeviceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDevicePayload>[]
          }
          create: {
            args: Prisma.UserDeviceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDevicePayload>
          }
          createMany: {
            args: Prisma.UserDeviceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserDeviceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDevicePayload>[]
          }
          delete: {
            args: Prisma.UserDeviceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDevicePayload>
          }
          update: {
            args: Prisma.UserDeviceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDevicePayload>
          }
          deleteMany: {
            args: Prisma.UserDeviceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserDeviceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserDeviceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDevicePayload>[]
          }
          upsert: {
            args: Prisma.UserDeviceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDevicePayload>
          }
          aggregate: {
            args: Prisma.UserDeviceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserDevice>
          }
          groupBy: {
            args: Prisma.UserDeviceGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserDeviceGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserDeviceCountArgs<ExtArgs>
            result: $Utils.Optional<UserDeviceCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      Code: {
        payload: Prisma.$CodePayload<ExtArgs>
        fields: Prisma.CodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodePayload>
          }
          findFirst: {
            args: Prisma.CodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodePayload>
          }
          findMany: {
            args: Prisma.CodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodePayload>[]
          }
          create: {
            args: Prisma.CodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodePayload>
          }
          createMany: {
            args: Prisma.CodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CodeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodePayload>[]
          }
          delete: {
            args: Prisma.CodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodePayload>
          }
          update: {
            args: Prisma.CodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodePayload>
          }
          deleteMany: {
            args: Prisma.CodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CodeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodePayload>[]
          }
          upsert: {
            args: Prisma.CodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodePayload>
          }
          aggregate: {
            args: Prisma.CodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCode>
          }
          groupBy: {
            args: Prisma.CodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<CodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.CodeCountArgs<ExtArgs>
            result: $Utils.Optional<CodeCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Oauth2User: {
        payload: Prisma.$Oauth2UserPayload<ExtArgs>
        fields: Prisma.Oauth2UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.Oauth2UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Oauth2UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.Oauth2UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Oauth2UserPayload>
          }
          findFirst: {
            args: Prisma.Oauth2UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Oauth2UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.Oauth2UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Oauth2UserPayload>
          }
          findMany: {
            args: Prisma.Oauth2UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Oauth2UserPayload>[]
          }
          create: {
            args: Prisma.Oauth2UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Oauth2UserPayload>
          }
          createMany: {
            args: Prisma.Oauth2UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.Oauth2UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Oauth2UserPayload>[]
          }
          delete: {
            args: Prisma.Oauth2UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Oauth2UserPayload>
          }
          update: {
            args: Prisma.Oauth2UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Oauth2UserPayload>
          }
          deleteMany: {
            args: Prisma.Oauth2UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.Oauth2UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.Oauth2UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Oauth2UserPayload>[]
          }
          upsert: {
            args: Prisma.Oauth2UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Oauth2UserPayload>
          }
          aggregate: {
            args: Prisma.Oauth2UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOauth2User>
          }
          groupBy: {
            args: Prisma.Oauth2UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<Oauth2UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.Oauth2UserCountArgs<ExtArgs>
            result: $Utils.Optional<Oauth2UserCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    userDevice?: UserDeviceOmit
    session?: SessionOmit
    code?: CodeOmit
    user?: UserOmit
    oauth2User?: Oauth2UserOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    userDevice: number
    sessions: number
    Oauth2User: number
    codes: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userDevice?: boolean | UserCountOutputTypeCountUserDeviceArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    Oauth2User?: boolean | UserCountOutputTypeCountOauth2UserArgs
    codes?: boolean | UserCountOutputTypeCountCodesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUserDeviceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserDeviceWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOauth2UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Oauth2UserWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CodeWhereInput
  }


  /**
   * Models
   */

  /**
   * Model UserDevice
   */

  export type AggregateUserDevice = {
    _count: UserDeviceCountAggregateOutputType | null
    _min: UserDeviceMinAggregateOutputType | null
    _max: UserDeviceMaxAggregateOutputType | null
  }

  export type UserDeviceMinAggregateOutputType = {
    id: string | null
    deviceId: string | null
    nameDevice: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type UserDeviceMaxAggregateOutputType = {
    id: string | null
    deviceId: string | null
    nameDevice: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type UserDeviceCountAggregateOutputType = {
    id: number
    deviceId: number
    nameDevice: number
    createdAt: number
    updatedAt: number
    userId: number
    _all: number
  }


  export type UserDeviceMinAggregateInputType = {
    id?: true
    deviceId?: true
    nameDevice?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type UserDeviceMaxAggregateInputType = {
    id?: true
    deviceId?: true
    nameDevice?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type UserDeviceCountAggregateInputType = {
    id?: true
    deviceId?: true
    nameDevice?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    _all?: true
  }

  export type UserDeviceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserDevice to aggregate.
     */
    where?: UserDeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserDevices to fetch.
     */
    orderBy?: UserDeviceOrderByWithRelationInput | UserDeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserDeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserDevices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserDevices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserDevices
    **/
    _count?: true | UserDeviceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserDeviceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserDeviceMaxAggregateInputType
  }

  export type GetUserDeviceAggregateType<T extends UserDeviceAggregateArgs> = {
        [P in keyof T & keyof AggregateUserDevice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserDevice[P]>
      : GetScalarType<T[P], AggregateUserDevice[P]>
  }




  export type UserDeviceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserDeviceWhereInput
    orderBy?: UserDeviceOrderByWithAggregationInput | UserDeviceOrderByWithAggregationInput[]
    by: UserDeviceScalarFieldEnum[] | UserDeviceScalarFieldEnum
    having?: UserDeviceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserDeviceCountAggregateInputType | true
    _min?: UserDeviceMinAggregateInputType
    _max?: UserDeviceMaxAggregateInputType
  }

  export type UserDeviceGroupByOutputType = {
    id: string
    deviceId: string
    nameDevice: string
    createdAt: Date
    updatedAt: Date
    userId: string
    _count: UserDeviceCountAggregateOutputType | null
    _min: UserDeviceMinAggregateOutputType | null
    _max: UserDeviceMaxAggregateOutputType | null
  }

  type GetUserDeviceGroupByPayload<T extends UserDeviceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserDeviceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserDeviceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserDeviceGroupByOutputType[P]>
            : GetScalarType<T[P], UserDeviceGroupByOutputType[P]>
        }
      >
    >


  export type UserDeviceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    deviceId?: boolean
    nameDevice?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userDevice"]>

  export type UserDeviceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    deviceId?: boolean
    nameDevice?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userDevice"]>

  export type UserDeviceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    deviceId?: boolean
    nameDevice?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userDevice"]>

  export type UserDeviceSelectScalar = {
    id?: boolean
    deviceId?: boolean
    nameDevice?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }

  export type UserDeviceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "deviceId" | "nameDevice" | "createdAt" | "updatedAt" | "userId", ExtArgs["result"]["userDevice"]>
  export type UserDeviceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserDeviceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserDeviceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserDevicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserDevice"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      deviceId: string
      nameDevice: string
      createdAt: Date
      updatedAt: Date
      userId: string
    }, ExtArgs["result"]["userDevice"]>
    composites: {}
  }

  type UserDeviceGetPayload<S extends boolean | null | undefined | UserDeviceDefaultArgs> = $Result.GetResult<Prisma.$UserDevicePayload, S>

  type UserDeviceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserDeviceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserDeviceCountAggregateInputType | true
    }

  export interface UserDeviceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserDevice'], meta: { name: 'UserDevice' } }
    /**
     * Find zero or one UserDevice that matches the filter.
     * @param {UserDeviceFindUniqueArgs} args - Arguments to find a UserDevice
     * @example
     * // Get one UserDevice
     * const userDevice = await prisma.userDevice.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserDeviceFindUniqueArgs>(args: SelectSubset<T, UserDeviceFindUniqueArgs<ExtArgs>>): Prisma__UserDeviceClient<$Result.GetResult<Prisma.$UserDevicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserDevice that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserDeviceFindUniqueOrThrowArgs} args - Arguments to find a UserDevice
     * @example
     * // Get one UserDevice
     * const userDevice = await prisma.userDevice.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserDeviceFindUniqueOrThrowArgs>(args: SelectSubset<T, UserDeviceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserDeviceClient<$Result.GetResult<Prisma.$UserDevicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserDevice that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDeviceFindFirstArgs} args - Arguments to find a UserDevice
     * @example
     * // Get one UserDevice
     * const userDevice = await prisma.userDevice.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserDeviceFindFirstArgs>(args?: SelectSubset<T, UserDeviceFindFirstArgs<ExtArgs>>): Prisma__UserDeviceClient<$Result.GetResult<Prisma.$UserDevicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserDevice that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDeviceFindFirstOrThrowArgs} args - Arguments to find a UserDevice
     * @example
     * // Get one UserDevice
     * const userDevice = await prisma.userDevice.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserDeviceFindFirstOrThrowArgs>(args?: SelectSubset<T, UserDeviceFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserDeviceClient<$Result.GetResult<Prisma.$UserDevicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserDevices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDeviceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserDevices
     * const userDevices = await prisma.userDevice.findMany()
     * 
     * // Get first 10 UserDevices
     * const userDevices = await prisma.userDevice.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userDeviceWithIdOnly = await prisma.userDevice.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserDeviceFindManyArgs>(args?: SelectSubset<T, UserDeviceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDevicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserDevice.
     * @param {UserDeviceCreateArgs} args - Arguments to create a UserDevice.
     * @example
     * // Create one UserDevice
     * const UserDevice = await prisma.userDevice.create({
     *   data: {
     *     // ... data to create a UserDevice
     *   }
     * })
     * 
     */
    create<T extends UserDeviceCreateArgs>(args: SelectSubset<T, UserDeviceCreateArgs<ExtArgs>>): Prisma__UserDeviceClient<$Result.GetResult<Prisma.$UserDevicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserDevices.
     * @param {UserDeviceCreateManyArgs} args - Arguments to create many UserDevices.
     * @example
     * // Create many UserDevices
     * const userDevice = await prisma.userDevice.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserDeviceCreateManyArgs>(args?: SelectSubset<T, UserDeviceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserDevices and returns the data saved in the database.
     * @param {UserDeviceCreateManyAndReturnArgs} args - Arguments to create many UserDevices.
     * @example
     * // Create many UserDevices
     * const userDevice = await prisma.userDevice.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserDevices and only return the `id`
     * const userDeviceWithIdOnly = await prisma.userDevice.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserDeviceCreateManyAndReturnArgs>(args?: SelectSubset<T, UserDeviceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDevicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserDevice.
     * @param {UserDeviceDeleteArgs} args - Arguments to delete one UserDevice.
     * @example
     * // Delete one UserDevice
     * const UserDevice = await prisma.userDevice.delete({
     *   where: {
     *     // ... filter to delete one UserDevice
     *   }
     * })
     * 
     */
    delete<T extends UserDeviceDeleteArgs>(args: SelectSubset<T, UserDeviceDeleteArgs<ExtArgs>>): Prisma__UserDeviceClient<$Result.GetResult<Prisma.$UserDevicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserDevice.
     * @param {UserDeviceUpdateArgs} args - Arguments to update one UserDevice.
     * @example
     * // Update one UserDevice
     * const userDevice = await prisma.userDevice.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserDeviceUpdateArgs>(args: SelectSubset<T, UserDeviceUpdateArgs<ExtArgs>>): Prisma__UserDeviceClient<$Result.GetResult<Prisma.$UserDevicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserDevices.
     * @param {UserDeviceDeleteManyArgs} args - Arguments to filter UserDevices to delete.
     * @example
     * // Delete a few UserDevices
     * const { count } = await prisma.userDevice.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeviceDeleteManyArgs>(args?: SelectSubset<T, UserDeviceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserDevices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDeviceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserDevices
     * const userDevice = await prisma.userDevice.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserDeviceUpdateManyArgs>(args: SelectSubset<T, UserDeviceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserDevices and returns the data updated in the database.
     * @param {UserDeviceUpdateManyAndReturnArgs} args - Arguments to update many UserDevices.
     * @example
     * // Update many UserDevices
     * const userDevice = await prisma.userDevice.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserDevices and only return the `id`
     * const userDeviceWithIdOnly = await prisma.userDevice.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserDeviceUpdateManyAndReturnArgs>(args: SelectSubset<T, UserDeviceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDevicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserDevice.
     * @param {UserDeviceUpsertArgs} args - Arguments to update or create a UserDevice.
     * @example
     * // Update or create a UserDevice
     * const userDevice = await prisma.userDevice.upsert({
     *   create: {
     *     // ... data to create a UserDevice
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserDevice we want to update
     *   }
     * })
     */
    upsert<T extends UserDeviceUpsertArgs>(args: SelectSubset<T, UserDeviceUpsertArgs<ExtArgs>>): Prisma__UserDeviceClient<$Result.GetResult<Prisma.$UserDevicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserDevices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDeviceCountArgs} args - Arguments to filter UserDevices to count.
     * @example
     * // Count the number of UserDevices
     * const count = await prisma.userDevice.count({
     *   where: {
     *     // ... the filter for the UserDevices we want to count
     *   }
     * })
    **/
    count<T extends UserDeviceCountArgs>(
      args?: Subset<T, UserDeviceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserDeviceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserDevice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDeviceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserDeviceAggregateArgs>(args: Subset<T, UserDeviceAggregateArgs>): Prisma.PrismaPromise<GetUserDeviceAggregateType<T>>

    /**
     * Group by UserDevice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDeviceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserDeviceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserDeviceGroupByArgs['orderBy'] }
        : { orderBy?: UserDeviceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserDeviceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserDeviceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserDevice model
   */
  readonly fields: UserDeviceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserDevice.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserDeviceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserDevice model
   */
  interface UserDeviceFieldRefs {
    readonly id: FieldRef<"UserDevice", 'String'>
    readonly deviceId: FieldRef<"UserDevice", 'String'>
    readonly nameDevice: FieldRef<"UserDevice", 'String'>
    readonly createdAt: FieldRef<"UserDevice", 'DateTime'>
    readonly updatedAt: FieldRef<"UserDevice", 'DateTime'>
    readonly userId: FieldRef<"UserDevice", 'String'>
  }
    

  // Custom InputTypes
  /**
   * UserDevice findUnique
   */
  export type UserDeviceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDevice
     */
    select?: UserDeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDevice
     */
    omit?: UserDeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDeviceInclude<ExtArgs> | null
    /**
     * Filter, which UserDevice to fetch.
     */
    where: UserDeviceWhereUniqueInput
  }

  /**
   * UserDevice findUniqueOrThrow
   */
  export type UserDeviceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDevice
     */
    select?: UserDeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDevice
     */
    omit?: UserDeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDeviceInclude<ExtArgs> | null
    /**
     * Filter, which UserDevice to fetch.
     */
    where: UserDeviceWhereUniqueInput
  }

  /**
   * UserDevice findFirst
   */
  export type UserDeviceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDevice
     */
    select?: UserDeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDevice
     */
    omit?: UserDeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDeviceInclude<ExtArgs> | null
    /**
     * Filter, which UserDevice to fetch.
     */
    where?: UserDeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserDevices to fetch.
     */
    orderBy?: UserDeviceOrderByWithRelationInput | UserDeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserDevices.
     */
    cursor?: UserDeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserDevices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserDevices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserDevices.
     */
    distinct?: UserDeviceScalarFieldEnum | UserDeviceScalarFieldEnum[]
  }

  /**
   * UserDevice findFirstOrThrow
   */
  export type UserDeviceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDevice
     */
    select?: UserDeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDevice
     */
    omit?: UserDeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDeviceInclude<ExtArgs> | null
    /**
     * Filter, which UserDevice to fetch.
     */
    where?: UserDeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserDevices to fetch.
     */
    orderBy?: UserDeviceOrderByWithRelationInput | UserDeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserDevices.
     */
    cursor?: UserDeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserDevices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserDevices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserDevices.
     */
    distinct?: UserDeviceScalarFieldEnum | UserDeviceScalarFieldEnum[]
  }

  /**
   * UserDevice findMany
   */
  export type UserDeviceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDevice
     */
    select?: UserDeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDevice
     */
    omit?: UserDeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDeviceInclude<ExtArgs> | null
    /**
     * Filter, which UserDevices to fetch.
     */
    where?: UserDeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserDevices to fetch.
     */
    orderBy?: UserDeviceOrderByWithRelationInput | UserDeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserDevices.
     */
    cursor?: UserDeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserDevices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserDevices.
     */
    skip?: number
    distinct?: UserDeviceScalarFieldEnum | UserDeviceScalarFieldEnum[]
  }

  /**
   * UserDevice create
   */
  export type UserDeviceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDevice
     */
    select?: UserDeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDevice
     */
    omit?: UserDeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDeviceInclude<ExtArgs> | null
    /**
     * The data needed to create a UserDevice.
     */
    data: XOR<UserDeviceCreateInput, UserDeviceUncheckedCreateInput>
  }

  /**
   * UserDevice createMany
   */
  export type UserDeviceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserDevices.
     */
    data: UserDeviceCreateManyInput | UserDeviceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserDevice createManyAndReturn
   */
  export type UserDeviceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDevice
     */
    select?: UserDeviceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserDevice
     */
    omit?: UserDeviceOmit<ExtArgs> | null
    /**
     * The data used to create many UserDevices.
     */
    data: UserDeviceCreateManyInput | UserDeviceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDeviceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserDevice update
   */
  export type UserDeviceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDevice
     */
    select?: UserDeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDevice
     */
    omit?: UserDeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDeviceInclude<ExtArgs> | null
    /**
     * The data needed to update a UserDevice.
     */
    data: XOR<UserDeviceUpdateInput, UserDeviceUncheckedUpdateInput>
    /**
     * Choose, which UserDevice to update.
     */
    where: UserDeviceWhereUniqueInput
  }

  /**
   * UserDevice updateMany
   */
  export type UserDeviceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserDevices.
     */
    data: XOR<UserDeviceUpdateManyMutationInput, UserDeviceUncheckedUpdateManyInput>
    /**
     * Filter which UserDevices to update
     */
    where?: UserDeviceWhereInput
    /**
     * Limit how many UserDevices to update.
     */
    limit?: number
  }

  /**
   * UserDevice updateManyAndReturn
   */
  export type UserDeviceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDevice
     */
    select?: UserDeviceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserDevice
     */
    omit?: UserDeviceOmit<ExtArgs> | null
    /**
     * The data used to update UserDevices.
     */
    data: XOR<UserDeviceUpdateManyMutationInput, UserDeviceUncheckedUpdateManyInput>
    /**
     * Filter which UserDevices to update
     */
    where?: UserDeviceWhereInput
    /**
     * Limit how many UserDevices to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDeviceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserDevice upsert
   */
  export type UserDeviceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDevice
     */
    select?: UserDeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDevice
     */
    omit?: UserDeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDeviceInclude<ExtArgs> | null
    /**
     * The filter to search for the UserDevice to update in case it exists.
     */
    where: UserDeviceWhereUniqueInput
    /**
     * In case the UserDevice found by the `where` argument doesn't exist, create a new UserDevice with this data.
     */
    create: XOR<UserDeviceCreateInput, UserDeviceUncheckedCreateInput>
    /**
     * In case the UserDevice was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserDeviceUpdateInput, UserDeviceUncheckedUpdateInput>
  }

  /**
   * UserDevice delete
   */
  export type UserDeviceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDevice
     */
    select?: UserDeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDevice
     */
    omit?: UserDeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDeviceInclude<ExtArgs> | null
    /**
     * Filter which UserDevice to delete.
     */
    where: UserDeviceWhereUniqueInput
  }

  /**
   * UserDevice deleteMany
   */
  export type UserDeviceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserDevices to delete
     */
    where?: UserDeviceWhereInput
    /**
     * Limit how many UserDevices to delete.
     */
    limit?: number
  }

  /**
   * UserDevice without action
   */
  export type UserDeviceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDevice
     */
    select?: UserDeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDevice
     */
    omit?: UserDeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDeviceInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    userDeviceId: string | null
    hashedRefreshToken: string | null
    userAgent: string | null
    userIp: string | null
    createdAt: Date | null
    updatedAt: Date | null
    loginedAt: Date | null
    logoutedAt: Date | null
    userId: string | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    userDeviceId: string | null
    hashedRefreshToken: string | null
    userAgent: string | null
    userIp: string | null
    createdAt: Date | null
    updatedAt: Date | null
    loginedAt: Date | null
    logoutedAt: Date | null
    userId: string | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    userDeviceId: number
    hashedRefreshToken: number
    userAgent: number
    userIp: number
    createdAt: number
    updatedAt: number
    loginedAt: number
    logoutedAt: number
    userId: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    userDeviceId?: true
    hashedRefreshToken?: true
    userAgent?: true
    userIp?: true
    createdAt?: true
    updatedAt?: true
    loginedAt?: true
    logoutedAt?: true
    userId?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    userDeviceId?: true
    hashedRefreshToken?: true
    userAgent?: true
    userIp?: true
    createdAt?: true
    updatedAt?: true
    loginedAt?: true
    logoutedAt?: true
    userId?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    userDeviceId?: true
    hashedRefreshToken?: true
    userAgent?: true
    userIp?: true
    createdAt?: true
    updatedAt?: true
    loginedAt?: true
    logoutedAt?: true
    userId?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    userDeviceId: string
    hashedRefreshToken: string | null
    userAgent: string | null
    userIp: string
    createdAt: Date
    updatedAt: Date
    loginedAt: Date | null
    logoutedAt: Date | null
    userId: string
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userDeviceId?: boolean
    hashedRefreshToken?: boolean
    userAgent?: boolean
    userIp?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    loginedAt?: boolean
    logoutedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userDeviceId?: boolean
    hashedRefreshToken?: boolean
    userAgent?: boolean
    userIp?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    loginedAt?: boolean
    logoutedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userDeviceId?: boolean
    hashedRefreshToken?: boolean
    userAgent?: boolean
    userIp?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    loginedAt?: boolean
    logoutedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    userDeviceId?: boolean
    hashedRefreshToken?: boolean
    userAgent?: boolean
    userIp?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    loginedAt?: boolean
    logoutedAt?: boolean
    userId?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userDeviceId" | "hashedRefreshToken" | "userAgent" | "userIp" | "createdAt" | "updatedAt" | "loginedAt" | "logoutedAt" | "userId", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userDeviceId: string
      hashedRefreshToken: string | null
      userAgent: string | null
      userIp: string
      createdAt: Date
      updatedAt: Date
      loginedAt: Date | null
      logoutedAt: Date | null
      userId: string
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly userDeviceId: FieldRef<"Session", 'String'>
    readonly hashedRefreshToken: FieldRef<"Session", 'String'>
    readonly userAgent: FieldRef<"Session", 'String'>
    readonly userIp: FieldRef<"Session", 'String'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly updatedAt: FieldRef<"Session", 'DateTime'>
    readonly loginedAt: FieldRef<"Session", 'DateTime'>
    readonly logoutedAt: FieldRef<"Session", 'DateTime'>
    readonly userId: FieldRef<"Session", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model Code
   */

  export type AggregateCode = {
    _count: CodeCountAggregateOutputType | null
    _min: CodeMinAggregateOutputType | null
    _max: CodeMaxAggregateOutputType | null
  }

  export type CodeMinAggregateOutputType = {
    id: string | null
    code: string | null
    type: $Enums.CodeType | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type CodeMaxAggregateOutputType = {
    id: string | null
    code: string | null
    type: $Enums.CodeType | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type CodeCountAggregateOutputType = {
    id: number
    code: number
    type: number
    createdAt: number
    updatedAt: number
    userId: number
    _all: number
  }


  export type CodeMinAggregateInputType = {
    id?: true
    code?: true
    type?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type CodeMaxAggregateInputType = {
    id?: true
    code?: true
    type?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type CodeCountAggregateInputType = {
    id?: true
    code?: true
    type?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    _all?: true
  }

  export type CodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Code to aggregate.
     */
    where?: CodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Codes to fetch.
     */
    orderBy?: CodeOrderByWithRelationInput | CodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Codes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Codes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Codes
    **/
    _count?: true | CodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CodeMaxAggregateInputType
  }

  export type GetCodeAggregateType<T extends CodeAggregateArgs> = {
        [P in keyof T & keyof AggregateCode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCode[P]>
      : GetScalarType<T[P], AggregateCode[P]>
  }




  export type CodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CodeWhereInput
    orderBy?: CodeOrderByWithAggregationInput | CodeOrderByWithAggregationInput[]
    by: CodeScalarFieldEnum[] | CodeScalarFieldEnum
    having?: CodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CodeCountAggregateInputType | true
    _min?: CodeMinAggregateInputType
    _max?: CodeMaxAggregateInputType
  }

  export type CodeGroupByOutputType = {
    id: string
    code: string
    type: $Enums.CodeType
    createdAt: Date
    updatedAt: Date
    userId: string
    _count: CodeCountAggregateOutputType | null
    _min: CodeMinAggregateOutputType | null
    _max: CodeMaxAggregateOutputType | null
  }

  type GetCodeGroupByPayload<T extends CodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CodeGroupByOutputType[P]>
            : GetScalarType<T[P], CodeGroupByOutputType[P]>
        }
      >
    >


  export type CodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["code"]>

  export type CodeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["code"]>

  export type CodeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["code"]>

  export type CodeSelectScalar = {
    id?: boolean
    code?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }

  export type CodeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "type" | "createdAt" | "updatedAt" | "userId", ExtArgs["result"]["code"]>
  export type CodeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CodeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CodeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Code"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      type: $Enums.CodeType
      createdAt: Date
      updatedAt: Date
      userId: string
    }, ExtArgs["result"]["code"]>
    composites: {}
  }

  type CodeGetPayload<S extends boolean | null | undefined | CodeDefaultArgs> = $Result.GetResult<Prisma.$CodePayload, S>

  type CodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CodeCountAggregateInputType | true
    }

  export interface CodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Code'], meta: { name: 'Code' } }
    /**
     * Find zero or one Code that matches the filter.
     * @param {CodeFindUniqueArgs} args - Arguments to find a Code
     * @example
     * // Get one Code
     * const code = await prisma.code.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CodeFindUniqueArgs>(args: SelectSubset<T, CodeFindUniqueArgs<ExtArgs>>): Prisma__CodeClient<$Result.GetResult<Prisma.$CodePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Code that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CodeFindUniqueOrThrowArgs} args - Arguments to find a Code
     * @example
     * // Get one Code
     * const code = await prisma.code.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CodeFindUniqueOrThrowArgs>(args: SelectSubset<T, CodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CodeClient<$Result.GetResult<Prisma.$CodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Code that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodeFindFirstArgs} args - Arguments to find a Code
     * @example
     * // Get one Code
     * const code = await prisma.code.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CodeFindFirstArgs>(args?: SelectSubset<T, CodeFindFirstArgs<ExtArgs>>): Prisma__CodeClient<$Result.GetResult<Prisma.$CodePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Code that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodeFindFirstOrThrowArgs} args - Arguments to find a Code
     * @example
     * // Get one Code
     * const code = await prisma.code.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CodeFindFirstOrThrowArgs>(args?: SelectSubset<T, CodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__CodeClient<$Result.GetResult<Prisma.$CodePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Codes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Codes
     * const codes = await prisma.code.findMany()
     * 
     * // Get first 10 Codes
     * const codes = await prisma.code.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const codeWithIdOnly = await prisma.code.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CodeFindManyArgs>(args?: SelectSubset<T, CodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Code.
     * @param {CodeCreateArgs} args - Arguments to create a Code.
     * @example
     * // Create one Code
     * const Code = await prisma.code.create({
     *   data: {
     *     // ... data to create a Code
     *   }
     * })
     * 
     */
    create<T extends CodeCreateArgs>(args: SelectSubset<T, CodeCreateArgs<ExtArgs>>): Prisma__CodeClient<$Result.GetResult<Prisma.$CodePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Codes.
     * @param {CodeCreateManyArgs} args - Arguments to create many Codes.
     * @example
     * // Create many Codes
     * const code = await prisma.code.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CodeCreateManyArgs>(args?: SelectSubset<T, CodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Codes and returns the data saved in the database.
     * @param {CodeCreateManyAndReturnArgs} args - Arguments to create many Codes.
     * @example
     * // Create many Codes
     * const code = await prisma.code.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Codes and only return the `id`
     * const codeWithIdOnly = await prisma.code.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CodeCreateManyAndReturnArgs>(args?: SelectSubset<T, CodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CodePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Code.
     * @param {CodeDeleteArgs} args - Arguments to delete one Code.
     * @example
     * // Delete one Code
     * const Code = await prisma.code.delete({
     *   where: {
     *     // ... filter to delete one Code
     *   }
     * })
     * 
     */
    delete<T extends CodeDeleteArgs>(args: SelectSubset<T, CodeDeleteArgs<ExtArgs>>): Prisma__CodeClient<$Result.GetResult<Prisma.$CodePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Code.
     * @param {CodeUpdateArgs} args - Arguments to update one Code.
     * @example
     * // Update one Code
     * const code = await prisma.code.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CodeUpdateArgs>(args: SelectSubset<T, CodeUpdateArgs<ExtArgs>>): Prisma__CodeClient<$Result.GetResult<Prisma.$CodePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Codes.
     * @param {CodeDeleteManyArgs} args - Arguments to filter Codes to delete.
     * @example
     * // Delete a few Codes
     * const { count } = await prisma.code.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CodeDeleteManyArgs>(args?: SelectSubset<T, CodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Codes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Codes
     * const code = await prisma.code.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CodeUpdateManyArgs>(args: SelectSubset<T, CodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Codes and returns the data updated in the database.
     * @param {CodeUpdateManyAndReturnArgs} args - Arguments to update many Codes.
     * @example
     * // Update many Codes
     * const code = await prisma.code.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Codes and only return the `id`
     * const codeWithIdOnly = await prisma.code.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CodeUpdateManyAndReturnArgs>(args: SelectSubset<T, CodeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CodePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Code.
     * @param {CodeUpsertArgs} args - Arguments to update or create a Code.
     * @example
     * // Update or create a Code
     * const code = await prisma.code.upsert({
     *   create: {
     *     // ... data to create a Code
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Code we want to update
     *   }
     * })
     */
    upsert<T extends CodeUpsertArgs>(args: SelectSubset<T, CodeUpsertArgs<ExtArgs>>): Prisma__CodeClient<$Result.GetResult<Prisma.$CodePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Codes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodeCountArgs} args - Arguments to filter Codes to count.
     * @example
     * // Count the number of Codes
     * const count = await prisma.code.count({
     *   where: {
     *     // ... the filter for the Codes we want to count
     *   }
     * })
    **/
    count<T extends CodeCountArgs>(
      args?: Subset<T, CodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Code.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CodeAggregateArgs>(args: Subset<T, CodeAggregateArgs>): Prisma.PrismaPromise<GetCodeAggregateType<T>>

    /**
     * Group by Code.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CodeGroupByArgs['orderBy'] }
        : { orderBy?: CodeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Code model
   */
  readonly fields: CodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Code.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Code model
   */
  interface CodeFieldRefs {
    readonly id: FieldRef<"Code", 'String'>
    readonly code: FieldRef<"Code", 'String'>
    readonly type: FieldRef<"Code", 'CodeType'>
    readonly createdAt: FieldRef<"Code", 'DateTime'>
    readonly updatedAt: FieldRef<"Code", 'DateTime'>
    readonly userId: FieldRef<"Code", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Code findUnique
   */
  export type CodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Code
     */
    select?: CodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Code
     */
    omit?: CodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeInclude<ExtArgs> | null
    /**
     * Filter, which Code to fetch.
     */
    where: CodeWhereUniqueInput
  }

  /**
   * Code findUniqueOrThrow
   */
  export type CodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Code
     */
    select?: CodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Code
     */
    omit?: CodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeInclude<ExtArgs> | null
    /**
     * Filter, which Code to fetch.
     */
    where: CodeWhereUniqueInput
  }

  /**
   * Code findFirst
   */
  export type CodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Code
     */
    select?: CodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Code
     */
    omit?: CodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeInclude<ExtArgs> | null
    /**
     * Filter, which Code to fetch.
     */
    where?: CodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Codes to fetch.
     */
    orderBy?: CodeOrderByWithRelationInput | CodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Codes.
     */
    cursor?: CodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Codes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Codes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Codes.
     */
    distinct?: CodeScalarFieldEnum | CodeScalarFieldEnum[]
  }

  /**
   * Code findFirstOrThrow
   */
  export type CodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Code
     */
    select?: CodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Code
     */
    omit?: CodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeInclude<ExtArgs> | null
    /**
     * Filter, which Code to fetch.
     */
    where?: CodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Codes to fetch.
     */
    orderBy?: CodeOrderByWithRelationInput | CodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Codes.
     */
    cursor?: CodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Codes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Codes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Codes.
     */
    distinct?: CodeScalarFieldEnum | CodeScalarFieldEnum[]
  }

  /**
   * Code findMany
   */
  export type CodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Code
     */
    select?: CodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Code
     */
    omit?: CodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeInclude<ExtArgs> | null
    /**
     * Filter, which Codes to fetch.
     */
    where?: CodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Codes to fetch.
     */
    orderBy?: CodeOrderByWithRelationInput | CodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Codes.
     */
    cursor?: CodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Codes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Codes.
     */
    skip?: number
    distinct?: CodeScalarFieldEnum | CodeScalarFieldEnum[]
  }

  /**
   * Code create
   */
  export type CodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Code
     */
    select?: CodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Code
     */
    omit?: CodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeInclude<ExtArgs> | null
    /**
     * The data needed to create a Code.
     */
    data: XOR<CodeCreateInput, CodeUncheckedCreateInput>
  }

  /**
   * Code createMany
   */
  export type CodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Codes.
     */
    data: CodeCreateManyInput | CodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Code createManyAndReturn
   */
  export type CodeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Code
     */
    select?: CodeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Code
     */
    omit?: CodeOmit<ExtArgs> | null
    /**
     * The data used to create many Codes.
     */
    data: CodeCreateManyInput | CodeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Code update
   */
  export type CodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Code
     */
    select?: CodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Code
     */
    omit?: CodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeInclude<ExtArgs> | null
    /**
     * The data needed to update a Code.
     */
    data: XOR<CodeUpdateInput, CodeUncheckedUpdateInput>
    /**
     * Choose, which Code to update.
     */
    where: CodeWhereUniqueInput
  }

  /**
   * Code updateMany
   */
  export type CodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Codes.
     */
    data: XOR<CodeUpdateManyMutationInput, CodeUncheckedUpdateManyInput>
    /**
     * Filter which Codes to update
     */
    where?: CodeWhereInput
    /**
     * Limit how many Codes to update.
     */
    limit?: number
  }

  /**
   * Code updateManyAndReturn
   */
  export type CodeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Code
     */
    select?: CodeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Code
     */
    omit?: CodeOmit<ExtArgs> | null
    /**
     * The data used to update Codes.
     */
    data: XOR<CodeUpdateManyMutationInput, CodeUncheckedUpdateManyInput>
    /**
     * Filter which Codes to update
     */
    where?: CodeWhereInput
    /**
     * Limit how many Codes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Code upsert
   */
  export type CodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Code
     */
    select?: CodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Code
     */
    omit?: CodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeInclude<ExtArgs> | null
    /**
     * The filter to search for the Code to update in case it exists.
     */
    where: CodeWhereUniqueInput
    /**
     * In case the Code found by the `where` argument doesn't exist, create a new Code with this data.
     */
    create: XOR<CodeCreateInput, CodeUncheckedCreateInput>
    /**
     * In case the Code was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CodeUpdateInput, CodeUncheckedUpdateInput>
  }

  /**
   * Code delete
   */
  export type CodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Code
     */
    select?: CodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Code
     */
    omit?: CodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeInclude<ExtArgs> | null
    /**
     * Filter which Code to delete.
     */
    where: CodeWhereUniqueInput
  }

  /**
   * Code deleteMany
   */
  export type CodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Codes to delete
     */
    where?: CodeWhereInput
    /**
     * Limit how many Codes to delete.
     */
    limit?: number
  }

  /**
   * Code without action
   */
  export type CodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Code
     */
    select?: CodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Code
     */
    omit?: CodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    searchCount: number | null
  }

  export type UserSumAggregateOutputType = {
    searchCount: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    fullname: string | null
    username: string | null
    email: string | null
    hashedPassword: string | null
    accountType: $Enums.AccountType | null
    avtUrl: string | null
    address: string | null
    city: string | null
    state: string | null
    searchCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
    visible: $Enums.UserVisibility | null
    status: $Enums.Status | null
    phone: string | null
    numberIdentity: string | null
    dateOfBirth: Date | null
    firstName: string | null
    lastName: string | null
    isActive: boolean | null
    isBanned: boolean | null
    isLocked: boolean | null
    isVerified: boolean | null
    lastActived: Date | null
    picture: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    fullname: string | null
    username: string | null
    email: string | null
    hashedPassword: string | null
    accountType: $Enums.AccountType | null
    avtUrl: string | null
    address: string | null
    city: string | null
    state: string | null
    searchCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
    visible: $Enums.UserVisibility | null
    status: $Enums.Status | null
    phone: string | null
    numberIdentity: string | null
    dateOfBirth: Date | null
    firstName: string | null
    lastName: string | null
    isActive: boolean | null
    isBanned: boolean | null
    isLocked: boolean | null
    isVerified: boolean | null
    lastActived: Date | null
    picture: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    fullname: number
    username: number
    email: number
    hashedPassword: number
    accountType: number
    avtUrl: number
    address: number
    city: number
    state: number
    searchCount: number
    createdAt: number
    updatedAt: number
    visible: number
    status: number
    phone: number
    numberIdentity: number
    dateOfBirth: number
    firstName: number
    lastName: number
    isActive: number
    isBanned: number
    isLocked: number
    isVerified: number
    lastActived: number
    picture: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    searchCount?: true
  }

  export type UserSumAggregateInputType = {
    searchCount?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    fullname?: true
    username?: true
    email?: true
    hashedPassword?: true
    accountType?: true
    avtUrl?: true
    address?: true
    city?: true
    state?: true
    searchCount?: true
    createdAt?: true
    updatedAt?: true
    visible?: true
    status?: true
    phone?: true
    numberIdentity?: true
    dateOfBirth?: true
    firstName?: true
    lastName?: true
    isActive?: true
    isBanned?: true
    isLocked?: true
    isVerified?: true
    lastActived?: true
    picture?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    fullname?: true
    username?: true
    email?: true
    hashedPassword?: true
    accountType?: true
    avtUrl?: true
    address?: true
    city?: true
    state?: true
    searchCount?: true
    createdAt?: true
    updatedAt?: true
    visible?: true
    status?: true
    phone?: true
    numberIdentity?: true
    dateOfBirth?: true
    firstName?: true
    lastName?: true
    isActive?: true
    isBanned?: true
    isLocked?: true
    isVerified?: true
    lastActived?: true
    picture?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    fullname?: true
    username?: true
    email?: true
    hashedPassword?: true
    accountType?: true
    avtUrl?: true
    address?: true
    city?: true
    state?: true
    searchCount?: true
    createdAt?: true
    updatedAt?: true
    visible?: true
    status?: true
    phone?: true
    numberIdentity?: true
    dateOfBirth?: true
    firstName?: true
    lastName?: true
    isActive?: true
    isBanned?: true
    isLocked?: true
    isVerified?: true
    lastActived?: true
    picture?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    fullname: string
    username: string
    email: string
    hashedPassword: string | null
    accountType: $Enums.AccountType
    avtUrl: string | null
    address: string | null
    city: string | null
    state: string
    searchCount: number
    createdAt: Date
    updatedAt: Date
    visible: $Enums.UserVisibility
    status: $Enums.Status
    phone: string | null
    numberIdentity: string | null
    dateOfBirth: Date | null
    firstName: string | null
    lastName: string | null
    isActive: boolean
    isBanned: boolean
    isLocked: boolean
    isVerified: boolean
    lastActived: Date | null
    picture: string | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullname?: boolean
    username?: boolean
    email?: boolean
    hashedPassword?: boolean
    accountType?: boolean
    avtUrl?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    searchCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    visible?: boolean
    status?: boolean
    phone?: boolean
    numberIdentity?: boolean
    dateOfBirth?: boolean
    firstName?: boolean
    lastName?: boolean
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    isVerified?: boolean
    lastActived?: boolean
    picture?: boolean
    userDevice?: boolean | User$userDeviceArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    Oauth2User?: boolean | User$Oauth2UserArgs<ExtArgs>
    codes?: boolean | User$codesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullname?: boolean
    username?: boolean
    email?: boolean
    hashedPassword?: boolean
    accountType?: boolean
    avtUrl?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    searchCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    visible?: boolean
    status?: boolean
    phone?: boolean
    numberIdentity?: boolean
    dateOfBirth?: boolean
    firstName?: boolean
    lastName?: boolean
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    isVerified?: boolean
    lastActived?: boolean
    picture?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullname?: boolean
    username?: boolean
    email?: boolean
    hashedPassword?: boolean
    accountType?: boolean
    avtUrl?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    searchCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    visible?: boolean
    status?: boolean
    phone?: boolean
    numberIdentity?: boolean
    dateOfBirth?: boolean
    firstName?: boolean
    lastName?: boolean
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    isVerified?: boolean
    lastActived?: boolean
    picture?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    fullname?: boolean
    username?: boolean
    email?: boolean
    hashedPassword?: boolean
    accountType?: boolean
    avtUrl?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    searchCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    visible?: boolean
    status?: boolean
    phone?: boolean
    numberIdentity?: boolean
    dateOfBirth?: boolean
    firstName?: boolean
    lastName?: boolean
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    isVerified?: boolean
    lastActived?: boolean
    picture?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fullname" | "username" | "email" | "hashedPassword" | "accountType" | "avtUrl" | "address" | "city" | "state" | "searchCount" | "createdAt" | "updatedAt" | "visible" | "status" | "phone" | "numberIdentity" | "dateOfBirth" | "firstName" | "lastName" | "isActive" | "isBanned" | "isLocked" | "isVerified" | "lastActived" | "picture", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userDevice?: boolean | User$userDeviceArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    Oauth2User?: boolean | User$Oauth2UserArgs<ExtArgs>
    codes?: boolean | User$codesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      userDevice: Prisma.$UserDevicePayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      Oauth2User: Prisma.$Oauth2UserPayload<ExtArgs>[]
      codes: Prisma.$CodePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fullname: string
      username: string
      email: string
      hashedPassword: string | null
      accountType: $Enums.AccountType
      avtUrl: string | null
      address: string | null
      city: string | null
      state: string
      searchCount: number
      createdAt: Date
      updatedAt: Date
      visible: $Enums.UserVisibility
      status: $Enums.Status
      phone: string | null
      numberIdentity: string | null
      dateOfBirth: Date | null
      firstName: string | null
      lastName: string | null
      isActive: boolean
      isBanned: boolean
      isLocked: boolean
      isVerified: boolean
      lastActived: Date | null
      picture: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    userDevice<T extends User$userDeviceArgs<ExtArgs> = {}>(args?: Subset<T, User$userDeviceArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDevicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Oauth2User<T extends User$Oauth2UserArgs<ExtArgs> = {}>(args?: Subset<T, User$Oauth2UserArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Oauth2UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    codes<T extends User$codesArgs<ExtArgs> = {}>(args?: Subset<T, User$codesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly fullname: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly hashedPassword: FieldRef<"User", 'String'>
    readonly accountType: FieldRef<"User", 'AccountType'>
    readonly avtUrl: FieldRef<"User", 'String'>
    readonly address: FieldRef<"User", 'String'>
    readonly city: FieldRef<"User", 'String'>
    readonly state: FieldRef<"User", 'String'>
    readonly searchCount: FieldRef<"User", 'Int'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly visible: FieldRef<"User", 'UserVisibility'>
    readonly status: FieldRef<"User", 'Status'>
    readonly phone: FieldRef<"User", 'String'>
    readonly numberIdentity: FieldRef<"User", 'String'>
    readonly dateOfBirth: FieldRef<"User", 'DateTime'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly isBanned: FieldRef<"User", 'Boolean'>
    readonly isLocked: FieldRef<"User", 'Boolean'>
    readonly isVerified: FieldRef<"User", 'Boolean'>
    readonly lastActived: FieldRef<"User", 'DateTime'>
    readonly picture: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.userDevice
   */
  export type User$userDeviceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDevice
     */
    select?: UserDeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDevice
     */
    omit?: UserDeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDeviceInclude<ExtArgs> | null
    where?: UserDeviceWhereInput
    orderBy?: UserDeviceOrderByWithRelationInput | UserDeviceOrderByWithRelationInput[]
    cursor?: UserDeviceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserDeviceScalarFieldEnum | UserDeviceScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.Oauth2User
   */
  export type User$Oauth2UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Oauth2User
     */
    select?: Oauth2UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Oauth2User
     */
    omit?: Oauth2UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Oauth2UserInclude<ExtArgs> | null
    where?: Oauth2UserWhereInput
    orderBy?: Oauth2UserOrderByWithRelationInput | Oauth2UserOrderByWithRelationInput[]
    cursor?: Oauth2UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Oauth2UserScalarFieldEnum | Oauth2UserScalarFieldEnum[]
  }

  /**
   * User.codes
   */
  export type User$codesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Code
     */
    select?: CodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Code
     */
    omit?: CodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeInclude<ExtArgs> | null
    where?: CodeWhereInput
    orderBy?: CodeOrderByWithRelationInput | CodeOrderByWithRelationInput[]
    cursor?: CodeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CodeScalarFieldEnum | CodeScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Oauth2User
   */

  export type AggregateOauth2User = {
    _count: Oauth2UserCountAggregateOutputType | null
    _min: Oauth2UserMinAggregateOutputType | null
    _max: Oauth2UserMaxAggregateOutputType | null
  }

  export type Oauth2UserMinAggregateOutputType = {
    id: string | null
    provider: $Enums.Provider | null
    providerUserId: string | null
    email: string | null
    phone: string | null
    firstname: string | null
    lastname: string | null
    fullname: string | null
    avatarUrl: string | null
    username: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type Oauth2UserMaxAggregateOutputType = {
    id: string | null
    provider: $Enums.Provider | null
    providerUserId: string | null
    email: string | null
    phone: string | null
    firstname: string | null
    lastname: string | null
    fullname: string | null
    avatarUrl: string | null
    username: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type Oauth2UserCountAggregateOutputType = {
    id: number
    provider: number
    providerUserId: number
    email: number
    phone: number
    firstname: number
    lastname: number
    fullname: number
    avatarUrl: number
    username: number
    createdAt: number
    updatedAt: number
    userId: number
    _all: number
  }


  export type Oauth2UserMinAggregateInputType = {
    id?: true
    provider?: true
    providerUserId?: true
    email?: true
    phone?: true
    firstname?: true
    lastname?: true
    fullname?: true
    avatarUrl?: true
    username?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type Oauth2UserMaxAggregateInputType = {
    id?: true
    provider?: true
    providerUserId?: true
    email?: true
    phone?: true
    firstname?: true
    lastname?: true
    fullname?: true
    avatarUrl?: true
    username?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type Oauth2UserCountAggregateInputType = {
    id?: true
    provider?: true
    providerUserId?: true
    email?: true
    phone?: true
    firstname?: true
    lastname?: true
    fullname?: true
    avatarUrl?: true
    username?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    _all?: true
  }

  export type Oauth2UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Oauth2User to aggregate.
     */
    where?: Oauth2UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Oauth2Users to fetch.
     */
    orderBy?: Oauth2UserOrderByWithRelationInput | Oauth2UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: Oauth2UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Oauth2Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Oauth2Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Oauth2Users
    **/
    _count?: true | Oauth2UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Oauth2UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Oauth2UserMaxAggregateInputType
  }

  export type GetOauth2UserAggregateType<T extends Oauth2UserAggregateArgs> = {
        [P in keyof T & keyof AggregateOauth2User]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOauth2User[P]>
      : GetScalarType<T[P], AggregateOauth2User[P]>
  }




  export type Oauth2UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Oauth2UserWhereInput
    orderBy?: Oauth2UserOrderByWithAggregationInput | Oauth2UserOrderByWithAggregationInput[]
    by: Oauth2UserScalarFieldEnum[] | Oauth2UserScalarFieldEnum
    having?: Oauth2UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Oauth2UserCountAggregateInputType | true
    _min?: Oauth2UserMinAggregateInputType
    _max?: Oauth2UserMaxAggregateInputType
  }

  export type Oauth2UserGroupByOutputType = {
    id: string
    provider: $Enums.Provider
    providerUserId: string
    email: string
    phone: string | null
    firstname: string | null
    lastname: string | null
    fullname: string | null
    avatarUrl: string | null
    username: string | null
    createdAt: Date
    updatedAt: Date
    userId: string
    _count: Oauth2UserCountAggregateOutputType | null
    _min: Oauth2UserMinAggregateOutputType | null
    _max: Oauth2UserMaxAggregateOutputType | null
  }

  type GetOauth2UserGroupByPayload<T extends Oauth2UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Oauth2UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Oauth2UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Oauth2UserGroupByOutputType[P]>
            : GetScalarType<T[P], Oauth2UserGroupByOutputType[P]>
        }
      >
    >


  export type Oauth2UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    providerUserId?: boolean
    email?: boolean
    phone?: boolean
    firstname?: boolean
    lastname?: boolean
    fullname?: boolean
    avatarUrl?: boolean
    username?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oauth2User"]>

  export type Oauth2UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    providerUserId?: boolean
    email?: boolean
    phone?: boolean
    firstname?: boolean
    lastname?: boolean
    fullname?: boolean
    avatarUrl?: boolean
    username?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oauth2User"]>

  export type Oauth2UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    providerUserId?: boolean
    email?: boolean
    phone?: boolean
    firstname?: boolean
    lastname?: boolean
    fullname?: boolean
    avatarUrl?: boolean
    username?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oauth2User"]>

  export type Oauth2UserSelectScalar = {
    id?: boolean
    provider?: boolean
    providerUserId?: boolean
    email?: boolean
    phone?: boolean
    firstname?: boolean
    lastname?: boolean
    fullname?: boolean
    avatarUrl?: boolean
    username?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }

  export type Oauth2UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "provider" | "providerUserId" | "email" | "phone" | "firstname" | "lastname" | "fullname" | "avatarUrl" | "username" | "createdAt" | "updatedAt" | "userId", ExtArgs["result"]["oauth2User"]>
  export type Oauth2UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type Oauth2UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type Oauth2UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $Oauth2UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Oauth2User"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      provider: $Enums.Provider
      providerUserId: string
      email: string
      phone: string | null
      firstname: string | null
      lastname: string | null
      fullname: string | null
      avatarUrl: string | null
      username: string | null
      createdAt: Date
      updatedAt: Date
      userId: string
    }, ExtArgs["result"]["oauth2User"]>
    composites: {}
  }

  type Oauth2UserGetPayload<S extends boolean | null | undefined | Oauth2UserDefaultArgs> = $Result.GetResult<Prisma.$Oauth2UserPayload, S>

  type Oauth2UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<Oauth2UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Oauth2UserCountAggregateInputType | true
    }

  export interface Oauth2UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Oauth2User'], meta: { name: 'Oauth2User' } }
    /**
     * Find zero or one Oauth2User that matches the filter.
     * @param {Oauth2UserFindUniqueArgs} args - Arguments to find a Oauth2User
     * @example
     * // Get one Oauth2User
     * const oauth2User = await prisma.oauth2User.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends Oauth2UserFindUniqueArgs>(args: SelectSubset<T, Oauth2UserFindUniqueArgs<ExtArgs>>): Prisma__Oauth2UserClient<$Result.GetResult<Prisma.$Oauth2UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Oauth2User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {Oauth2UserFindUniqueOrThrowArgs} args - Arguments to find a Oauth2User
     * @example
     * // Get one Oauth2User
     * const oauth2User = await prisma.oauth2User.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends Oauth2UserFindUniqueOrThrowArgs>(args: SelectSubset<T, Oauth2UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__Oauth2UserClient<$Result.GetResult<Prisma.$Oauth2UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Oauth2User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Oauth2UserFindFirstArgs} args - Arguments to find a Oauth2User
     * @example
     * // Get one Oauth2User
     * const oauth2User = await prisma.oauth2User.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends Oauth2UserFindFirstArgs>(args?: SelectSubset<T, Oauth2UserFindFirstArgs<ExtArgs>>): Prisma__Oauth2UserClient<$Result.GetResult<Prisma.$Oauth2UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Oauth2User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Oauth2UserFindFirstOrThrowArgs} args - Arguments to find a Oauth2User
     * @example
     * // Get one Oauth2User
     * const oauth2User = await prisma.oauth2User.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends Oauth2UserFindFirstOrThrowArgs>(args?: SelectSubset<T, Oauth2UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__Oauth2UserClient<$Result.GetResult<Prisma.$Oauth2UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Oauth2Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Oauth2UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Oauth2Users
     * const oauth2Users = await prisma.oauth2User.findMany()
     * 
     * // Get first 10 Oauth2Users
     * const oauth2Users = await prisma.oauth2User.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const oauth2UserWithIdOnly = await prisma.oauth2User.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends Oauth2UserFindManyArgs>(args?: SelectSubset<T, Oauth2UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Oauth2UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Oauth2User.
     * @param {Oauth2UserCreateArgs} args - Arguments to create a Oauth2User.
     * @example
     * // Create one Oauth2User
     * const Oauth2User = await prisma.oauth2User.create({
     *   data: {
     *     // ... data to create a Oauth2User
     *   }
     * })
     * 
     */
    create<T extends Oauth2UserCreateArgs>(args: SelectSubset<T, Oauth2UserCreateArgs<ExtArgs>>): Prisma__Oauth2UserClient<$Result.GetResult<Prisma.$Oauth2UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Oauth2Users.
     * @param {Oauth2UserCreateManyArgs} args - Arguments to create many Oauth2Users.
     * @example
     * // Create many Oauth2Users
     * const oauth2User = await prisma.oauth2User.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends Oauth2UserCreateManyArgs>(args?: SelectSubset<T, Oauth2UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Oauth2Users and returns the data saved in the database.
     * @param {Oauth2UserCreateManyAndReturnArgs} args - Arguments to create many Oauth2Users.
     * @example
     * // Create many Oauth2Users
     * const oauth2User = await prisma.oauth2User.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Oauth2Users and only return the `id`
     * const oauth2UserWithIdOnly = await prisma.oauth2User.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends Oauth2UserCreateManyAndReturnArgs>(args?: SelectSubset<T, Oauth2UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Oauth2UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Oauth2User.
     * @param {Oauth2UserDeleteArgs} args - Arguments to delete one Oauth2User.
     * @example
     * // Delete one Oauth2User
     * const Oauth2User = await prisma.oauth2User.delete({
     *   where: {
     *     // ... filter to delete one Oauth2User
     *   }
     * })
     * 
     */
    delete<T extends Oauth2UserDeleteArgs>(args: SelectSubset<T, Oauth2UserDeleteArgs<ExtArgs>>): Prisma__Oauth2UserClient<$Result.GetResult<Prisma.$Oauth2UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Oauth2User.
     * @param {Oauth2UserUpdateArgs} args - Arguments to update one Oauth2User.
     * @example
     * // Update one Oauth2User
     * const oauth2User = await prisma.oauth2User.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends Oauth2UserUpdateArgs>(args: SelectSubset<T, Oauth2UserUpdateArgs<ExtArgs>>): Prisma__Oauth2UserClient<$Result.GetResult<Prisma.$Oauth2UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Oauth2Users.
     * @param {Oauth2UserDeleteManyArgs} args - Arguments to filter Oauth2Users to delete.
     * @example
     * // Delete a few Oauth2Users
     * const { count } = await prisma.oauth2User.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends Oauth2UserDeleteManyArgs>(args?: SelectSubset<T, Oauth2UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Oauth2Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Oauth2UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Oauth2Users
     * const oauth2User = await prisma.oauth2User.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends Oauth2UserUpdateManyArgs>(args: SelectSubset<T, Oauth2UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Oauth2Users and returns the data updated in the database.
     * @param {Oauth2UserUpdateManyAndReturnArgs} args - Arguments to update many Oauth2Users.
     * @example
     * // Update many Oauth2Users
     * const oauth2User = await prisma.oauth2User.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Oauth2Users and only return the `id`
     * const oauth2UserWithIdOnly = await prisma.oauth2User.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends Oauth2UserUpdateManyAndReturnArgs>(args: SelectSubset<T, Oauth2UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Oauth2UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Oauth2User.
     * @param {Oauth2UserUpsertArgs} args - Arguments to update or create a Oauth2User.
     * @example
     * // Update or create a Oauth2User
     * const oauth2User = await prisma.oauth2User.upsert({
     *   create: {
     *     // ... data to create a Oauth2User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Oauth2User we want to update
     *   }
     * })
     */
    upsert<T extends Oauth2UserUpsertArgs>(args: SelectSubset<T, Oauth2UserUpsertArgs<ExtArgs>>): Prisma__Oauth2UserClient<$Result.GetResult<Prisma.$Oauth2UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Oauth2Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Oauth2UserCountArgs} args - Arguments to filter Oauth2Users to count.
     * @example
     * // Count the number of Oauth2Users
     * const count = await prisma.oauth2User.count({
     *   where: {
     *     // ... the filter for the Oauth2Users we want to count
     *   }
     * })
    **/
    count<T extends Oauth2UserCountArgs>(
      args?: Subset<T, Oauth2UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Oauth2UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Oauth2User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Oauth2UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Oauth2UserAggregateArgs>(args: Subset<T, Oauth2UserAggregateArgs>): Prisma.PrismaPromise<GetOauth2UserAggregateType<T>>

    /**
     * Group by Oauth2User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Oauth2UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Oauth2UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Oauth2UserGroupByArgs['orderBy'] }
        : { orderBy?: Oauth2UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Oauth2UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOauth2UserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Oauth2User model
   */
  readonly fields: Oauth2UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Oauth2User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__Oauth2UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Oauth2User model
   */
  interface Oauth2UserFieldRefs {
    readonly id: FieldRef<"Oauth2User", 'String'>
    readonly provider: FieldRef<"Oauth2User", 'Provider'>
    readonly providerUserId: FieldRef<"Oauth2User", 'String'>
    readonly email: FieldRef<"Oauth2User", 'String'>
    readonly phone: FieldRef<"Oauth2User", 'String'>
    readonly firstname: FieldRef<"Oauth2User", 'String'>
    readonly lastname: FieldRef<"Oauth2User", 'String'>
    readonly fullname: FieldRef<"Oauth2User", 'String'>
    readonly avatarUrl: FieldRef<"Oauth2User", 'String'>
    readonly username: FieldRef<"Oauth2User", 'String'>
    readonly createdAt: FieldRef<"Oauth2User", 'DateTime'>
    readonly updatedAt: FieldRef<"Oauth2User", 'DateTime'>
    readonly userId: FieldRef<"Oauth2User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Oauth2User findUnique
   */
  export type Oauth2UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Oauth2User
     */
    select?: Oauth2UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Oauth2User
     */
    omit?: Oauth2UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Oauth2UserInclude<ExtArgs> | null
    /**
     * Filter, which Oauth2User to fetch.
     */
    where: Oauth2UserWhereUniqueInput
  }

  /**
   * Oauth2User findUniqueOrThrow
   */
  export type Oauth2UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Oauth2User
     */
    select?: Oauth2UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Oauth2User
     */
    omit?: Oauth2UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Oauth2UserInclude<ExtArgs> | null
    /**
     * Filter, which Oauth2User to fetch.
     */
    where: Oauth2UserWhereUniqueInput
  }

  /**
   * Oauth2User findFirst
   */
  export type Oauth2UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Oauth2User
     */
    select?: Oauth2UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Oauth2User
     */
    omit?: Oauth2UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Oauth2UserInclude<ExtArgs> | null
    /**
     * Filter, which Oauth2User to fetch.
     */
    where?: Oauth2UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Oauth2Users to fetch.
     */
    orderBy?: Oauth2UserOrderByWithRelationInput | Oauth2UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Oauth2Users.
     */
    cursor?: Oauth2UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Oauth2Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Oauth2Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Oauth2Users.
     */
    distinct?: Oauth2UserScalarFieldEnum | Oauth2UserScalarFieldEnum[]
  }

  /**
   * Oauth2User findFirstOrThrow
   */
  export type Oauth2UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Oauth2User
     */
    select?: Oauth2UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Oauth2User
     */
    omit?: Oauth2UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Oauth2UserInclude<ExtArgs> | null
    /**
     * Filter, which Oauth2User to fetch.
     */
    where?: Oauth2UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Oauth2Users to fetch.
     */
    orderBy?: Oauth2UserOrderByWithRelationInput | Oauth2UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Oauth2Users.
     */
    cursor?: Oauth2UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Oauth2Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Oauth2Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Oauth2Users.
     */
    distinct?: Oauth2UserScalarFieldEnum | Oauth2UserScalarFieldEnum[]
  }

  /**
   * Oauth2User findMany
   */
  export type Oauth2UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Oauth2User
     */
    select?: Oauth2UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Oauth2User
     */
    omit?: Oauth2UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Oauth2UserInclude<ExtArgs> | null
    /**
     * Filter, which Oauth2Users to fetch.
     */
    where?: Oauth2UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Oauth2Users to fetch.
     */
    orderBy?: Oauth2UserOrderByWithRelationInput | Oauth2UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Oauth2Users.
     */
    cursor?: Oauth2UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Oauth2Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Oauth2Users.
     */
    skip?: number
    distinct?: Oauth2UserScalarFieldEnum | Oauth2UserScalarFieldEnum[]
  }

  /**
   * Oauth2User create
   */
  export type Oauth2UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Oauth2User
     */
    select?: Oauth2UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Oauth2User
     */
    omit?: Oauth2UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Oauth2UserInclude<ExtArgs> | null
    /**
     * The data needed to create a Oauth2User.
     */
    data: XOR<Oauth2UserCreateInput, Oauth2UserUncheckedCreateInput>
  }

  /**
   * Oauth2User createMany
   */
  export type Oauth2UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Oauth2Users.
     */
    data: Oauth2UserCreateManyInput | Oauth2UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Oauth2User createManyAndReturn
   */
  export type Oauth2UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Oauth2User
     */
    select?: Oauth2UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Oauth2User
     */
    omit?: Oauth2UserOmit<ExtArgs> | null
    /**
     * The data used to create many Oauth2Users.
     */
    data: Oauth2UserCreateManyInput | Oauth2UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Oauth2UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Oauth2User update
   */
  export type Oauth2UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Oauth2User
     */
    select?: Oauth2UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Oauth2User
     */
    omit?: Oauth2UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Oauth2UserInclude<ExtArgs> | null
    /**
     * The data needed to update a Oauth2User.
     */
    data: XOR<Oauth2UserUpdateInput, Oauth2UserUncheckedUpdateInput>
    /**
     * Choose, which Oauth2User to update.
     */
    where: Oauth2UserWhereUniqueInput
  }

  /**
   * Oauth2User updateMany
   */
  export type Oauth2UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Oauth2Users.
     */
    data: XOR<Oauth2UserUpdateManyMutationInput, Oauth2UserUncheckedUpdateManyInput>
    /**
     * Filter which Oauth2Users to update
     */
    where?: Oauth2UserWhereInput
    /**
     * Limit how many Oauth2Users to update.
     */
    limit?: number
  }

  /**
   * Oauth2User updateManyAndReturn
   */
  export type Oauth2UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Oauth2User
     */
    select?: Oauth2UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Oauth2User
     */
    omit?: Oauth2UserOmit<ExtArgs> | null
    /**
     * The data used to update Oauth2Users.
     */
    data: XOR<Oauth2UserUpdateManyMutationInput, Oauth2UserUncheckedUpdateManyInput>
    /**
     * Filter which Oauth2Users to update
     */
    where?: Oauth2UserWhereInput
    /**
     * Limit how many Oauth2Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Oauth2UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Oauth2User upsert
   */
  export type Oauth2UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Oauth2User
     */
    select?: Oauth2UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Oauth2User
     */
    omit?: Oauth2UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Oauth2UserInclude<ExtArgs> | null
    /**
     * The filter to search for the Oauth2User to update in case it exists.
     */
    where: Oauth2UserWhereUniqueInput
    /**
     * In case the Oauth2User found by the `where` argument doesn't exist, create a new Oauth2User with this data.
     */
    create: XOR<Oauth2UserCreateInput, Oauth2UserUncheckedCreateInput>
    /**
     * In case the Oauth2User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<Oauth2UserUpdateInput, Oauth2UserUncheckedUpdateInput>
  }

  /**
   * Oauth2User delete
   */
  export type Oauth2UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Oauth2User
     */
    select?: Oauth2UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Oauth2User
     */
    omit?: Oauth2UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Oauth2UserInclude<ExtArgs> | null
    /**
     * Filter which Oauth2User to delete.
     */
    where: Oauth2UserWhereUniqueInput
  }

  /**
   * Oauth2User deleteMany
   */
  export type Oauth2UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Oauth2Users to delete
     */
    where?: Oauth2UserWhereInput
    /**
     * Limit how many Oauth2Users to delete.
     */
    limit?: number
  }

  /**
   * Oauth2User without action
   */
  export type Oauth2UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Oauth2User
     */
    select?: Oauth2UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Oauth2User
     */
    omit?: Oauth2UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Oauth2UserInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserDeviceScalarFieldEnum: {
    id: 'id',
    deviceId: 'deviceId',
    nameDevice: 'nameDevice',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId'
  };

  export type UserDeviceScalarFieldEnum = (typeof UserDeviceScalarFieldEnum)[keyof typeof UserDeviceScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    userDeviceId: 'userDeviceId',
    hashedRefreshToken: 'hashedRefreshToken',
    userAgent: 'userAgent',
    userIp: 'userIp',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    loginedAt: 'loginedAt',
    logoutedAt: 'logoutedAt',
    userId: 'userId'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const CodeScalarFieldEnum: {
    id: 'id',
    code: 'code',
    type: 'type',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId'
  };

  export type CodeScalarFieldEnum = (typeof CodeScalarFieldEnum)[keyof typeof CodeScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    fullname: 'fullname',
    username: 'username',
    email: 'email',
    hashedPassword: 'hashedPassword',
    accountType: 'accountType',
    avtUrl: 'avtUrl',
    address: 'address',
    city: 'city',
    state: 'state',
    searchCount: 'searchCount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    visible: 'visible',
    status: 'status',
    phone: 'phone',
    numberIdentity: 'numberIdentity',
    dateOfBirth: 'dateOfBirth',
    firstName: 'firstName',
    lastName: 'lastName',
    isActive: 'isActive',
    isBanned: 'isBanned',
    isLocked: 'isLocked',
    isVerified: 'isVerified',
    lastActived: 'lastActived',
    picture: 'picture'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const Oauth2UserScalarFieldEnum: {
    id: 'id',
    provider: 'provider',
    providerUserId: 'providerUserId',
    email: 'email',
    phone: 'phone',
    firstname: 'firstname',
    lastname: 'lastname',
    fullname: 'fullname',
    avatarUrl: 'avatarUrl',
    username: 'username',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId'
  };

  export type Oauth2UserScalarFieldEnum = (typeof Oauth2UserScalarFieldEnum)[keyof typeof Oauth2UserScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'CodeType'
   */
  export type EnumCodeTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CodeType'>
    


  /**
   * Reference to a field of type 'CodeType[]'
   */
  export type ListEnumCodeTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CodeType[]'>
    


  /**
   * Reference to a field of type 'AccountType'
   */
  export type EnumAccountTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AccountType'>
    


  /**
   * Reference to a field of type 'AccountType[]'
   */
  export type ListEnumAccountTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AccountType[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'UserVisibility'
   */
  export type EnumUserVisibilityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserVisibility'>
    


  /**
   * Reference to a field of type 'UserVisibility[]'
   */
  export type ListEnumUserVisibilityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserVisibility[]'>
    


  /**
   * Reference to a field of type 'Status'
   */
  export type EnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Status'>
    


  /**
   * Reference to a field of type 'Status[]'
   */
  export type ListEnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Status[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Provider'
   */
  export type EnumProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Provider'>
    


  /**
   * Reference to a field of type 'Provider[]'
   */
  export type ListEnumProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Provider[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserDeviceWhereInput = {
    AND?: UserDeviceWhereInput | UserDeviceWhereInput[]
    OR?: UserDeviceWhereInput[]
    NOT?: UserDeviceWhereInput | UserDeviceWhereInput[]
    id?: UuidFilter<"UserDevice"> | string
    deviceId?: StringFilter<"UserDevice"> | string
    nameDevice?: StringFilter<"UserDevice"> | string
    createdAt?: DateTimeFilter<"UserDevice"> | Date | string
    updatedAt?: DateTimeFilter<"UserDevice"> | Date | string
    userId?: UuidFilter<"UserDevice"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserDeviceOrderByWithRelationInput = {
    id?: SortOrder
    deviceId?: SortOrder
    nameDevice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserDeviceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    deviceId?: string
    nameDevice_userId?: UserDeviceNameDeviceUserIdCompoundUniqueInput
    AND?: UserDeviceWhereInput | UserDeviceWhereInput[]
    OR?: UserDeviceWhereInput[]
    NOT?: UserDeviceWhereInput | UserDeviceWhereInput[]
    nameDevice?: StringFilter<"UserDevice"> | string
    createdAt?: DateTimeFilter<"UserDevice"> | Date | string
    updatedAt?: DateTimeFilter<"UserDevice"> | Date | string
    userId?: UuidFilter<"UserDevice"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "deviceId" | "nameDevice_userId">

  export type UserDeviceOrderByWithAggregationInput = {
    id?: SortOrder
    deviceId?: SortOrder
    nameDevice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    _count?: UserDeviceCountOrderByAggregateInput
    _max?: UserDeviceMaxOrderByAggregateInput
    _min?: UserDeviceMinOrderByAggregateInput
  }

  export type UserDeviceScalarWhereWithAggregatesInput = {
    AND?: UserDeviceScalarWhereWithAggregatesInput | UserDeviceScalarWhereWithAggregatesInput[]
    OR?: UserDeviceScalarWhereWithAggregatesInput[]
    NOT?: UserDeviceScalarWhereWithAggregatesInput | UserDeviceScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"UserDevice"> | string
    deviceId?: StringWithAggregatesFilter<"UserDevice"> | string
    nameDevice?: StringWithAggregatesFilter<"UserDevice"> | string
    createdAt?: DateTimeWithAggregatesFilter<"UserDevice"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserDevice"> | Date | string
    userId?: UuidWithAggregatesFilter<"UserDevice"> | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: UuidFilter<"Session"> | string
    userDeviceId?: StringFilter<"Session"> | string
    hashedRefreshToken?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userIp?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    loginedAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    logoutedAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    userId?: UuidFilter<"Session"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    userDeviceId?: SortOrder
    hashedRefreshToken?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userIp?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    loginedAt?: SortOrderInput | SortOrder
    logoutedAt?: SortOrderInput | SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_userDeviceId?: SessionUserIdUserDeviceIdCompoundUniqueInput
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userDeviceId?: StringFilter<"Session"> | string
    hashedRefreshToken?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userIp?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    loginedAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    logoutedAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    userId?: UuidFilter<"Session"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_userDeviceId">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    userDeviceId?: SortOrder
    hashedRefreshToken?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userIp?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    loginedAt?: SortOrderInput | SortOrder
    logoutedAt?: SortOrderInput | SortOrder
    userId?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Session"> | string
    userDeviceId?: StringWithAggregatesFilter<"Session"> | string
    hashedRefreshToken?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userIp?: StringWithAggregatesFilter<"Session"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    loginedAt?: DateTimeNullableWithAggregatesFilter<"Session"> | Date | string | null
    logoutedAt?: DateTimeNullableWithAggregatesFilter<"Session"> | Date | string | null
    userId?: UuidWithAggregatesFilter<"Session"> | string
  }

  export type CodeWhereInput = {
    AND?: CodeWhereInput | CodeWhereInput[]
    OR?: CodeWhereInput[]
    NOT?: CodeWhereInput | CodeWhereInput[]
    id?: UuidFilter<"Code"> | string
    code?: StringFilter<"Code"> | string
    type?: EnumCodeTypeFilter<"Code"> | $Enums.CodeType
    createdAt?: DateTimeFilter<"Code"> | Date | string
    updatedAt?: DateTimeFilter<"Code"> | Date | string
    userId?: UuidFilter<"Code"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CodeOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type CodeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code_userId?: CodeCodeUserIdCompoundUniqueInput
    AND?: CodeWhereInput | CodeWhereInput[]
    OR?: CodeWhereInput[]
    NOT?: CodeWhereInput | CodeWhereInput[]
    code?: StringFilter<"Code"> | string
    type?: EnumCodeTypeFilter<"Code"> | $Enums.CodeType
    createdAt?: DateTimeFilter<"Code"> | Date | string
    updatedAt?: DateTimeFilter<"Code"> | Date | string
    userId?: UuidFilter<"Code"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "code_userId">

  export type CodeOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    _count?: CodeCountOrderByAggregateInput
    _max?: CodeMaxOrderByAggregateInput
    _min?: CodeMinOrderByAggregateInput
  }

  export type CodeScalarWhereWithAggregatesInput = {
    AND?: CodeScalarWhereWithAggregatesInput | CodeScalarWhereWithAggregatesInput[]
    OR?: CodeScalarWhereWithAggregatesInput[]
    NOT?: CodeScalarWhereWithAggregatesInput | CodeScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Code"> | string
    code?: StringWithAggregatesFilter<"Code"> | string
    type?: EnumCodeTypeWithAggregatesFilter<"Code"> | $Enums.CodeType
    createdAt?: DateTimeWithAggregatesFilter<"Code"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Code"> | Date | string
    userId?: UuidWithAggregatesFilter<"Code"> | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: UuidFilter<"User"> | string
    fullname?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    hashedPassword?: StringNullableFilter<"User"> | string | null
    accountType?: EnumAccountTypeFilter<"User"> | $Enums.AccountType
    avtUrl?: StringNullableFilter<"User"> | string | null
    address?: StringNullableFilter<"User"> | string | null
    city?: StringNullableFilter<"User"> | string | null
    state?: StringFilter<"User"> | string
    searchCount?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    visible?: EnumUserVisibilityFilter<"User"> | $Enums.UserVisibility
    status?: EnumStatusFilter<"User"> | $Enums.Status
    phone?: StringNullableFilter<"User"> | string | null
    numberIdentity?: StringNullableFilter<"User"> | string | null
    dateOfBirth?: DateTimeNullableFilter<"User"> | Date | string | null
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    isActive?: BoolFilter<"User"> | boolean
    isBanned?: BoolFilter<"User"> | boolean
    isLocked?: BoolFilter<"User"> | boolean
    isVerified?: BoolFilter<"User"> | boolean
    lastActived?: DateTimeNullableFilter<"User"> | Date | string | null
    picture?: StringNullableFilter<"User"> | string | null
    userDevice?: UserDeviceListRelationFilter
    sessions?: SessionListRelationFilter
    Oauth2User?: Oauth2UserListRelationFilter
    codes?: CodeListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    fullname?: SortOrder
    username?: SortOrder
    email?: SortOrder
    hashedPassword?: SortOrderInput | SortOrder
    accountType?: SortOrder
    avtUrl?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrder
    searchCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    visible?: SortOrder
    status?: SortOrder
    phone?: SortOrderInput | SortOrder
    numberIdentity?: SortOrderInput | SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    isActive?: SortOrder
    isBanned?: SortOrder
    isLocked?: SortOrder
    isVerified?: SortOrder
    lastActived?: SortOrderInput | SortOrder
    picture?: SortOrderInput | SortOrder
    userDevice?: UserDeviceOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    Oauth2User?: Oauth2UserOrderByRelationAggregateInput
    codes?: CodeOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    fullname?: StringFilter<"User"> | string
    hashedPassword?: StringNullableFilter<"User"> | string | null
    accountType?: EnumAccountTypeFilter<"User"> | $Enums.AccountType
    avtUrl?: StringNullableFilter<"User"> | string | null
    address?: StringNullableFilter<"User"> | string | null
    city?: StringNullableFilter<"User"> | string | null
    state?: StringFilter<"User"> | string
    searchCount?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    visible?: EnumUserVisibilityFilter<"User"> | $Enums.UserVisibility
    status?: EnumStatusFilter<"User"> | $Enums.Status
    phone?: StringNullableFilter<"User"> | string | null
    numberIdentity?: StringNullableFilter<"User"> | string | null
    dateOfBirth?: DateTimeNullableFilter<"User"> | Date | string | null
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    isActive?: BoolFilter<"User"> | boolean
    isBanned?: BoolFilter<"User"> | boolean
    isLocked?: BoolFilter<"User"> | boolean
    isVerified?: BoolFilter<"User"> | boolean
    lastActived?: DateTimeNullableFilter<"User"> | Date | string | null
    picture?: StringNullableFilter<"User"> | string | null
    userDevice?: UserDeviceListRelationFilter
    sessions?: SessionListRelationFilter
    Oauth2User?: Oauth2UserListRelationFilter
    codes?: CodeListRelationFilter
  }, "id" | "username" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    fullname?: SortOrder
    username?: SortOrder
    email?: SortOrder
    hashedPassword?: SortOrderInput | SortOrder
    accountType?: SortOrder
    avtUrl?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrder
    searchCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    visible?: SortOrder
    status?: SortOrder
    phone?: SortOrderInput | SortOrder
    numberIdentity?: SortOrderInput | SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    isActive?: SortOrder
    isBanned?: SortOrder
    isLocked?: SortOrder
    isVerified?: SortOrder
    lastActived?: SortOrderInput | SortOrder
    picture?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"User"> | string
    fullname?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    hashedPassword?: StringNullableWithAggregatesFilter<"User"> | string | null
    accountType?: EnumAccountTypeWithAggregatesFilter<"User"> | $Enums.AccountType
    avtUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    address?: StringNullableWithAggregatesFilter<"User"> | string | null
    city?: StringNullableWithAggregatesFilter<"User"> | string | null
    state?: StringWithAggregatesFilter<"User"> | string
    searchCount?: IntWithAggregatesFilter<"User"> | number
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    visible?: EnumUserVisibilityWithAggregatesFilter<"User"> | $Enums.UserVisibility
    status?: EnumStatusWithAggregatesFilter<"User"> | $Enums.Status
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    numberIdentity?: StringNullableWithAggregatesFilter<"User"> | string | null
    dateOfBirth?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    firstName?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    isBanned?: BoolWithAggregatesFilter<"User"> | boolean
    isLocked?: BoolWithAggregatesFilter<"User"> | boolean
    isVerified?: BoolWithAggregatesFilter<"User"> | boolean
    lastActived?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    picture?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type Oauth2UserWhereInput = {
    AND?: Oauth2UserWhereInput | Oauth2UserWhereInput[]
    OR?: Oauth2UserWhereInput[]
    NOT?: Oauth2UserWhereInput | Oauth2UserWhereInput[]
    id?: UuidFilter<"Oauth2User"> | string
    provider?: EnumProviderFilter<"Oauth2User"> | $Enums.Provider
    providerUserId?: StringFilter<"Oauth2User"> | string
    email?: StringFilter<"Oauth2User"> | string
    phone?: StringNullableFilter<"Oauth2User"> | string | null
    firstname?: StringNullableFilter<"Oauth2User"> | string | null
    lastname?: StringNullableFilter<"Oauth2User"> | string | null
    fullname?: StringNullableFilter<"Oauth2User"> | string | null
    avatarUrl?: StringNullableFilter<"Oauth2User"> | string | null
    username?: StringNullableFilter<"Oauth2User"> | string | null
    createdAt?: DateTimeFilter<"Oauth2User"> | Date | string
    updatedAt?: DateTimeFilter<"Oauth2User"> | Date | string
    userId?: UuidFilter<"Oauth2User"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type Oauth2UserOrderByWithRelationInput = {
    id?: SortOrder
    provider?: SortOrder
    providerUserId?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    firstname?: SortOrderInput | SortOrder
    lastname?: SortOrderInput | SortOrder
    fullname?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    username?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type Oauth2UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: Oauth2UserWhereInput | Oauth2UserWhereInput[]
    OR?: Oauth2UserWhereInput[]
    NOT?: Oauth2UserWhereInput | Oauth2UserWhereInput[]
    provider?: EnumProviderFilter<"Oauth2User"> | $Enums.Provider
    providerUserId?: StringFilter<"Oauth2User"> | string
    phone?: StringNullableFilter<"Oauth2User"> | string | null
    firstname?: StringNullableFilter<"Oauth2User"> | string | null
    lastname?: StringNullableFilter<"Oauth2User"> | string | null
    fullname?: StringNullableFilter<"Oauth2User"> | string | null
    avatarUrl?: StringNullableFilter<"Oauth2User"> | string | null
    username?: StringNullableFilter<"Oauth2User"> | string | null
    createdAt?: DateTimeFilter<"Oauth2User"> | Date | string
    updatedAt?: DateTimeFilter<"Oauth2User"> | Date | string
    userId?: UuidFilter<"Oauth2User"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "email">

  export type Oauth2UserOrderByWithAggregationInput = {
    id?: SortOrder
    provider?: SortOrder
    providerUserId?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    firstname?: SortOrderInput | SortOrder
    lastname?: SortOrderInput | SortOrder
    fullname?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    username?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    _count?: Oauth2UserCountOrderByAggregateInput
    _max?: Oauth2UserMaxOrderByAggregateInput
    _min?: Oauth2UserMinOrderByAggregateInput
  }

  export type Oauth2UserScalarWhereWithAggregatesInput = {
    AND?: Oauth2UserScalarWhereWithAggregatesInput | Oauth2UserScalarWhereWithAggregatesInput[]
    OR?: Oauth2UserScalarWhereWithAggregatesInput[]
    NOT?: Oauth2UserScalarWhereWithAggregatesInput | Oauth2UserScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Oauth2User"> | string
    provider?: EnumProviderWithAggregatesFilter<"Oauth2User"> | $Enums.Provider
    providerUserId?: StringWithAggregatesFilter<"Oauth2User"> | string
    email?: StringWithAggregatesFilter<"Oauth2User"> | string
    phone?: StringNullableWithAggregatesFilter<"Oauth2User"> | string | null
    firstname?: StringNullableWithAggregatesFilter<"Oauth2User"> | string | null
    lastname?: StringNullableWithAggregatesFilter<"Oauth2User"> | string | null
    fullname?: StringNullableWithAggregatesFilter<"Oauth2User"> | string | null
    avatarUrl?: StringNullableWithAggregatesFilter<"Oauth2User"> | string | null
    username?: StringNullableWithAggregatesFilter<"Oauth2User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Oauth2User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Oauth2User"> | Date | string
    userId?: UuidWithAggregatesFilter<"Oauth2User"> | string
  }

  export type UserDeviceCreateInput = {
    id?: string
    deviceId: string
    nameDevice: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutUserDeviceInput
  }

  export type UserDeviceUncheckedCreateInput = {
    id?: string
    deviceId: string
    nameDevice: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type UserDeviceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    nameDevice?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutUserDeviceNestedInput
  }

  export type UserDeviceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    nameDevice?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type UserDeviceCreateManyInput = {
    id?: string
    deviceId: string
    nameDevice: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type UserDeviceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    nameDevice?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserDeviceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    nameDevice?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type SessionCreateInput = {
    id?: string
    userDeviceId: string
    hashedRefreshToken?: string | null
    userAgent?: string | null
    userIp: string
    createdAt?: Date | string
    updatedAt?: Date | string
    loginedAt?: Date | string | null
    logoutedAt?: Date | string | null
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    userDeviceId: string
    hashedRefreshToken?: string | null
    userAgent?: string | null
    userIp: string
    createdAt?: Date | string
    updatedAt?: Date | string
    loginedAt?: Date | string | null
    logoutedAt?: Date | string | null
    userId: string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userDeviceId?: StringFieldUpdateOperationsInput | string
    hashedRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userIp?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loginedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    logoutedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userDeviceId?: StringFieldUpdateOperationsInput | string
    hashedRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userIp?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loginedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    logoutedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type SessionCreateManyInput = {
    id?: string
    userDeviceId: string
    hashedRefreshToken?: string | null
    userAgent?: string | null
    userIp: string
    createdAt?: Date | string
    updatedAt?: Date | string
    loginedAt?: Date | string | null
    logoutedAt?: Date | string | null
    userId: string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userDeviceId?: StringFieldUpdateOperationsInput | string
    hashedRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userIp?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loginedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    logoutedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userDeviceId?: StringFieldUpdateOperationsInput | string
    hashedRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userIp?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loginedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    logoutedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type CodeCreateInput = {
    id?: string
    code: string
    type?: $Enums.CodeType
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCodesInput
  }

  export type CodeUncheckedCreateInput = {
    id?: string
    code: string
    type?: $Enums.CodeType
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type CodeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    type?: EnumCodeTypeFieldUpdateOperationsInput | $Enums.CodeType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCodesNestedInput
  }

  export type CodeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    type?: EnumCodeTypeFieldUpdateOperationsInput | $Enums.CodeType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type CodeCreateManyInput = {
    id?: string
    code: string
    type?: $Enums.CodeType
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type CodeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    type?: EnumCodeTypeFieldUpdateOperationsInput | $Enums.CodeType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CodeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    type?: EnumCodeTypeFieldUpdateOperationsInput | $Enums.CodeType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateInput = {
    id?: string
    fullname: string
    username: string
    email: string
    hashedPassword?: string | null
    accountType?: $Enums.AccountType
    avtUrl?: string | null
    address?: string | null
    city?: string | null
    state: string
    searchCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    visible?: $Enums.UserVisibility
    status?: $Enums.Status
    phone?: string | null
    numberIdentity?: string | null
    dateOfBirth?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    isVerified?: boolean
    lastActived?: Date | string | null
    picture?: string | null
    userDevice?: UserDeviceCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    Oauth2User?: Oauth2UserCreateNestedManyWithoutUserInput
    codes?: CodeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    fullname: string
    username: string
    email: string
    hashedPassword?: string | null
    accountType?: $Enums.AccountType
    avtUrl?: string | null
    address?: string | null
    city?: string | null
    state: string
    searchCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    visible?: $Enums.UserVisibility
    status?: $Enums.Status
    phone?: string | null
    numberIdentity?: string | null
    dateOfBirth?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    isVerified?: boolean
    lastActived?: Date | string | null
    picture?: string | null
    userDevice?: UserDeviceUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    Oauth2User?: Oauth2UserUncheckedCreateNestedManyWithoutUserInput
    codes?: CodeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    avtUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: StringFieldUpdateOperationsInput | string
    searchCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visible?: EnumUserVisibilityFieldUpdateOperationsInput | $Enums.UserVisibility
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    numberIdentity?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    lastActived?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    userDevice?: UserDeviceUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    Oauth2User?: Oauth2UserUpdateManyWithoutUserNestedInput
    codes?: CodeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    avtUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: StringFieldUpdateOperationsInput | string
    searchCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visible?: EnumUserVisibilityFieldUpdateOperationsInput | $Enums.UserVisibility
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    numberIdentity?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    lastActived?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    userDevice?: UserDeviceUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    Oauth2User?: Oauth2UserUncheckedUpdateManyWithoutUserNestedInput
    codes?: CodeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    fullname: string
    username: string
    email: string
    hashedPassword?: string | null
    accountType?: $Enums.AccountType
    avtUrl?: string | null
    address?: string | null
    city?: string | null
    state: string
    searchCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    visible?: $Enums.UserVisibility
    status?: $Enums.Status
    phone?: string | null
    numberIdentity?: string | null
    dateOfBirth?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    isVerified?: boolean
    lastActived?: Date | string | null
    picture?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    avtUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: StringFieldUpdateOperationsInput | string
    searchCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visible?: EnumUserVisibilityFieldUpdateOperationsInput | $Enums.UserVisibility
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    numberIdentity?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    lastActived?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    avtUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: StringFieldUpdateOperationsInput | string
    searchCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visible?: EnumUserVisibilityFieldUpdateOperationsInput | $Enums.UserVisibility
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    numberIdentity?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    lastActived?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type Oauth2UserCreateInput = {
    id?: string
    provider: $Enums.Provider
    providerUserId: string
    email: string
    phone?: string | null
    firstname?: string | null
    lastname?: string | null
    fullname?: string | null
    avatarUrl?: string | null
    username?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutOauth2UserInput
  }

  export type Oauth2UserUncheckedCreateInput = {
    id?: string
    provider: $Enums.Provider
    providerUserId: string
    email: string
    phone?: string | null
    firstname?: string | null
    lastname?: string | null
    fullname?: string | null
    avatarUrl?: string | null
    username?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type Oauth2UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    providerUserId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    fullname?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOauth2UserNestedInput
  }

  export type Oauth2UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    providerUserId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    fullname?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type Oauth2UserCreateManyInput = {
    id?: string
    provider: $Enums.Provider
    providerUserId: string
    email: string
    phone?: string | null
    firstname?: string | null
    lastname?: string | null
    fullname?: string | null
    avatarUrl?: string | null
    username?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type Oauth2UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    providerUserId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    fullname?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Oauth2UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    providerUserId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    fullname?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserDeviceNameDeviceUserIdCompoundUniqueInput = {
    nameDevice: string
    userId: string
  }

  export type UserDeviceCountOrderByAggregateInput = {
    id?: SortOrder
    deviceId?: SortOrder
    nameDevice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type UserDeviceMaxOrderByAggregateInput = {
    id?: SortOrder
    deviceId?: SortOrder
    nameDevice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type UserDeviceMinOrderByAggregateInput = {
    id?: SortOrder
    deviceId?: SortOrder
    nameDevice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SessionUserIdUserDeviceIdCompoundUniqueInput = {
    userId: string
    userDeviceId: string
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    userDeviceId?: SortOrder
    hashedRefreshToken?: SortOrder
    userAgent?: SortOrder
    userIp?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    loginedAt?: SortOrder
    logoutedAt?: SortOrder
    userId?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userDeviceId?: SortOrder
    hashedRefreshToken?: SortOrder
    userAgent?: SortOrder
    userIp?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    loginedAt?: SortOrder
    logoutedAt?: SortOrder
    userId?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    userDeviceId?: SortOrder
    hashedRefreshToken?: SortOrder
    userAgent?: SortOrder
    userIp?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    loginedAt?: SortOrder
    logoutedAt?: SortOrder
    userId?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumCodeTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CodeType | EnumCodeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CodeType[] | ListEnumCodeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CodeType[] | ListEnumCodeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCodeTypeFilter<$PrismaModel> | $Enums.CodeType
  }

  export type CodeCodeUserIdCompoundUniqueInput = {
    code: string
    userId: string
  }

  export type CodeCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type CodeMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type CodeMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type EnumCodeTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CodeType | EnumCodeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CodeType[] | ListEnumCodeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CodeType[] | ListEnumCodeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCodeTypeWithAggregatesFilter<$PrismaModel> | $Enums.CodeType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCodeTypeFilter<$PrismaModel>
    _max?: NestedEnumCodeTypeFilter<$PrismaModel>
  }

  export type EnumAccountTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountType | EnumAccountTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAccountTypeFilter<$PrismaModel> | $Enums.AccountType
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumUserVisibilityFilter<$PrismaModel = never> = {
    equals?: $Enums.UserVisibility | EnumUserVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.UserVisibility[] | ListEnumUserVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserVisibility[] | ListEnumUserVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumUserVisibilityFilter<$PrismaModel> | $Enums.UserVisibility
  }

  export type EnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserDeviceListRelationFilter = {
    every?: UserDeviceWhereInput
    some?: UserDeviceWhereInput
    none?: UserDeviceWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type Oauth2UserListRelationFilter = {
    every?: Oauth2UserWhereInput
    some?: Oauth2UserWhereInput
    none?: Oauth2UserWhereInput
  }

  export type CodeListRelationFilter = {
    every?: CodeWhereInput
    some?: CodeWhereInput
    none?: CodeWhereInput
  }

  export type UserDeviceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type Oauth2UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CodeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    fullname?: SortOrder
    username?: SortOrder
    email?: SortOrder
    hashedPassword?: SortOrder
    accountType?: SortOrder
    avtUrl?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    searchCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    visible?: SortOrder
    status?: SortOrder
    phone?: SortOrder
    numberIdentity?: SortOrder
    dateOfBirth?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    isActive?: SortOrder
    isBanned?: SortOrder
    isLocked?: SortOrder
    isVerified?: SortOrder
    lastActived?: SortOrder
    picture?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    searchCount?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    fullname?: SortOrder
    username?: SortOrder
    email?: SortOrder
    hashedPassword?: SortOrder
    accountType?: SortOrder
    avtUrl?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    searchCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    visible?: SortOrder
    status?: SortOrder
    phone?: SortOrder
    numberIdentity?: SortOrder
    dateOfBirth?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    isActive?: SortOrder
    isBanned?: SortOrder
    isLocked?: SortOrder
    isVerified?: SortOrder
    lastActived?: SortOrder
    picture?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    fullname?: SortOrder
    username?: SortOrder
    email?: SortOrder
    hashedPassword?: SortOrder
    accountType?: SortOrder
    avtUrl?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    searchCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    visible?: SortOrder
    status?: SortOrder
    phone?: SortOrder
    numberIdentity?: SortOrder
    dateOfBirth?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    isActive?: SortOrder
    isBanned?: SortOrder
    isLocked?: SortOrder
    isVerified?: SortOrder
    lastActived?: SortOrder
    picture?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    searchCount?: SortOrder
  }

  export type EnumAccountTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountType | EnumAccountTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAccountTypeWithAggregatesFilter<$PrismaModel> | $Enums.AccountType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAccountTypeFilter<$PrismaModel>
    _max?: NestedEnumAccountTypeFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumUserVisibilityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserVisibility | EnumUserVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.UserVisibility[] | ListEnumUserVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserVisibility[] | ListEnumUserVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumUserVisibilityWithAggregatesFilter<$PrismaModel> | $Enums.UserVisibility
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserVisibilityFilter<$PrismaModel>
    _max?: NestedEnumUserVisibilityFilter<$PrismaModel>
  }

  export type EnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.Provider | EnumProviderFieldRefInput<$PrismaModel>
    in?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumProviderFilter<$PrismaModel> | $Enums.Provider
  }

  export type Oauth2UserCountOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    providerUserId?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    fullname?: SortOrder
    avatarUrl?: SortOrder
    username?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type Oauth2UserMaxOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    providerUserId?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    fullname?: SortOrder
    avatarUrl?: SortOrder
    username?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type Oauth2UserMinOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    providerUserId?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    fullname?: SortOrder
    avatarUrl?: SortOrder
    username?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type EnumProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Provider | EnumProviderFieldRefInput<$PrismaModel>
    in?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumProviderWithAggregatesFilter<$PrismaModel> | $Enums.Provider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProviderFilter<$PrismaModel>
    _max?: NestedEnumProviderFilter<$PrismaModel>
  }

  export type UserCreateNestedOneWithoutUserDeviceInput = {
    create?: XOR<UserCreateWithoutUserDeviceInput, UserUncheckedCreateWithoutUserDeviceInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserDeviceInput
    connect?: UserWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneRequiredWithoutUserDeviceNestedInput = {
    create?: XOR<UserCreateWithoutUserDeviceInput, UserUncheckedCreateWithoutUserDeviceInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserDeviceInput
    upsert?: UserUpsertWithoutUserDeviceInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUserDeviceInput, UserUpdateWithoutUserDeviceInput>, UserUncheckedUpdateWithoutUserDeviceInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutCodesInput = {
    create?: XOR<UserCreateWithoutCodesInput, UserUncheckedCreateWithoutCodesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCodesInput
    connect?: UserWhereUniqueInput
  }

  export type EnumCodeTypeFieldUpdateOperationsInput = {
    set?: $Enums.CodeType
  }

  export type UserUpdateOneRequiredWithoutCodesNestedInput = {
    create?: XOR<UserCreateWithoutCodesInput, UserUncheckedCreateWithoutCodesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCodesInput
    upsert?: UserUpsertWithoutCodesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCodesInput, UserUpdateWithoutCodesInput>, UserUncheckedUpdateWithoutCodesInput>
  }

  export type UserDeviceCreateNestedManyWithoutUserInput = {
    create?: XOR<UserDeviceCreateWithoutUserInput, UserDeviceUncheckedCreateWithoutUserInput> | UserDeviceCreateWithoutUserInput[] | UserDeviceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserDeviceCreateOrConnectWithoutUserInput | UserDeviceCreateOrConnectWithoutUserInput[]
    createMany?: UserDeviceCreateManyUserInputEnvelope
    connect?: UserDeviceWhereUniqueInput | UserDeviceWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type Oauth2UserCreateNestedManyWithoutUserInput = {
    create?: XOR<Oauth2UserCreateWithoutUserInput, Oauth2UserUncheckedCreateWithoutUserInput> | Oauth2UserCreateWithoutUserInput[] | Oauth2UserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: Oauth2UserCreateOrConnectWithoutUserInput | Oauth2UserCreateOrConnectWithoutUserInput[]
    createMany?: Oauth2UserCreateManyUserInputEnvelope
    connect?: Oauth2UserWhereUniqueInput | Oauth2UserWhereUniqueInput[]
  }

  export type CodeCreateNestedManyWithoutUserInput = {
    create?: XOR<CodeCreateWithoutUserInput, CodeUncheckedCreateWithoutUserInput> | CodeCreateWithoutUserInput[] | CodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CodeCreateOrConnectWithoutUserInput | CodeCreateOrConnectWithoutUserInput[]
    createMany?: CodeCreateManyUserInputEnvelope
    connect?: CodeWhereUniqueInput | CodeWhereUniqueInput[]
  }

  export type UserDeviceUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserDeviceCreateWithoutUserInput, UserDeviceUncheckedCreateWithoutUserInput> | UserDeviceCreateWithoutUserInput[] | UserDeviceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserDeviceCreateOrConnectWithoutUserInput | UserDeviceCreateOrConnectWithoutUserInput[]
    createMany?: UserDeviceCreateManyUserInputEnvelope
    connect?: UserDeviceWhereUniqueInput | UserDeviceWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type Oauth2UserUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Oauth2UserCreateWithoutUserInput, Oauth2UserUncheckedCreateWithoutUserInput> | Oauth2UserCreateWithoutUserInput[] | Oauth2UserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: Oauth2UserCreateOrConnectWithoutUserInput | Oauth2UserCreateOrConnectWithoutUserInput[]
    createMany?: Oauth2UserCreateManyUserInputEnvelope
    connect?: Oauth2UserWhereUniqueInput | Oauth2UserWhereUniqueInput[]
  }

  export type CodeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CodeCreateWithoutUserInput, CodeUncheckedCreateWithoutUserInput> | CodeCreateWithoutUserInput[] | CodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CodeCreateOrConnectWithoutUserInput | CodeCreateOrConnectWithoutUserInput[]
    createMany?: CodeCreateManyUserInputEnvelope
    connect?: CodeWhereUniqueInput | CodeWhereUniqueInput[]
  }

  export type EnumAccountTypeFieldUpdateOperationsInput = {
    set?: $Enums.AccountType
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumUserVisibilityFieldUpdateOperationsInput = {
    set?: $Enums.UserVisibility
  }

  export type EnumStatusFieldUpdateOperationsInput = {
    set?: $Enums.Status
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserDeviceUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserDeviceCreateWithoutUserInput, UserDeviceUncheckedCreateWithoutUserInput> | UserDeviceCreateWithoutUserInput[] | UserDeviceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserDeviceCreateOrConnectWithoutUserInput | UserDeviceCreateOrConnectWithoutUserInput[]
    upsert?: UserDeviceUpsertWithWhereUniqueWithoutUserInput | UserDeviceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserDeviceCreateManyUserInputEnvelope
    set?: UserDeviceWhereUniqueInput | UserDeviceWhereUniqueInput[]
    disconnect?: UserDeviceWhereUniqueInput | UserDeviceWhereUniqueInput[]
    delete?: UserDeviceWhereUniqueInput | UserDeviceWhereUniqueInput[]
    connect?: UserDeviceWhereUniqueInput | UserDeviceWhereUniqueInput[]
    update?: UserDeviceUpdateWithWhereUniqueWithoutUserInput | UserDeviceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserDeviceUpdateManyWithWhereWithoutUserInput | UserDeviceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserDeviceScalarWhereInput | UserDeviceScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type Oauth2UserUpdateManyWithoutUserNestedInput = {
    create?: XOR<Oauth2UserCreateWithoutUserInput, Oauth2UserUncheckedCreateWithoutUserInput> | Oauth2UserCreateWithoutUserInput[] | Oauth2UserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: Oauth2UserCreateOrConnectWithoutUserInput | Oauth2UserCreateOrConnectWithoutUserInput[]
    upsert?: Oauth2UserUpsertWithWhereUniqueWithoutUserInput | Oauth2UserUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: Oauth2UserCreateManyUserInputEnvelope
    set?: Oauth2UserWhereUniqueInput | Oauth2UserWhereUniqueInput[]
    disconnect?: Oauth2UserWhereUniqueInput | Oauth2UserWhereUniqueInput[]
    delete?: Oauth2UserWhereUniqueInput | Oauth2UserWhereUniqueInput[]
    connect?: Oauth2UserWhereUniqueInput | Oauth2UserWhereUniqueInput[]
    update?: Oauth2UserUpdateWithWhereUniqueWithoutUserInput | Oauth2UserUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: Oauth2UserUpdateManyWithWhereWithoutUserInput | Oauth2UserUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: Oauth2UserScalarWhereInput | Oauth2UserScalarWhereInput[]
  }

  export type CodeUpdateManyWithoutUserNestedInput = {
    create?: XOR<CodeCreateWithoutUserInput, CodeUncheckedCreateWithoutUserInput> | CodeCreateWithoutUserInput[] | CodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CodeCreateOrConnectWithoutUserInput | CodeCreateOrConnectWithoutUserInput[]
    upsert?: CodeUpsertWithWhereUniqueWithoutUserInput | CodeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CodeCreateManyUserInputEnvelope
    set?: CodeWhereUniqueInput | CodeWhereUniqueInput[]
    disconnect?: CodeWhereUniqueInput | CodeWhereUniqueInput[]
    delete?: CodeWhereUniqueInput | CodeWhereUniqueInput[]
    connect?: CodeWhereUniqueInput | CodeWhereUniqueInput[]
    update?: CodeUpdateWithWhereUniqueWithoutUserInput | CodeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CodeUpdateManyWithWhereWithoutUserInput | CodeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CodeScalarWhereInput | CodeScalarWhereInput[]
  }

  export type UserDeviceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserDeviceCreateWithoutUserInput, UserDeviceUncheckedCreateWithoutUserInput> | UserDeviceCreateWithoutUserInput[] | UserDeviceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserDeviceCreateOrConnectWithoutUserInput | UserDeviceCreateOrConnectWithoutUserInput[]
    upsert?: UserDeviceUpsertWithWhereUniqueWithoutUserInput | UserDeviceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserDeviceCreateManyUserInputEnvelope
    set?: UserDeviceWhereUniqueInput | UserDeviceWhereUniqueInput[]
    disconnect?: UserDeviceWhereUniqueInput | UserDeviceWhereUniqueInput[]
    delete?: UserDeviceWhereUniqueInput | UserDeviceWhereUniqueInput[]
    connect?: UserDeviceWhereUniqueInput | UserDeviceWhereUniqueInput[]
    update?: UserDeviceUpdateWithWhereUniqueWithoutUserInput | UserDeviceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserDeviceUpdateManyWithWhereWithoutUserInput | UserDeviceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserDeviceScalarWhereInput | UserDeviceScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type Oauth2UserUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Oauth2UserCreateWithoutUserInput, Oauth2UserUncheckedCreateWithoutUserInput> | Oauth2UserCreateWithoutUserInput[] | Oauth2UserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: Oauth2UserCreateOrConnectWithoutUserInput | Oauth2UserCreateOrConnectWithoutUserInput[]
    upsert?: Oauth2UserUpsertWithWhereUniqueWithoutUserInput | Oauth2UserUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: Oauth2UserCreateManyUserInputEnvelope
    set?: Oauth2UserWhereUniqueInput | Oauth2UserWhereUniqueInput[]
    disconnect?: Oauth2UserWhereUniqueInput | Oauth2UserWhereUniqueInput[]
    delete?: Oauth2UserWhereUniqueInput | Oauth2UserWhereUniqueInput[]
    connect?: Oauth2UserWhereUniqueInput | Oauth2UserWhereUniqueInput[]
    update?: Oauth2UserUpdateWithWhereUniqueWithoutUserInput | Oauth2UserUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: Oauth2UserUpdateManyWithWhereWithoutUserInput | Oauth2UserUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: Oauth2UserScalarWhereInput | Oauth2UserScalarWhereInput[]
  }

  export type CodeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CodeCreateWithoutUserInput, CodeUncheckedCreateWithoutUserInput> | CodeCreateWithoutUserInput[] | CodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CodeCreateOrConnectWithoutUserInput | CodeCreateOrConnectWithoutUserInput[]
    upsert?: CodeUpsertWithWhereUniqueWithoutUserInput | CodeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CodeCreateManyUserInputEnvelope
    set?: CodeWhereUniqueInput | CodeWhereUniqueInput[]
    disconnect?: CodeWhereUniqueInput | CodeWhereUniqueInput[]
    delete?: CodeWhereUniqueInput | CodeWhereUniqueInput[]
    connect?: CodeWhereUniqueInput | CodeWhereUniqueInput[]
    update?: CodeUpdateWithWhereUniqueWithoutUserInput | CodeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CodeUpdateManyWithWhereWithoutUserInput | CodeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CodeScalarWhereInput | CodeScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutOauth2UserInput = {
    create?: XOR<UserCreateWithoutOauth2UserInput, UserUncheckedCreateWithoutOauth2UserInput>
    connectOrCreate?: UserCreateOrConnectWithoutOauth2UserInput
    connect?: UserWhereUniqueInput
  }

  export type EnumProviderFieldUpdateOperationsInput = {
    set?: $Enums.Provider
  }

  export type UserUpdateOneRequiredWithoutOauth2UserNestedInput = {
    create?: XOR<UserCreateWithoutOauth2UserInput, UserUncheckedCreateWithoutOauth2UserInput>
    connectOrCreate?: UserCreateOrConnectWithoutOauth2UserInput
    upsert?: UserUpsertWithoutOauth2UserInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOauth2UserInput, UserUpdateWithoutOauth2UserInput>, UserUncheckedUpdateWithoutOauth2UserInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumCodeTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CodeType | EnumCodeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CodeType[] | ListEnumCodeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CodeType[] | ListEnumCodeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCodeTypeFilter<$PrismaModel> | $Enums.CodeType
  }

  export type NestedEnumCodeTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CodeType | EnumCodeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CodeType[] | ListEnumCodeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CodeType[] | ListEnumCodeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCodeTypeWithAggregatesFilter<$PrismaModel> | $Enums.CodeType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCodeTypeFilter<$PrismaModel>
    _max?: NestedEnumCodeTypeFilter<$PrismaModel>
  }

  export type NestedEnumAccountTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountType | EnumAccountTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAccountTypeFilter<$PrismaModel> | $Enums.AccountType
  }

  export type NestedEnumUserVisibilityFilter<$PrismaModel = never> = {
    equals?: $Enums.UserVisibility | EnumUserVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.UserVisibility[] | ListEnumUserVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserVisibility[] | ListEnumUserVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumUserVisibilityFilter<$PrismaModel> | $Enums.UserVisibility
  }

  export type NestedEnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumAccountTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountType | EnumAccountTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAccountTypeWithAggregatesFilter<$PrismaModel> | $Enums.AccountType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAccountTypeFilter<$PrismaModel>
    _max?: NestedEnumAccountTypeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumUserVisibilityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserVisibility | EnumUserVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.UserVisibility[] | ListEnumUserVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserVisibility[] | ListEnumUserVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumUserVisibilityWithAggregatesFilter<$PrismaModel> | $Enums.UserVisibility
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserVisibilityFilter<$PrismaModel>
    _max?: NestedEnumUserVisibilityFilter<$PrismaModel>
  }

  export type NestedEnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.Provider | EnumProviderFieldRefInput<$PrismaModel>
    in?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumProviderFilter<$PrismaModel> | $Enums.Provider
  }

  export type NestedEnumProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Provider | EnumProviderFieldRefInput<$PrismaModel>
    in?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumProviderWithAggregatesFilter<$PrismaModel> | $Enums.Provider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProviderFilter<$PrismaModel>
    _max?: NestedEnumProviderFilter<$PrismaModel>
  }

  export type UserCreateWithoutUserDeviceInput = {
    id?: string
    fullname: string
    username: string
    email: string
    hashedPassword?: string | null
    accountType?: $Enums.AccountType
    avtUrl?: string | null
    address?: string | null
    city?: string | null
    state: string
    searchCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    visible?: $Enums.UserVisibility
    status?: $Enums.Status
    phone?: string | null
    numberIdentity?: string | null
    dateOfBirth?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    isVerified?: boolean
    lastActived?: Date | string | null
    picture?: string | null
    sessions?: SessionCreateNestedManyWithoutUserInput
    Oauth2User?: Oauth2UserCreateNestedManyWithoutUserInput
    codes?: CodeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUserDeviceInput = {
    id?: string
    fullname: string
    username: string
    email: string
    hashedPassword?: string | null
    accountType?: $Enums.AccountType
    avtUrl?: string | null
    address?: string | null
    city?: string | null
    state: string
    searchCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    visible?: $Enums.UserVisibility
    status?: $Enums.Status
    phone?: string | null
    numberIdentity?: string | null
    dateOfBirth?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    isVerified?: boolean
    lastActived?: Date | string | null
    picture?: string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    Oauth2User?: Oauth2UserUncheckedCreateNestedManyWithoutUserInput
    codes?: CodeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUserDeviceInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUserDeviceInput, UserUncheckedCreateWithoutUserDeviceInput>
  }

  export type UserUpsertWithoutUserDeviceInput = {
    update: XOR<UserUpdateWithoutUserDeviceInput, UserUncheckedUpdateWithoutUserDeviceInput>
    create: XOR<UserCreateWithoutUserDeviceInput, UserUncheckedCreateWithoutUserDeviceInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUserDeviceInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUserDeviceInput, UserUncheckedUpdateWithoutUserDeviceInput>
  }

  export type UserUpdateWithoutUserDeviceInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    avtUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: StringFieldUpdateOperationsInput | string
    searchCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visible?: EnumUserVisibilityFieldUpdateOperationsInput | $Enums.UserVisibility
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    numberIdentity?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    lastActived?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUpdateManyWithoutUserNestedInput
    Oauth2User?: Oauth2UserUpdateManyWithoutUserNestedInput
    codes?: CodeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUserDeviceInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    avtUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: StringFieldUpdateOperationsInput | string
    searchCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visible?: EnumUserVisibilityFieldUpdateOperationsInput | $Enums.UserVisibility
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    numberIdentity?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    lastActived?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    Oauth2User?: Oauth2UserUncheckedUpdateManyWithoutUserNestedInput
    codes?: CodeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    fullname: string
    username: string
    email: string
    hashedPassword?: string | null
    accountType?: $Enums.AccountType
    avtUrl?: string | null
    address?: string | null
    city?: string | null
    state: string
    searchCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    visible?: $Enums.UserVisibility
    status?: $Enums.Status
    phone?: string | null
    numberIdentity?: string | null
    dateOfBirth?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    isVerified?: boolean
    lastActived?: Date | string | null
    picture?: string | null
    userDevice?: UserDeviceCreateNestedManyWithoutUserInput
    Oauth2User?: Oauth2UserCreateNestedManyWithoutUserInput
    codes?: CodeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    fullname: string
    username: string
    email: string
    hashedPassword?: string | null
    accountType?: $Enums.AccountType
    avtUrl?: string | null
    address?: string | null
    city?: string | null
    state: string
    searchCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    visible?: $Enums.UserVisibility
    status?: $Enums.Status
    phone?: string | null
    numberIdentity?: string | null
    dateOfBirth?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    isVerified?: boolean
    lastActived?: Date | string | null
    picture?: string | null
    userDevice?: UserDeviceUncheckedCreateNestedManyWithoutUserInput
    Oauth2User?: Oauth2UserUncheckedCreateNestedManyWithoutUserInput
    codes?: CodeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    avtUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: StringFieldUpdateOperationsInput | string
    searchCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visible?: EnumUserVisibilityFieldUpdateOperationsInput | $Enums.UserVisibility
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    numberIdentity?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    lastActived?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    userDevice?: UserDeviceUpdateManyWithoutUserNestedInput
    Oauth2User?: Oauth2UserUpdateManyWithoutUserNestedInput
    codes?: CodeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    avtUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: StringFieldUpdateOperationsInput | string
    searchCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visible?: EnumUserVisibilityFieldUpdateOperationsInput | $Enums.UserVisibility
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    numberIdentity?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    lastActived?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    userDevice?: UserDeviceUncheckedUpdateManyWithoutUserNestedInput
    Oauth2User?: Oauth2UserUncheckedUpdateManyWithoutUserNestedInput
    codes?: CodeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutCodesInput = {
    id?: string
    fullname: string
    username: string
    email: string
    hashedPassword?: string | null
    accountType?: $Enums.AccountType
    avtUrl?: string | null
    address?: string | null
    city?: string | null
    state: string
    searchCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    visible?: $Enums.UserVisibility
    status?: $Enums.Status
    phone?: string | null
    numberIdentity?: string | null
    dateOfBirth?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    isVerified?: boolean
    lastActived?: Date | string | null
    picture?: string | null
    userDevice?: UserDeviceCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    Oauth2User?: Oauth2UserCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCodesInput = {
    id?: string
    fullname: string
    username: string
    email: string
    hashedPassword?: string | null
    accountType?: $Enums.AccountType
    avtUrl?: string | null
    address?: string | null
    city?: string | null
    state: string
    searchCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    visible?: $Enums.UserVisibility
    status?: $Enums.Status
    phone?: string | null
    numberIdentity?: string | null
    dateOfBirth?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    isVerified?: boolean
    lastActived?: Date | string | null
    picture?: string | null
    userDevice?: UserDeviceUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    Oauth2User?: Oauth2UserUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCodesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCodesInput, UserUncheckedCreateWithoutCodesInput>
  }

  export type UserUpsertWithoutCodesInput = {
    update: XOR<UserUpdateWithoutCodesInput, UserUncheckedUpdateWithoutCodesInput>
    create: XOR<UserCreateWithoutCodesInput, UserUncheckedCreateWithoutCodesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCodesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCodesInput, UserUncheckedUpdateWithoutCodesInput>
  }

  export type UserUpdateWithoutCodesInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    avtUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: StringFieldUpdateOperationsInput | string
    searchCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visible?: EnumUserVisibilityFieldUpdateOperationsInput | $Enums.UserVisibility
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    numberIdentity?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    lastActived?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    userDevice?: UserDeviceUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    Oauth2User?: Oauth2UserUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCodesInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    avtUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: StringFieldUpdateOperationsInput | string
    searchCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visible?: EnumUserVisibilityFieldUpdateOperationsInput | $Enums.UserVisibility
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    numberIdentity?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    lastActived?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    userDevice?: UserDeviceUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    Oauth2User?: Oauth2UserUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserDeviceCreateWithoutUserInput = {
    id?: string
    deviceId: string
    nameDevice: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserDeviceUncheckedCreateWithoutUserInput = {
    id?: string
    deviceId: string
    nameDevice: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserDeviceCreateOrConnectWithoutUserInput = {
    where: UserDeviceWhereUniqueInput
    create: XOR<UserDeviceCreateWithoutUserInput, UserDeviceUncheckedCreateWithoutUserInput>
  }

  export type UserDeviceCreateManyUserInputEnvelope = {
    data: UserDeviceCreateManyUserInput | UserDeviceCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    userDeviceId: string
    hashedRefreshToken?: string | null
    userAgent?: string | null
    userIp: string
    createdAt?: Date | string
    updatedAt?: Date | string
    loginedAt?: Date | string | null
    logoutedAt?: Date | string | null
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    userDeviceId: string
    hashedRefreshToken?: string | null
    userAgent?: string | null
    userIp: string
    createdAt?: Date | string
    updatedAt?: Date | string
    loginedAt?: Date | string | null
    logoutedAt?: Date | string | null
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type Oauth2UserCreateWithoutUserInput = {
    id?: string
    provider: $Enums.Provider
    providerUserId: string
    email: string
    phone?: string | null
    firstname?: string | null
    lastname?: string | null
    fullname?: string | null
    avatarUrl?: string | null
    username?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type Oauth2UserUncheckedCreateWithoutUserInput = {
    id?: string
    provider: $Enums.Provider
    providerUserId: string
    email: string
    phone?: string | null
    firstname?: string | null
    lastname?: string | null
    fullname?: string | null
    avatarUrl?: string | null
    username?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type Oauth2UserCreateOrConnectWithoutUserInput = {
    where: Oauth2UserWhereUniqueInput
    create: XOR<Oauth2UserCreateWithoutUserInput, Oauth2UserUncheckedCreateWithoutUserInput>
  }

  export type Oauth2UserCreateManyUserInputEnvelope = {
    data: Oauth2UserCreateManyUserInput | Oauth2UserCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CodeCreateWithoutUserInput = {
    id?: string
    code: string
    type?: $Enums.CodeType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CodeUncheckedCreateWithoutUserInput = {
    id?: string
    code: string
    type?: $Enums.CodeType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CodeCreateOrConnectWithoutUserInput = {
    where: CodeWhereUniqueInput
    create: XOR<CodeCreateWithoutUserInput, CodeUncheckedCreateWithoutUserInput>
  }

  export type CodeCreateManyUserInputEnvelope = {
    data: CodeCreateManyUserInput | CodeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserDeviceUpsertWithWhereUniqueWithoutUserInput = {
    where: UserDeviceWhereUniqueInput
    update: XOR<UserDeviceUpdateWithoutUserInput, UserDeviceUncheckedUpdateWithoutUserInput>
    create: XOR<UserDeviceCreateWithoutUserInput, UserDeviceUncheckedCreateWithoutUserInput>
  }

  export type UserDeviceUpdateWithWhereUniqueWithoutUserInput = {
    where: UserDeviceWhereUniqueInput
    data: XOR<UserDeviceUpdateWithoutUserInput, UserDeviceUncheckedUpdateWithoutUserInput>
  }

  export type UserDeviceUpdateManyWithWhereWithoutUserInput = {
    where: UserDeviceScalarWhereInput
    data: XOR<UserDeviceUpdateManyMutationInput, UserDeviceUncheckedUpdateManyWithoutUserInput>
  }

  export type UserDeviceScalarWhereInput = {
    AND?: UserDeviceScalarWhereInput | UserDeviceScalarWhereInput[]
    OR?: UserDeviceScalarWhereInput[]
    NOT?: UserDeviceScalarWhereInput | UserDeviceScalarWhereInput[]
    id?: UuidFilter<"UserDevice"> | string
    deviceId?: StringFilter<"UserDevice"> | string
    nameDevice?: StringFilter<"UserDevice"> | string
    createdAt?: DateTimeFilter<"UserDevice"> | Date | string
    updatedAt?: DateTimeFilter<"UserDevice"> | Date | string
    userId?: UuidFilter<"UserDevice"> | string
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: UuidFilter<"Session"> | string
    userDeviceId?: StringFilter<"Session"> | string
    hashedRefreshToken?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userIp?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    loginedAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    logoutedAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    userId?: UuidFilter<"Session"> | string
  }

  export type Oauth2UserUpsertWithWhereUniqueWithoutUserInput = {
    where: Oauth2UserWhereUniqueInput
    update: XOR<Oauth2UserUpdateWithoutUserInput, Oauth2UserUncheckedUpdateWithoutUserInput>
    create: XOR<Oauth2UserCreateWithoutUserInput, Oauth2UserUncheckedCreateWithoutUserInput>
  }

  export type Oauth2UserUpdateWithWhereUniqueWithoutUserInput = {
    where: Oauth2UserWhereUniqueInput
    data: XOR<Oauth2UserUpdateWithoutUserInput, Oauth2UserUncheckedUpdateWithoutUserInput>
  }

  export type Oauth2UserUpdateManyWithWhereWithoutUserInput = {
    where: Oauth2UserScalarWhereInput
    data: XOR<Oauth2UserUpdateManyMutationInput, Oauth2UserUncheckedUpdateManyWithoutUserInput>
  }

  export type Oauth2UserScalarWhereInput = {
    AND?: Oauth2UserScalarWhereInput | Oauth2UserScalarWhereInput[]
    OR?: Oauth2UserScalarWhereInput[]
    NOT?: Oauth2UserScalarWhereInput | Oauth2UserScalarWhereInput[]
    id?: UuidFilter<"Oauth2User"> | string
    provider?: EnumProviderFilter<"Oauth2User"> | $Enums.Provider
    providerUserId?: StringFilter<"Oauth2User"> | string
    email?: StringFilter<"Oauth2User"> | string
    phone?: StringNullableFilter<"Oauth2User"> | string | null
    firstname?: StringNullableFilter<"Oauth2User"> | string | null
    lastname?: StringNullableFilter<"Oauth2User"> | string | null
    fullname?: StringNullableFilter<"Oauth2User"> | string | null
    avatarUrl?: StringNullableFilter<"Oauth2User"> | string | null
    username?: StringNullableFilter<"Oauth2User"> | string | null
    createdAt?: DateTimeFilter<"Oauth2User"> | Date | string
    updatedAt?: DateTimeFilter<"Oauth2User"> | Date | string
    userId?: UuidFilter<"Oauth2User"> | string
  }

  export type CodeUpsertWithWhereUniqueWithoutUserInput = {
    where: CodeWhereUniqueInput
    update: XOR<CodeUpdateWithoutUserInput, CodeUncheckedUpdateWithoutUserInput>
    create: XOR<CodeCreateWithoutUserInput, CodeUncheckedCreateWithoutUserInput>
  }

  export type CodeUpdateWithWhereUniqueWithoutUserInput = {
    where: CodeWhereUniqueInput
    data: XOR<CodeUpdateWithoutUserInput, CodeUncheckedUpdateWithoutUserInput>
  }

  export type CodeUpdateManyWithWhereWithoutUserInput = {
    where: CodeScalarWhereInput
    data: XOR<CodeUpdateManyMutationInput, CodeUncheckedUpdateManyWithoutUserInput>
  }

  export type CodeScalarWhereInput = {
    AND?: CodeScalarWhereInput | CodeScalarWhereInput[]
    OR?: CodeScalarWhereInput[]
    NOT?: CodeScalarWhereInput | CodeScalarWhereInput[]
    id?: UuidFilter<"Code"> | string
    code?: StringFilter<"Code"> | string
    type?: EnumCodeTypeFilter<"Code"> | $Enums.CodeType
    createdAt?: DateTimeFilter<"Code"> | Date | string
    updatedAt?: DateTimeFilter<"Code"> | Date | string
    userId?: UuidFilter<"Code"> | string
  }

  export type UserCreateWithoutOauth2UserInput = {
    id?: string
    fullname: string
    username: string
    email: string
    hashedPassword?: string | null
    accountType?: $Enums.AccountType
    avtUrl?: string | null
    address?: string | null
    city?: string | null
    state: string
    searchCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    visible?: $Enums.UserVisibility
    status?: $Enums.Status
    phone?: string | null
    numberIdentity?: string | null
    dateOfBirth?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    isVerified?: boolean
    lastActived?: Date | string | null
    picture?: string | null
    userDevice?: UserDeviceCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    codes?: CodeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOauth2UserInput = {
    id?: string
    fullname: string
    username: string
    email: string
    hashedPassword?: string | null
    accountType?: $Enums.AccountType
    avtUrl?: string | null
    address?: string | null
    city?: string | null
    state: string
    searchCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    visible?: $Enums.UserVisibility
    status?: $Enums.Status
    phone?: string | null
    numberIdentity?: string | null
    dateOfBirth?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    isVerified?: boolean
    lastActived?: Date | string | null
    picture?: string | null
    userDevice?: UserDeviceUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    codes?: CodeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOauth2UserInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOauth2UserInput, UserUncheckedCreateWithoutOauth2UserInput>
  }

  export type UserUpsertWithoutOauth2UserInput = {
    update: XOR<UserUpdateWithoutOauth2UserInput, UserUncheckedUpdateWithoutOauth2UserInput>
    create: XOR<UserCreateWithoutOauth2UserInput, UserUncheckedCreateWithoutOauth2UserInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOauth2UserInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOauth2UserInput, UserUncheckedUpdateWithoutOauth2UserInput>
  }

  export type UserUpdateWithoutOauth2UserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    avtUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: StringFieldUpdateOperationsInput | string
    searchCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visible?: EnumUserVisibilityFieldUpdateOperationsInput | $Enums.UserVisibility
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    numberIdentity?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    lastActived?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    userDevice?: UserDeviceUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    codes?: CodeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOauth2UserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    avtUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: StringFieldUpdateOperationsInput | string
    searchCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visible?: EnumUserVisibilityFieldUpdateOperationsInput | $Enums.UserVisibility
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    numberIdentity?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    lastActived?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    userDevice?: UserDeviceUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    codes?: CodeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserDeviceCreateManyUserInput = {
    id?: string
    deviceId: string
    nameDevice: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionCreateManyUserInput = {
    id?: string
    userDeviceId: string
    hashedRefreshToken?: string | null
    userAgent?: string | null
    userIp: string
    createdAt?: Date | string
    updatedAt?: Date | string
    loginedAt?: Date | string | null
    logoutedAt?: Date | string | null
  }

  export type Oauth2UserCreateManyUserInput = {
    id?: string
    provider: $Enums.Provider
    providerUserId: string
    email: string
    phone?: string | null
    firstname?: string | null
    lastname?: string | null
    fullname?: string | null
    avatarUrl?: string | null
    username?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CodeCreateManyUserInput = {
    id?: string
    code: string
    type?: $Enums.CodeType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserDeviceUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    nameDevice?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserDeviceUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    nameDevice?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserDeviceUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    nameDevice?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    userDeviceId?: StringFieldUpdateOperationsInput | string
    hashedRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userIp?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loginedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    logoutedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    userDeviceId?: StringFieldUpdateOperationsInput | string
    hashedRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userIp?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loginedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    logoutedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    userDeviceId?: StringFieldUpdateOperationsInput | string
    hashedRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userIp?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loginedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    logoutedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type Oauth2UserUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    providerUserId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    fullname?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Oauth2UserUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    providerUserId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    fullname?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Oauth2UserUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    providerUserId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    fullname?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CodeUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    type?: EnumCodeTypeFieldUpdateOperationsInput | $Enums.CodeType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CodeUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    type?: EnumCodeTypeFieldUpdateOperationsInput | $Enums.CodeType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CodeUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    type?: EnumCodeTypeFieldUpdateOperationsInput | $Enums.CodeType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}