
import * as runtime from './runtime/library.js';
import $Types = runtime.Types 
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


export type UserDevice = $Result.DefaultSelection<Prisma.$UserDevicePayload>
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>
export type Post = $Result.DefaultSelection<Prisma.$PostPayload>
export type likePost = $Result.DefaultSelection<Prisma.$likePostPayload>
export type Comment = $Result.DefaultSelection<Prisma.$CommentPayload>
export type Room = $Result.DefaultSelection<Prisma.$RoomPayload>
export type MemberInRoom = $Result.DefaultSelection<Prisma.$MemberInRoomPayload>
export type history_searching = $Result.DefaultSelection<Prisma.$history_searchingPayload>
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
export type Oauth2User = $Result.DefaultSelection<Prisma.$Oauth2UserPayload>

export namespace $Enums {
  export const AccountType: {
  EMAIL: 'EMAIL',
  OAUTH2: 'OAUTH2',
  FACEBOOK: 'FACEBOOK',
  LOCAL: 'LOCAL',
  SOCIAL: 'SOCIAL'
};

export type AccountType = (typeof AccountType)[keyof typeof AccountType]


export const TypeMessage: {
  TEXT: 'TEXT',
  IMAGE: 'IMAGE',
  FILE: 'FILE',
  VOICE: 'VOICE'
};

export type TypeMessage = (typeof TypeMessage)[keyof typeof TypeMessage]


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

export type TypeMessage = $Enums.TypeMessage

export const TypeMessage: typeof $Enums.TypeMessage

export type Provider = $Enums.Provider

export const Provider: typeof $Enums.Provider

export type CodeType = $Enums.CodeType

export const CodeType: typeof $Enums.CodeType

export type Status = $Enums.Status

export const Status: typeof $Enums.Status

export type UserVisibility = $Enums.UserVisibility

export const UserVisibility: typeof $Enums.UserVisibility

export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  $connect(): $Utils.JsPromise<void>;

  $disconnect(): $Utils.JsPromise<void>;

$executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      get userDevice(): Prisma.UserDeviceDelegate<ExtArgs, ClientOptions>;

  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;

  get post(): Prisma.PostDelegate<ExtArgs, ClientOptions>;

  get likePost(): Prisma.likePostDelegate<ExtArgs, ClientOptions>;

  get comment(): Prisma.CommentDelegate<ExtArgs, ClientOptions>;

  get room(): Prisma.RoomDelegate<ExtArgs, ClientOptions>;

  get memberInRoom(): Prisma.MemberInRoomDelegate<ExtArgs, ClientOptions>;

  get history_searching(): Prisma.history_searchingDelegate<ExtArgs, ClientOptions>;

  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  get oauth2User(): Prisma.Oauth2UserDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  export import validator = runtime.Public.validator

  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  namespace NullTypes {
    class DbNull {
      private DbNull: never
      private constructor()
    }

    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  export const DbNull: NullTypes.DbNull

  export const JsonNull: NullTypes.JsonNull

  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

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

  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


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


  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      
      [P in K]: Prisma__Pick<O, P & keyof O> 
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

  
  type NoExpand<T> = T extends unknown ? T : never;

  
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  export type Boolean = True | False

  

  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 
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
      ? 
        
        
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    UserDevice: 'UserDevice',
    Session: 'Session',
    Message: 'Message',
    Post: 'Post',
    likePost: 'likePost',
    Comment: 'Comment',
    Room: 'Room',
    MemberInRoom: 'MemberInRoom',
    history_searching: 'history_searching',
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
      modelProps: "userDevice" | "session" | "message" | "post" | "likePost" | "comment" | "room" | "memberInRoom" | "history_searching" | "user" | "oauth2User"
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
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
      Post: {
        payload: Prisma.$PostPayload<ExtArgs>
        fields: Prisma.PostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findFirst: {
            args: Prisma.PostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findMany: {
            args: Prisma.PostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          create: {
            args: Prisma.PostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          createMany: {
            args: Prisma.PostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          delete: {
            args: Prisma.PostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          update: {
            args: Prisma.PostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          deleteMany: {
            args: Prisma.PostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PostUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          upsert: {
            args: Prisma.PostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          aggregate: {
            args: Prisma.PostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePost>
          }
          groupBy: {
            args: Prisma.PostGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostCountArgs<ExtArgs>
            result: $Utils.Optional<PostCountAggregateOutputType> | number
          }
        }
      }
      likePost: {
        payload: Prisma.$likePostPayload<ExtArgs>
        fields: Prisma.likePostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.likePostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$likePostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.likePostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$likePostPayload>
          }
          findFirst: {
            args: Prisma.likePostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$likePostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.likePostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$likePostPayload>
          }
          findMany: {
            args: Prisma.likePostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$likePostPayload>[]
          }
          create: {
            args: Prisma.likePostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$likePostPayload>
          }
          createMany: {
            args: Prisma.likePostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.likePostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$likePostPayload>[]
          }
          delete: {
            args: Prisma.likePostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$likePostPayload>
          }
          update: {
            args: Prisma.likePostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$likePostPayload>
          }
          deleteMany: {
            args: Prisma.likePostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.likePostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.likePostUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$likePostPayload>[]
          }
          upsert: {
            args: Prisma.likePostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$likePostPayload>
          }
          aggregate: {
            args: Prisma.LikePostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLikePost>
          }
          groupBy: {
            args: Prisma.likePostGroupByArgs<ExtArgs>
            result: $Utils.Optional<LikePostGroupByOutputType>[]
          }
          count: {
            args: Prisma.likePostCountArgs<ExtArgs>
            result: $Utils.Optional<LikePostCountAggregateOutputType> | number
          }
        }
      }
      Comment: {
        payload: Prisma.$CommentPayload<ExtArgs>
        fields: Prisma.CommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findFirst: {
            args: Prisma.CommentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findMany: {
            args: Prisma.CommentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          create: {
            args: Prisma.CommentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          createMany: {
            args: Prisma.CommentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CommentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          delete: {
            args: Prisma.CommentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          update: {
            args: Prisma.CommentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          deleteMany: {
            args: Prisma.CommentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CommentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          upsert: {
            args: Prisma.CommentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          aggregate: {
            args: Prisma.CommentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComment>
          }
          groupBy: {
            args: Prisma.CommentGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommentGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommentCountArgs<ExtArgs>
            result: $Utils.Optional<CommentCountAggregateOutputType> | number
          }
        }
      }
      Room: {
        payload: Prisma.$RoomPayload<ExtArgs>
        fields: Prisma.RoomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          findFirst: {
            args: Prisma.RoomFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          findMany: {
            args: Prisma.RoomFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          create: {
            args: Prisma.RoomCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          createMany: {
            args: Prisma.RoomCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          delete: {
            args: Prisma.RoomDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          update: {
            args: Prisma.RoomUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          deleteMany: {
            args: Prisma.RoomDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoomUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          upsert: {
            args: Prisma.RoomUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          aggregate: {
            args: Prisma.RoomAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoom>
          }
          groupBy: {
            args: Prisma.RoomGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomCountArgs<ExtArgs>
            result: $Utils.Optional<RoomCountAggregateOutputType> | number
          }
        }
      }
      MemberInRoom: {
        payload: Prisma.$MemberInRoomPayload<ExtArgs>
        fields: Prisma.MemberInRoomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MemberInRoomFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberInRoomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MemberInRoomFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberInRoomPayload>
          }
          findFirst: {
            args: Prisma.MemberInRoomFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberInRoomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MemberInRoomFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberInRoomPayload>
          }
          findMany: {
            args: Prisma.MemberInRoomFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberInRoomPayload>[]
          }
          create: {
            args: Prisma.MemberInRoomCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberInRoomPayload>
          }
          createMany: {
            args: Prisma.MemberInRoomCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MemberInRoomCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberInRoomPayload>[]
          }
          delete: {
            args: Prisma.MemberInRoomDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberInRoomPayload>
          }
          update: {
            args: Prisma.MemberInRoomUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberInRoomPayload>
          }
          deleteMany: {
            args: Prisma.MemberInRoomDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MemberInRoomUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MemberInRoomUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberInRoomPayload>[]
          }
          upsert: {
            args: Prisma.MemberInRoomUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberInRoomPayload>
          }
          aggregate: {
            args: Prisma.MemberInRoomAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMemberInRoom>
          }
          groupBy: {
            args: Prisma.MemberInRoomGroupByArgs<ExtArgs>
            result: $Utils.Optional<MemberInRoomGroupByOutputType>[]
          }
          count: {
            args: Prisma.MemberInRoomCountArgs<ExtArgs>
            result: $Utils.Optional<MemberInRoomCountAggregateOutputType> | number
          }
        }
      }
      history_searching: {
        payload: Prisma.$history_searchingPayload<ExtArgs>
        fields: Prisma.history_searchingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.history_searchingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$history_searchingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.history_searchingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$history_searchingPayload>
          }
          findFirst: {
            args: Prisma.history_searchingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$history_searchingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.history_searchingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$history_searchingPayload>
          }
          findMany: {
            args: Prisma.history_searchingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$history_searchingPayload>[]
          }
          create: {
            args: Prisma.history_searchingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$history_searchingPayload>
          }
          createMany: {
            args: Prisma.history_searchingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.history_searchingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$history_searchingPayload>[]
          }
          delete: {
            args: Prisma.history_searchingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$history_searchingPayload>
          }
          update: {
            args: Prisma.history_searchingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$history_searchingPayload>
          }
          deleteMany: {
            args: Prisma.history_searchingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.history_searchingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.history_searchingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$history_searchingPayload>[]
          }
          upsert: {
            args: Prisma.history_searchingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$history_searchingPayload>
          }
          aggregate: {
            args: Prisma.History_searchingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHistory_searching>
          }
          groupBy: {
            args: Prisma.history_searchingGroupByArgs<ExtArgs>
            result: $Utils.Optional<History_searchingGroupByOutputType>[]
          }
          count: {
            args: Prisma.history_searchingCountArgs<ExtArgs>
            result: $Utils.Optional<History_searchingCountAggregateOutputType> | number
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
    datasources?: Datasources
    datasourceUrl?: string
    errorFormat?: ErrorFormat
    log?: (LogLevel | LogDefinition)[]
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    adapter?: runtime.SqlDriverAdapterFactory | null
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    userDevice?: UserDeviceOmit
    session?: SessionOmit
    message?: MessageOmit
    post?: PostOmit
    likePost?: likePostOmit
    comment?: CommentOmit
    room?: RoomOmit
    memberInRoom?: MemberInRoomOmit
    history_searching?: history_searchingOmit
    user?: UserOmit
    oauth2User?: Oauth2UserOmit
  }

  
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

  
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  export type PostCountOutputType = {
    comments: number
    likes: number
  }

  export type PostCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comments?: boolean | PostCountOutputTypeCountCommentsArgs
    likes?: boolean | PostCountOutputTypeCountLikesArgs
  }

  
  export type PostCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: PostCountOutputTypeSelect<ExtArgs> | null
  }

  export type PostCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
  }

  export type PostCountOutputTypeCountLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: likePostWhereInput
  }


  export type RoomCountOutputType = {
    messages: number
    members: number
  }

  export type RoomCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | RoomCountOutputTypeCountMessagesArgs
    members?: boolean | RoomCountOutputTypeCountMembersArgs
  }

  
  export type RoomCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: RoomCountOutputTypeSelect<ExtArgs> | null
  }

  export type RoomCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  export type RoomCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemberInRoomWhereInput
  }


  export type UserCountOutputType = {
    Oauth2User: number
    sessions: number
    userDevice: number
    senderMessage: number
    receiveMessage: number
    memberInRoom: number
    posts: number
    comments: number
    likes: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Oauth2User?: boolean | UserCountOutputTypeCountOauth2UserArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    userDevice?: boolean | UserCountOutputTypeCountUserDeviceArgs
    senderMessage?: boolean | UserCountOutputTypeCountSenderMessageArgs
    receiveMessage?: boolean | UserCountOutputTypeCountReceiveMessageArgs
    memberInRoom?: boolean | UserCountOutputTypeCountMemberInRoomArgs
    posts?: boolean | UserCountOutputTypeCountPostsArgs
    comments?: boolean | UserCountOutputTypeCountCommentsArgs
    likes?: boolean | UserCountOutputTypeCountLikesArgs
  }

  
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  export type UserCountOutputTypeCountOauth2UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Oauth2UserWhereInput
  }

  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  export type UserCountOutputTypeCountUserDeviceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserDeviceWhereInput
  }

  export type UserCountOutputTypeCountSenderMessageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  export type UserCountOutputTypeCountReceiveMessageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  export type UserCountOutputTypeCountMemberInRoomArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemberInRoomWhereInput
  }

  export type UserCountOutputTypeCountPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
  }

  export type UserCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
  }

  export type UserCountOutputTypeCountLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: likePostWhereInput
  }


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
    where?: UserDeviceWhereInput
    orderBy?: UserDeviceOrderByWithRelationInput | UserDeviceOrderByWithRelationInput[]
    cursor?: UserDeviceWhereUniqueInput
    take?: number
    skip?: number
    _count?: true | UserDeviceCountAggregateInputType
    _min?: UserDeviceMinAggregateInputType
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
    findUnique<T extends UserDeviceFindUniqueArgs>(args: SelectSubset<T, UserDeviceFindUniqueArgs<ExtArgs>>): Prisma__UserDeviceClient<$Result.GetResult<Prisma.$UserDevicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findUniqueOrThrow<T extends UserDeviceFindUniqueOrThrowArgs>(args: SelectSubset<T, UserDeviceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserDeviceClient<$Result.GetResult<Prisma.$UserDevicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findFirst<T extends UserDeviceFindFirstArgs>(args?: SelectSubset<T, UserDeviceFindFirstArgs<ExtArgs>>): Prisma__UserDeviceClient<$Result.GetResult<Prisma.$UserDevicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findFirstOrThrow<T extends UserDeviceFindFirstOrThrowArgs>(args?: SelectSubset<T, UserDeviceFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserDeviceClient<$Result.GetResult<Prisma.$UserDevicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findMany<T extends UserDeviceFindManyArgs>(args?: SelectSubset<T, UserDeviceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDevicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    create<T extends UserDeviceCreateArgs>(args: SelectSubset<T, UserDeviceCreateArgs<ExtArgs>>): Prisma__UserDeviceClient<$Result.GetResult<Prisma.$UserDevicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    createMany<T extends UserDeviceCreateManyArgs>(args?: SelectSubset<T, UserDeviceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    createManyAndReturn<T extends UserDeviceCreateManyAndReturnArgs>(args?: SelectSubset<T, UserDeviceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDevicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    delete<T extends UserDeviceDeleteArgs>(args: SelectSubset<T, UserDeviceDeleteArgs<ExtArgs>>): Prisma__UserDeviceClient<$Result.GetResult<Prisma.$UserDevicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    update<T extends UserDeviceUpdateArgs>(args: SelectSubset<T, UserDeviceUpdateArgs<ExtArgs>>): Prisma__UserDeviceClient<$Result.GetResult<Prisma.$UserDevicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    deleteMany<T extends UserDeviceDeleteManyArgs>(args?: SelectSubset<T, UserDeviceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    updateMany<T extends UserDeviceUpdateManyArgs>(args: SelectSubset<T, UserDeviceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    updateManyAndReturn<T extends UserDeviceUpdateManyAndReturnArgs>(args: SelectSubset<T, UserDeviceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDevicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    upsert<T extends UserDeviceUpsertArgs>(args: SelectSubset<T, UserDeviceUpsertArgs<ExtArgs>>): Prisma__UserDeviceClient<$Result.GetResult<Prisma.$UserDevicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    count<T extends UserDeviceCountArgs>(
      args?: Subset<T, UserDeviceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserDeviceCountAggregateOutputType>
        : number
    >

    aggregate<T extends UserDeviceAggregateArgs>(args: Subset<T, UserDeviceAggregateArgs>): Prisma.PrismaPromise<GetUserDeviceAggregateType<T>>

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
  readonly fields: UserDeviceFieldRefs;
  }

  export interface Prisma__UserDeviceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  interface UserDeviceFieldRefs {
    readonly id: FieldRef<"UserDevice", 'String'>
    readonly deviceId: FieldRef<"UserDevice", 'String'>
    readonly nameDevice: FieldRef<"UserDevice", 'String'>
    readonly createdAt: FieldRef<"UserDevice", 'DateTime'>
    readonly updatedAt: FieldRef<"UserDevice", 'DateTime'>
    readonly userId: FieldRef<"UserDevice", 'String'>
  }
    

  
  export type UserDeviceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserDeviceSelect<ExtArgs> | null
    omit?: UserDeviceOmit<ExtArgs> | null
    include?: UserDeviceInclude<ExtArgs> | null
    where: UserDeviceWhereUniqueInput
  }

  export type UserDeviceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserDeviceSelect<ExtArgs> | null
    omit?: UserDeviceOmit<ExtArgs> | null
    include?: UserDeviceInclude<ExtArgs> | null
    where: UserDeviceWhereUniqueInput
  }

  export type UserDeviceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserDeviceSelect<ExtArgs> | null
    omit?: UserDeviceOmit<ExtArgs> | null
    include?: UserDeviceInclude<ExtArgs> | null
    where?: UserDeviceWhereInput
    orderBy?: UserDeviceOrderByWithRelationInput | UserDeviceOrderByWithRelationInput[]
    cursor?: UserDeviceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserDeviceScalarFieldEnum | UserDeviceScalarFieldEnum[]
  }

  export type UserDeviceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserDeviceSelect<ExtArgs> | null
    omit?: UserDeviceOmit<ExtArgs> | null
    include?: UserDeviceInclude<ExtArgs> | null
    where?: UserDeviceWhereInput
    orderBy?: UserDeviceOrderByWithRelationInput | UserDeviceOrderByWithRelationInput[]
    cursor?: UserDeviceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserDeviceScalarFieldEnum | UserDeviceScalarFieldEnum[]
  }

  export type UserDeviceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserDeviceSelect<ExtArgs> | null
    omit?: UserDeviceOmit<ExtArgs> | null
    include?: UserDeviceInclude<ExtArgs> | null
    where?: UserDeviceWhereInput
    orderBy?: UserDeviceOrderByWithRelationInput | UserDeviceOrderByWithRelationInput[]
    cursor?: UserDeviceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserDeviceScalarFieldEnum | UserDeviceScalarFieldEnum[]
  }

  export type UserDeviceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserDeviceSelect<ExtArgs> | null
    omit?: UserDeviceOmit<ExtArgs> | null
    include?: UserDeviceInclude<ExtArgs> | null
    data: XOR<UserDeviceCreateInput, UserDeviceUncheckedCreateInput>
  }

  export type UserDeviceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    data: UserDeviceCreateManyInput | UserDeviceCreateManyInput[]
    skipDuplicates?: boolean
  }

  export type UserDeviceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserDeviceSelectCreateManyAndReturn<ExtArgs> | null
    omit?: UserDeviceOmit<ExtArgs> | null
    data: UserDeviceCreateManyInput | UserDeviceCreateManyInput[]
    skipDuplicates?: boolean
    include?: UserDeviceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  export type UserDeviceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserDeviceSelect<ExtArgs> | null
    omit?: UserDeviceOmit<ExtArgs> | null
    include?: UserDeviceInclude<ExtArgs> | null
    data: XOR<UserDeviceUpdateInput, UserDeviceUncheckedUpdateInput>
    where: UserDeviceWhereUniqueInput
  }

  export type UserDeviceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    data: XOR<UserDeviceUpdateManyMutationInput, UserDeviceUncheckedUpdateManyInput>
    where?: UserDeviceWhereInput
    limit?: number
  }

  export type UserDeviceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserDeviceSelectUpdateManyAndReturn<ExtArgs> | null
    omit?: UserDeviceOmit<ExtArgs> | null
    data: XOR<UserDeviceUpdateManyMutationInput, UserDeviceUncheckedUpdateManyInput>
    where?: UserDeviceWhereInput
    limit?: number
    include?: UserDeviceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  export type UserDeviceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserDeviceSelect<ExtArgs> | null
    omit?: UserDeviceOmit<ExtArgs> | null
    include?: UserDeviceInclude<ExtArgs> | null
    where: UserDeviceWhereUniqueInput
    create: XOR<UserDeviceCreateInput, UserDeviceUncheckedCreateInput>
    update: XOR<UserDeviceUpdateInput, UserDeviceUncheckedUpdateInput>
  }

  export type UserDeviceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserDeviceSelect<ExtArgs> | null
    omit?: UserDeviceOmit<ExtArgs> | null
    include?: UserDeviceInclude<ExtArgs> | null
    where: UserDeviceWhereUniqueInput
  }

  export type UserDeviceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserDeviceWhereInput
    limit?: number
  }

  export type UserDeviceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserDeviceSelect<ExtArgs> | null
    omit?: UserDeviceOmit<ExtArgs> | null
    include?: UserDeviceInclude<ExtArgs> | null
  }


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
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    _count?: true | SessionCountAggregateInputType
    _min?: SessionMinAggregateInputType
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
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

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
  readonly fields: SessionFieldRefs;
  }

  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




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
    

  
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: SessionSelect<ExtArgs> | null
    omit?: SessionOmit<ExtArgs> | null
    include?: SessionInclude<ExtArgs> | null
    where: SessionWhereUniqueInput
  }

  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: SessionSelect<ExtArgs> | null
    omit?: SessionOmit<ExtArgs> | null
    include?: SessionInclude<ExtArgs> | null
    where: SessionWhereUniqueInput
  }

  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: SessionSelect<ExtArgs> | null
    omit?: SessionOmit<ExtArgs> | null
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: SessionSelect<ExtArgs> | null
    omit?: SessionOmit<ExtArgs> | null
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: SessionSelect<ExtArgs> | null
    omit?: SessionOmit<ExtArgs> | null
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: SessionSelect<ExtArgs> | null
    omit?: SessionOmit<ExtArgs> | null
    include?: SessionInclude<ExtArgs> | null
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    omit?: SessionOmit<ExtArgs> | null
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: SessionSelect<ExtArgs> | null
    omit?: SessionOmit<ExtArgs> | null
    include?: SessionInclude<ExtArgs> | null
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    where: SessionWhereUniqueInput
  }

  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    where?: SessionWhereInput
    limit?: number
  }

  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    omit?: SessionOmit<ExtArgs> | null
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    where?: SessionWhereInput
    limit?: number
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: SessionSelect<ExtArgs> | null
    omit?: SessionOmit<ExtArgs> | null
    include?: SessionInclude<ExtArgs> | null
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: SessionSelect<ExtArgs> | null
    omit?: SessionOmit<ExtArgs> | null
    include?: SessionInclude<ExtArgs> | null
    where: SessionWhereUniqueInput
  }

  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    limit?: number
  }

  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: SessionSelect<ExtArgs> | null
    omit?: SessionOmit<ExtArgs> | null
    include?: SessionInclude<ExtArgs> | null
  }


  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageMinAggregateOutputType = {
    id: string | null
    content: string | null
    typeMessage: $Enums.TypeMessage | null
    senderId: string | null
    receiverId: string | null
    roomId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MessageMaxAggregateOutputType = {
    id: string | null
    content: string | null
    typeMessage: $Enums.TypeMessage | null
    senderId: string | null
    receiverId: string | null
    roomId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    content: number
    typeMessage: number
    senderId: number
    receiverId: number
    roomId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MessageMinAggregateInputType = {
    id?: true
    content?: true
    typeMessage?: true
    senderId?: true
    receiverId?: true
    roomId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    content?: true
    typeMessage?: true
    senderId?: true
    receiverId?: true
    roomId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    content?: true
    typeMessage?: true
    senderId?: true
    receiverId?: true
    roomId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    _count?: true | MessageCountAggregateInputType
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: string
    content: string
    typeMessage: $Enums.TypeMessage
    senderId: string
    receiverId: string | null
    roomId: string
    createdAt: Date
    updatedAt: Date
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    typeMessage?: boolean
    senderId?: boolean
    receiverId?: boolean
    roomId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | Message$receiverArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    typeMessage?: boolean
    senderId?: boolean
    receiverId?: boolean
    roomId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | Message$receiverArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    typeMessage?: boolean
    senderId?: boolean
    receiverId?: boolean
    roomId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | Message$receiverArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    content?: boolean
    typeMessage?: boolean
    senderId?: boolean
    receiverId?: boolean
    roomId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "content" | "typeMessage" | "senderId" | "receiverId" | "roomId" | "createdAt" | "updatedAt", ExtArgs["result"]["message"]>
  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | Message$receiverArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }
  export type MessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | Message$receiverArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }
  export type MessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | Message$receiverArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      sender: Prisma.$UserPayload<ExtArgs>
      receiver: Prisma.$UserPayload<ExtArgs> | null
      room: Prisma.$RoomPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      content: string
      typeMessage: $Enums.TypeMessage
      senderId: string
      receiverId: string | null
      roomId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    updateManyAndReturn<T extends MessageUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  readonly fields: MessageFieldRefs;
  }

  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sender<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    receiver<T extends Message$receiverArgs<ExtArgs> = {}>(args?: Subset<T, Message$receiverArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    room<T extends RoomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoomDefaultArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'String'>
    readonly content: FieldRef<"Message", 'String'>
    readonly typeMessage: FieldRef<"Message", 'TypeMessage'>
    readonly senderId: FieldRef<"Message", 'String'>
    readonly receiverId: FieldRef<"Message", 'String'>
    readonly roomId: FieldRef<"Message", 'String'>
    readonly createdAt: FieldRef<"Message", 'DateTime'>
    readonly updatedAt: FieldRef<"Message", 'DateTime'>
  }
    

  
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: MessageSelect<ExtArgs> | null
    omit?: MessageOmit<ExtArgs> | null
    include?: MessageInclude<ExtArgs> | null
    where: MessageWhereUniqueInput
  }

  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: MessageSelect<ExtArgs> | null
    omit?: MessageOmit<ExtArgs> | null
    include?: MessageInclude<ExtArgs> | null
    where: MessageWhereUniqueInput
  }

  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: MessageSelect<ExtArgs> | null
    omit?: MessageOmit<ExtArgs> | null
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: MessageSelect<ExtArgs> | null
    omit?: MessageOmit<ExtArgs> | null
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: MessageSelect<ExtArgs> | null
    omit?: MessageOmit<ExtArgs> | null
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: MessageSelect<ExtArgs> | null
    omit?: MessageOmit<ExtArgs> | null
    include?: MessageInclude<ExtArgs> | null
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  export type MessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null
    omit?: MessageOmit<ExtArgs> | null
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
    include?: MessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: MessageSelect<ExtArgs> | null
    omit?: MessageOmit<ExtArgs> | null
    include?: MessageInclude<ExtArgs> | null
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    where: MessageWhereUniqueInput
  }

  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    where?: MessageWhereInput
    limit?: number
  }

  export type MessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: MessageSelectUpdateManyAndReturn<ExtArgs> | null
    omit?: MessageOmit<ExtArgs> | null
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    where?: MessageWhereInput
    limit?: number
    include?: MessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: MessageSelect<ExtArgs> | null
    omit?: MessageOmit<ExtArgs> | null
    include?: MessageInclude<ExtArgs> | null
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: MessageSelect<ExtArgs> | null
    omit?: MessageOmit<ExtArgs> | null
    include?: MessageInclude<ExtArgs> | null
    where: MessageWhereUniqueInput
  }

  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    limit?: number
  }

  export type Message$receiverArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserSelect<ExtArgs> | null
    omit?: UserOmit<ExtArgs> | null
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: MessageSelect<ExtArgs> | null
    omit?: MessageOmit<ExtArgs> | null
    include?: MessageInclude<ExtArgs> | null
  }


  export type AggregatePost = {
    _count: PostCountAggregateOutputType | null
    _avg: PostAvgAggregateOutputType | null
    _sum: PostSumAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  export type PostAvgAggregateOutputType = {
    viewCount: number | null
    likeCount: number | null
  }

  export type PostSumAggregateOutputType = {
    viewCount: number | null
    likeCount: number | null
  }

  export type PostMinAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    viewCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
    userId: string | null
    likeCount: number | null
  }

  export type PostMaxAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    viewCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
    userId: string | null
    likeCount: number | null
  }

  export type PostCountAggregateOutputType = {
    id: number
    title: number
    content: number
    file: number
    viewCount: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    userId: number
    likeCount: number
    _all: number
  }


  export type PostAvgAggregateInputType = {
    viewCount?: true
    likeCount?: true
  }

  export type PostSumAggregateInputType = {
    viewCount?: true
    likeCount?: true
  }

  export type PostMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    viewCount?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    userId?: true
    likeCount?: true
  }

  export type PostMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    viewCount?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    userId?: true
    likeCount?: true
  }

  export type PostCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    file?: true
    viewCount?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    userId?: true
    likeCount?: true
    _all?: true
  }

  export type PostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    cursor?: PostWhereUniqueInput
    take?: number
    skip?: number
    _count?: true | PostCountAggregateInputType
    _avg?: PostAvgAggregateInputType
    _sum?: PostSumAggregateInputType
    _min?: PostMinAggregateInputType
    _max?: PostMaxAggregateInputType
  }

  export type GetPostAggregateType<T extends PostAggregateArgs> = {
        [P in keyof T & keyof AggregatePost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePost[P]>
      : GetScalarType<T[P], AggregatePost[P]>
  }




  export type PostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
    orderBy?: PostOrderByWithAggregationInput | PostOrderByWithAggregationInput[]
    by: PostScalarFieldEnum[] | PostScalarFieldEnum
    having?: PostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostCountAggregateInputType | true
    _avg?: PostAvgAggregateInputType
    _sum?: PostSumAggregateInputType
    _min?: PostMinAggregateInputType
    _max?: PostMaxAggregateInputType
  }

  export type PostGroupByOutputType = {
    id: string
    title: string
    content: string
    file: string[]
    viewCount: number
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    userId: string
    likeCount: number
    _count: PostCountAggregateOutputType | null
    _avg: PostAvgAggregateOutputType | null
    _sum: PostSumAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  type GetPostGroupByPayload<T extends PostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostGroupByOutputType[P]>
            : GetScalarType<T[P], PostGroupByOutputType[P]>
        }
      >
    >


  export type PostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    file?: boolean
    viewCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    userId?: boolean
    likeCount?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    comments?: boolean | Post$commentsArgs<ExtArgs>
    likes?: boolean | Post$likesArgs<ExtArgs>
    _count?: boolean | PostCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>

  export type PostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    file?: boolean
    viewCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    userId?: boolean
    likeCount?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>

  export type PostSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    file?: boolean
    viewCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    userId?: boolean
    likeCount?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>

  export type PostSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    file?: boolean
    viewCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    userId?: boolean
    likeCount?: boolean
  }

  export type PostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "file" | "viewCount" | "createdAt" | "updatedAt" | "deletedAt" | "userId" | "likeCount", ExtArgs["result"]["post"]>
  export type PostInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    comments?: boolean | Post$commentsArgs<ExtArgs>
    likes?: boolean | Post$likesArgs<ExtArgs>
    _count?: boolean | PostCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PostIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PostIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Post"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      comments: Prisma.$CommentPayload<ExtArgs>[]
      likes: Prisma.$likePostPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      content: string
      file: string[]
      viewCount: number
      createdAt: Date
      updatedAt: Date
      deletedAt: Date
      userId: string
      likeCount: number
    }, ExtArgs["result"]["post"]>
    composites: {}
  }

  type PostGetPayload<S extends boolean | null | undefined | PostDefaultArgs> = $Result.GetResult<Prisma.$PostPayload, S>

  type PostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostCountAggregateInputType | true
    }

  export interface PostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Post'], meta: { name: 'Post' } }
    findUnique<T extends PostFindUniqueArgs>(args: SelectSubset<T, PostFindUniqueArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findUniqueOrThrow<T extends PostFindUniqueOrThrowArgs>(args: SelectSubset<T, PostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findFirst<T extends PostFindFirstArgs>(args?: SelectSubset<T, PostFindFirstArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findFirstOrThrow<T extends PostFindFirstOrThrowArgs>(args?: SelectSubset<T, PostFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findMany<T extends PostFindManyArgs>(args?: SelectSubset<T, PostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    create<T extends PostCreateArgs>(args: SelectSubset<T, PostCreateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    createMany<T extends PostCreateManyArgs>(args?: SelectSubset<T, PostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    createManyAndReturn<T extends PostCreateManyAndReturnArgs>(args?: SelectSubset<T, PostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    delete<T extends PostDeleteArgs>(args: SelectSubset<T, PostDeleteArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    update<T extends PostUpdateArgs>(args: SelectSubset<T, PostUpdateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    deleteMany<T extends PostDeleteManyArgs>(args?: SelectSubset<T, PostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    updateMany<T extends PostUpdateManyArgs>(args: SelectSubset<T, PostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    updateManyAndReturn<T extends PostUpdateManyAndReturnArgs>(args: SelectSubset<T, PostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    upsert<T extends PostUpsertArgs>(args: SelectSubset<T, PostUpsertArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    count<T extends PostCountArgs>(
      args?: Subset<T, PostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostCountAggregateOutputType>
        : number
    >

    aggregate<T extends PostAggregateArgs>(args: Subset<T, PostAggregateArgs>): Prisma.PrismaPromise<GetPostAggregateType<T>>

    groupBy<
      T extends PostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostGroupByArgs['orderBy'] }
        : { orderBy?: PostGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  readonly fields: PostFieldRefs;
  }

  export interface Prisma__PostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    comments<T extends Post$commentsArgs<ExtArgs> = {}>(args?: Subset<T, Post$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    likes<T extends Post$likesArgs<ExtArgs> = {}>(args?: Subset<T, Post$likesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$likePostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  interface PostFieldRefs {
    readonly id: FieldRef<"Post", 'String'>
    readonly title: FieldRef<"Post", 'String'>
    readonly content: FieldRef<"Post", 'String'>
    readonly file: FieldRef<"Post", 'String[]'>
    readonly viewCount: FieldRef<"Post", 'Int'>
    readonly createdAt: FieldRef<"Post", 'DateTime'>
    readonly updatedAt: FieldRef<"Post", 'DateTime'>
    readonly deletedAt: FieldRef<"Post", 'DateTime'>
    readonly userId: FieldRef<"Post", 'String'>
    readonly likeCount: FieldRef<"Post", 'Int'>
  }
    

  
  export type PostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: PostSelect<ExtArgs> | null
    omit?: PostOmit<ExtArgs> | null
    include?: PostInclude<ExtArgs> | null
    where: PostWhereUniqueInput
  }

  export type PostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: PostSelect<ExtArgs> | null
    omit?: PostOmit<ExtArgs> | null
    include?: PostInclude<ExtArgs> | null
    where: PostWhereUniqueInput
  }

  export type PostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: PostSelect<ExtArgs> | null
    omit?: PostOmit<ExtArgs> | null
    include?: PostInclude<ExtArgs> | null
    where?: PostWhereInput
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    cursor?: PostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  export type PostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: PostSelect<ExtArgs> | null
    omit?: PostOmit<ExtArgs> | null
    include?: PostInclude<ExtArgs> | null
    where?: PostWhereInput
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    cursor?: PostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  export type PostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: PostSelect<ExtArgs> | null
    omit?: PostOmit<ExtArgs> | null
    include?: PostInclude<ExtArgs> | null
    where?: PostWhereInput
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    cursor?: PostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  export type PostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: PostSelect<ExtArgs> | null
    omit?: PostOmit<ExtArgs> | null
    include?: PostInclude<ExtArgs> | null
    data: XOR<PostCreateInput, PostUncheckedCreateInput>
  }

  export type PostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    data: PostCreateManyInput | PostCreateManyInput[]
    skipDuplicates?: boolean
  }

  export type PostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: PostSelectCreateManyAndReturn<ExtArgs> | null
    omit?: PostOmit<ExtArgs> | null
    data: PostCreateManyInput | PostCreateManyInput[]
    skipDuplicates?: boolean
    include?: PostIncludeCreateManyAndReturn<ExtArgs> | null
  }

  export type PostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: PostSelect<ExtArgs> | null
    omit?: PostOmit<ExtArgs> | null
    include?: PostInclude<ExtArgs> | null
    data: XOR<PostUpdateInput, PostUncheckedUpdateInput>
    where: PostWhereUniqueInput
  }

  export type PostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    where?: PostWhereInput
    limit?: number
  }

  export type PostUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: PostSelectUpdateManyAndReturn<ExtArgs> | null
    omit?: PostOmit<ExtArgs> | null
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    where?: PostWhereInput
    limit?: number
    include?: PostIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  export type PostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: PostSelect<ExtArgs> | null
    omit?: PostOmit<ExtArgs> | null
    include?: PostInclude<ExtArgs> | null
    where: PostWhereUniqueInput
    create: XOR<PostCreateInput, PostUncheckedCreateInput>
    update: XOR<PostUpdateInput, PostUncheckedUpdateInput>
  }

  export type PostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: PostSelect<ExtArgs> | null
    omit?: PostOmit<ExtArgs> | null
    include?: PostInclude<ExtArgs> | null
    where: PostWhereUniqueInput
  }

  export type PostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
    limit?: number
  }

  export type Post$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: CommentSelect<ExtArgs> | null
    omit?: CommentOmit<ExtArgs> | null
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  export type Post$likesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: likePostSelect<ExtArgs> | null
    omit?: likePostOmit<ExtArgs> | null
    include?: likePostInclude<ExtArgs> | null
    where?: likePostWhereInput
    orderBy?: likePostOrderByWithRelationInput | likePostOrderByWithRelationInput[]
    cursor?: likePostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LikePostScalarFieldEnum | LikePostScalarFieldEnum[]
  }

  export type PostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: PostSelect<ExtArgs> | null
    omit?: PostOmit<ExtArgs> | null
    include?: PostInclude<ExtArgs> | null
  }


  export type AggregateLikePost = {
    _count: LikePostCountAggregateOutputType | null
    _min: LikePostMinAggregateOutputType | null
    _max: LikePostMaxAggregateOutputType | null
  }

  export type LikePostMinAggregateOutputType = {
    id: string | null
    isLike: boolean | null
    userId: string | null
    postId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type LikePostMaxAggregateOutputType = {
    id: string | null
    isLike: boolean | null
    userId: string | null
    postId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type LikePostCountAggregateOutputType = {
    id: number
    isLike: number
    userId: number
    postId: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type LikePostMinAggregateInputType = {
    id?: true
    isLike?: true
    userId?: true
    postId?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type LikePostMaxAggregateInputType = {
    id?: true
    isLike?: true
    userId?: true
    postId?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type LikePostCountAggregateInputType = {
    id?: true
    isLike?: true
    userId?: true
    postId?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type LikePostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: likePostWhereInput
    orderBy?: likePostOrderByWithRelationInput | likePostOrderByWithRelationInput[]
    cursor?: likePostWhereUniqueInput
    take?: number
    skip?: number
    _count?: true | LikePostCountAggregateInputType
    _min?: LikePostMinAggregateInputType
    _max?: LikePostMaxAggregateInputType
  }

  export type GetLikePostAggregateType<T extends LikePostAggregateArgs> = {
        [P in keyof T & keyof AggregateLikePost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLikePost[P]>
      : GetScalarType<T[P], AggregateLikePost[P]>
  }




  export type likePostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: likePostWhereInput
    orderBy?: likePostOrderByWithAggregationInput | likePostOrderByWithAggregationInput[]
    by: LikePostScalarFieldEnum[] | LikePostScalarFieldEnum
    having?: likePostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LikePostCountAggregateInputType | true
    _min?: LikePostMinAggregateInputType
    _max?: LikePostMaxAggregateInputType
  }

  export type LikePostGroupByOutputType = {
    id: string
    isLike: boolean
    userId: string
    postId: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    _count: LikePostCountAggregateOutputType | null
    _min: LikePostMinAggregateOutputType | null
    _max: LikePostMaxAggregateOutputType | null
  }

  type GetLikePostGroupByPayload<T extends likePostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LikePostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LikePostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LikePostGroupByOutputType[P]>
            : GetScalarType<T[P], LikePostGroupByOutputType[P]>
        }
      >
    >


  export type likePostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    isLike?: boolean
    userId?: boolean
    postId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    post?: boolean | PostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["likePost"]>

  export type likePostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    isLike?: boolean
    userId?: boolean
    postId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    post?: boolean | PostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["likePost"]>

  export type likePostSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    isLike?: boolean
    userId?: boolean
    postId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    post?: boolean | PostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["likePost"]>

  export type likePostSelectScalar = {
    id?: boolean
    isLike?: boolean
    userId?: boolean
    postId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type likePostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "isLike" | "userId" | "postId" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["likePost"]>
  export type likePostInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    post?: boolean | PostDefaultArgs<ExtArgs>
  }
  export type likePostIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    post?: boolean | PostDefaultArgs<ExtArgs>
  }
  export type likePostIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    post?: boolean | PostDefaultArgs<ExtArgs>
  }

  export type $likePostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "likePost"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      post: Prisma.$PostPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      isLike: boolean
      userId: string
      postId: string
      createdAt: Date
      updatedAt: Date
      deletedAt: Date
    }, ExtArgs["result"]["likePost"]>
    composites: {}
  }

  type likePostGetPayload<S extends boolean | null | undefined | likePostDefaultArgs> = $Result.GetResult<Prisma.$likePostPayload, S>

  type likePostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<likePostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LikePostCountAggregateInputType | true
    }

  export interface likePostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['likePost'], meta: { name: 'likePost' } }
    findUnique<T extends likePostFindUniqueArgs>(args: SelectSubset<T, likePostFindUniqueArgs<ExtArgs>>): Prisma__likePostClient<$Result.GetResult<Prisma.$likePostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findUniqueOrThrow<T extends likePostFindUniqueOrThrowArgs>(args: SelectSubset<T, likePostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__likePostClient<$Result.GetResult<Prisma.$likePostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findFirst<T extends likePostFindFirstArgs>(args?: SelectSubset<T, likePostFindFirstArgs<ExtArgs>>): Prisma__likePostClient<$Result.GetResult<Prisma.$likePostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findFirstOrThrow<T extends likePostFindFirstOrThrowArgs>(args?: SelectSubset<T, likePostFindFirstOrThrowArgs<ExtArgs>>): Prisma__likePostClient<$Result.GetResult<Prisma.$likePostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findMany<T extends likePostFindManyArgs>(args?: SelectSubset<T, likePostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$likePostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    create<T extends likePostCreateArgs>(args: SelectSubset<T, likePostCreateArgs<ExtArgs>>): Prisma__likePostClient<$Result.GetResult<Prisma.$likePostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    createMany<T extends likePostCreateManyArgs>(args?: SelectSubset<T, likePostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    createManyAndReturn<T extends likePostCreateManyAndReturnArgs>(args?: SelectSubset<T, likePostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$likePostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    delete<T extends likePostDeleteArgs>(args: SelectSubset<T, likePostDeleteArgs<ExtArgs>>): Prisma__likePostClient<$Result.GetResult<Prisma.$likePostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    update<T extends likePostUpdateArgs>(args: SelectSubset<T, likePostUpdateArgs<ExtArgs>>): Prisma__likePostClient<$Result.GetResult<Prisma.$likePostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    deleteMany<T extends likePostDeleteManyArgs>(args?: SelectSubset<T, likePostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    updateMany<T extends likePostUpdateManyArgs>(args: SelectSubset<T, likePostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    updateManyAndReturn<T extends likePostUpdateManyAndReturnArgs>(args: SelectSubset<T, likePostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$likePostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    upsert<T extends likePostUpsertArgs>(args: SelectSubset<T, likePostUpsertArgs<ExtArgs>>): Prisma__likePostClient<$Result.GetResult<Prisma.$likePostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    count<T extends likePostCountArgs>(
      args?: Subset<T, likePostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LikePostCountAggregateOutputType>
        : number
    >

    aggregate<T extends LikePostAggregateArgs>(args: Subset<T, LikePostAggregateArgs>): Prisma.PrismaPromise<GetLikePostAggregateType<T>>

    groupBy<
      T extends likePostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: likePostGroupByArgs['orderBy'] }
        : { orderBy?: likePostGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, likePostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLikePostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  readonly fields: likePostFieldRefs;
  }

  export interface Prisma__likePostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    post<T extends PostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PostDefaultArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  interface likePostFieldRefs {
    readonly id: FieldRef<"likePost", 'String'>
    readonly isLike: FieldRef<"likePost", 'Boolean'>
    readonly userId: FieldRef<"likePost", 'String'>
    readonly postId: FieldRef<"likePost", 'String'>
    readonly createdAt: FieldRef<"likePost", 'DateTime'>
    readonly updatedAt: FieldRef<"likePost", 'DateTime'>
    readonly deletedAt: FieldRef<"likePost", 'DateTime'>
  }
    

  
  export type likePostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: likePostSelect<ExtArgs> | null
    omit?: likePostOmit<ExtArgs> | null
    include?: likePostInclude<ExtArgs> | null
    where: likePostWhereUniqueInput
  }

  export type likePostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: likePostSelect<ExtArgs> | null
    omit?: likePostOmit<ExtArgs> | null
    include?: likePostInclude<ExtArgs> | null
    where: likePostWhereUniqueInput
  }

  export type likePostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: likePostSelect<ExtArgs> | null
    omit?: likePostOmit<ExtArgs> | null
    include?: likePostInclude<ExtArgs> | null
    where?: likePostWhereInput
    orderBy?: likePostOrderByWithRelationInput | likePostOrderByWithRelationInput[]
    cursor?: likePostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LikePostScalarFieldEnum | LikePostScalarFieldEnum[]
  }

  export type likePostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: likePostSelect<ExtArgs> | null
    omit?: likePostOmit<ExtArgs> | null
    include?: likePostInclude<ExtArgs> | null
    where?: likePostWhereInput
    orderBy?: likePostOrderByWithRelationInput | likePostOrderByWithRelationInput[]
    cursor?: likePostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LikePostScalarFieldEnum | LikePostScalarFieldEnum[]
  }

  export type likePostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: likePostSelect<ExtArgs> | null
    omit?: likePostOmit<ExtArgs> | null
    include?: likePostInclude<ExtArgs> | null
    where?: likePostWhereInput
    orderBy?: likePostOrderByWithRelationInput | likePostOrderByWithRelationInput[]
    cursor?: likePostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LikePostScalarFieldEnum | LikePostScalarFieldEnum[]
  }

  export type likePostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: likePostSelect<ExtArgs> | null
    omit?: likePostOmit<ExtArgs> | null
    include?: likePostInclude<ExtArgs> | null
    data: XOR<likePostCreateInput, likePostUncheckedCreateInput>
  }

  export type likePostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    data: likePostCreateManyInput | likePostCreateManyInput[]
    skipDuplicates?: boolean
  }

  export type likePostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: likePostSelectCreateManyAndReturn<ExtArgs> | null
    omit?: likePostOmit<ExtArgs> | null
    data: likePostCreateManyInput | likePostCreateManyInput[]
    skipDuplicates?: boolean
    include?: likePostIncludeCreateManyAndReturn<ExtArgs> | null
  }

  export type likePostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: likePostSelect<ExtArgs> | null
    omit?: likePostOmit<ExtArgs> | null
    include?: likePostInclude<ExtArgs> | null
    data: XOR<likePostUpdateInput, likePostUncheckedUpdateInput>
    where: likePostWhereUniqueInput
  }

  export type likePostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    data: XOR<likePostUpdateManyMutationInput, likePostUncheckedUpdateManyInput>
    where?: likePostWhereInput
    limit?: number
  }

  export type likePostUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: likePostSelectUpdateManyAndReturn<ExtArgs> | null
    omit?: likePostOmit<ExtArgs> | null
    data: XOR<likePostUpdateManyMutationInput, likePostUncheckedUpdateManyInput>
    where?: likePostWhereInput
    limit?: number
    include?: likePostIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  export type likePostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: likePostSelect<ExtArgs> | null
    omit?: likePostOmit<ExtArgs> | null
    include?: likePostInclude<ExtArgs> | null
    where: likePostWhereUniqueInput
    create: XOR<likePostCreateInput, likePostUncheckedCreateInput>
    update: XOR<likePostUpdateInput, likePostUncheckedUpdateInput>
  }

  export type likePostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: likePostSelect<ExtArgs> | null
    omit?: likePostOmit<ExtArgs> | null
    include?: likePostInclude<ExtArgs> | null
    where: likePostWhereUniqueInput
  }

  export type likePostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: likePostWhereInput
    limit?: number
  }

  export type likePostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: likePostSelect<ExtArgs> | null
    omit?: likePostOmit<ExtArgs> | null
    include?: likePostInclude<ExtArgs> | null
  }


  export type AggregateComment = {
    _count: CommentCountAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  export type CommentMinAggregateOutputType = {
    id: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    postId: string | null
  }

  export type CommentMaxAggregateOutputType = {
    id: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    postId: string | null
  }

  export type CommentCountAggregateOutputType = {
    id: number
    content: number
    createdAt: number
    updatedAt: number
    userId: number
    postId: number
    _all: number
  }


  export type CommentMinAggregateInputType = {
    id?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    postId?: true
  }

  export type CommentMaxAggregateInputType = {
    id?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    postId?: true
  }

  export type CommentCountAggregateInputType = {
    id?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    postId?: true
    _all?: true
  }

  export type CommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    _count?: true | CommentCountAggregateInputType
    _min?: CommentMinAggregateInputType
    _max?: CommentMaxAggregateInputType
  }

  export type GetCommentAggregateType<T extends CommentAggregateArgs> = {
        [P in keyof T & keyof AggregateComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComment[P]>
      : GetScalarType<T[P], AggregateComment[P]>
  }




  export type CommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithAggregationInput | CommentOrderByWithAggregationInput[]
    by: CommentScalarFieldEnum[] | CommentScalarFieldEnum
    having?: CommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommentCountAggregateInputType | true
    _min?: CommentMinAggregateInputType
    _max?: CommentMaxAggregateInputType
  }

  export type CommentGroupByOutputType = {
    id: string
    content: string
    createdAt: Date
    updatedAt: Date
    userId: string
    postId: string
    _count: CommentCountAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  type GetCommentGroupByPayload<T extends CommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommentGroupByOutputType[P]>
            : GetScalarType<T[P], CommentGroupByOutputType[P]>
        }
      >
    >


  export type CommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    postId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    post?: boolean | PostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    postId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    post?: boolean | PostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    postId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    post?: boolean | PostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectScalar = {
    id?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    postId?: boolean
  }

  export type CommentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "content" | "createdAt" | "updatedAt" | "userId" | "postId", ExtArgs["result"]["comment"]>
  export type CommentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    post?: boolean | PostDefaultArgs<ExtArgs>
  }
  export type CommentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    post?: boolean | PostDefaultArgs<ExtArgs>
  }
  export type CommentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    post?: boolean | PostDefaultArgs<ExtArgs>
  }

  export type $CommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Comment"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      post: Prisma.$PostPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      content: string
      createdAt: Date
      updatedAt: Date
      userId: string
      postId: string
    }, ExtArgs["result"]["comment"]>
    composites: {}
  }

  type CommentGetPayload<S extends boolean | null | undefined | CommentDefaultArgs> = $Result.GetResult<Prisma.$CommentPayload, S>

  type CommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CommentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommentCountAggregateInputType | true
    }

  export interface CommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Comment'], meta: { name: 'Comment' } }
    findUnique<T extends CommentFindUniqueArgs>(args: SelectSubset<T, CommentFindUniqueArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findUniqueOrThrow<T extends CommentFindUniqueOrThrowArgs>(args: SelectSubset<T, CommentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findFirst<T extends CommentFindFirstArgs>(args?: SelectSubset<T, CommentFindFirstArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findFirstOrThrow<T extends CommentFindFirstOrThrowArgs>(args?: SelectSubset<T, CommentFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findMany<T extends CommentFindManyArgs>(args?: SelectSubset<T, CommentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    create<T extends CommentCreateArgs>(args: SelectSubset<T, CommentCreateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    createMany<T extends CommentCreateManyArgs>(args?: SelectSubset<T, CommentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    createManyAndReturn<T extends CommentCreateManyAndReturnArgs>(args?: SelectSubset<T, CommentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    delete<T extends CommentDeleteArgs>(args: SelectSubset<T, CommentDeleteArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    update<T extends CommentUpdateArgs>(args: SelectSubset<T, CommentUpdateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    deleteMany<T extends CommentDeleteManyArgs>(args?: SelectSubset<T, CommentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    updateMany<T extends CommentUpdateManyArgs>(args: SelectSubset<T, CommentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    updateManyAndReturn<T extends CommentUpdateManyAndReturnArgs>(args: SelectSubset<T, CommentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    upsert<T extends CommentUpsertArgs>(args: SelectSubset<T, CommentUpsertArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    count<T extends CommentCountArgs>(
      args?: Subset<T, CommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommentCountAggregateOutputType>
        : number
    >

    aggregate<T extends CommentAggregateArgs>(args: Subset<T, CommentAggregateArgs>): Prisma.PrismaPromise<GetCommentAggregateType<T>>

    groupBy<
      T extends CommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommentGroupByArgs['orderBy'] }
        : { orderBy?: CommentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  readonly fields: CommentFieldRefs;
  }

  export interface Prisma__CommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    post<T extends PostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PostDefaultArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  interface CommentFieldRefs {
    readonly id: FieldRef<"Comment", 'String'>
    readonly content: FieldRef<"Comment", 'String'>
    readonly createdAt: FieldRef<"Comment", 'DateTime'>
    readonly updatedAt: FieldRef<"Comment", 'DateTime'>
    readonly userId: FieldRef<"Comment", 'String'>
    readonly postId: FieldRef<"Comment", 'String'>
  }
    

  
  export type CommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: CommentSelect<ExtArgs> | null
    omit?: CommentOmit<ExtArgs> | null
    include?: CommentInclude<ExtArgs> | null
    where: CommentWhereUniqueInput
  }

  export type CommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: CommentSelect<ExtArgs> | null
    omit?: CommentOmit<ExtArgs> | null
    include?: CommentInclude<ExtArgs> | null
    where: CommentWhereUniqueInput
  }

  export type CommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: CommentSelect<ExtArgs> | null
    omit?: CommentOmit<ExtArgs> | null
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  export type CommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: CommentSelect<ExtArgs> | null
    omit?: CommentOmit<ExtArgs> | null
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  export type CommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: CommentSelect<ExtArgs> | null
    omit?: CommentOmit<ExtArgs> | null
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  export type CommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: CommentSelect<ExtArgs> | null
    omit?: CommentOmit<ExtArgs> | null
    include?: CommentInclude<ExtArgs> | null
    data: XOR<CommentCreateInput, CommentUncheckedCreateInput>
  }

  export type CommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    data: CommentCreateManyInput | CommentCreateManyInput[]
    skipDuplicates?: boolean
  }

  export type CommentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: CommentSelectCreateManyAndReturn<ExtArgs> | null
    omit?: CommentOmit<ExtArgs> | null
    data: CommentCreateManyInput | CommentCreateManyInput[]
    skipDuplicates?: boolean
    include?: CommentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  export type CommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: CommentSelect<ExtArgs> | null
    omit?: CommentOmit<ExtArgs> | null
    include?: CommentInclude<ExtArgs> | null
    data: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
    where: CommentWhereUniqueInput
  }

  export type CommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>
    where?: CommentWhereInput
    limit?: number
  }

  export type CommentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: CommentSelectUpdateManyAndReturn<ExtArgs> | null
    omit?: CommentOmit<ExtArgs> | null
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>
    where?: CommentWhereInput
    limit?: number
    include?: CommentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  export type CommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: CommentSelect<ExtArgs> | null
    omit?: CommentOmit<ExtArgs> | null
    include?: CommentInclude<ExtArgs> | null
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateInput, CommentUncheckedCreateInput>
    update: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
  }

  export type CommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: CommentSelect<ExtArgs> | null
    omit?: CommentOmit<ExtArgs> | null
    include?: CommentInclude<ExtArgs> | null
    where: CommentWhereUniqueInput
  }

  export type CommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
    limit?: number
  }

  export type CommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: CommentSelect<ExtArgs> | null
    omit?: CommentOmit<ExtArgs> | null
    include?: CommentInclude<ExtArgs> | null
  }


  export type AggregateRoom = {
    _count: RoomCountAggregateOutputType | null
    _min: RoomMinAggregateOutputType | null
    _max: RoomMaxAggregateOutputType | null
  }

  export type RoomMinAggregateOutputType = {
    id: string | null
    employeeId: string | null
    customerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomMaxAggregateOutputType = {
    id: string | null
    employeeId: string | null
    customerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomCountAggregateOutputType = {
    id: number
    employeeId: number
    customerId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RoomMinAggregateInputType = {
    id?: true
    employeeId?: true
    customerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomMaxAggregateInputType = {
    id?: true
    employeeId?: true
    customerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomCountAggregateInputType = {
    id?: true
    employeeId?: true
    customerId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RoomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomWhereInput
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    cursor?: RoomWhereUniqueInput
    take?: number
    skip?: number
    _count?: true | RoomCountAggregateInputType
    _min?: RoomMinAggregateInputType
    _max?: RoomMaxAggregateInputType
  }

  export type GetRoomAggregateType<T extends RoomAggregateArgs> = {
        [P in keyof T & keyof AggregateRoom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoom[P]>
      : GetScalarType<T[P], AggregateRoom[P]>
  }




  export type RoomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomWhereInput
    orderBy?: RoomOrderByWithAggregationInput | RoomOrderByWithAggregationInput[]
    by: RoomScalarFieldEnum[] | RoomScalarFieldEnum
    having?: RoomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomCountAggregateInputType | true
    _min?: RoomMinAggregateInputType
    _max?: RoomMaxAggregateInputType
  }

  export type RoomGroupByOutputType = {
    id: string
    employeeId: string | null
    customerId: string
    createdAt: Date
    updatedAt: Date
    _count: RoomCountAggregateOutputType | null
    _min: RoomMinAggregateOutputType | null
    _max: RoomMaxAggregateOutputType | null
  }

  type GetRoomGroupByPayload<T extends RoomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomGroupByOutputType[P]>
            : GetScalarType<T[P], RoomGroupByOutputType[P]>
        }
      >
    >


  export type RoomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    customerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    messages?: boolean | Room$messagesArgs<ExtArgs>
    members?: boolean | Room$membersArgs<ExtArgs>
    _count?: boolean | RoomCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room"]>

  export type RoomSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    customerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["room"]>

  export type RoomSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    customerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["room"]>

  export type RoomSelectScalar = {
    id?: boolean
    employeeId?: boolean
    customerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RoomOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employeeId" | "customerId" | "createdAt" | "updatedAt", ExtArgs["result"]["room"]>
  export type RoomInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | Room$messagesArgs<ExtArgs>
    members?: boolean | Room$membersArgs<ExtArgs>
    _count?: boolean | RoomCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RoomIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RoomIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RoomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Room"
    objects: {
      messages: Prisma.$MessagePayload<ExtArgs>[]
      members: Prisma.$MemberInRoomPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employeeId: string | null
      customerId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["room"]>
    composites: {}
  }

  type RoomGetPayload<S extends boolean | null | undefined | RoomDefaultArgs> = $Result.GetResult<Prisma.$RoomPayload, S>

  type RoomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoomFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoomCountAggregateInputType | true
    }

  export interface RoomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Room'], meta: { name: 'Room' } }
    findUnique<T extends RoomFindUniqueArgs>(args: SelectSubset<T, RoomFindUniqueArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findUniqueOrThrow<T extends RoomFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findFirst<T extends RoomFindFirstArgs>(args?: SelectSubset<T, RoomFindFirstArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findFirstOrThrow<T extends RoomFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findMany<T extends RoomFindManyArgs>(args?: SelectSubset<T, RoomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    create<T extends RoomCreateArgs>(args: SelectSubset<T, RoomCreateArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    createMany<T extends RoomCreateManyArgs>(args?: SelectSubset<T, RoomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    createManyAndReturn<T extends RoomCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    delete<T extends RoomDeleteArgs>(args: SelectSubset<T, RoomDeleteArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    update<T extends RoomUpdateArgs>(args: SelectSubset<T, RoomUpdateArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    deleteMany<T extends RoomDeleteManyArgs>(args?: SelectSubset<T, RoomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    updateMany<T extends RoomUpdateManyArgs>(args: SelectSubset<T, RoomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    updateManyAndReturn<T extends RoomUpdateManyAndReturnArgs>(args: SelectSubset<T, RoomUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    upsert<T extends RoomUpsertArgs>(args: SelectSubset<T, RoomUpsertArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    count<T extends RoomCountArgs>(
      args?: Subset<T, RoomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomCountAggregateOutputType>
        : number
    >

    aggregate<T extends RoomAggregateArgs>(args: Subset<T, RoomAggregateArgs>): Prisma.PrismaPromise<GetRoomAggregateType<T>>

    groupBy<
      T extends RoomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomGroupByArgs['orderBy'] }
        : { orderBy?: RoomGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RoomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  readonly fields: RoomFieldRefs;
  }

  export interface Prisma__RoomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    messages<T extends Room$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Room$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    members<T extends Room$membersArgs<ExtArgs> = {}>(args?: Subset<T, Room$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberInRoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  interface RoomFieldRefs {
    readonly id: FieldRef<"Room", 'String'>
    readonly employeeId: FieldRef<"Room", 'String'>
    readonly customerId: FieldRef<"Room", 'String'>
    readonly createdAt: FieldRef<"Room", 'DateTime'>
    readonly updatedAt: FieldRef<"Room", 'DateTime'>
  }
    

  
  export type RoomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: RoomSelect<ExtArgs> | null
    omit?: RoomOmit<ExtArgs> | null
    include?: RoomInclude<ExtArgs> | null
    where: RoomWhereUniqueInput
  }

  export type RoomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: RoomSelect<ExtArgs> | null
    omit?: RoomOmit<ExtArgs> | null
    include?: RoomInclude<ExtArgs> | null
    where: RoomWhereUniqueInput
  }

  export type RoomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: RoomSelect<ExtArgs> | null
    omit?: RoomOmit<ExtArgs> | null
    include?: RoomInclude<ExtArgs> | null
    where?: RoomWhereInput
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    cursor?: RoomWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  export type RoomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: RoomSelect<ExtArgs> | null
    omit?: RoomOmit<ExtArgs> | null
    include?: RoomInclude<ExtArgs> | null
    where?: RoomWhereInput
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    cursor?: RoomWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  export type RoomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: RoomSelect<ExtArgs> | null
    omit?: RoomOmit<ExtArgs> | null
    include?: RoomInclude<ExtArgs> | null
    where?: RoomWhereInput
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    cursor?: RoomWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  export type RoomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: RoomSelect<ExtArgs> | null
    omit?: RoomOmit<ExtArgs> | null
    include?: RoomInclude<ExtArgs> | null
    data: XOR<RoomCreateInput, RoomUncheckedCreateInput>
  }

  export type RoomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    data: RoomCreateManyInput | RoomCreateManyInput[]
    skipDuplicates?: boolean
  }

  export type RoomCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: RoomSelectCreateManyAndReturn<ExtArgs> | null
    omit?: RoomOmit<ExtArgs> | null
    data: RoomCreateManyInput | RoomCreateManyInput[]
    skipDuplicates?: boolean
  }

  export type RoomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: RoomSelect<ExtArgs> | null
    omit?: RoomOmit<ExtArgs> | null
    include?: RoomInclude<ExtArgs> | null
    data: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>
    where: RoomWhereUniqueInput
  }

  export type RoomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyInput>
    where?: RoomWhereInput
    limit?: number
  }

  export type RoomUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: RoomSelectUpdateManyAndReturn<ExtArgs> | null
    omit?: RoomOmit<ExtArgs> | null
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyInput>
    where?: RoomWhereInput
    limit?: number
  }

  export type RoomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: RoomSelect<ExtArgs> | null
    omit?: RoomOmit<ExtArgs> | null
    include?: RoomInclude<ExtArgs> | null
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateInput, RoomUncheckedCreateInput>
    update: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>
  }

  export type RoomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: RoomSelect<ExtArgs> | null
    omit?: RoomOmit<ExtArgs> | null
    include?: RoomInclude<ExtArgs> | null
    where: RoomWhereUniqueInput
  }

  export type RoomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomWhereInput
    limit?: number
  }

  export type Room$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: MessageSelect<ExtArgs> | null
    omit?: MessageOmit<ExtArgs> | null
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  export type Room$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: MemberInRoomSelect<ExtArgs> | null
    omit?: MemberInRoomOmit<ExtArgs> | null
    include?: MemberInRoomInclude<ExtArgs> | null
    where?: MemberInRoomWhereInput
    orderBy?: MemberInRoomOrderByWithRelationInput | MemberInRoomOrderByWithRelationInput[]
    cursor?: MemberInRoomWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MemberInRoomScalarFieldEnum | MemberInRoomScalarFieldEnum[]
  }

  export type RoomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: RoomSelect<ExtArgs> | null
    omit?: RoomOmit<ExtArgs> | null
    include?: RoomInclude<ExtArgs> | null
  }


  export type AggregateMemberInRoom = {
    _count: MemberInRoomCountAggregateOutputType | null
    _min: MemberInRoomMinAggregateOutputType | null
    _max: MemberInRoomMaxAggregateOutputType | null
  }

  export type MemberInRoomMinAggregateOutputType = {
    id: string | null
    userId: string | null
    roomId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MemberInRoomMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    roomId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MemberInRoomCountAggregateOutputType = {
    id: number
    userId: number
    roomId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MemberInRoomMinAggregateInputType = {
    id?: true
    userId?: true
    roomId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MemberInRoomMaxAggregateInputType = {
    id?: true
    userId?: true
    roomId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MemberInRoomCountAggregateInputType = {
    id?: true
    userId?: true
    roomId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MemberInRoomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemberInRoomWhereInput
    orderBy?: MemberInRoomOrderByWithRelationInput | MemberInRoomOrderByWithRelationInput[]
    cursor?: MemberInRoomWhereUniqueInput
    take?: number
    skip?: number
    _count?: true | MemberInRoomCountAggregateInputType
    _min?: MemberInRoomMinAggregateInputType
    _max?: MemberInRoomMaxAggregateInputType
  }

  export type GetMemberInRoomAggregateType<T extends MemberInRoomAggregateArgs> = {
        [P in keyof T & keyof AggregateMemberInRoom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMemberInRoom[P]>
      : GetScalarType<T[P], AggregateMemberInRoom[P]>
  }




  export type MemberInRoomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemberInRoomWhereInput
    orderBy?: MemberInRoomOrderByWithAggregationInput | MemberInRoomOrderByWithAggregationInput[]
    by: MemberInRoomScalarFieldEnum[] | MemberInRoomScalarFieldEnum
    having?: MemberInRoomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MemberInRoomCountAggregateInputType | true
    _min?: MemberInRoomMinAggregateInputType
    _max?: MemberInRoomMaxAggregateInputType
  }

  export type MemberInRoomGroupByOutputType = {
    id: string
    userId: string
    roomId: string
    createdAt: Date
    updatedAt: Date
    _count: MemberInRoomCountAggregateOutputType | null
    _min: MemberInRoomMinAggregateOutputType | null
    _max: MemberInRoomMaxAggregateOutputType | null
  }

  type GetMemberInRoomGroupByPayload<T extends MemberInRoomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MemberInRoomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MemberInRoomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MemberInRoomGroupByOutputType[P]>
            : GetScalarType<T[P], MemberInRoomGroupByOutputType[P]>
        }
      >
    >


  export type MemberInRoomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    roomId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["memberInRoom"]>

  export type MemberInRoomSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    roomId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["memberInRoom"]>

  export type MemberInRoomSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    roomId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["memberInRoom"]>

  export type MemberInRoomSelectScalar = {
    id?: boolean
    userId?: boolean
    roomId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MemberInRoomOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "roomId" | "createdAt" | "updatedAt", ExtArgs["result"]["memberInRoom"]>
  export type MemberInRoomInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }
  export type MemberInRoomIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }
  export type MemberInRoomIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }

  export type $MemberInRoomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MemberInRoom"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      room: Prisma.$RoomPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      roomId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["memberInRoom"]>
    composites: {}
  }

  type MemberInRoomGetPayload<S extends boolean | null | undefined | MemberInRoomDefaultArgs> = $Result.GetResult<Prisma.$MemberInRoomPayload, S>

  type MemberInRoomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MemberInRoomFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MemberInRoomCountAggregateInputType | true
    }

  export interface MemberInRoomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MemberInRoom'], meta: { name: 'MemberInRoom' } }
    findUnique<T extends MemberInRoomFindUniqueArgs>(args: SelectSubset<T, MemberInRoomFindUniqueArgs<ExtArgs>>): Prisma__MemberInRoomClient<$Result.GetResult<Prisma.$MemberInRoomPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findUniqueOrThrow<T extends MemberInRoomFindUniqueOrThrowArgs>(args: SelectSubset<T, MemberInRoomFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MemberInRoomClient<$Result.GetResult<Prisma.$MemberInRoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findFirst<T extends MemberInRoomFindFirstArgs>(args?: SelectSubset<T, MemberInRoomFindFirstArgs<ExtArgs>>): Prisma__MemberInRoomClient<$Result.GetResult<Prisma.$MemberInRoomPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findFirstOrThrow<T extends MemberInRoomFindFirstOrThrowArgs>(args?: SelectSubset<T, MemberInRoomFindFirstOrThrowArgs<ExtArgs>>): Prisma__MemberInRoomClient<$Result.GetResult<Prisma.$MemberInRoomPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findMany<T extends MemberInRoomFindManyArgs>(args?: SelectSubset<T, MemberInRoomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberInRoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    create<T extends MemberInRoomCreateArgs>(args: SelectSubset<T, MemberInRoomCreateArgs<ExtArgs>>): Prisma__MemberInRoomClient<$Result.GetResult<Prisma.$MemberInRoomPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    createMany<T extends MemberInRoomCreateManyArgs>(args?: SelectSubset<T, MemberInRoomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    createManyAndReturn<T extends MemberInRoomCreateManyAndReturnArgs>(args?: SelectSubset<T, MemberInRoomCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberInRoomPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    delete<T extends MemberInRoomDeleteArgs>(args: SelectSubset<T, MemberInRoomDeleteArgs<ExtArgs>>): Prisma__MemberInRoomClient<$Result.GetResult<Prisma.$MemberInRoomPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    update<T extends MemberInRoomUpdateArgs>(args: SelectSubset<T, MemberInRoomUpdateArgs<ExtArgs>>): Prisma__MemberInRoomClient<$Result.GetResult<Prisma.$MemberInRoomPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    deleteMany<T extends MemberInRoomDeleteManyArgs>(args?: SelectSubset<T, MemberInRoomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    updateMany<T extends MemberInRoomUpdateManyArgs>(args: SelectSubset<T, MemberInRoomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    updateManyAndReturn<T extends MemberInRoomUpdateManyAndReturnArgs>(args: SelectSubset<T, MemberInRoomUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberInRoomPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    upsert<T extends MemberInRoomUpsertArgs>(args: SelectSubset<T, MemberInRoomUpsertArgs<ExtArgs>>): Prisma__MemberInRoomClient<$Result.GetResult<Prisma.$MemberInRoomPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    count<T extends MemberInRoomCountArgs>(
      args?: Subset<T, MemberInRoomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MemberInRoomCountAggregateOutputType>
        : number
    >

    aggregate<T extends MemberInRoomAggregateArgs>(args: Subset<T, MemberInRoomAggregateArgs>): Prisma.PrismaPromise<GetMemberInRoomAggregateType<T>>

    groupBy<
      T extends MemberInRoomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MemberInRoomGroupByArgs['orderBy'] }
        : { orderBy?: MemberInRoomGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MemberInRoomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMemberInRoomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  readonly fields: MemberInRoomFieldRefs;
  }

  export interface Prisma__MemberInRoomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    room<T extends RoomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoomDefaultArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  interface MemberInRoomFieldRefs {
    readonly id: FieldRef<"MemberInRoom", 'String'>
    readonly userId: FieldRef<"MemberInRoom", 'String'>
    readonly roomId: FieldRef<"MemberInRoom", 'String'>
    readonly createdAt: FieldRef<"MemberInRoom", 'DateTime'>
    readonly updatedAt: FieldRef<"MemberInRoom", 'DateTime'>
  }
    

  
  export type MemberInRoomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: MemberInRoomSelect<ExtArgs> | null
    omit?: MemberInRoomOmit<ExtArgs> | null
    include?: MemberInRoomInclude<ExtArgs> | null
    where: MemberInRoomWhereUniqueInput
  }

  export type MemberInRoomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: MemberInRoomSelect<ExtArgs> | null
    omit?: MemberInRoomOmit<ExtArgs> | null
    include?: MemberInRoomInclude<ExtArgs> | null
    where: MemberInRoomWhereUniqueInput
  }

  export type MemberInRoomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: MemberInRoomSelect<ExtArgs> | null
    omit?: MemberInRoomOmit<ExtArgs> | null
    include?: MemberInRoomInclude<ExtArgs> | null
    where?: MemberInRoomWhereInput
    orderBy?: MemberInRoomOrderByWithRelationInput | MemberInRoomOrderByWithRelationInput[]
    cursor?: MemberInRoomWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MemberInRoomScalarFieldEnum | MemberInRoomScalarFieldEnum[]
  }

  export type MemberInRoomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: MemberInRoomSelect<ExtArgs> | null
    omit?: MemberInRoomOmit<ExtArgs> | null
    include?: MemberInRoomInclude<ExtArgs> | null
    where?: MemberInRoomWhereInput
    orderBy?: MemberInRoomOrderByWithRelationInput | MemberInRoomOrderByWithRelationInput[]
    cursor?: MemberInRoomWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MemberInRoomScalarFieldEnum | MemberInRoomScalarFieldEnum[]
  }

  export type MemberInRoomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: MemberInRoomSelect<ExtArgs> | null
    omit?: MemberInRoomOmit<ExtArgs> | null
    include?: MemberInRoomInclude<ExtArgs> | null
    where?: MemberInRoomWhereInput
    orderBy?: MemberInRoomOrderByWithRelationInput | MemberInRoomOrderByWithRelationInput[]
    cursor?: MemberInRoomWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MemberInRoomScalarFieldEnum | MemberInRoomScalarFieldEnum[]
  }

  export type MemberInRoomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: MemberInRoomSelect<ExtArgs> | null
    omit?: MemberInRoomOmit<ExtArgs> | null
    include?: MemberInRoomInclude<ExtArgs> | null
    data: XOR<MemberInRoomCreateInput, MemberInRoomUncheckedCreateInput>
  }

  export type MemberInRoomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    data: MemberInRoomCreateManyInput | MemberInRoomCreateManyInput[]
    skipDuplicates?: boolean
  }

  export type MemberInRoomCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: MemberInRoomSelectCreateManyAndReturn<ExtArgs> | null
    omit?: MemberInRoomOmit<ExtArgs> | null
    data: MemberInRoomCreateManyInput | MemberInRoomCreateManyInput[]
    skipDuplicates?: boolean
    include?: MemberInRoomIncludeCreateManyAndReturn<ExtArgs> | null
  }

  export type MemberInRoomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: MemberInRoomSelect<ExtArgs> | null
    omit?: MemberInRoomOmit<ExtArgs> | null
    include?: MemberInRoomInclude<ExtArgs> | null
    data: XOR<MemberInRoomUpdateInput, MemberInRoomUncheckedUpdateInput>
    where: MemberInRoomWhereUniqueInput
  }

  export type MemberInRoomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    data: XOR<MemberInRoomUpdateManyMutationInput, MemberInRoomUncheckedUpdateManyInput>
    where?: MemberInRoomWhereInput
    limit?: number
  }

  export type MemberInRoomUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: MemberInRoomSelectUpdateManyAndReturn<ExtArgs> | null
    omit?: MemberInRoomOmit<ExtArgs> | null
    data: XOR<MemberInRoomUpdateManyMutationInput, MemberInRoomUncheckedUpdateManyInput>
    where?: MemberInRoomWhereInput
    limit?: number
    include?: MemberInRoomIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  export type MemberInRoomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: MemberInRoomSelect<ExtArgs> | null
    omit?: MemberInRoomOmit<ExtArgs> | null
    include?: MemberInRoomInclude<ExtArgs> | null
    where: MemberInRoomWhereUniqueInput
    create: XOR<MemberInRoomCreateInput, MemberInRoomUncheckedCreateInput>
    update: XOR<MemberInRoomUpdateInput, MemberInRoomUncheckedUpdateInput>
  }

  export type MemberInRoomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: MemberInRoomSelect<ExtArgs> | null
    omit?: MemberInRoomOmit<ExtArgs> | null
    include?: MemberInRoomInclude<ExtArgs> | null
    where: MemberInRoomWhereUniqueInput
  }

  export type MemberInRoomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemberInRoomWhereInput
    limit?: number
  }

  export type MemberInRoomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: MemberInRoomSelect<ExtArgs> | null
    omit?: MemberInRoomOmit<ExtArgs> | null
    include?: MemberInRoomInclude<ExtArgs> | null
  }


  export type AggregateHistory_searching = {
    _count: History_searchingCountAggregateOutputType | null
    _avg: History_searchingAvgAggregateOutputType | null
    _sum: History_searchingSumAggregateOutputType | null
    _min: History_searchingMinAggregateOutputType | null
    _max: History_searchingMaxAggregateOutputType | null
  }

  export type History_searchingAvgAggregateOutputType = {
    currentPrice: number | null
    previousClose: number | null
    open: number | null
    high: number | null
    low: number | null
    volume: number | null
    marketCap: number | null
    peRatio: number | null
    eps: number | null
    beta: number | null
    yahooPrice: number | null
  }

  export type History_searchingSumAggregateOutputType = {
    currentPrice: bigint | null
    previousClose: bigint | null
    open: bigint | null
    high: bigint | null
    low: bigint | null
    volume: bigint | null
    marketCap: bigint | null
    peRatio: number | null
    eps: number | null
    beta: number | null
    yahooPrice: number | null
  }

  export type History_searchingMinAggregateOutputType = {
    id: string | null
    symbol: string | null
    currentPrice: bigint | null
    previousClose: bigint | null
    open: bigint | null
    high: bigint | null
    low: bigint | null
    volume: bigint | null
    marketCap: bigint | null
    peRatio: number | null
    eps: number | null
    beta: number | null
    yahooPrice: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type History_searchingMaxAggregateOutputType = {
    id: string | null
    symbol: string | null
    currentPrice: bigint | null
    previousClose: bigint | null
    open: bigint | null
    high: bigint | null
    low: bigint | null
    volume: bigint | null
    marketCap: bigint | null
    peRatio: number | null
    eps: number | null
    beta: number | null
    yahooPrice: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type History_searchingCountAggregateOutputType = {
    id: number
    symbol: number
    currentPrice: number
    previousClose: number
    open: number
    high: number
    low: number
    volume: number
    marketCap: number
    peRatio: number
    eps: number
    beta: number
    yahooPrice: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type History_searchingAvgAggregateInputType = {
    currentPrice?: true
    previousClose?: true
    open?: true
    high?: true
    low?: true
    volume?: true
    marketCap?: true
    peRatio?: true
    eps?: true
    beta?: true
    yahooPrice?: true
  }

  export type History_searchingSumAggregateInputType = {
    currentPrice?: true
    previousClose?: true
    open?: true
    high?: true
    low?: true
    volume?: true
    marketCap?: true
    peRatio?: true
    eps?: true
    beta?: true
    yahooPrice?: true
  }

  export type History_searchingMinAggregateInputType = {
    id?: true
    symbol?: true
    currentPrice?: true
    previousClose?: true
    open?: true
    high?: true
    low?: true
    volume?: true
    marketCap?: true
    peRatio?: true
    eps?: true
    beta?: true
    yahooPrice?: true
    createdAt?: true
    updatedAt?: true
  }

  export type History_searchingMaxAggregateInputType = {
    id?: true
    symbol?: true
    currentPrice?: true
    previousClose?: true
    open?: true
    high?: true
    low?: true
    volume?: true
    marketCap?: true
    peRatio?: true
    eps?: true
    beta?: true
    yahooPrice?: true
    createdAt?: true
    updatedAt?: true
  }

  export type History_searchingCountAggregateInputType = {
    id?: true
    symbol?: true
    currentPrice?: true
    previousClose?: true
    open?: true
    high?: true
    low?: true
    volume?: true
    marketCap?: true
    peRatio?: true
    eps?: true
    beta?: true
    yahooPrice?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type History_searchingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: history_searchingWhereInput
    orderBy?: history_searchingOrderByWithRelationInput | history_searchingOrderByWithRelationInput[]
    cursor?: history_searchingWhereUniqueInput
    take?: number
    skip?: number
    _count?: true | History_searchingCountAggregateInputType
    _avg?: History_searchingAvgAggregateInputType
    _sum?: History_searchingSumAggregateInputType
    _min?: History_searchingMinAggregateInputType
    _max?: History_searchingMaxAggregateInputType
  }

  export type GetHistory_searchingAggregateType<T extends History_searchingAggregateArgs> = {
        [P in keyof T & keyof AggregateHistory_searching]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHistory_searching[P]>
      : GetScalarType<T[P], AggregateHistory_searching[P]>
  }




  export type history_searchingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: history_searchingWhereInput
    orderBy?: history_searchingOrderByWithAggregationInput | history_searchingOrderByWithAggregationInput[]
    by: History_searchingScalarFieldEnum[] | History_searchingScalarFieldEnum
    having?: history_searchingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: History_searchingCountAggregateInputType | true
    _avg?: History_searchingAvgAggregateInputType
    _sum?: History_searchingSumAggregateInputType
    _min?: History_searchingMinAggregateInputType
    _max?: History_searchingMaxAggregateInputType
  }

  export type History_searchingGroupByOutputType = {
    id: string
    symbol: string
    currentPrice: bigint
    previousClose: bigint
    open: bigint
    high: bigint
    low: bigint
    volume: bigint
    marketCap: bigint
    peRatio: number
    eps: number
    beta: number
    yahooPrice: number
    createdAt: Date
    updatedAt: Date
    _count: History_searchingCountAggregateOutputType | null
    _avg: History_searchingAvgAggregateOutputType | null
    _sum: History_searchingSumAggregateOutputType | null
    _min: History_searchingMinAggregateOutputType | null
    _max: History_searchingMaxAggregateOutputType | null
  }

  type GetHistory_searchingGroupByPayload<T extends history_searchingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<History_searchingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof History_searchingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], History_searchingGroupByOutputType[P]>
            : GetScalarType<T[P], History_searchingGroupByOutputType[P]>
        }
      >
    >


  export type history_searchingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    symbol?: boolean
    currentPrice?: boolean
    previousClose?: boolean
    open?: boolean
    high?: boolean
    low?: boolean
    volume?: boolean
    marketCap?: boolean
    peRatio?: boolean
    eps?: boolean
    beta?: boolean
    yahooPrice?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["history_searching"]>

  export type history_searchingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    symbol?: boolean
    currentPrice?: boolean
    previousClose?: boolean
    open?: boolean
    high?: boolean
    low?: boolean
    volume?: boolean
    marketCap?: boolean
    peRatio?: boolean
    eps?: boolean
    beta?: boolean
    yahooPrice?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["history_searching"]>

  export type history_searchingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    symbol?: boolean
    currentPrice?: boolean
    previousClose?: boolean
    open?: boolean
    high?: boolean
    low?: boolean
    volume?: boolean
    marketCap?: boolean
    peRatio?: boolean
    eps?: boolean
    beta?: boolean
    yahooPrice?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["history_searching"]>

  export type history_searchingSelectScalar = {
    id?: boolean
    symbol?: boolean
    currentPrice?: boolean
    previousClose?: boolean
    open?: boolean
    high?: boolean
    low?: boolean
    volume?: boolean
    marketCap?: boolean
    peRatio?: boolean
    eps?: boolean
    beta?: boolean
    yahooPrice?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type history_searchingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "symbol" | "currentPrice" | "previousClose" | "open" | "high" | "low" | "volume" | "marketCap" | "peRatio" | "eps" | "beta" | "yahooPrice" | "createdAt" | "updatedAt", ExtArgs["result"]["history_searching"]>

  export type $history_searchingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "history_searching"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      symbol: string
      currentPrice: bigint
      previousClose: bigint
      open: bigint
      high: bigint
      low: bigint
      volume: bigint
      marketCap: bigint
      peRatio: number
      eps: number
      beta: number
      yahooPrice: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["history_searching"]>
    composites: {}
  }

  type history_searchingGetPayload<S extends boolean | null | undefined | history_searchingDefaultArgs> = $Result.GetResult<Prisma.$history_searchingPayload, S>

  type history_searchingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<history_searchingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: History_searchingCountAggregateInputType | true
    }

  export interface history_searchingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['history_searching'], meta: { name: 'history_searching' } }
    findUnique<T extends history_searchingFindUniqueArgs>(args: SelectSubset<T, history_searchingFindUniqueArgs<ExtArgs>>): Prisma__history_searchingClient<$Result.GetResult<Prisma.$history_searchingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findUniqueOrThrow<T extends history_searchingFindUniqueOrThrowArgs>(args: SelectSubset<T, history_searchingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__history_searchingClient<$Result.GetResult<Prisma.$history_searchingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findFirst<T extends history_searchingFindFirstArgs>(args?: SelectSubset<T, history_searchingFindFirstArgs<ExtArgs>>): Prisma__history_searchingClient<$Result.GetResult<Prisma.$history_searchingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findFirstOrThrow<T extends history_searchingFindFirstOrThrowArgs>(args?: SelectSubset<T, history_searchingFindFirstOrThrowArgs<ExtArgs>>): Prisma__history_searchingClient<$Result.GetResult<Prisma.$history_searchingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findMany<T extends history_searchingFindManyArgs>(args?: SelectSubset<T, history_searchingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$history_searchingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    create<T extends history_searchingCreateArgs>(args: SelectSubset<T, history_searchingCreateArgs<ExtArgs>>): Prisma__history_searchingClient<$Result.GetResult<Prisma.$history_searchingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    createMany<T extends history_searchingCreateManyArgs>(args?: SelectSubset<T, history_searchingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    createManyAndReturn<T extends history_searchingCreateManyAndReturnArgs>(args?: SelectSubset<T, history_searchingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$history_searchingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    delete<T extends history_searchingDeleteArgs>(args: SelectSubset<T, history_searchingDeleteArgs<ExtArgs>>): Prisma__history_searchingClient<$Result.GetResult<Prisma.$history_searchingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    update<T extends history_searchingUpdateArgs>(args: SelectSubset<T, history_searchingUpdateArgs<ExtArgs>>): Prisma__history_searchingClient<$Result.GetResult<Prisma.$history_searchingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    deleteMany<T extends history_searchingDeleteManyArgs>(args?: SelectSubset<T, history_searchingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    updateMany<T extends history_searchingUpdateManyArgs>(args: SelectSubset<T, history_searchingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    updateManyAndReturn<T extends history_searchingUpdateManyAndReturnArgs>(args: SelectSubset<T, history_searchingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$history_searchingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    upsert<T extends history_searchingUpsertArgs>(args: SelectSubset<T, history_searchingUpsertArgs<ExtArgs>>): Prisma__history_searchingClient<$Result.GetResult<Prisma.$history_searchingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    count<T extends history_searchingCountArgs>(
      args?: Subset<T, history_searchingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], History_searchingCountAggregateOutputType>
        : number
    >

    aggregate<T extends History_searchingAggregateArgs>(args: Subset<T, History_searchingAggregateArgs>): Prisma.PrismaPromise<GetHistory_searchingAggregateType<T>>

    groupBy<
      T extends history_searchingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: history_searchingGroupByArgs['orderBy'] }
        : { orderBy?: history_searchingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, history_searchingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHistory_searchingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  readonly fields: history_searchingFieldRefs;
  }

  export interface Prisma__history_searchingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  interface history_searchingFieldRefs {
    readonly id: FieldRef<"history_searching", 'String'>
    readonly symbol: FieldRef<"history_searching", 'String'>
    readonly currentPrice: FieldRef<"history_searching", 'BigInt'>
    readonly previousClose: FieldRef<"history_searching", 'BigInt'>
    readonly open: FieldRef<"history_searching", 'BigInt'>
    readonly high: FieldRef<"history_searching", 'BigInt'>
    readonly low: FieldRef<"history_searching", 'BigInt'>
    readonly volume: FieldRef<"history_searching", 'BigInt'>
    readonly marketCap: FieldRef<"history_searching", 'BigInt'>
    readonly peRatio: FieldRef<"history_searching", 'Float'>
    readonly eps: FieldRef<"history_searching", 'Float'>
    readonly beta: FieldRef<"history_searching", 'Float'>
    readonly yahooPrice: FieldRef<"history_searching", 'Float'>
    readonly createdAt: FieldRef<"history_searching", 'DateTime'>
    readonly updatedAt: FieldRef<"history_searching", 'DateTime'>
  }
    

  
  export type history_searchingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: history_searchingSelect<ExtArgs> | null
    omit?: history_searchingOmit<ExtArgs> | null
    where: history_searchingWhereUniqueInput
  }

  export type history_searchingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: history_searchingSelect<ExtArgs> | null
    omit?: history_searchingOmit<ExtArgs> | null
    where: history_searchingWhereUniqueInput
  }

  export type history_searchingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: history_searchingSelect<ExtArgs> | null
    omit?: history_searchingOmit<ExtArgs> | null
    where?: history_searchingWhereInput
    orderBy?: history_searchingOrderByWithRelationInput | history_searchingOrderByWithRelationInput[]
    cursor?: history_searchingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: History_searchingScalarFieldEnum | History_searchingScalarFieldEnum[]
  }

  export type history_searchingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: history_searchingSelect<ExtArgs> | null
    omit?: history_searchingOmit<ExtArgs> | null
    where?: history_searchingWhereInput
    orderBy?: history_searchingOrderByWithRelationInput | history_searchingOrderByWithRelationInput[]
    cursor?: history_searchingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: History_searchingScalarFieldEnum | History_searchingScalarFieldEnum[]
  }

  export type history_searchingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: history_searchingSelect<ExtArgs> | null
    omit?: history_searchingOmit<ExtArgs> | null
    where?: history_searchingWhereInput
    orderBy?: history_searchingOrderByWithRelationInput | history_searchingOrderByWithRelationInput[]
    cursor?: history_searchingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: History_searchingScalarFieldEnum | History_searchingScalarFieldEnum[]
  }

  export type history_searchingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: history_searchingSelect<ExtArgs> | null
    omit?: history_searchingOmit<ExtArgs> | null
    data: XOR<history_searchingCreateInput, history_searchingUncheckedCreateInput>
  }

  export type history_searchingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    data: history_searchingCreateManyInput | history_searchingCreateManyInput[]
    skipDuplicates?: boolean
  }

  export type history_searchingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: history_searchingSelectCreateManyAndReturn<ExtArgs> | null
    omit?: history_searchingOmit<ExtArgs> | null
    data: history_searchingCreateManyInput | history_searchingCreateManyInput[]
    skipDuplicates?: boolean
  }

  export type history_searchingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: history_searchingSelect<ExtArgs> | null
    omit?: history_searchingOmit<ExtArgs> | null
    data: XOR<history_searchingUpdateInput, history_searchingUncheckedUpdateInput>
    where: history_searchingWhereUniqueInput
  }

  export type history_searchingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    data: XOR<history_searchingUpdateManyMutationInput, history_searchingUncheckedUpdateManyInput>
    where?: history_searchingWhereInput
    limit?: number
  }

  export type history_searchingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: history_searchingSelectUpdateManyAndReturn<ExtArgs> | null
    omit?: history_searchingOmit<ExtArgs> | null
    data: XOR<history_searchingUpdateManyMutationInput, history_searchingUncheckedUpdateManyInput>
    where?: history_searchingWhereInput
    limit?: number
  }

  export type history_searchingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: history_searchingSelect<ExtArgs> | null
    omit?: history_searchingOmit<ExtArgs> | null
    where: history_searchingWhereUniqueInput
    create: XOR<history_searchingCreateInput, history_searchingUncheckedCreateInput>
    update: XOR<history_searchingUpdateInput, history_searchingUncheckedUpdateInput>
  }

  export type history_searchingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: history_searchingSelect<ExtArgs> | null
    omit?: history_searchingOmit<ExtArgs> | null
    where: history_searchingWhereUniqueInput
  }

  export type history_searchingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: history_searchingWhereInput
    limit?: number
  }

  export type history_searchingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: history_searchingSelect<ExtArgs> | null
    omit?: history_searchingOmit<ExtArgs> | null
  }


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
    searchCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
    visible: $Enums.UserVisibility | null
    phone: string | null
    numberIdentity: string | null
    dateOfBirth: Date | null
    firstName: string | null
    lastName: string | null
    isActive: boolean | null
    isBanned: boolean | null
    isLocked: boolean | null
    lastActived: Date | null
    picture: string | null
    provider: string | null
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
    searchCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
    visible: $Enums.UserVisibility | null
    phone: string | null
    numberIdentity: string | null
    dateOfBirth: Date | null
    firstName: string | null
    lastName: string | null
    isActive: boolean | null
    isBanned: boolean | null
    isLocked: boolean | null
    lastActived: Date | null
    picture: string | null
    provider: string | null
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
    searchCount: number
    createdAt: number
    updatedAt: number
    visible: number
    phone: number
    numberIdentity: number
    dateOfBirth: number
    firstName: number
    lastName: number
    isActive: number
    isBanned: number
    isLocked: number
    lastActived: number
    picture: number
    provider: number
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
    searchCount?: true
    createdAt?: true
    updatedAt?: true
    visible?: true
    phone?: true
    numberIdentity?: true
    dateOfBirth?: true
    firstName?: true
    lastName?: true
    isActive?: true
    isBanned?: true
    isLocked?: true
    lastActived?: true
    picture?: true
    provider?: true
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
    searchCount?: true
    createdAt?: true
    updatedAt?: true
    visible?: true
    phone?: true
    numberIdentity?: true
    dateOfBirth?: true
    firstName?: true
    lastName?: true
    isActive?: true
    isBanned?: true
    isLocked?: true
    lastActived?: true
    picture?: true
    provider?: true
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
    searchCount?: true
    createdAt?: true
    updatedAt?: true
    visible?: true
    phone?: true
    numberIdentity?: true
    dateOfBirth?: true
    firstName?: true
    lastName?: true
    isActive?: true
    isBanned?: true
    isLocked?: true
    lastActived?: true
    picture?: true
    provider?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    _count?: true | UserCountAggregateInputType
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
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
    searchCount: number
    createdAt: Date
    updatedAt: Date
    visible: $Enums.UserVisibility
    phone: string | null
    numberIdentity: string | null
    dateOfBirth: Date | null
    firstName: string | null
    lastName: string | null
    isActive: boolean
    isBanned: boolean
    isLocked: boolean
    lastActived: Date | null
    picture: string | null
    provider: string | null
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
    searchCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    visible?: boolean
    phone?: boolean
    numberIdentity?: boolean
    dateOfBirth?: boolean
    firstName?: boolean
    lastName?: boolean
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    lastActived?: boolean
    picture?: boolean
    provider?: boolean
    Oauth2User?: boolean | User$Oauth2UserArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    userDevice?: boolean | User$userDeviceArgs<ExtArgs>
    senderMessage?: boolean | User$senderMessageArgs<ExtArgs>
    receiveMessage?: boolean | User$receiveMessageArgs<ExtArgs>
    memberInRoom?: boolean | User$memberInRoomArgs<ExtArgs>
    posts?: boolean | User$postsArgs<ExtArgs>
    comments?: boolean | User$commentsArgs<ExtArgs>
    likes?: boolean | User$likesArgs<ExtArgs>
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
    searchCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    visible?: boolean
    phone?: boolean
    numberIdentity?: boolean
    dateOfBirth?: boolean
    firstName?: boolean
    lastName?: boolean
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    lastActived?: boolean
    picture?: boolean
    provider?: boolean
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
    searchCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    visible?: boolean
    phone?: boolean
    numberIdentity?: boolean
    dateOfBirth?: boolean
    firstName?: boolean
    lastName?: boolean
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    lastActived?: boolean
    picture?: boolean
    provider?: boolean
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
    searchCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    visible?: boolean
    phone?: boolean
    numberIdentity?: boolean
    dateOfBirth?: boolean
    firstName?: boolean
    lastName?: boolean
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    lastActived?: boolean
    picture?: boolean
    provider?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fullname" | "username" | "email" | "hashedPassword" | "accountType" | "avtUrl" | "address" | "city" | "searchCount" | "createdAt" | "updatedAt" | "visible" | "phone" | "numberIdentity" | "dateOfBirth" | "firstName" | "lastName" | "isActive" | "isBanned" | "isLocked" | "lastActived" | "picture" | "provider", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Oauth2User?: boolean | User$Oauth2UserArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    userDevice?: boolean | User$userDeviceArgs<ExtArgs>
    senderMessage?: boolean | User$senderMessageArgs<ExtArgs>
    receiveMessage?: boolean | User$receiveMessageArgs<ExtArgs>
    memberInRoom?: boolean | User$memberInRoomArgs<ExtArgs>
    posts?: boolean | User$postsArgs<ExtArgs>
    comments?: boolean | User$commentsArgs<ExtArgs>
    likes?: boolean | User$likesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      Oauth2User: Prisma.$Oauth2UserPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      userDevice: Prisma.$UserDevicePayload<ExtArgs>[]
      senderMessage: Prisma.$MessagePayload<ExtArgs>[]
      receiveMessage: Prisma.$MessagePayload<ExtArgs>[]
      memberInRoom: Prisma.$MemberInRoomPayload<ExtArgs>[]
      posts: Prisma.$PostPayload<ExtArgs>[]
      comments: Prisma.$CommentPayload<ExtArgs>[]
      likes: Prisma.$likePostPayload<ExtArgs>[]
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
      searchCount: number
      createdAt: Date
      updatedAt: Date
      visible: $Enums.UserVisibility
      phone: string | null
      numberIdentity: string | null
      dateOfBirth: Date | null
      firstName: string | null
      lastName: string | null
      isActive: boolean
      isBanned: boolean
      isLocked: boolean
      lastActived: Date | null
      picture: string | null
      provider: string | null
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
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

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
  readonly fields: UserFieldRefs;
  }

  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Oauth2User<T extends User$Oauth2UserArgs<ExtArgs> = {}>(args?: Subset<T, User$Oauth2UserArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Oauth2UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    userDevice<T extends User$userDeviceArgs<ExtArgs> = {}>(args?: Subset<T, User$userDeviceArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDevicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    senderMessage<T extends User$senderMessageArgs<ExtArgs> = {}>(args?: Subset<T, User$senderMessageArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    receiveMessage<T extends User$receiveMessageArgs<ExtArgs> = {}>(args?: Subset<T, User$receiveMessageArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    memberInRoom<T extends User$memberInRoomArgs<ExtArgs> = {}>(args?: Subset<T, User$memberInRoomArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberInRoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    posts<T extends User$postsArgs<ExtArgs> = {}>(args?: Subset<T, User$postsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    comments<T extends User$commentsArgs<ExtArgs> = {}>(args?: Subset<T, User$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    likes<T extends User$likesArgs<ExtArgs> = {}>(args?: Subset<T, User$likesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$likePostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




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
    readonly searchCount: FieldRef<"User", 'Int'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly visible: FieldRef<"User", 'UserVisibility'>
    readonly phone: FieldRef<"User", 'String'>
    readonly numberIdentity: FieldRef<"User", 'String'>
    readonly dateOfBirth: FieldRef<"User", 'DateTime'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly isBanned: FieldRef<"User", 'Boolean'>
    readonly isLocked: FieldRef<"User", 'Boolean'>
    readonly lastActived: FieldRef<"User", 'DateTime'>
    readonly picture: FieldRef<"User", 'String'>
    readonly provider: FieldRef<"User", 'String'>
  }
    

  
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserSelect<ExtArgs> | null
    omit?: UserOmit<ExtArgs> | null
    include?: UserInclude<ExtArgs> | null
    where: UserWhereUniqueInput
  }

  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserSelect<ExtArgs> | null
    omit?: UserOmit<ExtArgs> | null
    include?: UserInclude<ExtArgs> | null
    where: UserWhereUniqueInput
  }

  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserSelect<ExtArgs> | null
    omit?: UserOmit<ExtArgs> | null
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserSelect<ExtArgs> | null
    omit?: UserOmit<ExtArgs> | null
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserSelect<ExtArgs> | null
    omit?: UserOmit<ExtArgs> | null
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserSelect<ExtArgs> | null
    omit?: UserOmit<ExtArgs> | null
    include?: UserInclude<ExtArgs> | null
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    omit?: UserOmit<ExtArgs> | null
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserSelect<ExtArgs> | null
    omit?: UserOmit<ExtArgs> | null
    include?: UserInclude<ExtArgs> | null
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    where: UserWhereUniqueInput
  }

  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    where?: UserWhereInput
    limit?: number
  }

  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    omit?: UserOmit<ExtArgs> | null
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    where?: UserWhereInput
    limit?: number
  }

  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserSelect<ExtArgs> | null
    omit?: UserOmit<ExtArgs> | null
    include?: UserInclude<ExtArgs> | null
    where: UserWhereUniqueInput
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserSelect<ExtArgs> | null
    omit?: UserOmit<ExtArgs> | null
    include?: UserInclude<ExtArgs> | null
    where: UserWhereUniqueInput
  }

  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    limit?: number
  }

  export type User$Oauth2UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: Oauth2UserSelect<ExtArgs> | null
    omit?: Oauth2UserOmit<ExtArgs> | null
    include?: Oauth2UserInclude<ExtArgs> | null
    where?: Oauth2UserWhereInput
    orderBy?: Oauth2UserOrderByWithRelationInput | Oauth2UserOrderByWithRelationInput[]
    cursor?: Oauth2UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Oauth2UserScalarFieldEnum | Oauth2UserScalarFieldEnum[]
  }

  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: SessionSelect<ExtArgs> | null
    omit?: SessionOmit<ExtArgs> | null
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  export type User$userDeviceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserDeviceSelect<ExtArgs> | null
    omit?: UserDeviceOmit<ExtArgs> | null
    include?: UserDeviceInclude<ExtArgs> | null
    where?: UserDeviceWhereInput
    orderBy?: UserDeviceOrderByWithRelationInput | UserDeviceOrderByWithRelationInput[]
    cursor?: UserDeviceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserDeviceScalarFieldEnum | UserDeviceScalarFieldEnum[]
  }

  export type User$senderMessageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: MessageSelect<ExtArgs> | null
    omit?: MessageOmit<ExtArgs> | null
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  export type User$receiveMessageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: MessageSelect<ExtArgs> | null
    omit?: MessageOmit<ExtArgs> | null
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  export type User$memberInRoomArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: MemberInRoomSelect<ExtArgs> | null
    omit?: MemberInRoomOmit<ExtArgs> | null
    include?: MemberInRoomInclude<ExtArgs> | null
    where?: MemberInRoomWhereInput
    orderBy?: MemberInRoomOrderByWithRelationInput | MemberInRoomOrderByWithRelationInput[]
    cursor?: MemberInRoomWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MemberInRoomScalarFieldEnum | MemberInRoomScalarFieldEnum[]
  }

  export type User$postsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: PostSelect<ExtArgs> | null
    omit?: PostOmit<ExtArgs> | null
    include?: PostInclude<ExtArgs> | null
    where?: PostWhereInput
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    cursor?: PostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  export type User$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: CommentSelect<ExtArgs> | null
    omit?: CommentOmit<ExtArgs> | null
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  export type User$likesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: likePostSelect<ExtArgs> | null
    omit?: likePostOmit<ExtArgs> | null
    include?: likePostInclude<ExtArgs> | null
    where?: likePostWhereInput
    orderBy?: likePostOrderByWithRelationInput | likePostOrderByWithRelationInput[]
    cursor?: likePostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LikePostScalarFieldEnum | LikePostScalarFieldEnum[]
  }

  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: UserSelect<ExtArgs> | null
    omit?: UserOmit<ExtArgs> | null
    include?: UserInclude<ExtArgs> | null
  }


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
    where?: Oauth2UserWhereInput
    orderBy?: Oauth2UserOrderByWithRelationInput | Oauth2UserOrderByWithRelationInput[]
    cursor?: Oauth2UserWhereUniqueInput
    take?: number
    skip?: number
    _count?: true | Oauth2UserCountAggregateInputType
    _min?: Oauth2UserMinAggregateInputType
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
    findUnique<T extends Oauth2UserFindUniqueArgs>(args: SelectSubset<T, Oauth2UserFindUniqueArgs<ExtArgs>>): Prisma__Oauth2UserClient<$Result.GetResult<Prisma.$Oauth2UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findUniqueOrThrow<T extends Oauth2UserFindUniqueOrThrowArgs>(args: SelectSubset<T, Oauth2UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__Oauth2UserClient<$Result.GetResult<Prisma.$Oauth2UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findFirst<T extends Oauth2UserFindFirstArgs>(args?: SelectSubset<T, Oauth2UserFindFirstArgs<ExtArgs>>): Prisma__Oauth2UserClient<$Result.GetResult<Prisma.$Oauth2UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findFirstOrThrow<T extends Oauth2UserFindFirstOrThrowArgs>(args?: SelectSubset<T, Oauth2UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__Oauth2UserClient<$Result.GetResult<Prisma.$Oauth2UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findMany<T extends Oauth2UserFindManyArgs>(args?: SelectSubset<T, Oauth2UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Oauth2UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    create<T extends Oauth2UserCreateArgs>(args: SelectSubset<T, Oauth2UserCreateArgs<ExtArgs>>): Prisma__Oauth2UserClient<$Result.GetResult<Prisma.$Oauth2UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    createMany<T extends Oauth2UserCreateManyArgs>(args?: SelectSubset<T, Oauth2UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    createManyAndReturn<T extends Oauth2UserCreateManyAndReturnArgs>(args?: SelectSubset<T, Oauth2UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Oauth2UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    delete<T extends Oauth2UserDeleteArgs>(args: SelectSubset<T, Oauth2UserDeleteArgs<ExtArgs>>): Prisma__Oauth2UserClient<$Result.GetResult<Prisma.$Oauth2UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    update<T extends Oauth2UserUpdateArgs>(args: SelectSubset<T, Oauth2UserUpdateArgs<ExtArgs>>): Prisma__Oauth2UserClient<$Result.GetResult<Prisma.$Oauth2UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    deleteMany<T extends Oauth2UserDeleteManyArgs>(args?: SelectSubset<T, Oauth2UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    updateMany<T extends Oauth2UserUpdateManyArgs>(args: SelectSubset<T, Oauth2UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    updateManyAndReturn<T extends Oauth2UserUpdateManyAndReturnArgs>(args: SelectSubset<T, Oauth2UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Oauth2UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    upsert<T extends Oauth2UserUpsertArgs>(args: SelectSubset<T, Oauth2UserUpsertArgs<ExtArgs>>): Prisma__Oauth2UserClient<$Result.GetResult<Prisma.$Oauth2UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    count<T extends Oauth2UserCountArgs>(
      args?: Subset<T, Oauth2UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Oauth2UserCountAggregateOutputType>
        : number
    >

    aggregate<T extends Oauth2UserAggregateArgs>(args: Subset<T, Oauth2UserAggregateArgs>): Prisma.PrismaPromise<GetOauth2UserAggregateType<T>>

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
  readonly fields: Oauth2UserFieldRefs;
  }

  export interface Prisma__Oauth2UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




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
    

  
  export type Oauth2UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: Oauth2UserSelect<ExtArgs> | null
    omit?: Oauth2UserOmit<ExtArgs> | null
    include?: Oauth2UserInclude<ExtArgs> | null
    where: Oauth2UserWhereUniqueInput
  }

  export type Oauth2UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: Oauth2UserSelect<ExtArgs> | null
    omit?: Oauth2UserOmit<ExtArgs> | null
    include?: Oauth2UserInclude<ExtArgs> | null
    where: Oauth2UserWhereUniqueInput
  }

  export type Oauth2UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: Oauth2UserSelect<ExtArgs> | null
    omit?: Oauth2UserOmit<ExtArgs> | null
    include?: Oauth2UserInclude<ExtArgs> | null
    where?: Oauth2UserWhereInput
    orderBy?: Oauth2UserOrderByWithRelationInput | Oauth2UserOrderByWithRelationInput[]
    cursor?: Oauth2UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Oauth2UserScalarFieldEnum | Oauth2UserScalarFieldEnum[]
  }

  export type Oauth2UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: Oauth2UserSelect<ExtArgs> | null
    omit?: Oauth2UserOmit<ExtArgs> | null
    include?: Oauth2UserInclude<ExtArgs> | null
    where?: Oauth2UserWhereInput
    orderBy?: Oauth2UserOrderByWithRelationInput | Oauth2UserOrderByWithRelationInput[]
    cursor?: Oauth2UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Oauth2UserScalarFieldEnum | Oauth2UserScalarFieldEnum[]
  }

  export type Oauth2UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: Oauth2UserSelect<ExtArgs> | null
    omit?: Oauth2UserOmit<ExtArgs> | null
    include?: Oauth2UserInclude<ExtArgs> | null
    where?: Oauth2UserWhereInput
    orderBy?: Oauth2UserOrderByWithRelationInput | Oauth2UserOrderByWithRelationInput[]
    cursor?: Oauth2UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Oauth2UserScalarFieldEnum | Oauth2UserScalarFieldEnum[]
  }

  export type Oauth2UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: Oauth2UserSelect<ExtArgs> | null
    omit?: Oauth2UserOmit<ExtArgs> | null
    include?: Oauth2UserInclude<ExtArgs> | null
    data: XOR<Oauth2UserCreateInput, Oauth2UserUncheckedCreateInput>
  }

  export type Oauth2UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    data: Oauth2UserCreateManyInput | Oauth2UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  export type Oauth2UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: Oauth2UserSelectCreateManyAndReturn<ExtArgs> | null
    omit?: Oauth2UserOmit<ExtArgs> | null
    data: Oauth2UserCreateManyInput | Oauth2UserCreateManyInput[]
    skipDuplicates?: boolean
    include?: Oauth2UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  export type Oauth2UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: Oauth2UserSelect<ExtArgs> | null
    omit?: Oauth2UserOmit<ExtArgs> | null
    include?: Oauth2UserInclude<ExtArgs> | null
    data: XOR<Oauth2UserUpdateInput, Oauth2UserUncheckedUpdateInput>
    where: Oauth2UserWhereUniqueInput
  }

  export type Oauth2UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    data: XOR<Oauth2UserUpdateManyMutationInput, Oauth2UserUncheckedUpdateManyInput>
    where?: Oauth2UserWhereInput
    limit?: number
  }

  export type Oauth2UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: Oauth2UserSelectUpdateManyAndReturn<ExtArgs> | null
    omit?: Oauth2UserOmit<ExtArgs> | null
    data: XOR<Oauth2UserUpdateManyMutationInput, Oauth2UserUncheckedUpdateManyInput>
    where?: Oauth2UserWhereInput
    limit?: number
    include?: Oauth2UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  export type Oauth2UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: Oauth2UserSelect<ExtArgs> | null
    omit?: Oauth2UserOmit<ExtArgs> | null
    include?: Oauth2UserInclude<ExtArgs> | null
    where: Oauth2UserWhereUniqueInput
    create: XOR<Oauth2UserCreateInput, Oauth2UserUncheckedCreateInput>
    update: XOR<Oauth2UserUpdateInput, Oauth2UserUncheckedUpdateInput>
  }

  export type Oauth2UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: Oauth2UserSelect<ExtArgs> | null
    omit?: Oauth2UserOmit<ExtArgs> | null
    include?: Oauth2UserInclude<ExtArgs> | null
    where: Oauth2UserWhereUniqueInput
  }

  export type Oauth2UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Oauth2UserWhereInput
    limit?: number
  }

  export type Oauth2UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    select?: Oauth2UserSelect<ExtArgs> | null
    omit?: Oauth2UserOmit<ExtArgs> | null
    include?: Oauth2UserInclude<ExtArgs> | null
  }


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


  export const MessageScalarFieldEnum: {
    id: 'id',
    content: 'content',
    typeMessage: 'typeMessage',
    senderId: 'senderId',
    receiverId: 'receiverId',
    roomId: 'roomId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const PostScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    file: 'file',
    viewCount: 'viewCount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
    userId: 'userId',
    likeCount: 'likeCount'
  };

  export type PostScalarFieldEnum = (typeof PostScalarFieldEnum)[keyof typeof PostScalarFieldEnum]


  export const LikePostScalarFieldEnum: {
    id: 'id',
    isLike: 'isLike',
    userId: 'userId',
    postId: 'postId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type LikePostScalarFieldEnum = (typeof LikePostScalarFieldEnum)[keyof typeof LikePostScalarFieldEnum]


  export const CommentScalarFieldEnum: {
    id: 'id',
    content: 'content',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    postId: 'postId'
  };

  export type CommentScalarFieldEnum = (typeof CommentScalarFieldEnum)[keyof typeof CommentScalarFieldEnum]


  export const RoomScalarFieldEnum: {
    id: 'id',
    employeeId: 'employeeId',
    customerId: 'customerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RoomScalarFieldEnum = (typeof RoomScalarFieldEnum)[keyof typeof RoomScalarFieldEnum]


  export const MemberInRoomScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    roomId: 'roomId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MemberInRoomScalarFieldEnum = (typeof MemberInRoomScalarFieldEnum)[keyof typeof MemberInRoomScalarFieldEnum]


  export const History_searchingScalarFieldEnum: {
    id: 'id',
    symbol: 'symbol',
    currentPrice: 'currentPrice',
    previousClose: 'previousClose',
    open: 'open',
    high: 'high',
    low: 'low',
    volume: 'volume',
    marketCap: 'marketCap',
    peRatio: 'peRatio',
    eps: 'eps',
    beta: 'beta',
    yahooPrice: 'yahooPrice',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type History_searchingScalarFieldEnum = (typeof History_searchingScalarFieldEnum)[keyof typeof History_searchingScalarFieldEnum]


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
    searchCount: 'searchCount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    visible: 'visible',
    phone: 'phone',
    numberIdentity: 'numberIdentity',
    dateOfBirth: 'dateOfBirth',
    firstName: 'firstName',
    lastName: 'lastName',
    isActive: 'isActive',
    isBanned: 'isBanned',
    isLocked: 'isLocked',
    lastActived: 'lastActived',
    picture: 'picture',
    provider: 'provider'
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


  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  export type EnumTypeMessageFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TypeMessage'>
    


  export type ListEnumTypeMessageFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TypeMessage[]'>
    


  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  export type EnumAccountTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AccountType'>
    


  export type ListEnumAccountTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AccountType[]'>
    


  export type EnumUserVisibilityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserVisibility'>
    


  export type ListEnumUserVisibilityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserVisibility[]'>
    


  export type EnumProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Provider'>
    


  export type ListEnumProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Provider[]'>
    
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
    userDeviceId?: UuidFilter<"Session"> | string
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
    userDeviceId?: UuidFilter<"Session"> | string
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
    userDeviceId?: UuidWithAggregatesFilter<"Session"> | string
    hashedRefreshToken?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userIp?: StringWithAggregatesFilter<"Session"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    loginedAt?: DateTimeNullableWithAggregatesFilter<"Session"> | Date | string | null
    logoutedAt?: DateTimeNullableWithAggregatesFilter<"Session"> | Date | string | null
    userId?: UuidWithAggregatesFilter<"Session"> | string
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: UuidFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    typeMessage?: EnumTypeMessageFilter<"Message"> | $Enums.TypeMessage
    senderId?: UuidFilter<"Message"> | string
    receiverId?: UuidNullableFilter<"Message"> | string | null
    roomId?: UuidFilter<"Message"> | string
    createdAt?: DateTimeFilter<"Message"> | Date | string
    updatedAt?: DateTimeFilter<"Message"> | Date | string
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
    receiver?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    room?: XOR<RoomScalarRelationFilter, RoomWhereInput>
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    content?: SortOrder
    typeMessage?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrderInput | SortOrder
    roomId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sender?: UserOrderByWithRelationInput
    receiver?: UserOrderByWithRelationInput
    room?: RoomOrderByWithRelationInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    senderId_id?: MessageSenderIdIdCompoundUniqueInput
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    content?: StringFilter<"Message"> | string
    typeMessage?: EnumTypeMessageFilter<"Message"> | $Enums.TypeMessage
    senderId?: UuidFilter<"Message"> | string
    receiverId?: UuidNullableFilter<"Message"> | string | null
    roomId?: UuidFilter<"Message"> | string
    createdAt?: DateTimeFilter<"Message"> | Date | string
    updatedAt?: DateTimeFilter<"Message"> | Date | string
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
    receiver?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    room?: XOR<RoomScalarRelationFilter, RoomWhereInput>
  }, "id" | "senderId_id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    content?: SortOrder
    typeMessage?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrderInput | SortOrder
    roomId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Message"> | string
    content?: StringWithAggregatesFilter<"Message"> | string
    typeMessage?: EnumTypeMessageWithAggregatesFilter<"Message"> | $Enums.TypeMessage
    senderId?: UuidWithAggregatesFilter<"Message"> | string
    receiverId?: UuidNullableWithAggregatesFilter<"Message"> | string | null
    roomId?: UuidWithAggregatesFilter<"Message"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
  }

  export type PostWhereInput = {
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    id?: UuidFilter<"Post"> | string
    title?: StringFilter<"Post"> | string
    content?: StringFilter<"Post"> | string
    file?: StringNullableListFilter<"Post">
    viewCount?: IntFilter<"Post"> | number
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
    deletedAt?: DateTimeFilter<"Post"> | Date | string
    userId?: UuidFilter<"Post"> | string
    likeCount?: IntFilter<"Post"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    comments?: CommentListRelationFilter
    likes?: LikePostListRelationFilter
  }

  export type PostOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    file?: SortOrder
    viewCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    userId?: SortOrder
    likeCount?: SortOrder
    user?: UserOrderByWithRelationInput
    comments?: CommentOrderByRelationAggregateInput
    likes?: likePostOrderByRelationAggregateInput
  }

  export type PostWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    id_userId?: PostIdUserIdCompoundUniqueInput
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    title?: StringFilter<"Post"> | string
    content?: StringFilter<"Post"> | string
    file?: StringNullableListFilter<"Post">
    viewCount?: IntFilter<"Post"> | number
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
    deletedAt?: DateTimeFilter<"Post"> | Date | string
    userId?: UuidFilter<"Post"> | string
    likeCount?: IntFilter<"Post"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    comments?: CommentListRelationFilter
    likes?: LikePostListRelationFilter
  }, "id" | "id_userId">

  export type PostOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    file?: SortOrder
    viewCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    userId?: SortOrder
    likeCount?: SortOrder
    _count?: PostCountOrderByAggregateInput
    _avg?: PostAvgOrderByAggregateInput
    _max?: PostMaxOrderByAggregateInput
    _min?: PostMinOrderByAggregateInput
    _sum?: PostSumOrderByAggregateInput
  }

  export type PostScalarWhereWithAggregatesInput = {
    AND?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    OR?: PostScalarWhereWithAggregatesInput[]
    NOT?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Post"> | string
    title?: StringWithAggregatesFilter<"Post"> | string
    content?: StringWithAggregatesFilter<"Post"> | string
    file?: StringNullableListFilter<"Post">
    viewCount?: IntWithAggregatesFilter<"Post"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Post"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Post"> | Date | string
    deletedAt?: DateTimeWithAggregatesFilter<"Post"> | Date | string
    userId?: UuidWithAggregatesFilter<"Post"> | string
    likeCount?: IntWithAggregatesFilter<"Post"> | number
  }

  export type likePostWhereInput = {
    AND?: likePostWhereInput | likePostWhereInput[]
    OR?: likePostWhereInput[]
    NOT?: likePostWhereInput | likePostWhereInput[]
    id?: UuidFilter<"likePost"> | string
    isLike?: BoolFilter<"likePost"> | boolean
    userId?: UuidFilter<"likePost"> | string
    postId?: UuidFilter<"likePost"> | string
    createdAt?: DateTimeFilter<"likePost"> | Date | string
    updatedAt?: DateTimeFilter<"likePost"> | Date | string
    deletedAt?: DateTimeFilter<"likePost"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
  }

  export type likePostOrderByWithRelationInput = {
    id?: SortOrder
    isLike?: SortOrder
    userId?: SortOrder
    postId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    post?: PostOrderByWithRelationInput
  }

  export type likePostWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    id_userId?: likePostIdUserIdCompoundUniqueInput
    AND?: likePostWhereInput | likePostWhereInput[]
    OR?: likePostWhereInput[]
    NOT?: likePostWhereInput | likePostWhereInput[]
    isLike?: BoolFilter<"likePost"> | boolean
    userId?: UuidFilter<"likePost"> | string
    postId?: UuidFilter<"likePost"> | string
    createdAt?: DateTimeFilter<"likePost"> | Date | string
    updatedAt?: DateTimeFilter<"likePost"> | Date | string
    deletedAt?: DateTimeFilter<"likePost"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
  }, "id" | "id_userId">

  export type likePostOrderByWithAggregationInput = {
    id?: SortOrder
    isLike?: SortOrder
    userId?: SortOrder
    postId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    _count?: likePostCountOrderByAggregateInput
    _max?: likePostMaxOrderByAggregateInput
    _min?: likePostMinOrderByAggregateInput
  }

  export type likePostScalarWhereWithAggregatesInput = {
    AND?: likePostScalarWhereWithAggregatesInput | likePostScalarWhereWithAggregatesInput[]
    OR?: likePostScalarWhereWithAggregatesInput[]
    NOT?: likePostScalarWhereWithAggregatesInput | likePostScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"likePost"> | string
    isLike?: BoolWithAggregatesFilter<"likePost"> | boolean
    userId?: UuidWithAggregatesFilter<"likePost"> | string
    postId?: UuidWithAggregatesFilter<"likePost"> | string
    createdAt?: DateTimeWithAggregatesFilter<"likePost"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"likePost"> | Date | string
    deletedAt?: DateTimeWithAggregatesFilter<"likePost"> | Date | string
  }

  export type CommentWhereInput = {
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    id?: UuidFilter<"Comment"> | string
    content?: StringFilter<"Comment"> | string
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    updatedAt?: DateTimeFilter<"Comment"> | Date | string
    userId?: UuidFilter<"Comment"> | string
    postId?: UuidFilter<"Comment"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
  }

  export type CommentOrderByWithRelationInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    postId?: SortOrder
    user?: UserOrderByWithRelationInput
    post?: PostOrderByWithRelationInput
  }

  export type CommentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    id_userId?: CommentIdUserIdCompoundUniqueInput
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    content?: StringFilter<"Comment"> | string
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    updatedAt?: DateTimeFilter<"Comment"> | Date | string
    userId?: UuidFilter<"Comment"> | string
    postId?: UuidFilter<"Comment"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
  }, "id" | "id_userId">

  export type CommentOrderByWithAggregationInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    postId?: SortOrder
    _count?: CommentCountOrderByAggregateInput
    _max?: CommentMaxOrderByAggregateInput
    _min?: CommentMinOrderByAggregateInput
  }

  export type CommentScalarWhereWithAggregatesInput = {
    AND?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    OR?: CommentScalarWhereWithAggregatesInput[]
    NOT?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Comment"> | string
    content?: StringWithAggregatesFilter<"Comment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Comment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Comment"> | Date | string
    userId?: UuidWithAggregatesFilter<"Comment"> | string
    postId?: UuidWithAggregatesFilter<"Comment"> | string
  }

  export type RoomWhereInput = {
    AND?: RoomWhereInput | RoomWhereInput[]
    OR?: RoomWhereInput[]
    NOT?: RoomWhereInput | RoomWhereInput[]
    id?: UuidFilter<"Room"> | string
    employeeId?: UuidNullableFilter<"Room"> | string | null
    customerId?: UuidFilter<"Room"> | string
    createdAt?: DateTimeFilter<"Room"> | Date | string
    updatedAt?: DateTimeFilter<"Room"> | Date | string
    messages?: MessageListRelationFilter
    members?: MemberInRoomListRelationFilter
  }

  export type RoomOrderByWithRelationInput = {
    id?: SortOrder
    employeeId?: SortOrderInput | SortOrder
    customerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    messages?: MessageOrderByRelationAggregateInput
    members?: MemberInRoomOrderByRelationAggregateInput
  }

  export type RoomWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    employeeId_customerId?: RoomEmployeeIdCustomerIdCompoundUniqueInput
    AND?: RoomWhereInput | RoomWhereInput[]
    OR?: RoomWhereInput[]
    NOT?: RoomWhereInput | RoomWhereInput[]
    employeeId?: UuidNullableFilter<"Room"> | string | null
    customerId?: UuidFilter<"Room"> | string
    createdAt?: DateTimeFilter<"Room"> | Date | string
    updatedAt?: DateTimeFilter<"Room"> | Date | string
    messages?: MessageListRelationFilter
    members?: MemberInRoomListRelationFilter
  }, "id" | "employeeId_customerId">

  export type RoomOrderByWithAggregationInput = {
    id?: SortOrder
    employeeId?: SortOrderInput | SortOrder
    customerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RoomCountOrderByAggregateInput
    _max?: RoomMaxOrderByAggregateInput
    _min?: RoomMinOrderByAggregateInput
  }

  export type RoomScalarWhereWithAggregatesInput = {
    AND?: RoomScalarWhereWithAggregatesInput | RoomScalarWhereWithAggregatesInput[]
    OR?: RoomScalarWhereWithAggregatesInput[]
    NOT?: RoomScalarWhereWithAggregatesInput | RoomScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Room"> | string
    employeeId?: UuidNullableWithAggregatesFilter<"Room"> | string | null
    customerId?: UuidWithAggregatesFilter<"Room"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Room"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Room"> | Date | string
  }

  export type MemberInRoomWhereInput = {
    AND?: MemberInRoomWhereInput | MemberInRoomWhereInput[]
    OR?: MemberInRoomWhereInput[]
    NOT?: MemberInRoomWhereInput | MemberInRoomWhereInput[]
    id?: UuidFilter<"MemberInRoom"> | string
    userId?: UuidFilter<"MemberInRoom"> | string
    roomId?: UuidFilter<"MemberInRoom"> | string
    createdAt?: DateTimeFilter<"MemberInRoom"> | Date | string
    updatedAt?: DateTimeFilter<"MemberInRoom"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    room?: XOR<RoomScalarRelationFilter, RoomWhereInput>
  }

  export type MemberInRoomOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    roomId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    room?: RoomOrderByWithRelationInput
  }

  export type MemberInRoomWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MemberInRoomWhereInput | MemberInRoomWhereInput[]
    OR?: MemberInRoomWhereInput[]
    NOT?: MemberInRoomWhereInput | MemberInRoomWhereInput[]
    userId?: UuidFilter<"MemberInRoom"> | string
    roomId?: UuidFilter<"MemberInRoom"> | string
    createdAt?: DateTimeFilter<"MemberInRoom"> | Date | string
    updatedAt?: DateTimeFilter<"MemberInRoom"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    room?: XOR<RoomScalarRelationFilter, RoomWhereInput>
  }, "id">

  export type MemberInRoomOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    roomId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MemberInRoomCountOrderByAggregateInput
    _max?: MemberInRoomMaxOrderByAggregateInput
    _min?: MemberInRoomMinOrderByAggregateInput
  }

  export type MemberInRoomScalarWhereWithAggregatesInput = {
    AND?: MemberInRoomScalarWhereWithAggregatesInput | MemberInRoomScalarWhereWithAggregatesInput[]
    OR?: MemberInRoomScalarWhereWithAggregatesInput[]
    NOT?: MemberInRoomScalarWhereWithAggregatesInput | MemberInRoomScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"MemberInRoom"> | string
    userId?: UuidWithAggregatesFilter<"MemberInRoom"> | string
    roomId?: UuidWithAggregatesFilter<"MemberInRoom"> | string
    createdAt?: DateTimeWithAggregatesFilter<"MemberInRoom"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MemberInRoom"> | Date | string
  }

  export type history_searchingWhereInput = {
    AND?: history_searchingWhereInput | history_searchingWhereInput[]
    OR?: history_searchingWhereInput[]
    NOT?: history_searchingWhereInput | history_searchingWhereInput[]
    id?: UuidFilter<"history_searching"> | string
    symbol?: StringFilter<"history_searching"> | string
    currentPrice?: BigIntFilter<"history_searching"> | bigint | number
    previousClose?: BigIntFilter<"history_searching"> | bigint | number
    open?: BigIntFilter<"history_searching"> | bigint | number
    high?: BigIntFilter<"history_searching"> | bigint | number
    low?: BigIntFilter<"history_searching"> | bigint | number
    volume?: BigIntFilter<"history_searching"> | bigint | number
    marketCap?: BigIntFilter<"history_searching"> | bigint | number
    peRatio?: FloatFilter<"history_searching"> | number
    eps?: FloatFilter<"history_searching"> | number
    beta?: FloatFilter<"history_searching"> | number
    yahooPrice?: FloatFilter<"history_searching"> | number
    createdAt?: DateTimeFilter<"history_searching"> | Date | string
    updatedAt?: DateTimeFilter<"history_searching"> | Date | string
  }

  export type history_searchingOrderByWithRelationInput = {
    id?: SortOrder
    symbol?: SortOrder
    currentPrice?: SortOrder
    previousClose?: SortOrder
    open?: SortOrder
    high?: SortOrder
    low?: SortOrder
    volume?: SortOrder
    marketCap?: SortOrder
    peRatio?: SortOrder
    eps?: SortOrder
    beta?: SortOrder
    yahooPrice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type history_searchingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: history_searchingWhereInput | history_searchingWhereInput[]
    OR?: history_searchingWhereInput[]
    NOT?: history_searchingWhereInput | history_searchingWhereInput[]
    symbol?: StringFilter<"history_searching"> | string
    currentPrice?: BigIntFilter<"history_searching"> | bigint | number
    previousClose?: BigIntFilter<"history_searching"> | bigint | number
    open?: BigIntFilter<"history_searching"> | bigint | number
    high?: BigIntFilter<"history_searching"> | bigint | number
    low?: BigIntFilter<"history_searching"> | bigint | number
    volume?: BigIntFilter<"history_searching"> | bigint | number
    marketCap?: BigIntFilter<"history_searching"> | bigint | number
    peRatio?: FloatFilter<"history_searching"> | number
    eps?: FloatFilter<"history_searching"> | number
    beta?: FloatFilter<"history_searching"> | number
    yahooPrice?: FloatFilter<"history_searching"> | number
    createdAt?: DateTimeFilter<"history_searching"> | Date | string
    updatedAt?: DateTimeFilter<"history_searching"> | Date | string
  }, "id">

  export type history_searchingOrderByWithAggregationInput = {
    id?: SortOrder
    symbol?: SortOrder
    currentPrice?: SortOrder
    previousClose?: SortOrder
    open?: SortOrder
    high?: SortOrder
    low?: SortOrder
    volume?: SortOrder
    marketCap?: SortOrder
    peRatio?: SortOrder
    eps?: SortOrder
    beta?: SortOrder
    yahooPrice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: history_searchingCountOrderByAggregateInput
    _avg?: history_searchingAvgOrderByAggregateInput
    _max?: history_searchingMaxOrderByAggregateInput
    _min?: history_searchingMinOrderByAggregateInput
    _sum?: history_searchingSumOrderByAggregateInput
  }

  export type history_searchingScalarWhereWithAggregatesInput = {
    AND?: history_searchingScalarWhereWithAggregatesInput | history_searchingScalarWhereWithAggregatesInput[]
    OR?: history_searchingScalarWhereWithAggregatesInput[]
    NOT?: history_searchingScalarWhereWithAggregatesInput | history_searchingScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"history_searching"> | string
    symbol?: StringWithAggregatesFilter<"history_searching"> | string
    currentPrice?: BigIntWithAggregatesFilter<"history_searching"> | bigint | number
    previousClose?: BigIntWithAggregatesFilter<"history_searching"> | bigint | number
    open?: BigIntWithAggregatesFilter<"history_searching"> | bigint | number
    high?: BigIntWithAggregatesFilter<"history_searching"> | bigint | number
    low?: BigIntWithAggregatesFilter<"history_searching"> | bigint | number
    volume?: BigIntWithAggregatesFilter<"history_searching"> | bigint | number
    marketCap?: BigIntWithAggregatesFilter<"history_searching"> | bigint | number
    peRatio?: FloatWithAggregatesFilter<"history_searching"> | number
    eps?: FloatWithAggregatesFilter<"history_searching"> | number
    beta?: FloatWithAggregatesFilter<"history_searching"> | number
    yahooPrice?: FloatWithAggregatesFilter<"history_searching"> | number
    createdAt?: DateTimeWithAggregatesFilter<"history_searching"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"history_searching"> | Date | string
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
    searchCount?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    visible?: EnumUserVisibilityFilter<"User"> | $Enums.UserVisibility
    phone?: StringNullableFilter<"User"> | string | null
    numberIdentity?: StringNullableFilter<"User"> | string | null
    dateOfBirth?: DateTimeNullableFilter<"User"> | Date | string | null
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    isActive?: BoolFilter<"User"> | boolean
    isBanned?: BoolFilter<"User"> | boolean
    isLocked?: BoolFilter<"User"> | boolean
    lastActived?: DateTimeNullableFilter<"User"> | Date | string | null
    picture?: StringNullableFilter<"User"> | string | null
    provider?: StringNullableFilter<"User"> | string | null
    Oauth2User?: Oauth2UserListRelationFilter
    sessions?: SessionListRelationFilter
    userDevice?: UserDeviceListRelationFilter
    senderMessage?: MessageListRelationFilter
    receiveMessage?: MessageListRelationFilter
    memberInRoom?: MemberInRoomListRelationFilter
    posts?: PostListRelationFilter
    comments?: CommentListRelationFilter
    likes?: LikePostListRelationFilter
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
    searchCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    visible?: SortOrder
    phone?: SortOrderInput | SortOrder
    numberIdentity?: SortOrderInput | SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    isActive?: SortOrder
    isBanned?: SortOrder
    isLocked?: SortOrder
    lastActived?: SortOrderInput | SortOrder
    picture?: SortOrderInput | SortOrder
    provider?: SortOrderInput | SortOrder
    Oauth2User?: Oauth2UserOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    userDevice?: UserDeviceOrderByRelationAggregateInput
    senderMessage?: MessageOrderByRelationAggregateInput
    receiveMessage?: MessageOrderByRelationAggregateInput
    memberInRoom?: MemberInRoomOrderByRelationAggregateInput
    posts?: PostOrderByRelationAggregateInput
    comments?: CommentOrderByRelationAggregateInput
    likes?: likePostOrderByRelationAggregateInput
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
    searchCount?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    visible?: EnumUserVisibilityFilter<"User"> | $Enums.UserVisibility
    phone?: StringNullableFilter<"User"> | string | null
    numberIdentity?: StringNullableFilter<"User"> | string | null
    dateOfBirth?: DateTimeNullableFilter<"User"> | Date | string | null
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    isActive?: BoolFilter<"User"> | boolean
    isBanned?: BoolFilter<"User"> | boolean
    isLocked?: BoolFilter<"User"> | boolean
    lastActived?: DateTimeNullableFilter<"User"> | Date | string | null
    picture?: StringNullableFilter<"User"> | string | null
    provider?: StringNullableFilter<"User"> | string | null
    Oauth2User?: Oauth2UserListRelationFilter
    sessions?: SessionListRelationFilter
    userDevice?: UserDeviceListRelationFilter
    senderMessage?: MessageListRelationFilter
    receiveMessage?: MessageListRelationFilter
    memberInRoom?: MemberInRoomListRelationFilter
    posts?: PostListRelationFilter
    comments?: CommentListRelationFilter
    likes?: LikePostListRelationFilter
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
    searchCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    visible?: SortOrder
    phone?: SortOrderInput | SortOrder
    numberIdentity?: SortOrderInput | SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    isActive?: SortOrder
    isBanned?: SortOrder
    isLocked?: SortOrder
    lastActived?: SortOrderInput | SortOrder
    picture?: SortOrderInput | SortOrder
    provider?: SortOrderInput | SortOrder
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
    searchCount?: IntWithAggregatesFilter<"User"> | number
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    visible?: EnumUserVisibilityWithAggregatesFilter<"User"> | $Enums.UserVisibility
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    numberIdentity?: StringNullableWithAggregatesFilter<"User"> | string | null
    dateOfBirth?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    firstName?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    isBanned?: BoolWithAggregatesFilter<"User"> | boolean
    isLocked?: BoolWithAggregatesFilter<"User"> | boolean
    lastActived?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    picture?: StringNullableWithAggregatesFilter<"User"> | string | null
    provider?: StringNullableWithAggregatesFilter<"User"> | string | null
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

  export type MessageCreateInput = {
    id?: string
    content: string
    typeMessage?: $Enums.TypeMessage
    createdAt?: Date | string
    updatedAt?: Date | string
    sender: UserCreateNestedOneWithoutSenderMessageInput
    receiver?: UserCreateNestedOneWithoutReceiveMessageInput
    room: RoomCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateInput = {
    id?: string
    content: string
    typeMessage?: $Enums.TypeMessage
    senderId: string
    receiverId?: string | null
    roomId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    typeMessage?: EnumTypeMessageFieldUpdateOperationsInput | $Enums.TypeMessage
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: UserUpdateOneRequiredWithoutSenderMessageNestedInput
    receiver?: UserUpdateOneWithoutReceiveMessageNestedInput
    room?: RoomUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    typeMessage?: EnumTypeMessageFieldUpdateOperationsInput | $Enums.TypeMessage
    senderId?: StringFieldUpdateOperationsInput | string
    receiverId?: NullableStringFieldUpdateOperationsInput | string | null
    roomId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyInput = {
    id?: string
    content: string
    typeMessage?: $Enums.TypeMessage
    senderId: string
    receiverId?: string | null
    roomId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    typeMessage?: EnumTypeMessageFieldUpdateOperationsInput | $Enums.TypeMessage
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    typeMessage?: EnumTypeMessageFieldUpdateOperationsInput | $Enums.TypeMessage
    senderId?: StringFieldUpdateOperationsInput | string
    receiverId?: NullableStringFieldUpdateOperationsInput | string | null
    roomId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostCreateInput = {
    id?: string
    title: string
    content: string
    file?: PostCreatefileInput | string[]
    viewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string
    likeCount?: number
    user: UserCreateNestedOneWithoutPostsInput
    comments?: CommentCreateNestedManyWithoutPostInput
    likes?: likePostCreateNestedManyWithoutPostInput
  }

  export type PostUncheckedCreateInput = {
    id?: string
    title: string
    content: string
    file?: PostCreatefileInput | string[]
    viewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string
    userId: string
    likeCount?: number
    comments?: CommentUncheckedCreateNestedManyWithoutPostInput
    likes?: likePostUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    file?: PostUpdatefileInput | string[]
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    likeCount?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneRequiredWithoutPostsNestedInput
    comments?: CommentUpdateManyWithoutPostNestedInput
    likes?: likePostUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    file?: PostUpdatefileInput | string[]
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    likeCount?: IntFieldUpdateOperationsInput | number
    comments?: CommentUncheckedUpdateManyWithoutPostNestedInput
    likes?: likePostUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostCreateManyInput = {
    id?: string
    title: string
    content: string
    file?: PostCreatefileInput | string[]
    viewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string
    userId: string
    likeCount?: number
  }

  export type PostUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    file?: PostUpdatefileInput | string[]
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    likeCount?: IntFieldUpdateOperationsInput | number
  }

  export type PostUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    file?: PostUpdatefileInput | string[]
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    likeCount?: IntFieldUpdateOperationsInput | number
  }

  export type likePostCreateInput = {
    id?: string
    isLike?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string
    user: UserCreateNestedOneWithoutLikesInput
    post: PostCreateNestedOneWithoutLikesInput
  }

  export type likePostUncheckedCreateInput = {
    id?: string
    isLike?: boolean
    userId: string
    postId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string
  }

  export type likePostUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    isLike?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLikesNestedInput
    post?: PostUpdateOneRequiredWithoutLikesNestedInput
  }

  export type likePostUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    isLike?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    postId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type likePostCreateManyInput = {
    id?: string
    isLike?: boolean
    userId: string
    postId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string
  }

  export type likePostUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    isLike?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type likePostUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    isLike?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    postId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentCreateInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCommentsInput
    post: PostCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    postId: string
  }

  export type CommentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCommentsNestedInput
    post?: PostUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    postId?: StringFieldUpdateOperationsInput | string
  }

  export type CommentCreateManyInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    postId: string
  }

  export type CommentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    postId?: StringFieldUpdateOperationsInput | string
  }

  export type RoomCreateInput = {
    id?: string
    employeeId?: string | null
    customerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageCreateNestedManyWithoutRoomInput
    members?: MemberInRoomCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateInput = {
    id?: string
    employeeId?: string | null
    customerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutRoomInput
    members?: MemberInRoomUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    customerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUpdateManyWithoutRoomNestedInput
    members?: MemberInRoomUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    customerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutRoomNestedInput
    members?: MemberInRoomUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type RoomCreateManyInput = {
    id?: string
    employeeId?: string | null
    customerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    customerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    customerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberInRoomCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMemberInRoomInput
    room: RoomCreateNestedOneWithoutMembersInput
  }

  export type MemberInRoomUncheckedCreateInput = {
    id?: string
    userId: string
    roomId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberInRoomUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMemberInRoomNestedInput
    room?: RoomUpdateOneRequiredWithoutMembersNestedInput
  }

  export type MemberInRoomUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberInRoomCreateManyInput = {
    id?: string
    userId: string
    roomId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberInRoomUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberInRoomUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type history_searchingCreateInput = {
    id?: string
    symbol: string
    currentPrice: bigint | number
    previousClose: bigint | number
    open: bigint | number
    high: bigint | number
    low: bigint | number
    volume: bigint | number
    marketCap: bigint | number
    peRatio: number
    eps: number
    beta: number
    yahooPrice: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type history_searchingUncheckedCreateInput = {
    id?: string
    symbol: string
    currentPrice: bigint | number
    previousClose: bigint | number
    open: bigint | number
    high: bigint | number
    low: bigint | number
    volume: bigint | number
    marketCap: bigint | number
    peRatio: number
    eps: number
    beta: number
    yahooPrice: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type history_searchingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    currentPrice?: BigIntFieldUpdateOperationsInput | bigint | number
    previousClose?: BigIntFieldUpdateOperationsInput | bigint | number
    open?: BigIntFieldUpdateOperationsInput | bigint | number
    high?: BigIntFieldUpdateOperationsInput | bigint | number
    low?: BigIntFieldUpdateOperationsInput | bigint | number
    volume?: BigIntFieldUpdateOperationsInput | bigint | number
    marketCap?: BigIntFieldUpdateOperationsInput | bigint | number
    peRatio?: FloatFieldUpdateOperationsInput | number
    eps?: FloatFieldUpdateOperationsInput | number
    beta?: FloatFieldUpdateOperationsInput | number
    yahooPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type history_searchingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    currentPrice?: BigIntFieldUpdateOperationsInput | bigint | number
    previousClose?: BigIntFieldUpdateOperationsInput | bigint | number
    open?: BigIntFieldUpdateOperationsInput | bigint | number
    high?: BigIntFieldUpdateOperationsInput | bigint | number
    low?: BigIntFieldUpdateOperationsInput | bigint | number
    volume?: BigIntFieldUpdateOperationsInput | bigint | number
    marketCap?: BigIntFieldUpdateOperationsInput | bigint | number
    peRatio?: FloatFieldUpdateOperationsInput | number
    eps?: FloatFieldUpdateOperationsInput | number
    beta?: FloatFieldUpdateOperationsInput | number
    yahooPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type history_searchingCreateManyInput = {
    id?: string
    symbol: string
    currentPrice: bigint | number
    previousClose: bigint | number
    open: bigint | number
    high: bigint | number
    low: bigint | number
    volume: bigint | number
    marketCap: bigint | number
    peRatio: number
    eps: number
    beta: number
    yahooPrice: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type history_searchingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    currentPrice?: BigIntFieldUpdateOperationsInput | bigint | number
    previousClose?: BigIntFieldUpdateOperationsInput | bigint | number
    open?: BigIntFieldUpdateOperationsInput | bigint | number
    high?: BigIntFieldUpdateOperationsInput | bigint | number
    low?: BigIntFieldUpdateOperationsInput | bigint | number
    volume?: BigIntFieldUpdateOperationsInput | bigint | number
    marketCap?: BigIntFieldUpdateOperationsInput | bigint | number
    peRatio?: FloatFieldUpdateOperationsInput | number
    eps?: FloatFieldUpdateOperationsInput | number
    beta?: FloatFieldUpdateOperationsInput | number
    yahooPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type history_searchingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    currentPrice?: BigIntFieldUpdateOperationsInput | bigint | number
    previousClose?: BigIntFieldUpdateOperationsInput | bigint | number
    open?: BigIntFieldUpdateOperationsInput | bigint | number
    high?: BigIntFieldUpdateOperationsInput | bigint | number
    low?: BigIntFieldUpdateOperationsInput | bigint | number
    volume?: BigIntFieldUpdateOperationsInput | bigint | number
    marketCap?: BigIntFieldUpdateOperationsInput | bigint | number
    peRatio?: FloatFieldUpdateOperationsInput | number
    eps?: FloatFieldUpdateOperationsInput | number
    beta?: FloatFieldUpdateOperationsInput | number
    yahooPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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
    searchCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    visible?: $Enums.UserVisibility
    phone?: string | null
    numberIdentity?: string | null
    dateOfBirth?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    lastActived?: Date | string | null
    picture?: string | null
    provider?: string | null
    Oauth2User?: Oauth2UserCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    userDevice?: UserDeviceCreateNestedManyWithoutUserInput
    senderMessage?: MessageCreateNestedManyWithoutSenderInput
    receiveMessage?: MessageCreateNestedManyWithoutReceiverInput
    memberInRoom?: MemberInRoomCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
    likes?: likePostCreateNestedManyWithoutUserInput
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
    searchCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    visible?: $Enums.UserVisibility
    phone?: string | null
    numberIdentity?: string | null
    dateOfBirth?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    lastActived?: Date | string | null
    picture?: string | null
    provider?: string | null
    Oauth2User?: Oauth2UserUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    userDevice?: UserDeviceUncheckedCreateNestedManyWithoutUserInput
    senderMessage?: MessageUncheckedCreateNestedManyWithoutSenderInput
    receiveMessage?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    memberInRoom?: MemberInRoomUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    likes?: likePostUncheckedCreateNestedManyWithoutUserInput
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
    searchCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visible?: EnumUserVisibilityFieldUpdateOperationsInput | $Enums.UserVisibility
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    numberIdentity?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    lastActived?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    Oauth2User?: Oauth2UserUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    userDevice?: UserDeviceUpdateManyWithoutUserNestedInput
    senderMessage?: MessageUpdateManyWithoutSenderNestedInput
    receiveMessage?: MessageUpdateManyWithoutReceiverNestedInput
    memberInRoom?: MemberInRoomUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    likes?: likePostUpdateManyWithoutUserNestedInput
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
    searchCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visible?: EnumUserVisibilityFieldUpdateOperationsInput | $Enums.UserVisibility
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    numberIdentity?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    lastActived?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    Oauth2User?: Oauth2UserUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    userDevice?: UserDeviceUncheckedUpdateManyWithoutUserNestedInput
    senderMessage?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    receiveMessage?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    memberInRoom?: MemberInRoomUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    likes?: likePostUncheckedUpdateManyWithoutUserNestedInput
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
    searchCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    visible?: $Enums.UserVisibility
    phone?: string | null
    numberIdentity?: string | null
    dateOfBirth?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    lastActived?: Date | string | null
    picture?: string | null
    provider?: string | null
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
    searchCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visible?: EnumUserVisibilityFieldUpdateOperationsInput | $Enums.UserVisibility
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    numberIdentity?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    lastActived?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
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
    searchCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visible?: EnumUserVisibilityFieldUpdateOperationsInput | $Enums.UserVisibility
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    numberIdentity?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    lastActived?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type EnumTypeMessageFilter<$PrismaModel = never> = {
    equals?: $Enums.TypeMessage | EnumTypeMessageFieldRefInput<$PrismaModel>
    in?: $Enums.TypeMessage[] | ListEnumTypeMessageFieldRefInput<$PrismaModel>
    notIn?: $Enums.TypeMessage[] | ListEnumTypeMessageFieldRefInput<$PrismaModel>
    not?: NestedEnumTypeMessageFilter<$PrismaModel> | $Enums.TypeMessage
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type RoomScalarRelationFilter = {
    is?: RoomWhereInput
    isNot?: RoomWhereInput
  }

  export type MessageSenderIdIdCompoundUniqueInput = {
    senderId: string
    id: string
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    typeMessage?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    roomId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    typeMessage?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    roomId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    typeMessage?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    roomId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumTypeMessageWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TypeMessage | EnumTypeMessageFieldRefInput<$PrismaModel>
    in?: $Enums.TypeMessage[] | ListEnumTypeMessageFieldRefInput<$PrismaModel>
    notIn?: $Enums.TypeMessage[] | ListEnumTypeMessageFieldRefInput<$PrismaModel>
    not?: NestedEnumTypeMessageWithAggregatesFilter<$PrismaModel> | $Enums.TypeMessage
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTypeMessageFilter<$PrismaModel>
    _max?: NestedEnumTypeMessageFilter<$PrismaModel>
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
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

  export type CommentListRelationFilter = {
    every?: CommentWhereInput
    some?: CommentWhereInput
    none?: CommentWhereInput
  }

  export type LikePostListRelationFilter = {
    every?: likePostWhereInput
    some?: likePostWhereInput
    none?: likePostWhereInput
  }

  export type CommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type likePostOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PostIdUserIdCompoundUniqueInput = {
    id: string
    userId: string
  }

  export type PostCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    file?: SortOrder
    viewCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    userId?: SortOrder
    likeCount?: SortOrder
  }

  export type PostAvgOrderByAggregateInput = {
    viewCount?: SortOrder
    likeCount?: SortOrder
  }

  export type PostMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    viewCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    userId?: SortOrder
    likeCount?: SortOrder
  }

  export type PostMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    viewCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    userId?: SortOrder
    likeCount?: SortOrder
  }

  export type PostSumOrderByAggregateInput = {
    viewCount?: SortOrder
    likeCount?: SortOrder
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type PostScalarRelationFilter = {
    is?: PostWhereInput
    isNot?: PostWhereInput
  }

  export type likePostIdUserIdCompoundUniqueInput = {
    id: string
    userId: string
  }

  export type likePostCountOrderByAggregateInput = {
    id?: SortOrder
    isLike?: SortOrder
    userId?: SortOrder
    postId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type likePostMaxOrderByAggregateInput = {
    id?: SortOrder
    isLike?: SortOrder
    userId?: SortOrder
    postId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type likePostMinOrderByAggregateInput = {
    id?: SortOrder
    isLike?: SortOrder
    userId?: SortOrder
    postId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type CommentIdUserIdCompoundUniqueInput = {
    id: string
    userId: string
  }

  export type CommentCountOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    postId?: SortOrder
  }

  export type CommentMaxOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    postId?: SortOrder
  }

  export type CommentMinOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    postId?: SortOrder
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type MemberInRoomListRelationFilter = {
    every?: MemberInRoomWhereInput
    some?: MemberInRoomWhereInput
    none?: MemberInRoomWhereInput
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MemberInRoomOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoomEmployeeIdCustomerIdCompoundUniqueInput = {
    employeeId: string
    customerId: string
  }

  export type RoomCountOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    customerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomMaxOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    customerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomMinOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    customerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MemberInRoomCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    roomId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MemberInRoomMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    roomId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MemberInRoomMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    roomId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type history_searchingCountOrderByAggregateInput = {
    id?: SortOrder
    symbol?: SortOrder
    currentPrice?: SortOrder
    previousClose?: SortOrder
    open?: SortOrder
    high?: SortOrder
    low?: SortOrder
    volume?: SortOrder
    marketCap?: SortOrder
    peRatio?: SortOrder
    eps?: SortOrder
    beta?: SortOrder
    yahooPrice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type history_searchingAvgOrderByAggregateInput = {
    currentPrice?: SortOrder
    previousClose?: SortOrder
    open?: SortOrder
    high?: SortOrder
    low?: SortOrder
    volume?: SortOrder
    marketCap?: SortOrder
    peRatio?: SortOrder
    eps?: SortOrder
    beta?: SortOrder
    yahooPrice?: SortOrder
  }

  export type history_searchingMaxOrderByAggregateInput = {
    id?: SortOrder
    symbol?: SortOrder
    currentPrice?: SortOrder
    previousClose?: SortOrder
    open?: SortOrder
    high?: SortOrder
    low?: SortOrder
    volume?: SortOrder
    marketCap?: SortOrder
    peRatio?: SortOrder
    eps?: SortOrder
    beta?: SortOrder
    yahooPrice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type history_searchingMinOrderByAggregateInput = {
    id?: SortOrder
    symbol?: SortOrder
    currentPrice?: SortOrder
    previousClose?: SortOrder
    open?: SortOrder
    high?: SortOrder
    low?: SortOrder
    volume?: SortOrder
    marketCap?: SortOrder
    peRatio?: SortOrder
    eps?: SortOrder
    beta?: SortOrder
    yahooPrice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type history_searchingSumOrderByAggregateInput = {
    currentPrice?: SortOrder
    previousClose?: SortOrder
    open?: SortOrder
    high?: SortOrder
    low?: SortOrder
    volume?: SortOrder
    marketCap?: SortOrder
    peRatio?: SortOrder
    eps?: SortOrder
    beta?: SortOrder
    yahooPrice?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumAccountTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountType | EnumAccountTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAccountTypeFilter<$PrismaModel> | $Enums.AccountType
  }

  export type EnumUserVisibilityFilter<$PrismaModel = never> = {
    equals?: $Enums.UserVisibility | EnumUserVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.UserVisibility[] | ListEnumUserVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserVisibility[] | ListEnumUserVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumUserVisibilityFilter<$PrismaModel> | $Enums.UserVisibility
  }

  export type Oauth2UserListRelationFilter = {
    every?: Oauth2UserWhereInput
    some?: Oauth2UserWhereInput
    none?: Oauth2UserWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type UserDeviceListRelationFilter = {
    every?: UserDeviceWhereInput
    some?: UserDeviceWhereInput
    none?: UserDeviceWhereInput
  }

  export type PostListRelationFilter = {
    every?: PostWhereInput
    some?: PostWhereInput
    none?: PostWhereInput
  }

  export type Oauth2UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserDeviceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PostOrderByRelationAggregateInput = {
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
    searchCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    visible?: SortOrder
    phone?: SortOrder
    numberIdentity?: SortOrder
    dateOfBirth?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    isActive?: SortOrder
    isBanned?: SortOrder
    isLocked?: SortOrder
    lastActived?: SortOrder
    picture?: SortOrder
    provider?: SortOrder
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
    searchCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    visible?: SortOrder
    phone?: SortOrder
    numberIdentity?: SortOrder
    dateOfBirth?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    isActive?: SortOrder
    isBanned?: SortOrder
    isLocked?: SortOrder
    lastActived?: SortOrder
    picture?: SortOrder
    provider?: SortOrder
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
    searchCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    visible?: SortOrder
    phone?: SortOrder
    numberIdentity?: SortOrder
    dateOfBirth?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    isActive?: SortOrder
    isBanned?: SortOrder
    isLocked?: SortOrder
    lastActived?: SortOrder
    picture?: SortOrder
    provider?: SortOrder
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

  export type EnumUserVisibilityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserVisibility | EnumUserVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.UserVisibility[] | ListEnumUserVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserVisibility[] | ListEnumUserVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumUserVisibilityWithAggregatesFilter<$PrismaModel> | $Enums.UserVisibility
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserVisibilityFilter<$PrismaModel>
    _max?: NestedEnumUserVisibilityFilter<$PrismaModel>
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

  export type UserCreateNestedOneWithoutSenderMessageInput = {
    create?: XOR<UserCreateWithoutSenderMessageInput, UserUncheckedCreateWithoutSenderMessageInput>
    connectOrCreate?: UserCreateOrConnectWithoutSenderMessageInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReceiveMessageInput = {
    create?: XOR<UserCreateWithoutReceiveMessageInput, UserUncheckedCreateWithoutReceiveMessageInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceiveMessageInput
    connect?: UserWhereUniqueInput
  }

  export type RoomCreateNestedOneWithoutMessagesInput = {
    create?: XOR<RoomCreateWithoutMessagesInput, RoomUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: RoomCreateOrConnectWithoutMessagesInput
    connect?: RoomWhereUniqueInput
  }

  export type EnumTypeMessageFieldUpdateOperationsInput = {
    set?: $Enums.TypeMessage
  }

  export type UserUpdateOneRequiredWithoutSenderMessageNestedInput = {
    create?: XOR<UserCreateWithoutSenderMessageInput, UserUncheckedCreateWithoutSenderMessageInput>
    connectOrCreate?: UserCreateOrConnectWithoutSenderMessageInput
    upsert?: UserUpsertWithoutSenderMessageInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSenderMessageInput, UserUpdateWithoutSenderMessageInput>, UserUncheckedUpdateWithoutSenderMessageInput>
  }

  export type UserUpdateOneWithoutReceiveMessageNestedInput = {
    create?: XOR<UserCreateWithoutReceiveMessageInput, UserUncheckedCreateWithoutReceiveMessageInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceiveMessageInput
    upsert?: UserUpsertWithoutReceiveMessageInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReceiveMessageInput, UserUpdateWithoutReceiveMessageInput>, UserUncheckedUpdateWithoutReceiveMessageInput>
  }

  export type RoomUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<RoomCreateWithoutMessagesInput, RoomUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: RoomCreateOrConnectWithoutMessagesInput
    upsert?: RoomUpsertWithoutMessagesInput
    connect?: RoomWhereUniqueInput
    update?: XOR<XOR<RoomUpdateToOneWithWhereWithoutMessagesInput, RoomUpdateWithoutMessagesInput>, RoomUncheckedUpdateWithoutMessagesInput>
  }

  export type PostCreatefileInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutPostsInput = {
    create?: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput
    connect?: UserWhereUniqueInput
  }

  export type CommentCreateNestedManyWithoutPostInput = {
    create?: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput> | CommentCreateWithoutPostInput[] | CommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutPostInput | CommentCreateOrConnectWithoutPostInput[]
    createMany?: CommentCreateManyPostInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type likePostCreateNestedManyWithoutPostInput = {
    create?: XOR<likePostCreateWithoutPostInput, likePostUncheckedCreateWithoutPostInput> | likePostCreateWithoutPostInput[] | likePostUncheckedCreateWithoutPostInput[]
    connectOrCreate?: likePostCreateOrConnectWithoutPostInput | likePostCreateOrConnectWithoutPostInput[]
    createMany?: likePostCreateManyPostInputEnvelope
    connect?: likePostWhereUniqueInput | likePostWhereUniqueInput[]
  }

  export type CommentUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput> | CommentCreateWithoutPostInput[] | CommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutPostInput | CommentCreateOrConnectWithoutPostInput[]
    createMany?: CommentCreateManyPostInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type likePostUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<likePostCreateWithoutPostInput, likePostUncheckedCreateWithoutPostInput> | likePostCreateWithoutPostInput[] | likePostUncheckedCreateWithoutPostInput[]
    connectOrCreate?: likePostCreateOrConnectWithoutPostInput | likePostCreateOrConnectWithoutPostInput[]
    createMany?: likePostCreateManyPostInputEnvelope
    connect?: likePostWhereUniqueInput | likePostWhereUniqueInput[]
  }

  export type PostUpdatefileInput = {
    set?: string[]
    push?: string | string[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutPostsNestedInput = {
    create?: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput
    upsert?: UserUpsertWithoutPostsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPostsInput, UserUpdateWithoutPostsInput>, UserUncheckedUpdateWithoutPostsInput>
  }

  export type CommentUpdateManyWithoutPostNestedInput = {
    create?: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput> | CommentCreateWithoutPostInput[] | CommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutPostInput | CommentCreateOrConnectWithoutPostInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutPostInput | CommentUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: CommentCreateManyPostInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutPostInput | CommentUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutPostInput | CommentUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type likePostUpdateManyWithoutPostNestedInput = {
    create?: XOR<likePostCreateWithoutPostInput, likePostUncheckedCreateWithoutPostInput> | likePostCreateWithoutPostInput[] | likePostUncheckedCreateWithoutPostInput[]
    connectOrCreate?: likePostCreateOrConnectWithoutPostInput | likePostCreateOrConnectWithoutPostInput[]
    upsert?: likePostUpsertWithWhereUniqueWithoutPostInput | likePostUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: likePostCreateManyPostInputEnvelope
    set?: likePostWhereUniqueInput | likePostWhereUniqueInput[]
    disconnect?: likePostWhereUniqueInput | likePostWhereUniqueInput[]
    delete?: likePostWhereUniqueInput | likePostWhereUniqueInput[]
    connect?: likePostWhereUniqueInput | likePostWhereUniqueInput[]
    update?: likePostUpdateWithWhereUniqueWithoutPostInput | likePostUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: likePostUpdateManyWithWhereWithoutPostInput | likePostUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: likePostScalarWhereInput | likePostScalarWhereInput[]
  }

  export type CommentUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput> | CommentCreateWithoutPostInput[] | CommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutPostInput | CommentCreateOrConnectWithoutPostInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutPostInput | CommentUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: CommentCreateManyPostInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutPostInput | CommentUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutPostInput | CommentUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type likePostUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<likePostCreateWithoutPostInput, likePostUncheckedCreateWithoutPostInput> | likePostCreateWithoutPostInput[] | likePostUncheckedCreateWithoutPostInput[]
    connectOrCreate?: likePostCreateOrConnectWithoutPostInput | likePostCreateOrConnectWithoutPostInput[]
    upsert?: likePostUpsertWithWhereUniqueWithoutPostInput | likePostUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: likePostCreateManyPostInputEnvelope
    set?: likePostWhereUniqueInput | likePostWhereUniqueInput[]
    disconnect?: likePostWhereUniqueInput | likePostWhereUniqueInput[]
    delete?: likePostWhereUniqueInput | likePostWhereUniqueInput[]
    connect?: likePostWhereUniqueInput | likePostWhereUniqueInput[]
    update?: likePostUpdateWithWhereUniqueWithoutPostInput | likePostUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: likePostUpdateManyWithWhereWithoutPostInput | likePostUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: likePostScalarWhereInput | likePostScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutLikesInput = {
    create?: XOR<UserCreateWithoutLikesInput, UserUncheckedCreateWithoutLikesInput>
    connectOrCreate?: UserCreateOrConnectWithoutLikesInput
    connect?: UserWhereUniqueInput
  }

  export type PostCreateNestedOneWithoutLikesInput = {
    create?: XOR<PostCreateWithoutLikesInput, PostUncheckedCreateWithoutLikesInput>
    connectOrCreate?: PostCreateOrConnectWithoutLikesInput
    connect?: PostWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutLikesNestedInput = {
    create?: XOR<UserCreateWithoutLikesInput, UserUncheckedCreateWithoutLikesInput>
    connectOrCreate?: UserCreateOrConnectWithoutLikesInput
    upsert?: UserUpsertWithoutLikesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLikesInput, UserUpdateWithoutLikesInput>, UserUncheckedUpdateWithoutLikesInput>
  }

  export type PostUpdateOneRequiredWithoutLikesNestedInput = {
    create?: XOR<PostCreateWithoutLikesInput, PostUncheckedCreateWithoutLikesInput>
    connectOrCreate?: PostCreateOrConnectWithoutLikesInput
    upsert?: PostUpsertWithoutLikesInput
    connect?: PostWhereUniqueInput
    update?: XOR<XOR<PostUpdateToOneWithWhereWithoutLikesInput, PostUpdateWithoutLikesInput>, PostUncheckedUpdateWithoutLikesInput>
  }

  export type UserCreateNestedOneWithoutCommentsInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput
    connect?: UserWhereUniqueInput
  }

  export type PostCreateNestedOneWithoutCommentsInput = {
    create?: XOR<PostCreateWithoutCommentsInput, PostUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: PostCreateOrConnectWithoutCommentsInput
    connect?: PostWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput
    upsert?: UserUpsertWithoutCommentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCommentsInput, UserUpdateWithoutCommentsInput>, UserUncheckedUpdateWithoutCommentsInput>
  }

  export type PostUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<PostCreateWithoutCommentsInput, PostUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: PostCreateOrConnectWithoutCommentsInput
    upsert?: PostUpsertWithoutCommentsInput
    connect?: PostWhereUniqueInput
    update?: XOR<XOR<PostUpdateToOneWithWhereWithoutCommentsInput, PostUpdateWithoutCommentsInput>, PostUncheckedUpdateWithoutCommentsInput>
  }

  export type MessageCreateNestedManyWithoutRoomInput = {
    create?: XOR<MessageCreateWithoutRoomInput, MessageUncheckedCreateWithoutRoomInput> | MessageCreateWithoutRoomInput[] | MessageUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutRoomInput | MessageCreateOrConnectWithoutRoomInput[]
    createMany?: MessageCreateManyRoomInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type MemberInRoomCreateNestedManyWithoutRoomInput = {
    create?: XOR<MemberInRoomCreateWithoutRoomInput, MemberInRoomUncheckedCreateWithoutRoomInput> | MemberInRoomCreateWithoutRoomInput[] | MemberInRoomUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: MemberInRoomCreateOrConnectWithoutRoomInput | MemberInRoomCreateOrConnectWithoutRoomInput[]
    createMany?: MemberInRoomCreateManyRoomInputEnvelope
    connect?: MemberInRoomWhereUniqueInput | MemberInRoomWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<MessageCreateWithoutRoomInput, MessageUncheckedCreateWithoutRoomInput> | MessageCreateWithoutRoomInput[] | MessageUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutRoomInput | MessageCreateOrConnectWithoutRoomInput[]
    createMany?: MessageCreateManyRoomInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type MemberInRoomUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<MemberInRoomCreateWithoutRoomInput, MemberInRoomUncheckedCreateWithoutRoomInput> | MemberInRoomCreateWithoutRoomInput[] | MemberInRoomUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: MemberInRoomCreateOrConnectWithoutRoomInput | MemberInRoomCreateOrConnectWithoutRoomInput[]
    createMany?: MemberInRoomCreateManyRoomInputEnvelope
    connect?: MemberInRoomWhereUniqueInput | MemberInRoomWhereUniqueInput[]
  }

  export type MessageUpdateManyWithoutRoomNestedInput = {
    create?: XOR<MessageCreateWithoutRoomInput, MessageUncheckedCreateWithoutRoomInput> | MessageCreateWithoutRoomInput[] | MessageUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutRoomInput | MessageCreateOrConnectWithoutRoomInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutRoomInput | MessageUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: MessageCreateManyRoomInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutRoomInput | MessageUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutRoomInput | MessageUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type MemberInRoomUpdateManyWithoutRoomNestedInput = {
    create?: XOR<MemberInRoomCreateWithoutRoomInput, MemberInRoomUncheckedCreateWithoutRoomInput> | MemberInRoomCreateWithoutRoomInput[] | MemberInRoomUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: MemberInRoomCreateOrConnectWithoutRoomInput | MemberInRoomCreateOrConnectWithoutRoomInput[]
    upsert?: MemberInRoomUpsertWithWhereUniqueWithoutRoomInput | MemberInRoomUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: MemberInRoomCreateManyRoomInputEnvelope
    set?: MemberInRoomWhereUniqueInput | MemberInRoomWhereUniqueInput[]
    disconnect?: MemberInRoomWhereUniqueInput | MemberInRoomWhereUniqueInput[]
    delete?: MemberInRoomWhereUniqueInput | MemberInRoomWhereUniqueInput[]
    connect?: MemberInRoomWhereUniqueInput | MemberInRoomWhereUniqueInput[]
    update?: MemberInRoomUpdateWithWhereUniqueWithoutRoomInput | MemberInRoomUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: MemberInRoomUpdateManyWithWhereWithoutRoomInput | MemberInRoomUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: MemberInRoomScalarWhereInput | MemberInRoomScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<MessageCreateWithoutRoomInput, MessageUncheckedCreateWithoutRoomInput> | MessageCreateWithoutRoomInput[] | MessageUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutRoomInput | MessageCreateOrConnectWithoutRoomInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutRoomInput | MessageUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: MessageCreateManyRoomInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutRoomInput | MessageUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutRoomInput | MessageUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type MemberInRoomUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<MemberInRoomCreateWithoutRoomInput, MemberInRoomUncheckedCreateWithoutRoomInput> | MemberInRoomCreateWithoutRoomInput[] | MemberInRoomUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: MemberInRoomCreateOrConnectWithoutRoomInput | MemberInRoomCreateOrConnectWithoutRoomInput[]
    upsert?: MemberInRoomUpsertWithWhereUniqueWithoutRoomInput | MemberInRoomUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: MemberInRoomCreateManyRoomInputEnvelope
    set?: MemberInRoomWhereUniqueInput | MemberInRoomWhereUniqueInput[]
    disconnect?: MemberInRoomWhereUniqueInput | MemberInRoomWhereUniqueInput[]
    delete?: MemberInRoomWhereUniqueInput | MemberInRoomWhereUniqueInput[]
    connect?: MemberInRoomWhereUniqueInput | MemberInRoomWhereUniqueInput[]
    update?: MemberInRoomUpdateWithWhereUniqueWithoutRoomInput | MemberInRoomUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: MemberInRoomUpdateManyWithWhereWithoutRoomInput | MemberInRoomUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: MemberInRoomScalarWhereInput | MemberInRoomScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutMemberInRoomInput = {
    create?: XOR<UserCreateWithoutMemberInRoomInput, UserUncheckedCreateWithoutMemberInRoomInput>
    connectOrCreate?: UserCreateOrConnectWithoutMemberInRoomInput
    connect?: UserWhereUniqueInput
  }

  export type RoomCreateNestedOneWithoutMembersInput = {
    create?: XOR<RoomCreateWithoutMembersInput, RoomUncheckedCreateWithoutMembersInput>
    connectOrCreate?: RoomCreateOrConnectWithoutMembersInput
    connect?: RoomWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutMemberInRoomNestedInput = {
    create?: XOR<UserCreateWithoutMemberInRoomInput, UserUncheckedCreateWithoutMemberInRoomInput>
    connectOrCreate?: UserCreateOrConnectWithoutMemberInRoomInput
    upsert?: UserUpsertWithoutMemberInRoomInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMemberInRoomInput, UserUpdateWithoutMemberInRoomInput>, UserUncheckedUpdateWithoutMemberInRoomInput>
  }

  export type RoomUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<RoomCreateWithoutMembersInput, RoomUncheckedCreateWithoutMembersInput>
    connectOrCreate?: RoomCreateOrConnectWithoutMembersInput
    upsert?: RoomUpsertWithoutMembersInput
    connect?: RoomWhereUniqueInput
    update?: XOR<XOR<RoomUpdateToOneWithWhereWithoutMembersInput, RoomUpdateWithoutMembersInput>, RoomUncheckedUpdateWithoutMembersInput>
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type Oauth2UserCreateNestedManyWithoutUserInput = {
    create?: XOR<Oauth2UserCreateWithoutUserInput, Oauth2UserUncheckedCreateWithoutUserInput> | Oauth2UserCreateWithoutUserInput[] | Oauth2UserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: Oauth2UserCreateOrConnectWithoutUserInput | Oauth2UserCreateOrConnectWithoutUserInput[]
    createMany?: Oauth2UserCreateManyUserInputEnvelope
    connect?: Oauth2UserWhereUniqueInput | Oauth2UserWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type UserDeviceCreateNestedManyWithoutUserInput = {
    create?: XOR<UserDeviceCreateWithoutUserInput, UserDeviceUncheckedCreateWithoutUserInput> | UserDeviceCreateWithoutUserInput[] | UserDeviceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserDeviceCreateOrConnectWithoutUserInput | UserDeviceCreateOrConnectWithoutUserInput[]
    createMany?: UserDeviceCreateManyUserInputEnvelope
    connect?: UserDeviceWhereUniqueInput | UserDeviceWhereUniqueInput[]
  }

  export type MessageCreateNestedManyWithoutSenderInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type MessageCreateNestedManyWithoutReceiverInput = {
    create?: XOR<MessageCreateWithoutReceiverInput, MessageUncheckedCreateWithoutReceiverInput> | MessageCreateWithoutReceiverInput[] | MessageUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutReceiverInput | MessageCreateOrConnectWithoutReceiverInput[]
    createMany?: MessageCreateManyReceiverInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type MemberInRoomCreateNestedManyWithoutUserInput = {
    create?: XOR<MemberInRoomCreateWithoutUserInput, MemberInRoomUncheckedCreateWithoutUserInput> | MemberInRoomCreateWithoutUserInput[] | MemberInRoomUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MemberInRoomCreateOrConnectWithoutUserInput | MemberInRoomCreateOrConnectWithoutUserInput[]
    createMany?: MemberInRoomCreateManyUserInputEnvelope
    connect?: MemberInRoomWhereUniqueInput | MemberInRoomWhereUniqueInput[]
  }

  export type PostCreateNestedManyWithoutUserInput = {
    create?: XOR<PostCreateWithoutUserInput, PostUncheckedCreateWithoutUserInput> | PostCreateWithoutUserInput[] | PostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostCreateOrConnectWithoutUserInput | PostCreateOrConnectWithoutUserInput[]
    createMany?: PostCreateManyUserInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type CommentCreateNestedManyWithoutUserInput = {
    create?: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput> | CommentCreateWithoutUserInput[] | CommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutUserInput | CommentCreateOrConnectWithoutUserInput[]
    createMany?: CommentCreateManyUserInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type likePostCreateNestedManyWithoutUserInput = {
    create?: XOR<likePostCreateWithoutUserInput, likePostUncheckedCreateWithoutUserInput> | likePostCreateWithoutUserInput[] | likePostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: likePostCreateOrConnectWithoutUserInput | likePostCreateOrConnectWithoutUserInput[]
    createMany?: likePostCreateManyUserInputEnvelope
    connect?: likePostWhereUniqueInput | likePostWhereUniqueInput[]
  }

  export type Oauth2UserUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Oauth2UserCreateWithoutUserInput, Oauth2UserUncheckedCreateWithoutUserInput> | Oauth2UserCreateWithoutUserInput[] | Oauth2UserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: Oauth2UserCreateOrConnectWithoutUserInput | Oauth2UserCreateOrConnectWithoutUserInput[]
    createMany?: Oauth2UserCreateManyUserInputEnvelope
    connect?: Oauth2UserWhereUniqueInput | Oauth2UserWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type UserDeviceUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserDeviceCreateWithoutUserInput, UserDeviceUncheckedCreateWithoutUserInput> | UserDeviceCreateWithoutUserInput[] | UserDeviceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserDeviceCreateOrConnectWithoutUserInput | UserDeviceCreateOrConnectWithoutUserInput[]
    createMany?: UserDeviceCreateManyUserInputEnvelope
    connect?: UserDeviceWhereUniqueInput | UserDeviceWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutSenderInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutReceiverInput = {
    create?: XOR<MessageCreateWithoutReceiverInput, MessageUncheckedCreateWithoutReceiverInput> | MessageCreateWithoutReceiverInput[] | MessageUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutReceiverInput | MessageCreateOrConnectWithoutReceiverInput[]
    createMany?: MessageCreateManyReceiverInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type MemberInRoomUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MemberInRoomCreateWithoutUserInput, MemberInRoomUncheckedCreateWithoutUserInput> | MemberInRoomCreateWithoutUserInput[] | MemberInRoomUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MemberInRoomCreateOrConnectWithoutUserInput | MemberInRoomCreateOrConnectWithoutUserInput[]
    createMany?: MemberInRoomCreateManyUserInputEnvelope
    connect?: MemberInRoomWhereUniqueInput | MemberInRoomWhereUniqueInput[]
  }

  export type PostUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PostCreateWithoutUserInput, PostUncheckedCreateWithoutUserInput> | PostCreateWithoutUserInput[] | PostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostCreateOrConnectWithoutUserInput | PostCreateOrConnectWithoutUserInput[]
    createMany?: PostCreateManyUserInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type CommentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput> | CommentCreateWithoutUserInput[] | CommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutUserInput | CommentCreateOrConnectWithoutUserInput[]
    createMany?: CommentCreateManyUserInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type likePostUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<likePostCreateWithoutUserInput, likePostUncheckedCreateWithoutUserInput> | likePostCreateWithoutUserInput[] | likePostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: likePostCreateOrConnectWithoutUserInput | likePostCreateOrConnectWithoutUserInput[]
    createMany?: likePostCreateManyUserInputEnvelope
    connect?: likePostWhereUniqueInput | likePostWhereUniqueInput[]
  }

  export type EnumAccountTypeFieldUpdateOperationsInput = {
    set?: $Enums.AccountType
  }

  export type EnumUserVisibilityFieldUpdateOperationsInput = {
    set?: $Enums.UserVisibility
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

  export type MessageUpdateManyWithoutSenderNestedInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutSenderInput | MessageUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutSenderInput | MessageUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutSenderInput | MessageUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type MessageUpdateManyWithoutReceiverNestedInput = {
    create?: XOR<MessageCreateWithoutReceiverInput, MessageUncheckedCreateWithoutReceiverInput> | MessageCreateWithoutReceiverInput[] | MessageUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutReceiverInput | MessageCreateOrConnectWithoutReceiverInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutReceiverInput | MessageUpsertWithWhereUniqueWithoutReceiverInput[]
    createMany?: MessageCreateManyReceiverInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutReceiverInput | MessageUpdateWithWhereUniqueWithoutReceiverInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutReceiverInput | MessageUpdateManyWithWhereWithoutReceiverInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type MemberInRoomUpdateManyWithoutUserNestedInput = {
    create?: XOR<MemberInRoomCreateWithoutUserInput, MemberInRoomUncheckedCreateWithoutUserInput> | MemberInRoomCreateWithoutUserInput[] | MemberInRoomUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MemberInRoomCreateOrConnectWithoutUserInput | MemberInRoomCreateOrConnectWithoutUserInput[]
    upsert?: MemberInRoomUpsertWithWhereUniqueWithoutUserInput | MemberInRoomUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MemberInRoomCreateManyUserInputEnvelope
    set?: MemberInRoomWhereUniqueInput | MemberInRoomWhereUniqueInput[]
    disconnect?: MemberInRoomWhereUniqueInput | MemberInRoomWhereUniqueInput[]
    delete?: MemberInRoomWhereUniqueInput | MemberInRoomWhereUniqueInput[]
    connect?: MemberInRoomWhereUniqueInput | MemberInRoomWhereUniqueInput[]
    update?: MemberInRoomUpdateWithWhereUniqueWithoutUserInput | MemberInRoomUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MemberInRoomUpdateManyWithWhereWithoutUserInput | MemberInRoomUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MemberInRoomScalarWhereInput | MemberInRoomScalarWhereInput[]
  }

  export type PostUpdateManyWithoutUserNestedInput = {
    create?: XOR<PostCreateWithoutUserInput, PostUncheckedCreateWithoutUserInput> | PostCreateWithoutUserInput[] | PostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostCreateOrConnectWithoutUserInput | PostCreateOrConnectWithoutUserInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutUserInput | PostUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PostCreateManyUserInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutUserInput | PostUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PostUpdateManyWithWhereWithoutUserInput | PostUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type CommentUpdateManyWithoutUserNestedInput = {
    create?: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput> | CommentCreateWithoutUserInput[] | CommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutUserInput | CommentCreateOrConnectWithoutUserInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutUserInput | CommentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CommentCreateManyUserInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutUserInput | CommentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutUserInput | CommentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type likePostUpdateManyWithoutUserNestedInput = {
    create?: XOR<likePostCreateWithoutUserInput, likePostUncheckedCreateWithoutUserInput> | likePostCreateWithoutUserInput[] | likePostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: likePostCreateOrConnectWithoutUserInput | likePostCreateOrConnectWithoutUserInput[]
    upsert?: likePostUpsertWithWhereUniqueWithoutUserInput | likePostUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: likePostCreateManyUserInputEnvelope
    set?: likePostWhereUniqueInput | likePostWhereUniqueInput[]
    disconnect?: likePostWhereUniqueInput | likePostWhereUniqueInput[]
    delete?: likePostWhereUniqueInput | likePostWhereUniqueInput[]
    connect?: likePostWhereUniqueInput | likePostWhereUniqueInput[]
    update?: likePostUpdateWithWhereUniqueWithoutUserInput | likePostUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: likePostUpdateManyWithWhereWithoutUserInput | likePostUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: likePostScalarWhereInput | likePostScalarWhereInput[]
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

  export type MessageUncheckedUpdateManyWithoutSenderNestedInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutSenderInput | MessageUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutSenderInput | MessageUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutSenderInput | MessageUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutReceiverNestedInput = {
    create?: XOR<MessageCreateWithoutReceiverInput, MessageUncheckedCreateWithoutReceiverInput> | MessageCreateWithoutReceiverInput[] | MessageUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutReceiverInput | MessageCreateOrConnectWithoutReceiverInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutReceiverInput | MessageUpsertWithWhereUniqueWithoutReceiverInput[]
    createMany?: MessageCreateManyReceiverInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutReceiverInput | MessageUpdateWithWhereUniqueWithoutReceiverInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutReceiverInput | MessageUpdateManyWithWhereWithoutReceiverInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type MemberInRoomUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MemberInRoomCreateWithoutUserInput, MemberInRoomUncheckedCreateWithoutUserInput> | MemberInRoomCreateWithoutUserInput[] | MemberInRoomUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MemberInRoomCreateOrConnectWithoutUserInput | MemberInRoomCreateOrConnectWithoutUserInput[]
    upsert?: MemberInRoomUpsertWithWhereUniqueWithoutUserInput | MemberInRoomUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MemberInRoomCreateManyUserInputEnvelope
    set?: MemberInRoomWhereUniqueInput | MemberInRoomWhereUniqueInput[]
    disconnect?: MemberInRoomWhereUniqueInput | MemberInRoomWhereUniqueInput[]
    delete?: MemberInRoomWhereUniqueInput | MemberInRoomWhereUniqueInput[]
    connect?: MemberInRoomWhereUniqueInput | MemberInRoomWhereUniqueInput[]
    update?: MemberInRoomUpdateWithWhereUniqueWithoutUserInput | MemberInRoomUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MemberInRoomUpdateManyWithWhereWithoutUserInput | MemberInRoomUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MemberInRoomScalarWhereInput | MemberInRoomScalarWhereInput[]
  }

  export type PostUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PostCreateWithoutUserInput, PostUncheckedCreateWithoutUserInput> | PostCreateWithoutUserInput[] | PostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostCreateOrConnectWithoutUserInput | PostCreateOrConnectWithoutUserInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutUserInput | PostUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PostCreateManyUserInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutUserInput | PostUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PostUpdateManyWithWhereWithoutUserInput | PostUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type CommentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput> | CommentCreateWithoutUserInput[] | CommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutUserInput | CommentCreateOrConnectWithoutUserInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutUserInput | CommentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CommentCreateManyUserInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutUserInput | CommentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutUserInput | CommentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type likePostUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<likePostCreateWithoutUserInput, likePostUncheckedCreateWithoutUserInput> | likePostCreateWithoutUserInput[] | likePostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: likePostCreateOrConnectWithoutUserInput | likePostCreateOrConnectWithoutUserInput[]
    upsert?: likePostUpsertWithWhereUniqueWithoutUserInput | likePostUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: likePostCreateManyUserInputEnvelope
    set?: likePostWhereUniqueInput | likePostWhereUniqueInput[]
    disconnect?: likePostWhereUniqueInput | likePostWhereUniqueInput[]
    delete?: likePostWhereUniqueInput | likePostWhereUniqueInput[]
    connect?: likePostWhereUniqueInput | likePostWhereUniqueInput[]
    update?: likePostUpdateWithWhereUniqueWithoutUserInput | likePostUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: likePostUpdateManyWithWhereWithoutUserInput | likePostUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: likePostScalarWhereInput | likePostScalarWhereInput[]
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

  export type NestedEnumTypeMessageFilter<$PrismaModel = never> = {
    equals?: $Enums.TypeMessage | EnumTypeMessageFieldRefInput<$PrismaModel>
    in?: $Enums.TypeMessage[] | ListEnumTypeMessageFieldRefInput<$PrismaModel>
    notIn?: $Enums.TypeMessage[] | ListEnumTypeMessageFieldRefInput<$PrismaModel>
    not?: NestedEnumTypeMessageFilter<$PrismaModel> | $Enums.TypeMessage
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumTypeMessageWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TypeMessage | EnumTypeMessageFieldRefInput<$PrismaModel>
    in?: $Enums.TypeMessage[] | ListEnumTypeMessageFieldRefInput<$PrismaModel>
    notIn?: $Enums.TypeMessage[] | ListEnumTypeMessageFieldRefInput<$PrismaModel>
    not?: NestedEnumTypeMessageWithAggregatesFilter<$PrismaModel> | $Enums.TypeMessage
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTypeMessageFilter<$PrismaModel>
    _max?: NestedEnumTypeMessageFilter<$PrismaModel>
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
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

  export type NestedEnumAccountTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountType | EnumAccountTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAccountTypeWithAggregatesFilter<$PrismaModel> | $Enums.AccountType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAccountTypeFilter<$PrismaModel>
    _max?: NestedEnumAccountTypeFilter<$PrismaModel>
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
    searchCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    visible?: $Enums.UserVisibility
    phone?: string | null
    numberIdentity?: string | null
    dateOfBirth?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    lastActived?: Date | string | null
    picture?: string | null
    provider?: string | null
    Oauth2User?: Oauth2UserCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    senderMessage?: MessageCreateNestedManyWithoutSenderInput
    receiveMessage?: MessageCreateNestedManyWithoutReceiverInput
    memberInRoom?: MemberInRoomCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
    likes?: likePostCreateNestedManyWithoutUserInput
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
    searchCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    visible?: $Enums.UserVisibility
    phone?: string | null
    numberIdentity?: string | null
    dateOfBirth?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    lastActived?: Date | string | null
    picture?: string | null
    provider?: string | null
    Oauth2User?: Oauth2UserUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    senderMessage?: MessageUncheckedCreateNestedManyWithoutSenderInput
    receiveMessage?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    memberInRoom?: MemberInRoomUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    likes?: likePostUncheckedCreateNestedManyWithoutUserInput
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
    searchCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visible?: EnumUserVisibilityFieldUpdateOperationsInput | $Enums.UserVisibility
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    numberIdentity?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    lastActived?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    Oauth2User?: Oauth2UserUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    senderMessage?: MessageUpdateManyWithoutSenderNestedInput
    receiveMessage?: MessageUpdateManyWithoutReceiverNestedInput
    memberInRoom?: MemberInRoomUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    likes?: likePostUpdateManyWithoutUserNestedInput
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
    searchCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visible?: EnumUserVisibilityFieldUpdateOperationsInput | $Enums.UserVisibility
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    numberIdentity?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    lastActived?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    Oauth2User?: Oauth2UserUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    senderMessage?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    receiveMessage?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    memberInRoom?: MemberInRoomUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    likes?: likePostUncheckedUpdateManyWithoutUserNestedInput
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
    searchCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    visible?: $Enums.UserVisibility
    phone?: string | null
    numberIdentity?: string | null
    dateOfBirth?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    lastActived?: Date | string | null
    picture?: string | null
    provider?: string | null
    Oauth2User?: Oauth2UserCreateNestedManyWithoutUserInput
    userDevice?: UserDeviceCreateNestedManyWithoutUserInput
    senderMessage?: MessageCreateNestedManyWithoutSenderInput
    receiveMessage?: MessageCreateNestedManyWithoutReceiverInput
    memberInRoom?: MemberInRoomCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
    likes?: likePostCreateNestedManyWithoutUserInput
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
    searchCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    visible?: $Enums.UserVisibility
    phone?: string | null
    numberIdentity?: string | null
    dateOfBirth?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    lastActived?: Date | string | null
    picture?: string | null
    provider?: string | null
    Oauth2User?: Oauth2UserUncheckedCreateNestedManyWithoutUserInput
    userDevice?: UserDeviceUncheckedCreateNestedManyWithoutUserInput
    senderMessage?: MessageUncheckedCreateNestedManyWithoutSenderInput
    receiveMessage?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    memberInRoom?: MemberInRoomUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    likes?: likePostUncheckedCreateNestedManyWithoutUserInput
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
    searchCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visible?: EnumUserVisibilityFieldUpdateOperationsInput | $Enums.UserVisibility
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    numberIdentity?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    lastActived?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    Oauth2User?: Oauth2UserUpdateManyWithoutUserNestedInput
    userDevice?: UserDeviceUpdateManyWithoutUserNestedInput
    senderMessage?: MessageUpdateManyWithoutSenderNestedInput
    receiveMessage?: MessageUpdateManyWithoutReceiverNestedInput
    memberInRoom?: MemberInRoomUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    likes?: likePostUpdateManyWithoutUserNestedInput
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
    searchCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visible?: EnumUserVisibilityFieldUpdateOperationsInput | $Enums.UserVisibility
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    numberIdentity?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    lastActived?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    Oauth2User?: Oauth2UserUncheckedUpdateManyWithoutUserNestedInput
    userDevice?: UserDeviceUncheckedUpdateManyWithoutUserNestedInput
    senderMessage?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    receiveMessage?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    memberInRoom?: MemberInRoomUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    likes?: likePostUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSenderMessageInput = {
    id?: string
    fullname: string
    username: string
    email: string
    hashedPassword?: string | null
    accountType?: $Enums.AccountType
    avtUrl?: string | null
    address?: string | null
    city?: string | null
    searchCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    visible?: $Enums.UserVisibility
    phone?: string | null
    numberIdentity?: string | null
    dateOfBirth?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    lastActived?: Date | string | null
    picture?: string | null
    provider?: string | null
    Oauth2User?: Oauth2UserCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    userDevice?: UserDeviceCreateNestedManyWithoutUserInput
    receiveMessage?: MessageCreateNestedManyWithoutReceiverInput
    memberInRoom?: MemberInRoomCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
    likes?: likePostCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSenderMessageInput = {
    id?: string
    fullname: string
    username: string
    email: string
    hashedPassword?: string | null
    accountType?: $Enums.AccountType
    avtUrl?: string | null
    address?: string | null
    city?: string | null
    searchCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    visible?: $Enums.UserVisibility
    phone?: string | null
    numberIdentity?: string | null
    dateOfBirth?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    lastActived?: Date | string | null
    picture?: string | null
    provider?: string | null
    Oauth2User?: Oauth2UserUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    userDevice?: UserDeviceUncheckedCreateNestedManyWithoutUserInput
    receiveMessage?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    memberInRoom?: MemberInRoomUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    likes?: likePostUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSenderMessageInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSenderMessageInput, UserUncheckedCreateWithoutSenderMessageInput>
  }

  export type UserCreateWithoutReceiveMessageInput = {
    id?: string
    fullname: string
    username: string
    email: string
    hashedPassword?: string | null
    accountType?: $Enums.AccountType
    avtUrl?: string | null
    address?: string | null
    city?: string | null
    searchCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    visible?: $Enums.UserVisibility
    phone?: string | null
    numberIdentity?: string | null
    dateOfBirth?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    lastActived?: Date | string | null
    picture?: string | null
    provider?: string | null
    Oauth2User?: Oauth2UserCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    userDevice?: UserDeviceCreateNestedManyWithoutUserInput
    senderMessage?: MessageCreateNestedManyWithoutSenderInput
    memberInRoom?: MemberInRoomCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
    likes?: likePostCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReceiveMessageInput = {
    id?: string
    fullname: string
    username: string
    email: string
    hashedPassword?: string | null
    accountType?: $Enums.AccountType
    avtUrl?: string | null
    address?: string | null
    city?: string | null
    searchCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    visible?: $Enums.UserVisibility
    phone?: string | null
    numberIdentity?: string | null
    dateOfBirth?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    lastActived?: Date | string | null
    picture?: string | null
    provider?: string | null
    Oauth2User?: Oauth2UserUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    userDevice?: UserDeviceUncheckedCreateNestedManyWithoutUserInput
    senderMessage?: MessageUncheckedCreateNestedManyWithoutSenderInput
    memberInRoom?: MemberInRoomUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    likes?: likePostUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReceiveMessageInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReceiveMessageInput, UserUncheckedCreateWithoutReceiveMessageInput>
  }

  export type RoomCreateWithoutMessagesInput = {
    id?: string
    employeeId?: string | null
    customerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: MemberInRoomCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateWithoutMessagesInput = {
    id?: string
    employeeId?: string | null
    customerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: MemberInRoomUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomCreateOrConnectWithoutMessagesInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutMessagesInput, RoomUncheckedCreateWithoutMessagesInput>
  }

  export type UserUpsertWithoutSenderMessageInput = {
    update: XOR<UserUpdateWithoutSenderMessageInput, UserUncheckedUpdateWithoutSenderMessageInput>
    create: XOR<UserCreateWithoutSenderMessageInput, UserUncheckedCreateWithoutSenderMessageInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSenderMessageInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSenderMessageInput, UserUncheckedUpdateWithoutSenderMessageInput>
  }

  export type UserUpdateWithoutSenderMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    avtUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    searchCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visible?: EnumUserVisibilityFieldUpdateOperationsInput | $Enums.UserVisibility
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    numberIdentity?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    lastActived?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    Oauth2User?: Oauth2UserUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    userDevice?: UserDeviceUpdateManyWithoutUserNestedInput
    receiveMessage?: MessageUpdateManyWithoutReceiverNestedInput
    memberInRoom?: MemberInRoomUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    likes?: likePostUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSenderMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    avtUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    searchCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visible?: EnumUserVisibilityFieldUpdateOperationsInput | $Enums.UserVisibility
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    numberIdentity?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    lastActived?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    Oauth2User?: Oauth2UserUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    userDevice?: UserDeviceUncheckedUpdateManyWithoutUserNestedInput
    receiveMessage?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    memberInRoom?: MemberInRoomUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    likes?: likePostUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutReceiveMessageInput = {
    update: XOR<UserUpdateWithoutReceiveMessageInput, UserUncheckedUpdateWithoutReceiveMessageInput>
    create: XOR<UserCreateWithoutReceiveMessageInput, UserUncheckedCreateWithoutReceiveMessageInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReceiveMessageInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReceiveMessageInput, UserUncheckedUpdateWithoutReceiveMessageInput>
  }

  export type UserUpdateWithoutReceiveMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    avtUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    searchCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visible?: EnumUserVisibilityFieldUpdateOperationsInput | $Enums.UserVisibility
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    numberIdentity?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    lastActived?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    Oauth2User?: Oauth2UserUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    userDevice?: UserDeviceUpdateManyWithoutUserNestedInput
    senderMessage?: MessageUpdateManyWithoutSenderNestedInput
    memberInRoom?: MemberInRoomUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    likes?: likePostUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReceiveMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    avtUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    searchCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visible?: EnumUserVisibilityFieldUpdateOperationsInput | $Enums.UserVisibility
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    numberIdentity?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    lastActived?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    Oauth2User?: Oauth2UserUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    userDevice?: UserDeviceUncheckedUpdateManyWithoutUserNestedInput
    senderMessage?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    memberInRoom?: MemberInRoomUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    likes?: likePostUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RoomUpsertWithoutMessagesInput = {
    update: XOR<RoomUpdateWithoutMessagesInput, RoomUncheckedUpdateWithoutMessagesInput>
    create: XOR<RoomCreateWithoutMessagesInput, RoomUncheckedCreateWithoutMessagesInput>
    where?: RoomWhereInput
  }

  export type RoomUpdateToOneWithWhereWithoutMessagesInput = {
    where?: RoomWhereInput
    data: XOR<RoomUpdateWithoutMessagesInput, RoomUncheckedUpdateWithoutMessagesInput>
  }

  export type RoomUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    customerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: MemberInRoomUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    customerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: MemberInRoomUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type UserCreateWithoutPostsInput = {
    id?: string
    fullname: string
    username: string
    email: string
    hashedPassword?: string | null
    accountType?: $Enums.AccountType
    avtUrl?: string | null
    address?: string | null
    city?: string | null
    searchCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    visible?: $Enums.UserVisibility
    phone?: string | null
    numberIdentity?: string | null
    dateOfBirth?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    lastActived?: Date | string | null
    picture?: string | null
    provider?: string | null
    Oauth2User?: Oauth2UserCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    userDevice?: UserDeviceCreateNestedManyWithoutUserInput
    senderMessage?: MessageCreateNestedManyWithoutSenderInput
    receiveMessage?: MessageCreateNestedManyWithoutReceiverInput
    memberInRoom?: MemberInRoomCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
    likes?: likePostCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPostsInput = {
    id?: string
    fullname: string
    username: string
    email: string
    hashedPassword?: string | null
    accountType?: $Enums.AccountType
    avtUrl?: string | null
    address?: string | null
    city?: string | null
    searchCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    visible?: $Enums.UserVisibility
    phone?: string | null
    numberIdentity?: string | null
    dateOfBirth?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    lastActived?: Date | string | null
    picture?: string | null
    provider?: string | null
    Oauth2User?: Oauth2UserUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    userDevice?: UserDeviceUncheckedCreateNestedManyWithoutUserInput
    senderMessage?: MessageUncheckedCreateNestedManyWithoutSenderInput
    receiveMessage?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    memberInRoom?: MemberInRoomUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    likes?: likePostUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPostsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
  }

  export type CommentCreateWithoutPostInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateWithoutPostInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type CommentCreateOrConnectWithoutPostInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput>
  }

  export type CommentCreateManyPostInputEnvelope = {
    data: CommentCreateManyPostInput | CommentCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type likePostCreateWithoutPostInput = {
    id?: string
    isLike?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string
    user: UserCreateNestedOneWithoutLikesInput
  }

  export type likePostUncheckedCreateWithoutPostInput = {
    id?: string
    isLike?: boolean
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string
  }

  export type likePostCreateOrConnectWithoutPostInput = {
    where: likePostWhereUniqueInput
    create: XOR<likePostCreateWithoutPostInput, likePostUncheckedCreateWithoutPostInput>
  }

  export type likePostCreateManyPostInputEnvelope = {
    data: likePostCreateManyPostInput | likePostCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutPostsInput = {
    update: XOR<UserUpdateWithoutPostsInput, UserUncheckedUpdateWithoutPostsInput>
    create: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPostsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPostsInput, UserUncheckedUpdateWithoutPostsInput>
  }

  export type UserUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    avtUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    searchCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visible?: EnumUserVisibilityFieldUpdateOperationsInput | $Enums.UserVisibility
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    numberIdentity?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    lastActived?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    Oauth2User?: Oauth2UserUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    userDevice?: UserDeviceUpdateManyWithoutUserNestedInput
    senderMessage?: MessageUpdateManyWithoutSenderNestedInput
    receiveMessage?: MessageUpdateManyWithoutReceiverNestedInput
    memberInRoom?: MemberInRoomUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    likes?: likePostUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    avtUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    searchCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visible?: EnumUserVisibilityFieldUpdateOperationsInput | $Enums.UserVisibility
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    numberIdentity?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    lastActived?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    Oauth2User?: Oauth2UserUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    userDevice?: UserDeviceUncheckedUpdateManyWithoutUserNestedInput
    senderMessage?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    receiveMessage?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    memberInRoom?: MemberInRoomUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    likes?: likePostUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CommentUpsertWithWhereUniqueWithoutPostInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutPostInput, CommentUncheckedUpdateWithoutPostInput>
    create: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutPostInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutPostInput, CommentUncheckedUpdateWithoutPostInput>
  }

  export type CommentUpdateManyWithWhereWithoutPostInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutPostInput>
  }

  export type CommentScalarWhereInput = {
    AND?: CommentScalarWhereInput | CommentScalarWhereInput[]
    OR?: CommentScalarWhereInput[]
    NOT?: CommentScalarWhereInput | CommentScalarWhereInput[]
    id?: UuidFilter<"Comment"> | string
    content?: StringFilter<"Comment"> | string
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    updatedAt?: DateTimeFilter<"Comment"> | Date | string
    userId?: UuidFilter<"Comment"> | string
    postId?: UuidFilter<"Comment"> | string
  }

  export type likePostUpsertWithWhereUniqueWithoutPostInput = {
    where: likePostWhereUniqueInput
    update: XOR<likePostUpdateWithoutPostInput, likePostUncheckedUpdateWithoutPostInput>
    create: XOR<likePostCreateWithoutPostInput, likePostUncheckedCreateWithoutPostInput>
  }

  export type likePostUpdateWithWhereUniqueWithoutPostInput = {
    where: likePostWhereUniqueInput
    data: XOR<likePostUpdateWithoutPostInput, likePostUncheckedUpdateWithoutPostInput>
  }

  export type likePostUpdateManyWithWhereWithoutPostInput = {
    where: likePostScalarWhereInput
    data: XOR<likePostUpdateManyMutationInput, likePostUncheckedUpdateManyWithoutPostInput>
  }

  export type likePostScalarWhereInput = {
    AND?: likePostScalarWhereInput | likePostScalarWhereInput[]
    OR?: likePostScalarWhereInput[]
    NOT?: likePostScalarWhereInput | likePostScalarWhereInput[]
    id?: UuidFilter<"likePost"> | string
    isLike?: BoolFilter<"likePost"> | boolean
    userId?: UuidFilter<"likePost"> | string
    postId?: UuidFilter<"likePost"> | string
    createdAt?: DateTimeFilter<"likePost"> | Date | string
    updatedAt?: DateTimeFilter<"likePost"> | Date | string
    deletedAt?: DateTimeFilter<"likePost"> | Date | string
  }

  export type UserCreateWithoutLikesInput = {
    id?: string
    fullname: string
    username: string
    email: string
    hashedPassword?: string | null
    accountType?: $Enums.AccountType
    avtUrl?: string | null
    address?: string | null
    city?: string | null
    searchCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    visible?: $Enums.UserVisibility
    phone?: string | null
    numberIdentity?: string | null
    dateOfBirth?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    lastActived?: Date | string | null
    picture?: string | null
    provider?: string | null
    Oauth2User?: Oauth2UserCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    userDevice?: UserDeviceCreateNestedManyWithoutUserInput
    senderMessage?: MessageCreateNestedManyWithoutSenderInput
    receiveMessage?: MessageCreateNestedManyWithoutReceiverInput
    memberInRoom?: MemberInRoomCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLikesInput = {
    id?: string
    fullname: string
    username: string
    email: string
    hashedPassword?: string | null
    accountType?: $Enums.AccountType
    avtUrl?: string | null
    address?: string | null
    city?: string | null
    searchCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    visible?: $Enums.UserVisibility
    phone?: string | null
    numberIdentity?: string | null
    dateOfBirth?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    lastActived?: Date | string | null
    picture?: string | null
    provider?: string | null
    Oauth2User?: Oauth2UserUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    userDevice?: UserDeviceUncheckedCreateNestedManyWithoutUserInput
    senderMessage?: MessageUncheckedCreateNestedManyWithoutSenderInput
    receiveMessage?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    memberInRoom?: MemberInRoomUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLikesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLikesInput, UserUncheckedCreateWithoutLikesInput>
  }

  export type PostCreateWithoutLikesInput = {
    id?: string
    title: string
    content: string
    file?: PostCreatefileInput | string[]
    viewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string
    likeCount?: number
    user: UserCreateNestedOneWithoutPostsInput
    comments?: CommentCreateNestedManyWithoutPostInput
  }

  export type PostUncheckedCreateWithoutLikesInput = {
    id?: string
    title: string
    content: string
    file?: PostCreatefileInput | string[]
    viewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string
    userId: string
    likeCount?: number
    comments?: CommentUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostCreateOrConnectWithoutLikesInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutLikesInput, PostUncheckedCreateWithoutLikesInput>
  }

  export type UserUpsertWithoutLikesInput = {
    update: XOR<UserUpdateWithoutLikesInput, UserUncheckedUpdateWithoutLikesInput>
    create: XOR<UserCreateWithoutLikesInput, UserUncheckedCreateWithoutLikesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLikesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLikesInput, UserUncheckedUpdateWithoutLikesInput>
  }

  export type UserUpdateWithoutLikesInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    avtUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    searchCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visible?: EnumUserVisibilityFieldUpdateOperationsInput | $Enums.UserVisibility
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    numberIdentity?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    lastActived?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    Oauth2User?: Oauth2UserUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    userDevice?: UserDeviceUpdateManyWithoutUserNestedInput
    senderMessage?: MessageUpdateManyWithoutSenderNestedInput
    receiveMessage?: MessageUpdateManyWithoutReceiverNestedInput
    memberInRoom?: MemberInRoomUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLikesInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    avtUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    searchCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visible?: EnumUserVisibilityFieldUpdateOperationsInput | $Enums.UserVisibility
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    numberIdentity?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    lastActived?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    Oauth2User?: Oauth2UserUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    userDevice?: UserDeviceUncheckedUpdateManyWithoutUserNestedInput
    senderMessage?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    receiveMessage?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    memberInRoom?: MemberInRoomUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PostUpsertWithoutLikesInput = {
    update: XOR<PostUpdateWithoutLikesInput, PostUncheckedUpdateWithoutLikesInput>
    create: XOR<PostCreateWithoutLikesInput, PostUncheckedCreateWithoutLikesInput>
    where?: PostWhereInput
  }

  export type PostUpdateToOneWithWhereWithoutLikesInput = {
    where?: PostWhereInput
    data: XOR<PostUpdateWithoutLikesInput, PostUncheckedUpdateWithoutLikesInput>
  }

  export type PostUpdateWithoutLikesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    file?: PostUpdatefileInput | string[]
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    likeCount?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneRequiredWithoutPostsNestedInput
    comments?: CommentUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateWithoutLikesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    file?: PostUpdatefileInput | string[]
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    likeCount?: IntFieldUpdateOperationsInput | number
    comments?: CommentUncheckedUpdateManyWithoutPostNestedInput
  }

  export type UserCreateWithoutCommentsInput = {
    id?: string
    fullname: string
    username: string
    email: string
    hashedPassword?: string | null
    accountType?: $Enums.AccountType
    avtUrl?: string | null
    address?: string | null
    city?: string | null
    searchCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    visible?: $Enums.UserVisibility
    phone?: string | null
    numberIdentity?: string | null
    dateOfBirth?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    lastActived?: Date | string | null
    picture?: string | null
    provider?: string | null
    Oauth2User?: Oauth2UserCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    userDevice?: UserDeviceCreateNestedManyWithoutUserInput
    senderMessage?: MessageCreateNestedManyWithoutSenderInput
    receiveMessage?: MessageCreateNestedManyWithoutReceiverInput
    memberInRoom?: MemberInRoomCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutUserInput
    likes?: likePostCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCommentsInput = {
    id?: string
    fullname: string
    username: string
    email: string
    hashedPassword?: string | null
    accountType?: $Enums.AccountType
    avtUrl?: string | null
    address?: string | null
    city?: string | null
    searchCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    visible?: $Enums.UserVisibility
    phone?: string | null
    numberIdentity?: string | null
    dateOfBirth?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    lastActived?: Date | string | null
    picture?: string | null
    provider?: string | null
    Oauth2User?: Oauth2UserUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    userDevice?: UserDeviceUncheckedCreateNestedManyWithoutUserInput
    senderMessage?: MessageUncheckedCreateNestedManyWithoutSenderInput
    receiveMessage?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    memberInRoom?: MemberInRoomUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutUserInput
    likes?: likePostUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCommentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
  }

  export type PostCreateWithoutCommentsInput = {
    id?: string
    title: string
    content: string
    file?: PostCreatefileInput | string[]
    viewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string
    likeCount?: number
    user: UserCreateNestedOneWithoutPostsInput
    likes?: likePostCreateNestedManyWithoutPostInput
  }

  export type PostUncheckedCreateWithoutCommentsInput = {
    id?: string
    title: string
    content: string
    file?: PostCreatefileInput | string[]
    viewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string
    userId: string
    likeCount?: number
    likes?: likePostUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostCreateOrConnectWithoutCommentsInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutCommentsInput, PostUncheckedCreateWithoutCommentsInput>
  }

  export type UserUpsertWithoutCommentsInput = {
    update: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCommentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>
  }

  export type UserUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    avtUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    searchCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visible?: EnumUserVisibilityFieldUpdateOperationsInput | $Enums.UserVisibility
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    numberIdentity?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    lastActived?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    Oauth2User?: Oauth2UserUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    userDevice?: UserDeviceUpdateManyWithoutUserNestedInput
    senderMessage?: MessageUpdateManyWithoutSenderNestedInput
    receiveMessage?: MessageUpdateManyWithoutReceiverNestedInput
    memberInRoom?: MemberInRoomUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutUserNestedInput
    likes?: likePostUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    avtUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    searchCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visible?: EnumUserVisibilityFieldUpdateOperationsInput | $Enums.UserVisibility
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    numberIdentity?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    lastActived?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    Oauth2User?: Oauth2UserUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    userDevice?: UserDeviceUncheckedUpdateManyWithoutUserNestedInput
    senderMessage?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    receiveMessage?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    memberInRoom?: MemberInRoomUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutUserNestedInput
    likes?: likePostUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PostUpsertWithoutCommentsInput = {
    update: XOR<PostUpdateWithoutCommentsInput, PostUncheckedUpdateWithoutCommentsInput>
    create: XOR<PostCreateWithoutCommentsInput, PostUncheckedCreateWithoutCommentsInput>
    where?: PostWhereInput
  }

  export type PostUpdateToOneWithWhereWithoutCommentsInput = {
    where?: PostWhereInput
    data: XOR<PostUpdateWithoutCommentsInput, PostUncheckedUpdateWithoutCommentsInput>
  }

  export type PostUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    file?: PostUpdatefileInput | string[]
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    likeCount?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneRequiredWithoutPostsNestedInput
    likes?: likePostUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    file?: PostUpdatefileInput | string[]
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    likeCount?: IntFieldUpdateOperationsInput | number
    likes?: likePostUncheckedUpdateManyWithoutPostNestedInput
  }

  export type MessageCreateWithoutRoomInput = {
    id?: string
    content: string
    typeMessage?: $Enums.TypeMessage
    createdAt?: Date | string
    updatedAt?: Date | string
    sender: UserCreateNestedOneWithoutSenderMessageInput
    receiver?: UserCreateNestedOneWithoutReceiveMessageInput
  }

  export type MessageUncheckedCreateWithoutRoomInput = {
    id?: string
    content: string
    typeMessage?: $Enums.TypeMessage
    senderId: string
    receiverId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageCreateOrConnectWithoutRoomInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutRoomInput, MessageUncheckedCreateWithoutRoomInput>
  }

  export type MessageCreateManyRoomInputEnvelope = {
    data: MessageCreateManyRoomInput | MessageCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type MemberInRoomCreateWithoutRoomInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMemberInRoomInput
  }

  export type MemberInRoomUncheckedCreateWithoutRoomInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberInRoomCreateOrConnectWithoutRoomInput = {
    where: MemberInRoomWhereUniqueInput
    create: XOR<MemberInRoomCreateWithoutRoomInput, MemberInRoomUncheckedCreateWithoutRoomInput>
  }

  export type MemberInRoomCreateManyRoomInputEnvelope = {
    data: MemberInRoomCreateManyRoomInput | MemberInRoomCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type MessageUpsertWithWhereUniqueWithoutRoomInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutRoomInput, MessageUncheckedUpdateWithoutRoomInput>
    create: XOR<MessageCreateWithoutRoomInput, MessageUncheckedCreateWithoutRoomInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutRoomInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutRoomInput, MessageUncheckedUpdateWithoutRoomInput>
  }

  export type MessageUpdateManyWithWhereWithoutRoomInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutRoomInput>
  }

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[]
    OR?: MessageScalarWhereInput[]
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[]
    id?: UuidFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    typeMessage?: EnumTypeMessageFilter<"Message"> | $Enums.TypeMessage
    senderId?: UuidFilter<"Message"> | string
    receiverId?: UuidNullableFilter<"Message"> | string | null
    roomId?: UuidFilter<"Message"> | string
    createdAt?: DateTimeFilter<"Message"> | Date | string
    updatedAt?: DateTimeFilter<"Message"> | Date | string
  }

  export type MemberInRoomUpsertWithWhereUniqueWithoutRoomInput = {
    where: MemberInRoomWhereUniqueInput
    update: XOR<MemberInRoomUpdateWithoutRoomInput, MemberInRoomUncheckedUpdateWithoutRoomInput>
    create: XOR<MemberInRoomCreateWithoutRoomInput, MemberInRoomUncheckedCreateWithoutRoomInput>
  }

  export type MemberInRoomUpdateWithWhereUniqueWithoutRoomInput = {
    where: MemberInRoomWhereUniqueInput
    data: XOR<MemberInRoomUpdateWithoutRoomInput, MemberInRoomUncheckedUpdateWithoutRoomInput>
  }

  export type MemberInRoomUpdateManyWithWhereWithoutRoomInput = {
    where: MemberInRoomScalarWhereInput
    data: XOR<MemberInRoomUpdateManyMutationInput, MemberInRoomUncheckedUpdateManyWithoutRoomInput>
  }

  export type MemberInRoomScalarWhereInput = {
    AND?: MemberInRoomScalarWhereInput | MemberInRoomScalarWhereInput[]
    OR?: MemberInRoomScalarWhereInput[]
    NOT?: MemberInRoomScalarWhereInput | MemberInRoomScalarWhereInput[]
    id?: UuidFilter<"MemberInRoom"> | string
    userId?: UuidFilter<"MemberInRoom"> | string
    roomId?: UuidFilter<"MemberInRoom"> | string
    createdAt?: DateTimeFilter<"MemberInRoom"> | Date | string
    updatedAt?: DateTimeFilter<"MemberInRoom"> | Date | string
  }

  export type UserCreateWithoutMemberInRoomInput = {
    id?: string
    fullname: string
    username: string
    email: string
    hashedPassword?: string | null
    accountType?: $Enums.AccountType
    avtUrl?: string | null
    address?: string | null
    city?: string | null
    searchCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    visible?: $Enums.UserVisibility
    phone?: string | null
    numberIdentity?: string | null
    dateOfBirth?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    lastActived?: Date | string | null
    picture?: string | null
    provider?: string | null
    Oauth2User?: Oauth2UserCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    userDevice?: UserDeviceCreateNestedManyWithoutUserInput
    senderMessage?: MessageCreateNestedManyWithoutSenderInput
    receiveMessage?: MessageCreateNestedManyWithoutReceiverInput
    posts?: PostCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
    likes?: likePostCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMemberInRoomInput = {
    id?: string
    fullname: string
    username: string
    email: string
    hashedPassword?: string | null
    accountType?: $Enums.AccountType
    avtUrl?: string | null
    address?: string | null
    city?: string | null
    searchCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    visible?: $Enums.UserVisibility
    phone?: string | null
    numberIdentity?: string | null
    dateOfBirth?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    lastActived?: Date | string | null
    picture?: string | null
    provider?: string | null
    Oauth2User?: Oauth2UserUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    userDevice?: UserDeviceUncheckedCreateNestedManyWithoutUserInput
    senderMessage?: MessageUncheckedCreateNestedManyWithoutSenderInput
    receiveMessage?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    posts?: PostUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    likes?: likePostUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMemberInRoomInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMemberInRoomInput, UserUncheckedCreateWithoutMemberInRoomInput>
  }

  export type RoomCreateWithoutMembersInput = {
    id?: string
    employeeId?: string | null
    customerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateWithoutMembersInput = {
    id?: string
    employeeId?: string | null
    customerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomCreateOrConnectWithoutMembersInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutMembersInput, RoomUncheckedCreateWithoutMembersInput>
  }

  export type UserUpsertWithoutMemberInRoomInput = {
    update: XOR<UserUpdateWithoutMemberInRoomInput, UserUncheckedUpdateWithoutMemberInRoomInput>
    create: XOR<UserCreateWithoutMemberInRoomInput, UserUncheckedCreateWithoutMemberInRoomInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMemberInRoomInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMemberInRoomInput, UserUncheckedUpdateWithoutMemberInRoomInput>
  }

  export type UserUpdateWithoutMemberInRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    avtUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    searchCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visible?: EnumUserVisibilityFieldUpdateOperationsInput | $Enums.UserVisibility
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    numberIdentity?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    lastActived?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    Oauth2User?: Oauth2UserUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    userDevice?: UserDeviceUpdateManyWithoutUserNestedInput
    senderMessage?: MessageUpdateManyWithoutSenderNestedInput
    receiveMessage?: MessageUpdateManyWithoutReceiverNestedInput
    posts?: PostUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    likes?: likePostUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMemberInRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    avtUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    searchCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visible?: EnumUserVisibilityFieldUpdateOperationsInput | $Enums.UserVisibility
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    numberIdentity?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    lastActived?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    Oauth2User?: Oauth2UserUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    userDevice?: UserDeviceUncheckedUpdateManyWithoutUserNestedInput
    senderMessage?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    receiveMessage?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    posts?: PostUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    likes?: likePostUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RoomUpsertWithoutMembersInput = {
    update: XOR<RoomUpdateWithoutMembersInput, RoomUncheckedUpdateWithoutMembersInput>
    create: XOR<RoomCreateWithoutMembersInput, RoomUncheckedCreateWithoutMembersInput>
    where?: RoomWhereInput
  }

  export type RoomUpdateToOneWithWhereWithoutMembersInput = {
    where?: RoomWhereInput
    data: XOR<RoomUpdateWithoutMembersInput, RoomUncheckedUpdateWithoutMembersInput>
  }

  export type RoomUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    customerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    customerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutRoomNestedInput
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

  export type MessageCreateWithoutSenderInput = {
    id?: string
    content: string
    typeMessage?: $Enums.TypeMessage
    createdAt?: Date | string
    updatedAt?: Date | string
    receiver?: UserCreateNestedOneWithoutReceiveMessageInput
    room: RoomCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateWithoutSenderInput = {
    id?: string
    content: string
    typeMessage?: $Enums.TypeMessage
    receiverId?: string | null
    roomId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageCreateOrConnectWithoutSenderInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput>
  }

  export type MessageCreateManySenderInputEnvelope = {
    data: MessageCreateManySenderInput | MessageCreateManySenderInput[]
    skipDuplicates?: boolean
  }

  export type MessageCreateWithoutReceiverInput = {
    id?: string
    content: string
    typeMessage?: $Enums.TypeMessage
    createdAt?: Date | string
    updatedAt?: Date | string
    sender: UserCreateNestedOneWithoutSenderMessageInput
    room: RoomCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateWithoutReceiverInput = {
    id?: string
    content: string
    typeMessage?: $Enums.TypeMessage
    senderId: string
    roomId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageCreateOrConnectWithoutReceiverInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutReceiverInput, MessageUncheckedCreateWithoutReceiverInput>
  }

  export type MessageCreateManyReceiverInputEnvelope = {
    data: MessageCreateManyReceiverInput | MessageCreateManyReceiverInput[]
    skipDuplicates?: boolean
  }

  export type MemberInRoomCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    room: RoomCreateNestedOneWithoutMembersInput
  }

  export type MemberInRoomUncheckedCreateWithoutUserInput = {
    id?: string
    roomId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberInRoomCreateOrConnectWithoutUserInput = {
    where: MemberInRoomWhereUniqueInput
    create: XOR<MemberInRoomCreateWithoutUserInput, MemberInRoomUncheckedCreateWithoutUserInput>
  }

  export type MemberInRoomCreateManyUserInputEnvelope = {
    data: MemberInRoomCreateManyUserInput | MemberInRoomCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PostCreateWithoutUserInput = {
    id?: string
    title: string
    content: string
    file?: PostCreatefileInput | string[]
    viewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string
    likeCount?: number
    comments?: CommentCreateNestedManyWithoutPostInput
    likes?: likePostCreateNestedManyWithoutPostInput
  }

  export type PostUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    content: string
    file?: PostCreatefileInput | string[]
    viewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string
    likeCount?: number
    comments?: CommentUncheckedCreateNestedManyWithoutPostInput
    likes?: likePostUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostCreateOrConnectWithoutUserInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutUserInput, PostUncheckedCreateWithoutUserInput>
  }

  export type PostCreateManyUserInputEnvelope = {
    data: PostCreateManyUserInput | PostCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CommentCreateWithoutUserInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    post: PostCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateWithoutUserInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    postId: string
  }

  export type CommentCreateOrConnectWithoutUserInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput>
  }

  export type CommentCreateManyUserInputEnvelope = {
    data: CommentCreateManyUserInput | CommentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type likePostCreateWithoutUserInput = {
    id?: string
    isLike?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string
    post: PostCreateNestedOneWithoutLikesInput
  }

  export type likePostUncheckedCreateWithoutUserInput = {
    id?: string
    isLike?: boolean
    postId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string
  }

  export type likePostCreateOrConnectWithoutUserInput = {
    where: likePostWhereUniqueInput
    create: XOR<likePostCreateWithoutUserInput, likePostUncheckedCreateWithoutUserInput>
  }

  export type likePostCreateManyUserInputEnvelope = {
    data: likePostCreateManyUserInput | likePostCreateManyUserInput[]
    skipDuplicates?: boolean
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
    userDeviceId?: UuidFilter<"Session"> | string
    hashedRefreshToken?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userIp?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    loginedAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    logoutedAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    userId?: UuidFilter<"Session"> | string
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

  export type MessageUpsertWithWhereUniqueWithoutSenderInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutSenderInput, MessageUncheckedUpdateWithoutSenderInput>
    create: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutSenderInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutSenderInput, MessageUncheckedUpdateWithoutSenderInput>
  }

  export type MessageUpdateManyWithWhereWithoutSenderInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutSenderInput>
  }

  export type MessageUpsertWithWhereUniqueWithoutReceiverInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutReceiverInput, MessageUncheckedUpdateWithoutReceiverInput>
    create: XOR<MessageCreateWithoutReceiverInput, MessageUncheckedCreateWithoutReceiverInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutReceiverInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutReceiverInput, MessageUncheckedUpdateWithoutReceiverInput>
  }

  export type MessageUpdateManyWithWhereWithoutReceiverInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutReceiverInput>
  }

  export type MemberInRoomUpsertWithWhereUniqueWithoutUserInput = {
    where: MemberInRoomWhereUniqueInput
    update: XOR<MemberInRoomUpdateWithoutUserInput, MemberInRoomUncheckedUpdateWithoutUserInput>
    create: XOR<MemberInRoomCreateWithoutUserInput, MemberInRoomUncheckedCreateWithoutUserInput>
  }

  export type MemberInRoomUpdateWithWhereUniqueWithoutUserInput = {
    where: MemberInRoomWhereUniqueInput
    data: XOR<MemberInRoomUpdateWithoutUserInput, MemberInRoomUncheckedUpdateWithoutUserInput>
  }

  export type MemberInRoomUpdateManyWithWhereWithoutUserInput = {
    where: MemberInRoomScalarWhereInput
    data: XOR<MemberInRoomUpdateManyMutationInput, MemberInRoomUncheckedUpdateManyWithoutUserInput>
  }

  export type PostUpsertWithWhereUniqueWithoutUserInput = {
    where: PostWhereUniqueInput
    update: XOR<PostUpdateWithoutUserInput, PostUncheckedUpdateWithoutUserInput>
    create: XOR<PostCreateWithoutUserInput, PostUncheckedCreateWithoutUserInput>
  }

  export type PostUpdateWithWhereUniqueWithoutUserInput = {
    where: PostWhereUniqueInput
    data: XOR<PostUpdateWithoutUserInput, PostUncheckedUpdateWithoutUserInput>
  }

  export type PostUpdateManyWithWhereWithoutUserInput = {
    where: PostScalarWhereInput
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyWithoutUserInput>
  }

  export type PostScalarWhereInput = {
    AND?: PostScalarWhereInput | PostScalarWhereInput[]
    OR?: PostScalarWhereInput[]
    NOT?: PostScalarWhereInput | PostScalarWhereInput[]
    id?: UuidFilter<"Post"> | string
    title?: StringFilter<"Post"> | string
    content?: StringFilter<"Post"> | string
    file?: StringNullableListFilter<"Post">
    viewCount?: IntFilter<"Post"> | number
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
    deletedAt?: DateTimeFilter<"Post"> | Date | string
    userId?: UuidFilter<"Post"> | string
    likeCount?: IntFilter<"Post"> | number
  }

  export type CommentUpsertWithWhereUniqueWithoutUserInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutUserInput, CommentUncheckedUpdateWithoutUserInput>
    create: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutUserInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutUserInput, CommentUncheckedUpdateWithoutUserInput>
  }

  export type CommentUpdateManyWithWhereWithoutUserInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutUserInput>
  }

  export type likePostUpsertWithWhereUniqueWithoutUserInput = {
    where: likePostWhereUniqueInput
    update: XOR<likePostUpdateWithoutUserInput, likePostUncheckedUpdateWithoutUserInput>
    create: XOR<likePostCreateWithoutUserInput, likePostUncheckedCreateWithoutUserInput>
  }

  export type likePostUpdateWithWhereUniqueWithoutUserInput = {
    where: likePostWhereUniqueInput
    data: XOR<likePostUpdateWithoutUserInput, likePostUncheckedUpdateWithoutUserInput>
  }

  export type likePostUpdateManyWithWhereWithoutUserInput = {
    where: likePostScalarWhereInput
    data: XOR<likePostUpdateManyMutationInput, likePostUncheckedUpdateManyWithoutUserInput>
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
    searchCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    visible?: $Enums.UserVisibility
    phone?: string | null
    numberIdentity?: string | null
    dateOfBirth?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    lastActived?: Date | string | null
    picture?: string | null
    provider?: string | null
    sessions?: SessionCreateNestedManyWithoutUserInput
    userDevice?: UserDeviceCreateNestedManyWithoutUserInput
    senderMessage?: MessageCreateNestedManyWithoutSenderInput
    receiveMessage?: MessageCreateNestedManyWithoutReceiverInput
    memberInRoom?: MemberInRoomCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
    likes?: likePostCreateNestedManyWithoutUserInput
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
    searchCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    visible?: $Enums.UserVisibility
    phone?: string | null
    numberIdentity?: string | null
    dateOfBirth?: Date | string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    isBanned?: boolean
    isLocked?: boolean
    lastActived?: Date | string | null
    picture?: string | null
    provider?: string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    userDevice?: UserDeviceUncheckedCreateNestedManyWithoutUserInput
    senderMessage?: MessageUncheckedCreateNestedManyWithoutSenderInput
    receiveMessage?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    memberInRoom?: MemberInRoomUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    likes?: likePostUncheckedCreateNestedManyWithoutUserInput
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
    searchCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visible?: EnumUserVisibilityFieldUpdateOperationsInput | $Enums.UserVisibility
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    numberIdentity?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    lastActived?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUpdateManyWithoutUserNestedInput
    userDevice?: UserDeviceUpdateManyWithoutUserNestedInput
    senderMessage?: MessageUpdateManyWithoutSenderNestedInput
    receiveMessage?: MessageUpdateManyWithoutReceiverNestedInput
    memberInRoom?: MemberInRoomUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    likes?: likePostUpdateManyWithoutUserNestedInput
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
    searchCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visible?: EnumUserVisibilityFieldUpdateOperationsInput | $Enums.UserVisibility
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    numberIdentity?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    lastActived?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    userDevice?: UserDeviceUncheckedUpdateManyWithoutUserNestedInput
    senderMessage?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    receiveMessage?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    memberInRoom?: MemberInRoomUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    likes?: likePostUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CommentCreateManyPostInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type likePostCreateManyPostInput = {
    id?: string
    isLike?: boolean
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string
  }

  export type CommentUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type CommentUncheckedUpdateManyWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type likePostUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    isLike?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLikesNestedInput
  }

  export type likePostUncheckedUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    isLike?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type likePostUncheckedUpdateManyWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    isLike?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyRoomInput = {
    id?: string
    content: string
    typeMessage?: $Enums.TypeMessage
    senderId: string
    receiverId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberInRoomCreateManyRoomInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    typeMessage?: EnumTypeMessageFieldUpdateOperationsInput | $Enums.TypeMessage
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: UserUpdateOneRequiredWithoutSenderMessageNestedInput
    receiver?: UserUpdateOneWithoutReceiveMessageNestedInput
  }

  export type MessageUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    typeMessage?: EnumTypeMessageFieldUpdateOperationsInput | $Enums.TypeMessage
    senderId?: StringFieldUpdateOperationsInput | string
    receiverId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    typeMessage?: EnumTypeMessageFieldUpdateOperationsInput | $Enums.TypeMessage
    senderId?: StringFieldUpdateOperationsInput | string
    receiverId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberInRoomUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMemberInRoomNestedInput
  }

  export type MemberInRoomUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberInRoomUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type UserDeviceCreateManyUserInput = {
    id?: string
    deviceId: string
    nameDevice: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageCreateManySenderInput = {
    id?: string
    content: string
    typeMessage?: $Enums.TypeMessage
    receiverId?: string | null
    roomId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageCreateManyReceiverInput = {
    id?: string
    content: string
    typeMessage?: $Enums.TypeMessage
    senderId: string
    roomId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberInRoomCreateManyUserInput = {
    id?: string
    roomId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostCreateManyUserInput = {
    id?: string
    title: string
    content: string
    file?: PostCreatefileInput | string[]
    viewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string
    likeCount?: number
  }

  export type CommentCreateManyUserInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    postId: string
  }

  export type likePostCreateManyUserInput = {
    id?: string
    isLike?: boolean
    postId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string
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

  export type MessageUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    typeMessage?: EnumTypeMessageFieldUpdateOperationsInput | $Enums.TypeMessage
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receiver?: UserUpdateOneWithoutReceiveMessageNestedInput
    room?: RoomUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    typeMessage?: EnumTypeMessageFieldUpdateOperationsInput | $Enums.TypeMessage
    receiverId?: NullableStringFieldUpdateOperationsInput | string | null
    roomId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    typeMessage?: EnumTypeMessageFieldUpdateOperationsInput | $Enums.TypeMessage
    receiverId?: NullableStringFieldUpdateOperationsInput | string | null
    roomId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUpdateWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    typeMessage?: EnumTypeMessageFieldUpdateOperationsInput | $Enums.TypeMessage
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: UserUpdateOneRequiredWithoutSenderMessageNestedInput
    room?: RoomUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    typeMessage?: EnumTypeMessageFieldUpdateOperationsInput | $Enums.TypeMessage
    senderId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    typeMessage?: EnumTypeMessageFieldUpdateOperationsInput | $Enums.TypeMessage
    senderId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberInRoomUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: RoomUpdateOneRequiredWithoutMembersNestedInput
  }

  export type MemberInRoomUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberInRoomUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    file?: PostUpdatefileInput | string[]
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    likeCount?: IntFieldUpdateOperationsInput | number
    comments?: CommentUpdateManyWithoutPostNestedInput
    likes?: likePostUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    file?: PostUpdatefileInput | string[]
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    likeCount?: IntFieldUpdateOperationsInput | number
    comments?: CommentUncheckedUpdateManyWithoutPostNestedInput
    likes?: likePostUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    file?: PostUpdatefileInput | string[]
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    likeCount?: IntFieldUpdateOperationsInput | number
  }

  export type CommentUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: PostUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    postId?: StringFieldUpdateOperationsInput | string
  }

  export type CommentUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    postId?: StringFieldUpdateOperationsInput | string
  }

  export type likePostUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    isLike?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: PostUpdateOneRequiredWithoutLikesNestedInput
  }

  export type likePostUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    isLike?: BoolFieldUpdateOperationsInput | boolean
    postId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type likePostUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    isLike?: BoolFieldUpdateOperationsInput | boolean
    postId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  export type BatchPayload = {
    count: number
  }

  export const dmmf: runtime.BaseDMMF
}