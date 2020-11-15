import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  sqltag as sql,
  empty,
  join,
  raw,
  Sql,
  Decimal,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }
export { Decimal }

/**
 * Re-export of sql-template-tag
 */
export { sql, empty, join, raw, Sql }

/**
 * Prisma Client JS version: 2.11.0
 * Query Engine version: 58369335532e47bdcec77a2f1e7c1fb83a463918
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
 */
export declare type JsonObject = {[Key in string]?: JsonValue}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
export declare interface JsonArray extends Array<JsonValue> {}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
export declare type JsonValue = string | number | boolean | null | JsonObject | JsonArray

/**
 * Same as JsonObject, but allows undefined
 */
export declare type InputJsonObject = {[Key in string]?: JsonValue}
 
export declare interface InputJsonArray extends Array<JsonValue> {}
 
export declare type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}

declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

export declare type TruthyKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

export declare type TrueKeys<T> = TruthyKeys<Pick<T, RequiredKeys<T>>>

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
/**
 * XOR is needed to have a real mutually exclusive union type
 * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
 */
type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/

export declare type Datasource = {
  url?: string
}

export type Datasources = {
  db?: Datasource
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  /**
   * Overwrites the datasource url from your prisma.schema file
   */
  datasources?: Datasources

  /**
   * @default "colorless"
   */
  errorFormat?: ErrorFormat

  /**
   * @example
   * ```
   * // Defaults to stdout
   * log: ['query', 'info', 'warn', 'error']
   * 
   * // Emit as events
   * log: [
   *  { emit: 'stdout', level: 'query' },
   *  { emit: 'stdout', level: 'info' },
   *  { emit: 'stdout', level: 'warn' }
   *  { emit: 'stdout', level: 'error' }
   * ]
   * ```
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
   */
  log?: Array<LogLevel | LogDefinition>
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn' | 'error'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
  GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
  : never

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
  | 'findOne'
  | 'findMany'
  | 'findFirst'
  | 'create'
  | 'update'
  | 'updateMany'
  | 'upsert'
  | 'delete'
  | 'deleteMany'
  | 'executeRaw'
  | 'queryRaw'
  | 'aggregate'


/**
 * These options are being passed in to the middleware as "params"
 */
export type MiddlewareParams = {
  model?: ModelName
  action: PrismaAction
  args: any
  dataPath: string[]
  runInTransaction: boolean
}

/**
 * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
 */
export type Middleware<T = any> = (
  params: MiddlewareParams,
  next: (params: MiddlewareParams) => Promise<T>,
) => Promise<T>

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export declare class PrismaClient<
  T extends PrismaClientOptions = PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never
> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */
  constructor(optionsArg?: T);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * @deprecated renamed to `$on`
   */
  on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  $connect(): Promise<void>;
  /**
   * @deprecated renamed to `$connect`
   */
  connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;
  /**
   * @deprecated renamed to `$disconnect`
   */
  disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Middleware): void

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $executeRaw<T = any>(query: string | TemplateStringsArray | Sql, ...values: any[]): Promise<number>;

  /**
   * @deprecated renamed to `$executeRaw`
   */
  executeRaw<T = any>(query: string | TemplateStringsArray | Sql, ...values: any[]): Promise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $queryRaw<T = any>(query: string | TemplateStringsArray | Sql, ...values: any[]): Promise<T>;
 
  /**
   * @deprecated renamed to `$queryRaw`
   */
  queryRaw<T = any>(query: string | TemplateStringsArray | Sql, ...values: any[]): Promise<T>;
  /**
   * Execute queries in a transaction
   * @example
   * ```
   * const [george, bob, alice] = await prisma.transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   */
  $transaction: PromiseConstructor['all']
  /**
   * @deprecated renamed to `$transaction`
   */
  transaction: PromiseConstructor['all']

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): UserDelegate;

  /**
   * `prisma.userLog`: Exposes CRUD operations for the **UserLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserLogs
    * const userLogs = await prisma.userLog.findMany()
    * ```
    */
  get userLog(): UserLogDelegate;

  /**
   * `prisma.thirdUser`: Exposes CRUD operations for the **ThirdUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ThirdUsers
    * const thirdUsers = await prisma.thirdUser.findMany()
    * ```
    */
  get thirdUser(): ThirdUserDelegate;

  /**
   * `prisma.weChatUserToken`: Exposes CRUD operations for the **WeChatUserToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WeChatUserTokens
    * const weChatUserTokens = await prisma.weChatUserToken.findMany()
    * ```
    */
  get weChatUserToken(): WeChatUserTokenDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const ModelName: {
  User: 'User',
  UserLog: 'UserLog',
  ThirdUser: 'ThirdUser',
  WeChatUserToken: 'WeChatUserToken'
};

export declare type ModelName = (typeof ModelName)[keyof typeof ModelName]


export declare const UserDistinctFieldEnum: {
  id: 'id',
  uid: 'uid',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  avatar: 'avatar',
  nickname: 'nickname',
  sex: 'sex',
  username: 'username',
  password: 'password',
  verified: 'verified',
  email: 'email',
  emailVerified: 'emailVerified',
  mobile: 'mobile',
  mobileVerified: 'mobileVerified',
  isLocked: 'isLocked',
  isAdmin: 'isAdmin'
};

export declare type UserDistinctFieldEnum = (typeof UserDistinctFieldEnum)[keyof typeof UserDistinctFieldEnum]


export declare const UserLogDistinctFieldEnum: {
  id: 'id',
  level: 'level',
  action: 'action',
  msg: 'msg',
  details: 'details',
  createdAt: 'createdAt',
  userAgent: 'userAgent',
  ipAddress: 'ipAddress',
  ownerId: 'ownerId',
  operatorId: 'operatorId'
};

export declare type UserLogDistinctFieldEnum = (typeof UserLogDistinctFieldEnum)[keyof typeof UserLogDistinctFieldEnum]


export declare const ThirdUserDistinctFieldEnum: {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  openId: 'openId',
  unionid: 'unionid',
  avatar: 'avatar',
  nickname: 'nickname',
  sex: 'sex',
  language: 'language',
  country: 'country',
  province: 'province',
  city: 'city',
  details: 'details',
  provider: 'provider',
  userId: 'userId'
};

export declare type ThirdUserDistinctFieldEnum = (typeof ThirdUserDistinctFieldEnum)[keyof typeof ThirdUserDistinctFieldEnum]


export declare const WeChatUserTokenDistinctFieldEnum: {
  id: 'id',
  openid: 'openid',
  unionid: 'unionid',
  scope: 'scope',
  access_token: 'access_token',
  refresh_token: 'refresh_token',
  expires_in: 'expires_in',
  create_at: 'create_at'
};

export declare type WeChatUserTokenDistinctFieldEnum = (typeof WeChatUserTokenDistinctFieldEnum)[keyof typeof WeChatUserTokenDistinctFieldEnum]


export declare const SortOrder: {
  asc: 'asc',
  desc: 'desc'
};

export declare type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


export declare const QueryMode: {
  default: 'default',
  insensitive: 'insensitive'
};

export declare type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]



/**
 * Model User
 */

export type User = {
  id: number
  uid: string
  createdAt: Date
  updatedAt: Date | null
  avatar: string | null
  nickname: string | null
  sex: number
  username: string | null
  password: string | null
  verified: boolean
  email: string | null
  emailVerified: boolean
  mobile: string | null
  mobileVerified: boolean
  isLocked: boolean
  isAdmin: boolean
}


export type AggregateUser = {
  count: number
  avg: UserAvgAggregateOutputType | null
  sum: UserSumAggregateOutputType | null
  min: UserMinAggregateOutputType | null
  max: UserMaxAggregateOutputType | null
}

export type UserAvgAggregateOutputType = {
  id: number
  sex: number
}

export type UserSumAggregateOutputType = {
  id: number
  sex: number
}

export type UserMinAggregateOutputType = {
  id: number
  sex: number
}

export type UserMaxAggregateOutputType = {
  id: number
  sex: number
}


export type UserAvgAggregateInputType = {
  id?: true
  sex?: true
}

export type UserSumAggregateInputType = {
  id?: true
  sex?: true
}

export type UserMinAggregateInputType = {
  id?: true
  sex?: true
}

export type UserMaxAggregateInputType = {
  id?: true
  sex?: true
}

export type AggregateUserArgs = {
  where?: UserWhereInput
  orderBy?: XOR<Enumerable<UserOrderByInput>, UserOrderByInput>
  cursor?: UserWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
  count?: true
  avg?: UserAvgAggregateInputType
  sum?: UserSumAggregateInputType
  min?: UserMinAggregateInputType
  max?: UserMaxAggregateInputType
}

export type GetUserAggregateType<T extends AggregateUserArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetUserAggregateScalarType<T[P]>
}

export type GetUserAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof UserAvgAggregateOutputType ? UserAvgAggregateOutputType[P] : never
}
    
    

export type UserSelect = {
  id?: boolean
  uid?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  avatar?: boolean
  nickname?: boolean
  sex?: boolean
  username?: boolean
  password?: boolean
  verified?: boolean
  email?: boolean
  emailVerified?: boolean
  mobile?: boolean
  mobileVerified?: boolean
  isLocked?: boolean
  isAdmin?: boolean
  OwnerUserLog?: boolean | FindManyUserLogArgs
  OperatorUserLog?: boolean | FindManyUserLogArgs
  ThirdUser?: boolean | FindManyThirdUserArgs
}

export type UserInclude = {
  OwnerUserLog?: boolean | FindManyUserLogArgs
  OperatorUserLog?: boolean | FindManyUserLogArgs
  ThirdUser?: boolean | FindManyThirdUserArgs
}

export type UserGetPayload<
  S extends boolean | null | undefined | UserArgs,
  U = keyof S
> = S extends true
  ? User
  : S extends undefined
  ? never
  : S extends UserArgs | FindManyUserArgs
  ? 'include' extends U
    ? User  & {
      [P in TrueKeys<S['include']>]:
      P extends 'OwnerUserLog'
      ? Array<UserLogGetPayload<S['include'][P]>> :
      P extends 'OperatorUserLog'
      ? Array<UserLogGetPayload<S['include'][P]>> :
      P extends 'ThirdUser'
      ? Array<ThirdUserGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof User ? User[P]
: 
      P extends 'OwnerUserLog'
      ? Array<UserLogGetPayload<S['select'][P]>> :
      P extends 'OperatorUserLog'
      ? Array<UserLogGetPayload<S['select'][P]>> :
      P extends 'ThirdUser'
      ? Array<ThirdUserGetPayload<S['select'][P]>> : never
    }
  : User
: User


export interface UserDelegate {
  /**
   * Find zero or one User that matches the filter.
   * @param {FindOneUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneUserArgs>(
    args: Subset<T, FindOneUserArgs>
  ): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>
  /**
   * Find the first User that matches the filter.
   * @param {FindFirstUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstUserArgs>(
    args?: Subset<T, FindFirstUserArgs>
  ): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>
  /**
   * Find zero or more Users that matches the filter.
   * @param {FindManyUserArgs=} args - Arguments to filter and select certain fields only.
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
  **/
  findMany<T extends FindManyUserArgs>(
    args?: Subset<T, FindManyUserArgs>
  ): CheckSelect<T, Promise<Array<User>>, Promise<Array<UserGetPayload<T>>>>
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
  **/
  create<T extends UserCreateArgs>(
    args: Subset<T, UserCreateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
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
  **/
  delete<T extends UserDeleteArgs>(
    args: Subset<T, UserDeleteArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
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
  **/
  update<T extends UserUpdateArgs>(
    args: Subset<T, UserUpdateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
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
  **/
  deleteMany<T extends UserDeleteManyArgs>(
    args: Subset<T, UserDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Users.
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
  **/
  updateMany<T extends UserUpdateManyArgs>(
    args: Subset<T, UserUpdateManyArgs>
  ): Promise<BatchPayload>
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
  **/
  upsert<T extends UserUpsertArgs>(
    args: Subset<T, UserUpsertArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyUserArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateUserArgs>(args: Subset<T, AggregateUserArgs>): Promise<GetUserAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for User.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__UserClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  OwnerUserLog<T extends FindManyUserLogArgs = {}>(args?: Subset<T, FindManyUserLogArgs>): CheckSelect<T, Promise<Array<UserLog>>, Promise<Array<UserLogGetPayload<T>>>>;

  OperatorUserLog<T extends FindManyUserLogArgs = {}>(args?: Subset<T, FindManyUserLogArgs>): CheckSelect<T, Promise<Array<UserLog>>, Promise<Array<UserLogGetPayload<T>>>>;

  ThirdUser<T extends FindManyThirdUserArgs = {}>(args?: Subset<T, FindManyThirdUserArgs>): CheckSelect<T, Promise<Array<ThirdUser>>, Promise<Array<ThirdUserGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * User findOne
 */
export type FindOneUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: XOR<UserSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<UserInclude, null>
  /**
   * Filter, which User to fetch.
  **/
  where: UserWhereUniqueInput
}


/**
 * User findFirst
 */
export type FindFirstUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: XOR<UserSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<UserInclude, null>
  /**
   * Filter, which User to fetch.
  **/
  where?: UserWhereInput
  orderBy?: XOR<Enumerable<UserOrderByInput>, UserOrderByInput>
  cursor?: UserWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
}


/**
 * User findMany
 */
export type FindManyUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: XOR<UserSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<UserInclude, null>
  /**
   * Filter, which Users to fetch.
  **/
  where?: UserWhereInput
  /**
   * Determine the order of the Users to fetch.
  **/
  orderBy?: XOR<Enumerable<UserOrderByInput>, UserOrderByInput>
  /**
   * Sets the position for listing Users.
  **/
  cursor?: UserWhereUniqueInput
  /**
   * The number of Users to fetch. If negative number, it will take Users before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Users.
  **/
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
}


/**
 * User create
 */
export type UserCreateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: XOR<UserSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<UserInclude, null>
  /**
   * The data needed to create a User.
  **/
  data: UserCreateInput
}


/**
 * User update
 */
export type UserUpdateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: XOR<UserSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<UserInclude, null>
  /**
   * The data needed to update a User.
  **/
  data: UserUpdateInput
  /**
   * Choose, which User to update.
  **/
  where: UserWhereUniqueInput
}


/**
 * User updateMany
 */
export type UserUpdateManyArgs = {
  data: UserUpdateManyMutationInput
  where?: UserWhereInput
}


/**
 * User upsert
 */
export type UserUpsertArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: XOR<UserSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<UserInclude, null>
  /**
   * The filter to search for the User to update in case it exists.
  **/
  where: UserWhereUniqueInput
  /**
   * In case the User found by the `where` argument doesn't exist, create a new User with this data.
  **/
  create: UserCreateInput
  /**
   * In case the User was found with the provided `where` argument, update it with this data.
  **/
  update: UserUpdateInput
}


/**
 * User delete
 */
export type UserDeleteArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: XOR<UserSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<UserInclude, null>
  /**
   * Filter which User to delete.
  **/
  where: UserWhereUniqueInput
}


/**
 * User deleteMany
 */
export type UserDeleteManyArgs = {
  where?: UserWhereInput
}


/**
 * User without action
 */
export type UserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: XOR<UserSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<UserInclude, null>
}



/**
 * Model UserLog
 */

export type UserLog = {
  id: number
  level: number
  action: string
  msg: string
  details: string | null
  createdAt: Date
  userAgent: string
  ipAddress: string
  ownerId: string
  operatorId: string | null
}


export type AggregateUserLog = {
  count: number
  avg: UserLogAvgAggregateOutputType | null
  sum: UserLogSumAggregateOutputType | null
  min: UserLogMinAggregateOutputType | null
  max: UserLogMaxAggregateOutputType | null
}

export type UserLogAvgAggregateOutputType = {
  id: number
  level: number
}

export type UserLogSumAggregateOutputType = {
  id: number
  level: number
}

export type UserLogMinAggregateOutputType = {
  id: number
  level: number
}

export type UserLogMaxAggregateOutputType = {
  id: number
  level: number
}


export type UserLogAvgAggregateInputType = {
  id?: true
  level?: true
}

export type UserLogSumAggregateInputType = {
  id?: true
  level?: true
}

export type UserLogMinAggregateInputType = {
  id?: true
  level?: true
}

export type UserLogMaxAggregateInputType = {
  id?: true
  level?: true
}

export type AggregateUserLogArgs = {
  where?: UserLogWhereInput
  orderBy?: XOR<Enumerable<UserLogOrderByInput>, UserLogOrderByInput>
  cursor?: UserLogWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<UserLogDistinctFieldEnum>
  count?: true
  avg?: UserLogAvgAggregateInputType
  sum?: UserLogSumAggregateInputType
  min?: UserLogMinAggregateInputType
  max?: UserLogMaxAggregateInputType
}

export type GetUserLogAggregateType<T extends AggregateUserLogArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetUserLogAggregateScalarType<T[P]>
}

export type GetUserLogAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof UserLogAvgAggregateOutputType ? UserLogAvgAggregateOutputType[P] : never
}
    
    

export type UserLogSelect = {
  id?: boolean
  level?: boolean
  action?: boolean
  msg?: boolean
  details?: boolean
  createdAt?: boolean
  userAgent?: boolean
  ipAddress?: boolean
  ownerId?: boolean
  Owner?: boolean | UserArgs
  operatorId?: boolean
  Operator?: boolean | UserArgs
}

export type UserLogInclude = {
  Owner?: boolean | UserArgs
  Operator?: boolean | UserArgs
}

export type UserLogGetPayload<
  S extends boolean | null | undefined | UserLogArgs,
  U = keyof S
> = S extends true
  ? UserLog
  : S extends undefined
  ? never
  : S extends UserLogArgs | FindManyUserLogArgs
  ? 'include' extends U
    ? UserLog  & {
      [P in TrueKeys<S['include']>]:
      P extends 'Owner'
      ? UserGetPayload<S['include'][P]> :
      P extends 'Operator'
      ? UserGetPayload<S['include'][P]> | null : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof UserLog ? UserLog[P]
: 
      P extends 'Owner'
      ? UserGetPayload<S['select'][P]> :
      P extends 'Operator'
      ? UserGetPayload<S['select'][P]> | null : never
    }
  : UserLog
: UserLog


export interface UserLogDelegate {
  /**
   * Find zero or one UserLog that matches the filter.
   * @param {FindOneUserLogArgs} args - Arguments to find a UserLog
   * @example
   * // Get one UserLog
   * const userLog = await prisma.userLog.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneUserLogArgs>(
    args: Subset<T, FindOneUserLogArgs>
  ): CheckSelect<T, Prisma__UserLogClient<UserLog | null>, Prisma__UserLogClient<UserLogGetPayload<T> | null>>
  /**
   * Find the first UserLog that matches the filter.
   * @param {FindFirstUserLogArgs} args - Arguments to find a UserLog
   * @example
   * // Get one UserLog
   * const userLog = await prisma.userLog.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstUserLogArgs>(
    args?: Subset<T, FindFirstUserLogArgs>
  ): CheckSelect<T, Prisma__UserLogClient<UserLog | null>, Prisma__UserLogClient<UserLogGetPayload<T> | null>>
  /**
   * Find zero or more UserLogs that matches the filter.
   * @param {FindManyUserLogArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all UserLogs
   * const userLogs = await prisma.userLog.findMany()
   * 
   * // Get first 10 UserLogs
   * const userLogs = await prisma.userLog.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const userLogWithIdOnly = await prisma.userLog.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyUserLogArgs>(
    args?: Subset<T, FindManyUserLogArgs>
  ): CheckSelect<T, Promise<Array<UserLog>>, Promise<Array<UserLogGetPayload<T>>>>
  /**
   * Create a UserLog.
   * @param {UserLogCreateArgs} args - Arguments to create a UserLog.
   * @example
   * // Create one UserLog
   * const UserLog = await prisma.userLog.create({
   *   data: {
   *     // ... data to create a UserLog
   *   }
   * })
   * 
  **/
  create<T extends UserLogCreateArgs>(
    args: Subset<T, UserLogCreateArgs>
  ): CheckSelect<T, Prisma__UserLogClient<UserLog>, Prisma__UserLogClient<UserLogGetPayload<T>>>
  /**
   * Delete a UserLog.
   * @param {UserLogDeleteArgs} args - Arguments to delete one UserLog.
   * @example
   * // Delete one UserLog
   * const UserLog = await prisma.userLog.delete({
   *   where: {
   *     // ... filter to delete one UserLog
   *   }
   * })
   * 
  **/
  delete<T extends UserLogDeleteArgs>(
    args: Subset<T, UserLogDeleteArgs>
  ): CheckSelect<T, Prisma__UserLogClient<UserLog>, Prisma__UserLogClient<UserLogGetPayload<T>>>
  /**
   * Update one UserLog.
   * @param {UserLogUpdateArgs} args - Arguments to update one UserLog.
   * @example
   * // Update one UserLog
   * const userLog = await prisma.userLog.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends UserLogUpdateArgs>(
    args: Subset<T, UserLogUpdateArgs>
  ): CheckSelect<T, Prisma__UserLogClient<UserLog>, Prisma__UserLogClient<UserLogGetPayload<T>>>
  /**
   * Delete zero or more UserLogs.
   * @param {UserLogDeleteManyArgs} args - Arguments to filter UserLogs to delete.
   * @example
   * // Delete a few UserLogs
   * const { count } = await prisma.userLog.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends UserLogDeleteManyArgs>(
    args: Subset<T, UserLogDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more UserLogs.
   * @param {UserLogUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many UserLogs
   * const userLog = await prisma.userLog.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends UserLogUpdateManyArgs>(
    args: Subset<T, UserLogUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one UserLog.
   * @param {UserLogUpsertArgs} args - Arguments to update or create a UserLog.
   * @example
   * // Update or create a UserLog
   * const userLog = await prisma.userLog.upsert({
   *   create: {
   *     // ... data to create a UserLog
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the UserLog we want to update
   *   }
   * })
  **/
  upsert<T extends UserLogUpsertArgs>(
    args: Subset<T, UserLogUpsertArgs>
  ): CheckSelect<T, Prisma__UserLogClient<UserLog>, Prisma__UserLogClient<UserLogGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyUserLogArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateUserLogArgs>(args: Subset<T, AggregateUserLogArgs>): Promise<GetUserLogAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for UserLog.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__UserLogClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  Owner<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  Operator<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * UserLog findOne
 */
export type FindOneUserLogArgs = {
  /**
   * Select specific fields to fetch from the UserLog
  **/
  select?: XOR<UserLogSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<UserLogInclude, null>
  /**
   * Filter, which UserLog to fetch.
  **/
  where: UserLogWhereUniqueInput
}


/**
 * UserLog findFirst
 */
export type FindFirstUserLogArgs = {
  /**
   * Select specific fields to fetch from the UserLog
  **/
  select?: XOR<UserLogSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<UserLogInclude, null>
  /**
   * Filter, which UserLog to fetch.
  **/
  where?: UserLogWhereInput
  orderBy?: XOR<Enumerable<UserLogOrderByInput>, UserLogOrderByInput>
  cursor?: UserLogWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<UserLogDistinctFieldEnum>
}


/**
 * UserLog findMany
 */
export type FindManyUserLogArgs = {
  /**
   * Select specific fields to fetch from the UserLog
  **/
  select?: XOR<UserLogSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<UserLogInclude, null>
  /**
   * Filter, which UserLogs to fetch.
  **/
  where?: UserLogWhereInput
  /**
   * Determine the order of the UserLogs to fetch.
  **/
  orderBy?: XOR<Enumerable<UserLogOrderByInput>, UserLogOrderByInput>
  /**
   * Sets the position for listing UserLogs.
  **/
  cursor?: UserLogWhereUniqueInput
  /**
   * The number of UserLogs to fetch. If negative number, it will take UserLogs before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` UserLogs.
  **/
  skip?: number
  distinct?: Enumerable<UserLogDistinctFieldEnum>
}


/**
 * UserLog create
 */
export type UserLogCreateArgs = {
  /**
   * Select specific fields to fetch from the UserLog
  **/
  select?: XOR<UserLogSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<UserLogInclude, null>
  /**
   * The data needed to create a UserLog.
  **/
  data: UserLogCreateInput
}


/**
 * UserLog update
 */
export type UserLogUpdateArgs = {
  /**
   * Select specific fields to fetch from the UserLog
  **/
  select?: XOR<UserLogSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<UserLogInclude, null>
  /**
   * The data needed to update a UserLog.
  **/
  data: UserLogUpdateInput
  /**
   * Choose, which UserLog to update.
  **/
  where: UserLogWhereUniqueInput
}


/**
 * UserLog updateMany
 */
export type UserLogUpdateManyArgs = {
  data: UserLogUpdateManyMutationInput
  where?: UserLogWhereInput
}


/**
 * UserLog upsert
 */
export type UserLogUpsertArgs = {
  /**
   * Select specific fields to fetch from the UserLog
  **/
  select?: XOR<UserLogSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<UserLogInclude, null>
  /**
   * The filter to search for the UserLog to update in case it exists.
  **/
  where: UserLogWhereUniqueInput
  /**
   * In case the UserLog found by the `where` argument doesn't exist, create a new UserLog with this data.
  **/
  create: UserLogCreateInput
  /**
   * In case the UserLog was found with the provided `where` argument, update it with this data.
  **/
  update: UserLogUpdateInput
}


/**
 * UserLog delete
 */
export type UserLogDeleteArgs = {
  /**
   * Select specific fields to fetch from the UserLog
  **/
  select?: XOR<UserLogSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<UserLogInclude, null>
  /**
   * Filter which UserLog to delete.
  **/
  where: UserLogWhereUniqueInput
}


/**
 * UserLog deleteMany
 */
export type UserLogDeleteManyArgs = {
  where?: UserLogWhereInput
}


/**
 * UserLog without action
 */
export type UserLogArgs = {
  /**
   * Select specific fields to fetch from the UserLog
  **/
  select?: XOR<UserLogSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<UserLogInclude, null>
}



/**
 * Model ThirdUser
 */

export type ThirdUser = {
  id: number
  createdAt: Date
  updatedAt: Date | null
  openId: string
  unionid: string | null
  avatar: string
  nickname: string
  sex: number
  language: string | null
  country: string | null
  province: string | null
  city: string | null
  details: string
  provider: string
  userId: string
}


export type AggregateThirdUser = {
  count: number
  avg: ThirdUserAvgAggregateOutputType | null
  sum: ThirdUserSumAggregateOutputType | null
  min: ThirdUserMinAggregateOutputType | null
  max: ThirdUserMaxAggregateOutputType | null
}

export type ThirdUserAvgAggregateOutputType = {
  id: number
  sex: number
}

export type ThirdUserSumAggregateOutputType = {
  id: number
  sex: number
}

export type ThirdUserMinAggregateOutputType = {
  id: number
  sex: number
}

export type ThirdUserMaxAggregateOutputType = {
  id: number
  sex: number
}


export type ThirdUserAvgAggregateInputType = {
  id?: true
  sex?: true
}

export type ThirdUserSumAggregateInputType = {
  id?: true
  sex?: true
}

export type ThirdUserMinAggregateInputType = {
  id?: true
  sex?: true
}

export type ThirdUserMaxAggregateInputType = {
  id?: true
  sex?: true
}

export type AggregateThirdUserArgs = {
  where?: ThirdUserWhereInput
  orderBy?: XOR<Enumerable<ThirdUserOrderByInput>, ThirdUserOrderByInput>
  cursor?: ThirdUserWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<ThirdUserDistinctFieldEnum>
  count?: true
  avg?: ThirdUserAvgAggregateInputType
  sum?: ThirdUserSumAggregateInputType
  min?: ThirdUserMinAggregateInputType
  max?: ThirdUserMaxAggregateInputType
}

export type GetThirdUserAggregateType<T extends AggregateThirdUserArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetThirdUserAggregateScalarType<T[P]>
}

export type GetThirdUserAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof ThirdUserAvgAggregateOutputType ? ThirdUserAvgAggregateOutputType[P] : never
}
    
    

export type ThirdUserSelect = {
  id?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  openId?: boolean
  unionid?: boolean
  avatar?: boolean
  nickname?: boolean
  sex?: boolean
  language?: boolean
  country?: boolean
  province?: boolean
  city?: boolean
  details?: boolean
  provider?: boolean
  userId?: boolean
  User?: boolean | UserArgs
}

export type ThirdUserInclude = {
  User?: boolean | UserArgs
}

export type ThirdUserGetPayload<
  S extends boolean | null | undefined | ThirdUserArgs,
  U = keyof S
> = S extends true
  ? ThirdUser
  : S extends undefined
  ? never
  : S extends ThirdUserArgs | FindManyThirdUserArgs
  ? 'include' extends U
    ? ThirdUser  & {
      [P in TrueKeys<S['include']>]:
      P extends 'User'
      ? UserGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof ThirdUser ? ThirdUser[P]
: 
      P extends 'User'
      ? UserGetPayload<S['select'][P]> : never
    }
  : ThirdUser
: ThirdUser


export interface ThirdUserDelegate {
  /**
   * Find zero or one ThirdUser that matches the filter.
   * @param {FindOneThirdUserArgs} args - Arguments to find a ThirdUser
   * @example
   * // Get one ThirdUser
   * const thirdUser = await prisma.thirdUser.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneThirdUserArgs>(
    args: Subset<T, FindOneThirdUserArgs>
  ): CheckSelect<T, Prisma__ThirdUserClient<ThirdUser | null>, Prisma__ThirdUserClient<ThirdUserGetPayload<T> | null>>
  /**
   * Find the first ThirdUser that matches the filter.
   * @param {FindFirstThirdUserArgs} args - Arguments to find a ThirdUser
   * @example
   * // Get one ThirdUser
   * const thirdUser = await prisma.thirdUser.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstThirdUserArgs>(
    args?: Subset<T, FindFirstThirdUserArgs>
  ): CheckSelect<T, Prisma__ThirdUserClient<ThirdUser | null>, Prisma__ThirdUserClient<ThirdUserGetPayload<T> | null>>
  /**
   * Find zero or more ThirdUsers that matches the filter.
   * @param {FindManyThirdUserArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all ThirdUsers
   * const thirdUsers = await prisma.thirdUser.findMany()
   * 
   * // Get first 10 ThirdUsers
   * const thirdUsers = await prisma.thirdUser.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const thirdUserWithIdOnly = await prisma.thirdUser.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyThirdUserArgs>(
    args?: Subset<T, FindManyThirdUserArgs>
  ): CheckSelect<T, Promise<Array<ThirdUser>>, Promise<Array<ThirdUserGetPayload<T>>>>
  /**
   * Create a ThirdUser.
   * @param {ThirdUserCreateArgs} args - Arguments to create a ThirdUser.
   * @example
   * // Create one ThirdUser
   * const ThirdUser = await prisma.thirdUser.create({
   *   data: {
   *     // ... data to create a ThirdUser
   *   }
   * })
   * 
  **/
  create<T extends ThirdUserCreateArgs>(
    args: Subset<T, ThirdUserCreateArgs>
  ): CheckSelect<T, Prisma__ThirdUserClient<ThirdUser>, Prisma__ThirdUserClient<ThirdUserGetPayload<T>>>
  /**
   * Delete a ThirdUser.
   * @param {ThirdUserDeleteArgs} args - Arguments to delete one ThirdUser.
   * @example
   * // Delete one ThirdUser
   * const ThirdUser = await prisma.thirdUser.delete({
   *   where: {
   *     // ... filter to delete one ThirdUser
   *   }
   * })
   * 
  **/
  delete<T extends ThirdUserDeleteArgs>(
    args: Subset<T, ThirdUserDeleteArgs>
  ): CheckSelect<T, Prisma__ThirdUserClient<ThirdUser>, Prisma__ThirdUserClient<ThirdUserGetPayload<T>>>
  /**
   * Update one ThirdUser.
   * @param {ThirdUserUpdateArgs} args - Arguments to update one ThirdUser.
   * @example
   * // Update one ThirdUser
   * const thirdUser = await prisma.thirdUser.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends ThirdUserUpdateArgs>(
    args: Subset<T, ThirdUserUpdateArgs>
  ): CheckSelect<T, Prisma__ThirdUserClient<ThirdUser>, Prisma__ThirdUserClient<ThirdUserGetPayload<T>>>
  /**
   * Delete zero or more ThirdUsers.
   * @param {ThirdUserDeleteManyArgs} args - Arguments to filter ThirdUsers to delete.
   * @example
   * // Delete a few ThirdUsers
   * const { count } = await prisma.thirdUser.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends ThirdUserDeleteManyArgs>(
    args: Subset<T, ThirdUserDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more ThirdUsers.
   * @param {ThirdUserUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many ThirdUsers
   * const thirdUser = await prisma.thirdUser.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends ThirdUserUpdateManyArgs>(
    args: Subset<T, ThirdUserUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one ThirdUser.
   * @param {ThirdUserUpsertArgs} args - Arguments to update or create a ThirdUser.
   * @example
   * // Update or create a ThirdUser
   * const thirdUser = await prisma.thirdUser.upsert({
   *   create: {
   *     // ... data to create a ThirdUser
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the ThirdUser we want to update
   *   }
   * })
  **/
  upsert<T extends ThirdUserUpsertArgs>(
    args: Subset<T, ThirdUserUpsertArgs>
  ): CheckSelect<T, Prisma__ThirdUserClient<ThirdUser>, Prisma__ThirdUserClient<ThirdUserGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyThirdUserArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateThirdUserArgs>(args: Subset<T, AggregateThirdUserArgs>): Promise<GetThirdUserAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for ThirdUser.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__ThirdUserClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  User<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * ThirdUser findOne
 */
export type FindOneThirdUserArgs = {
  /**
   * Select specific fields to fetch from the ThirdUser
  **/
  select?: XOR<ThirdUserSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<ThirdUserInclude, null>
  /**
   * Filter, which ThirdUser to fetch.
  **/
  where: ThirdUserWhereUniqueInput
}


/**
 * ThirdUser findFirst
 */
export type FindFirstThirdUserArgs = {
  /**
   * Select specific fields to fetch from the ThirdUser
  **/
  select?: XOR<ThirdUserSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<ThirdUserInclude, null>
  /**
   * Filter, which ThirdUser to fetch.
  **/
  where?: ThirdUserWhereInput
  orderBy?: XOR<Enumerable<ThirdUserOrderByInput>, ThirdUserOrderByInput>
  cursor?: ThirdUserWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<ThirdUserDistinctFieldEnum>
}


/**
 * ThirdUser findMany
 */
export type FindManyThirdUserArgs = {
  /**
   * Select specific fields to fetch from the ThirdUser
  **/
  select?: XOR<ThirdUserSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<ThirdUserInclude, null>
  /**
   * Filter, which ThirdUsers to fetch.
  **/
  where?: ThirdUserWhereInput
  /**
   * Determine the order of the ThirdUsers to fetch.
  **/
  orderBy?: XOR<Enumerable<ThirdUserOrderByInput>, ThirdUserOrderByInput>
  /**
   * Sets the position for listing ThirdUsers.
  **/
  cursor?: ThirdUserWhereUniqueInput
  /**
   * The number of ThirdUsers to fetch. If negative number, it will take ThirdUsers before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` ThirdUsers.
  **/
  skip?: number
  distinct?: Enumerable<ThirdUserDistinctFieldEnum>
}


/**
 * ThirdUser create
 */
export type ThirdUserCreateArgs = {
  /**
   * Select specific fields to fetch from the ThirdUser
  **/
  select?: XOR<ThirdUserSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<ThirdUserInclude, null>
  /**
   * The data needed to create a ThirdUser.
  **/
  data: ThirdUserCreateInput
}


/**
 * ThirdUser update
 */
export type ThirdUserUpdateArgs = {
  /**
   * Select specific fields to fetch from the ThirdUser
  **/
  select?: XOR<ThirdUserSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<ThirdUserInclude, null>
  /**
   * The data needed to update a ThirdUser.
  **/
  data: ThirdUserUpdateInput
  /**
   * Choose, which ThirdUser to update.
  **/
  where: ThirdUserWhereUniqueInput
}


/**
 * ThirdUser updateMany
 */
export type ThirdUserUpdateManyArgs = {
  data: ThirdUserUpdateManyMutationInput
  where?: ThirdUserWhereInput
}


/**
 * ThirdUser upsert
 */
export type ThirdUserUpsertArgs = {
  /**
   * Select specific fields to fetch from the ThirdUser
  **/
  select?: XOR<ThirdUserSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<ThirdUserInclude, null>
  /**
   * The filter to search for the ThirdUser to update in case it exists.
  **/
  where: ThirdUserWhereUniqueInput
  /**
   * In case the ThirdUser found by the `where` argument doesn't exist, create a new ThirdUser with this data.
  **/
  create: ThirdUserCreateInput
  /**
   * In case the ThirdUser was found with the provided `where` argument, update it with this data.
  **/
  update: ThirdUserUpdateInput
}


/**
 * ThirdUser delete
 */
export type ThirdUserDeleteArgs = {
  /**
   * Select specific fields to fetch from the ThirdUser
  **/
  select?: XOR<ThirdUserSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<ThirdUserInclude, null>
  /**
   * Filter which ThirdUser to delete.
  **/
  where: ThirdUserWhereUniqueInput
}


/**
 * ThirdUser deleteMany
 */
export type ThirdUserDeleteManyArgs = {
  where?: ThirdUserWhereInput
}


/**
 * ThirdUser without action
 */
export type ThirdUserArgs = {
  /**
   * Select specific fields to fetch from the ThirdUser
  **/
  select?: XOR<ThirdUserSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<ThirdUserInclude, null>
}



/**
 * Model WeChatUserToken
 */

export type WeChatUserToken = {
  id: number
  openid: string
  unionid: string | null
  scope: string
  access_token: string
  refresh_token: string
  expires_in: number
  create_at: number
}


export type AggregateWeChatUserToken = {
  count: number
  avg: WeChatUserTokenAvgAggregateOutputType | null
  sum: WeChatUserTokenSumAggregateOutputType | null
  min: WeChatUserTokenMinAggregateOutputType | null
  max: WeChatUserTokenMaxAggregateOutputType | null
}

export type WeChatUserTokenAvgAggregateOutputType = {
  id: number
  expires_in: number
  create_at: number
}

export type WeChatUserTokenSumAggregateOutputType = {
  id: number
  expires_in: number
  create_at: number
}

export type WeChatUserTokenMinAggregateOutputType = {
  id: number
  expires_in: number
  create_at: number
}

export type WeChatUserTokenMaxAggregateOutputType = {
  id: number
  expires_in: number
  create_at: number
}


export type WeChatUserTokenAvgAggregateInputType = {
  id?: true
  expires_in?: true
  create_at?: true
}

export type WeChatUserTokenSumAggregateInputType = {
  id?: true
  expires_in?: true
  create_at?: true
}

export type WeChatUserTokenMinAggregateInputType = {
  id?: true
  expires_in?: true
  create_at?: true
}

export type WeChatUserTokenMaxAggregateInputType = {
  id?: true
  expires_in?: true
  create_at?: true
}

export type AggregateWeChatUserTokenArgs = {
  where?: WeChatUserTokenWhereInput
  orderBy?: XOR<Enumerable<WeChatUserTokenOrderByInput>, WeChatUserTokenOrderByInput>
  cursor?: WeChatUserTokenWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<WeChatUserTokenDistinctFieldEnum>
  count?: true
  avg?: WeChatUserTokenAvgAggregateInputType
  sum?: WeChatUserTokenSumAggregateInputType
  min?: WeChatUserTokenMinAggregateInputType
  max?: WeChatUserTokenMaxAggregateInputType
}

export type GetWeChatUserTokenAggregateType<T extends AggregateWeChatUserTokenArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetWeChatUserTokenAggregateScalarType<T[P]>
}

export type GetWeChatUserTokenAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof WeChatUserTokenAvgAggregateOutputType ? WeChatUserTokenAvgAggregateOutputType[P] : never
}
    
    

export type WeChatUserTokenSelect = {
  id?: boolean
  openid?: boolean
  unionid?: boolean
  scope?: boolean
  access_token?: boolean
  refresh_token?: boolean
  expires_in?: boolean
  create_at?: boolean
}

export type WeChatUserTokenGetPayload<
  S extends boolean | null | undefined | WeChatUserTokenArgs,
  U = keyof S
> = S extends true
  ? WeChatUserToken
  : S extends undefined
  ? never
  : S extends WeChatUserTokenArgs | FindManyWeChatUserTokenArgs
  ? 'include' extends U
    ? WeChatUserToken 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof WeChatUserToken ? WeChatUserToken[P]
: 
 never
    }
  : WeChatUserToken
: WeChatUserToken


export interface WeChatUserTokenDelegate {
  /**
   * Find zero or one WeChatUserToken that matches the filter.
   * @param {FindOneWeChatUserTokenArgs} args - Arguments to find a WeChatUserToken
   * @example
   * // Get one WeChatUserToken
   * const weChatUserToken = await prisma.weChatUserToken.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneWeChatUserTokenArgs>(
    args: Subset<T, FindOneWeChatUserTokenArgs>
  ): CheckSelect<T, Prisma__WeChatUserTokenClient<WeChatUserToken | null>, Prisma__WeChatUserTokenClient<WeChatUserTokenGetPayload<T> | null>>
  /**
   * Find the first WeChatUserToken that matches the filter.
   * @param {FindFirstWeChatUserTokenArgs} args - Arguments to find a WeChatUserToken
   * @example
   * // Get one WeChatUserToken
   * const weChatUserToken = await prisma.weChatUserToken.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstWeChatUserTokenArgs>(
    args?: Subset<T, FindFirstWeChatUserTokenArgs>
  ): CheckSelect<T, Prisma__WeChatUserTokenClient<WeChatUserToken | null>, Prisma__WeChatUserTokenClient<WeChatUserTokenGetPayload<T> | null>>
  /**
   * Find zero or more WeChatUserTokens that matches the filter.
   * @param {FindManyWeChatUserTokenArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all WeChatUserTokens
   * const weChatUserTokens = await prisma.weChatUserToken.findMany()
   * 
   * // Get first 10 WeChatUserTokens
   * const weChatUserTokens = await prisma.weChatUserToken.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const weChatUserTokenWithIdOnly = await prisma.weChatUserToken.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyWeChatUserTokenArgs>(
    args?: Subset<T, FindManyWeChatUserTokenArgs>
  ): CheckSelect<T, Promise<Array<WeChatUserToken>>, Promise<Array<WeChatUserTokenGetPayload<T>>>>
  /**
   * Create a WeChatUserToken.
   * @param {WeChatUserTokenCreateArgs} args - Arguments to create a WeChatUserToken.
   * @example
   * // Create one WeChatUserToken
   * const WeChatUserToken = await prisma.weChatUserToken.create({
   *   data: {
   *     // ... data to create a WeChatUserToken
   *   }
   * })
   * 
  **/
  create<T extends WeChatUserTokenCreateArgs>(
    args: Subset<T, WeChatUserTokenCreateArgs>
  ): CheckSelect<T, Prisma__WeChatUserTokenClient<WeChatUserToken>, Prisma__WeChatUserTokenClient<WeChatUserTokenGetPayload<T>>>
  /**
   * Delete a WeChatUserToken.
   * @param {WeChatUserTokenDeleteArgs} args - Arguments to delete one WeChatUserToken.
   * @example
   * // Delete one WeChatUserToken
   * const WeChatUserToken = await prisma.weChatUserToken.delete({
   *   where: {
   *     // ... filter to delete one WeChatUserToken
   *   }
   * })
   * 
  **/
  delete<T extends WeChatUserTokenDeleteArgs>(
    args: Subset<T, WeChatUserTokenDeleteArgs>
  ): CheckSelect<T, Prisma__WeChatUserTokenClient<WeChatUserToken>, Prisma__WeChatUserTokenClient<WeChatUserTokenGetPayload<T>>>
  /**
   * Update one WeChatUserToken.
   * @param {WeChatUserTokenUpdateArgs} args - Arguments to update one WeChatUserToken.
   * @example
   * // Update one WeChatUserToken
   * const weChatUserToken = await prisma.weChatUserToken.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends WeChatUserTokenUpdateArgs>(
    args: Subset<T, WeChatUserTokenUpdateArgs>
  ): CheckSelect<T, Prisma__WeChatUserTokenClient<WeChatUserToken>, Prisma__WeChatUserTokenClient<WeChatUserTokenGetPayload<T>>>
  /**
   * Delete zero or more WeChatUserTokens.
   * @param {WeChatUserTokenDeleteManyArgs} args - Arguments to filter WeChatUserTokens to delete.
   * @example
   * // Delete a few WeChatUserTokens
   * const { count } = await prisma.weChatUserToken.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends WeChatUserTokenDeleteManyArgs>(
    args: Subset<T, WeChatUserTokenDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more WeChatUserTokens.
   * @param {WeChatUserTokenUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many WeChatUserTokens
   * const weChatUserToken = await prisma.weChatUserToken.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends WeChatUserTokenUpdateManyArgs>(
    args: Subset<T, WeChatUserTokenUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one WeChatUserToken.
   * @param {WeChatUserTokenUpsertArgs} args - Arguments to update or create a WeChatUserToken.
   * @example
   * // Update or create a WeChatUserToken
   * const weChatUserToken = await prisma.weChatUserToken.upsert({
   *   create: {
   *     // ... data to create a WeChatUserToken
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the WeChatUserToken we want to update
   *   }
   * })
  **/
  upsert<T extends WeChatUserTokenUpsertArgs>(
    args: Subset<T, WeChatUserTokenUpsertArgs>
  ): CheckSelect<T, Prisma__WeChatUserTokenClient<WeChatUserToken>, Prisma__WeChatUserTokenClient<WeChatUserTokenGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyWeChatUserTokenArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateWeChatUserTokenArgs>(args: Subset<T, AggregateWeChatUserTokenArgs>): Promise<GetWeChatUserTokenAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for WeChatUserToken.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__WeChatUserTokenClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * WeChatUserToken findOne
 */
export type FindOneWeChatUserTokenArgs = {
  /**
   * Select specific fields to fetch from the WeChatUserToken
  **/
  select?: XOR<WeChatUserTokenSelect, null>
  /**
   * Filter, which WeChatUserToken to fetch.
  **/
  where: WeChatUserTokenWhereUniqueInput
}


/**
 * WeChatUserToken findFirst
 */
export type FindFirstWeChatUserTokenArgs = {
  /**
   * Select specific fields to fetch from the WeChatUserToken
  **/
  select?: XOR<WeChatUserTokenSelect, null>
  /**
   * Filter, which WeChatUserToken to fetch.
  **/
  where?: WeChatUserTokenWhereInput
  orderBy?: XOR<Enumerable<WeChatUserTokenOrderByInput>, WeChatUserTokenOrderByInput>
  cursor?: WeChatUserTokenWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<WeChatUserTokenDistinctFieldEnum>
}


/**
 * WeChatUserToken findMany
 */
export type FindManyWeChatUserTokenArgs = {
  /**
   * Select specific fields to fetch from the WeChatUserToken
  **/
  select?: XOR<WeChatUserTokenSelect, null>
  /**
   * Filter, which WeChatUserTokens to fetch.
  **/
  where?: WeChatUserTokenWhereInput
  /**
   * Determine the order of the WeChatUserTokens to fetch.
  **/
  orderBy?: XOR<Enumerable<WeChatUserTokenOrderByInput>, WeChatUserTokenOrderByInput>
  /**
   * Sets the position for listing WeChatUserTokens.
  **/
  cursor?: WeChatUserTokenWhereUniqueInput
  /**
   * The number of WeChatUserTokens to fetch. If negative number, it will take WeChatUserTokens before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` WeChatUserTokens.
  **/
  skip?: number
  distinct?: Enumerable<WeChatUserTokenDistinctFieldEnum>
}


/**
 * WeChatUserToken create
 */
export type WeChatUserTokenCreateArgs = {
  /**
   * Select specific fields to fetch from the WeChatUserToken
  **/
  select?: XOR<WeChatUserTokenSelect, null>
  /**
   * The data needed to create a WeChatUserToken.
  **/
  data: WeChatUserTokenCreateInput
}


/**
 * WeChatUserToken update
 */
export type WeChatUserTokenUpdateArgs = {
  /**
   * Select specific fields to fetch from the WeChatUserToken
  **/
  select?: XOR<WeChatUserTokenSelect, null>
  /**
   * The data needed to update a WeChatUserToken.
  **/
  data: WeChatUserTokenUpdateInput
  /**
   * Choose, which WeChatUserToken to update.
  **/
  where: WeChatUserTokenWhereUniqueInput
}


/**
 * WeChatUserToken updateMany
 */
export type WeChatUserTokenUpdateManyArgs = {
  data: WeChatUserTokenUpdateManyMutationInput
  where?: WeChatUserTokenWhereInput
}


/**
 * WeChatUserToken upsert
 */
export type WeChatUserTokenUpsertArgs = {
  /**
   * Select specific fields to fetch from the WeChatUserToken
  **/
  select?: XOR<WeChatUserTokenSelect, null>
  /**
   * The filter to search for the WeChatUserToken to update in case it exists.
  **/
  where: WeChatUserTokenWhereUniqueInput
  /**
   * In case the WeChatUserToken found by the `where` argument doesn't exist, create a new WeChatUserToken with this data.
  **/
  create: WeChatUserTokenCreateInput
  /**
   * In case the WeChatUserToken was found with the provided `where` argument, update it with this data.
  **/
  update: WeChatUserTokenUpdateInput
}


/**
 * WeChatUserToken delete
 */
export type WeChatUserTokenDeleteArgs = {
  /**
   * Select specific fields to fetch from the WeChatUserToken
  **/
  select?: XOR<WeChatUserTokenSelect, null>
  /**
   * Filter which WeChatUserToken to delete.
  **/
  where: WeChatUserTokenWhereUniqueInput
}


/**
 * WeChatUserToken deleteMany
 */
export type WeChatUserTokenDeleteManyArgs = {
  where?: WeChatUserTokenWhereInput
}


/**
 * WeChatUserToken without action
 */
export type WeChatUserTokenArgs = {
  /**
   * Select specific fields to fetch from the WeChatUserToken
  **/
  select?: XOR<WeChatUserTokenSelect, null>
}



/**
 * Deep Input Types
 */


export type UserWhereInput = {
  AND?: XOR<UserWhereInput, Enumerable<UserWhereInput>>
  OR?: XOR<UserWhereInput, Enumerable<UserWhereInput>>
  NOT?: XOR<UserWhereInput, Enumerable<UserWhereInput>>
  id?: XOR<IntFilter, number>
  uid?: XOR<StringFilter, string>
  createdAt?: XOR<DateTimeFilter, Date | string>
  updatedAt?: DateTimeNullableFilter | Date | string | null
  avatar?: StringNullableFilter | string | null
  nickname?: StringNullableFilter | string | null
  sex?: XOR<IntFilter, number>
  username?: StringNullableFilter | string | null
  password?: StringNullableFilter | string | null
  verified?: XOR<BoolFilter, boolean>
  email?: StringNullableFilter | string | null
  emailVerified?: XOR<BoolFilter, boolean>
  mobile?: StringNullableFilter | string | null
  mobileVerified?: XOR<BoolFilter, boolean>
  isLocked?: XOR<BoolFilter, boolean>
  isAdmin?: XOR<BoolFilter, boolean>
  OwnerUserLog?: UserLogListRelationFilter
  OperatorUserLog?: UserLogListRelationFilter
  ThirdUser?: ThirdUserListRelationFilter
}

export type UserOrderByInput = {
  id?: SortOrder
  uid?: SortOrder
  createdAt?: SortOrder
  updatedAt?: SortOrder
  avatar?: SortOrder
  nickname?: SortOrder
  sex?: SortOrder
  username?: SortOrder
  password?: SortOrder
  verified?: SortOrder
  email?: SortOrder
  emailVerified?: SortOrder
  mobile?: SortOrder
  mobileVerified?: SortOrder
  isLocked?: SortOrder
  isAdmin?: SortOrder
}

export type UserWhereUniqueInput = {
  id?: number
  uid?: string
  nickname?: string
  username?: string
  email?: string
  mobile?: string
}

export type UserLogWhereInput = {
  AND?: XOR<UserLogWhereInput, Enumerable<UserLogWhereInput>>
  OR?: XOR<UserLogWhereInput, Enumerable<UserLogWhereInput>>
  NOT?: XOR<UserLogWhereInput, Enumerable<UserLogWhereInput>>
  id?: XOR<IntFilter, number>
  level?: XOR<IntFilter, number>
  action?: XOR<StringFilter, string>
  msg?: XOR<StringFilter, string>
  details?: StringNullableFilter | string | null
  createdAt?: XOR<DateTimeFilter, Date | string>
  userAgent?: XOR<StringFilter, string>
  ipAddress?: XOR<StringFilter, string>
  ownerId?: XOR<StringFilter, string>
  Owner?: XOR<UserRelationFilter, UserWhereInput>
  operatorId?: StringNullableFilter | string | null
  Operator?: UserRelationFilter | UserWhereInput | null
}

export type UserLogOrderByInput = {
  id?: SortOrder
  level?: SortOrder
  action?: SortOrder
  msg?: SortOrder
  details?: SortOrder
  createdAt?: SortOrder
  userAgent?: SortOrder
  ipAddress?: SortOrder
  ownerId?: SortOrder
  operatorId?: SortOrder
}

export type UserLogWhereUniqueInput = {
  id?: number
}

export type ThirdUserWhereInput = {
  AND?: XOR<ThirdUserWhereInput, Enumerable<ThirdUserWhereInput>>
  OR?: XOR<ThirdUserWhereInput, Enumerable<ThirdUserWhereInput>>
  NOT?: XOR<ThirdUserWhereInput, Enumerable<ThirdUserWhereInput>>
  id?: XOR<IntFilter, number>
  createdAt?: XOR<DateTimeFilter, Date | string>
  updatedAt?: DateTimeNullableFilter | Date | string | null
  openId?: XOR<StringFilter, string>
  unionid?: StringNullableFilter | string | null
  avatar?: XOR<StringFilter, string>
  nickname?: XOR<StringFilter, string>
  sex?: XOR<IntFilter, number>
  language?: StringNullableFilter | string | null
  country?: StringNullableFilter | string | null
  province?: StringNullableFilter | string | null
  city?: StringNullableFilter | string | null
  details?: XOR<StringFilter, string>
  provider?: XOR<StringFilter, string>
  userId?: XOR<StringFilter, string>
  User?: XOR<UserRelationFilter, UserWhereInput>
}

export type ThirdUserOrderByInput = {
  id?: SortOrder
  createdAt?: SortOrder
  updatedAt?: SortOrder
  openId?: SortOrder
  unionid?: SortOrder
  avatar?: SortOrder
  nickname?: SortOrder
  sex?: SortOrder
  language?: SortOrder
  country?: SortOrder
  province?: SortOrder
  city?: SortOrder
  details?: SortOrder
  provider?: SortOrder
  userId?: SortOrder
}

export type ThirdUserWhereUniqueInput = {
  id?: number
}

export type WeChatUserTokenWhereInput = {
  AND?: XOR<WeChatUserTokenWhereInput, Enumerable<WeChatUserTokenWhereInput>>
  OR?: XOR<WeChatUserTokenWhereInput, Enumerable<WeChatUserTokenWhereInput>>
  NOT?: XOR<WeChatUserTokenWhereInput, Enumerable<WeChatUserTokenWhereInput>>
  id?: XOR<IntFilter, number>
  openid?: XOR<StringFilter, string>
  unionid?: StringNullableFilter | string | null
  scope?: XOR<StringFilter, string>
  access_token?: XOR<StringFilter, string>
  refresh_token?: XOR<StringFilter, string>
  expires_in?: XOR<IntFilter, number>
  create_at?: XOR<IntFilter, number>
}

export type WeChatUserTokenOrderByInput = {
  id?: SortOrder
  openid?: SortOrder
  unionid?: SortOrder
  scope?: SortOrder
  access_token?: SortOrder
  refresh_token?: SortOrder
  expires_in?: SortOrder
  create_at?: SortOrder
}

export type WeChatUserTokenWhereUniqueInput = {
  id?: number
  openid?: string
}

export type UserCreateInput = {
  uid?: string
  createdAt?: Date | string
  updatedAt?: XOR<Date | string, null>
  avatar?: XOR<string, null>
  nickname?: XOR<string, null>
  sex?: number
  username?: XOR<string, null>
  password?: XOR<string, null>
  verified?: boolean
  email?: XOR<string, null>
  emailVerified?: boolean
  mobile?: XOR<string, null>
  mobileVerified?: boolean
  isLocked?: boolean
  isAdmin?: boolean
  OwnerUserLog?: UserLogCreateManyWithoutOwnerInput
  OperatorUserLog?: UserLogCreateManyWithoutOperatorInput
  ThirdUser?: ThirdUserCreateManyWithoutUserInput
}

export type UserUpdateInput = {
  uid?: XOR<string, StringFieldUpdateOperationsInput>
  createdAt?: XOR<Date | string, DateTimeFieldUpdateOperationsInput>
  updatedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  avatar?: string | NullableStringFieldUpdateOperationsInput | null
  nickname?: string | NullableStringFieldUpdateOperationsInput | null
  sex?: XOR<number, IntFieldUpdateOperationsInput>
  username?: string | NullableStringFieldUpdateOperationsInput | null
  password?: string | NullableStringFieldUpdateOperationsInput | null
  verified?: XOR<boolean, BoolFieldUpdateOperationsInput>
  email?: string | NullableStringFieldUpdateOperationsInput | null
  emailVerified?: XOR<boolean, BoolFieldUpdateOperationsInput>
  mobile?: string | NullableStringFieldUpdateOperationsInput | null
  mobileVerified?: XOR<boolean, BoolFieldUpdateOperationsInput>
  isLocked?: XOR<boolean, BoolFieldUpdateOperationsInput>
  isAdmin?: XOR<boolean, BoolFieldUpdateOperationsInput>
  OwnerUserLog?: UserLogUpdateManyWithoutOwnerInput
  OperatorUserLog?: UserLogUpdateManyWithoutOperatorInput
  ThirdUser?: ThirdUserUpdateManyWithoutUserInput
}

export type UserUpdateManyMutationInput = {
  uid?: XOR<string, StringFieldUpdateOperationsInput>
  createdAt?: XOR<Date | string, DateTimeFieldUpdateOperationsInput>
  updatedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  avatar?: string | NullableStringFieldUpdateOperationsInput | null
  nickname?: string | NullableStringFieldUpdateOperationsInput | null
  sex?: XOR<number, IntFieldUpdateOperationsInput>
  username?: string | NullableStringFieldUpdateOperationsInput | null
  password?: string | NullableStringFieldUpdateOperationsInput | null
  verified?: XOR<boolean, BoolFieldUpdateOperationsInput>
  email?: string | NullableStringFieldUpdateOperationsInput | null
  emailVerified?: XOR<boolean, BoolFieldUpdateOperationsInput>
  mobile?: string | NullableStringFieldUpdateOperationsInput | null
  mobileVerified?: XOR<boolean, BoolFieldUpdateOperationsInput>
  isLocked?: XOR<boolean, BoolFieldUpdateOperationsInput>
  isAdmin?: XOR<boolean, BoolFieldUpdateOperationsInput>
}

export type UserLogCreateInput = {
  level: number
  action: string
  msg: string
  details?: XOR<string, null>
  createdAt?: Date | string
  userAgent: string
  ipAddress: string
  Owner: UserCreateOneWithoutOwnerUserLogInput
  Operator?: UserCreateOneWithoutOperatorUserLogInput
}

export type UserLogUpdateInput = {
  level?: XOR<number, IntFieldUpdateOperationsInput>
  action?: XOR<string, StringFieldUpdateOperationsInput>
  msg?: XOR<string, StringFieldUpdateOperationsInput>
  details?: string | NullableStringFieldUpdateOperationsInput | null
  createdAt?: XOR<Date | string, DateTimeFieldUpdateOperationsInput>
  userAgent?: XOR<string, StringFieldUpdateOperationsInput>
  ipAddress?: XOR<string, StringFieldUpdateOperationsInput>
  Owner?: UserUpdateOneRequiredWithoutOwnerUserLogInput
  Operator?: UserUpdateOneWithoutOperatorUserLogInput
}

export type UserLogUpdateManyMutationInput = {
  level?: XOR<number, IntFieldUpdateOperationsInput>
  action?: XOR<string, StringFieldUpdateOperationsInput>
  msg?: XOR<string, StringFieldUpdateOperationsInput>
  details?: string | NullableStringFieldUpdateOperationsInput | null
  createdAt?: XOR<Date | string, DateTimeFieldUpdateOperationsInput>
  userAgent?: XOR<string, StringFieldUpdateOperationsInput>
  ipAddress?: XOR<string, StringFieldUpdateOperationsInput>
}

export type ThirdUserCreateInput = {
  createdAt?: Date | string
  updatedAt?: XOR<Date | string, null>
  openId: string
  unionid?: XOR<string, null>
  avatar: string
  nickname: string
  sex?: number
  language?: XOR<string, null>
  country?: XOR<string, null>
  province?: XOR<string, null>
  city?: XOR<string, null>
  details: string
  provider: string
  User: UserCreateOneWithoutThirdUserInput
}

export type ThirdUserUpdateInput = {
  createdAt?: XOR<Date | string, DateTimeFieldUpdateOperationsInput>
  updatedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  openId?: XOR<string, StringFieldUpdateOperationsInput>
  unionid?: string | NullableStringFieldUpdateOperationsInput | null
  avatar?: XOR<string, StringFieldUpdateOperationsInput>
  nickname?: XOR<string, StringFieldUpdateOperationsInput>
  sex?: XOR<number, IntFieldUpdateOperationsInput>
  language?: string | NullableStringFieldUpdateOperationsInput | null
  country?: string | NullableStringFieldUpdateOperationsInput | null
  province?: string | NullableStringFieldUpdateOperationsInput | null
  city?: string | NullableStringFieldUpdateOperationsInput | null
  details?: XOR<string, StringFieldUpdateOperationsInput>
  provider?: XOR<string, StringFieldUpdateOperationsInput>
  User?: UserUpdateOneRequiredWithoutThirdUserInput
}

export type ThirdUserUpdateManyMutationInput = {
  createdAt?: XOR<Date | string, DateTimeFieldUpdateOperationsInput>
  updatedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  openId?: XOR<string, StringFieldUpdateOperationsInput>
  unionid?: string | NullableStringFieldUpdateOperationsInput | null
  avatar?: XOR<string, StringFieldUpdateOperationsInput>
  nickname?: XOR<string, StringFieldUpdateOperationsInput>
  sex?: XOR<number, IntFieldUpdateOperationsInput>
  language?: string | NullableStringFieldUpdateOperationsInput | null
  country?: string | NullableStringFieldUpdateOperationsInput | null
  province?: string | NullableStringFieldUpdateOperationsInput | null
  city?: string | NullableStringFieldUpdateOperationsInput | null
  details?: XOR<string, StringFieldUpdateOperationsInput>
  provider?: XOR<string, StringFieldUpdateOperationsInput>
}

export type WeChatUserTokenCreateInput = {
  openid: string
  unionid?: XOR<string, null>
  scope: string
  access_token: string
  refresh_token: string
  expires_in: number
  create_at: number
}

export type WeChatUserTokenUpdateInput = {
  openid?: XOR<string, StringFieldUpdateOperationsInput>
  unionid?: string | NullableStringFieldUpdateOperationsInput | null
  scope?: XOR<string, StringFieldUpdateOperationsInput>
  access_token?: XOR<string, StringFieldUpdateOperationsInput>
  refresh_token?: XOR<string, StringFieldUpdateOperationsInput>
  expires_in?: XOR<number, IntFieldUpdateOperationsInput>
  create_at?: XOR<number, IntFieldUpdateOperationsInput>
}

export type WeChatUserTokenUpdateManyMutationInput = {
  openid?: XOR<string, StringFieldUpdateOperationsInput>
  unionid?: string | NullableStringFieldUpdateOperationsInput | null
  scope?: XOR<string, StringFieldUpdateOperationsInput>
  access_token?: XOR<string, StringFieldUpdateOperationsInput>
  refresh_token?: XOR<string, StringFieldUpdateOperationsInput>
  expires_in?: XOR<number, IntFieldUpdateOperationsInput>
  create_at?: XOR<number, IntFieldUpdateOperationsInput>
}

export type IntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: XOR<number, NestedIntFilter>
}

export type StringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  mode?: QueryMode
  not?: XOR<string, NestedStringFilter>
}

export type DateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date> | Enumerable<string>
  notIn?: Enumerable<Date> | Enumerable<string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: XOR<Date | string, NestedDateTimeFilter>
}

export type DateTimeNullableFilter = {
  equals?: XOR<Date | string, null>
  in?: XOR<Enumerable<Date> | Enumerable<string>, null>
  notIn?: XOR<Enumerable<Date> | Enumerable<string>, null>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeNullableFilter | null
}

export type StringNullableFilter = {
  equals?: XOR<string, null>
  in?: XOR<Enumerable<string>, null>
  notIn?: XOR<Enumerable<string>, null>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  mode?: QueryMode
  not?: string | NestedStringNullableFilter | null
}

export type BoolFilter = {
  equals?: boolean
  not?: XOR<boolean, NestedBoolFilter>
}

export type UserLogListRelationFilter = {
  every?: UserLogWhereInput
  some?: UserLogWhereInput
  none?: UserLogWhereInput
}

export type ThirdUserListRelationFilter = {
  every?: ThirdUserWhereInput
  some?: ThirdUserWhereInput
  none?: ThirdUserWhereInput
}

export type UserRelationFilter = {
  is?: UserWhereInput
  isNot?: UserWhereInput
}

export type UserLogCreateManyWithoutOwnerInput = {
  create?: XOR<UserLogCreateWithoutOwnerInput, Enumerable<UserLogCreateWithoutOwnerInput>>
  connect?: XOR<UserLogWhereUniqueInput, Enumerable<UserLogWhereUniqueInput>>
  connectOrCreate?: XOR<UserLogCreateOrConnectWithoutOwnerInput, Enumerable<UserLogCreateOrConnectWithoutOwnerInput>>
}

export type UserLogCreateManyWithoutOperatorInput = {
  create?: XOR<UserLogCreateWithoutOperatorInput, Enumerable<UserLogCreateWithoutOperatorInput>>
  connect?: XOR<UserLogWhereUniqueInput, Enumerable<UserLogWhereUniqueInput>>
  connectOrCreate?: XOR<UserLogCreateOrConnectWithoutOperatorInput, Enumerable<UserLogCreateOrConnectWithoutOperatorInput>>
}

export type ThirdUserCreateManyWithoutUserInput = {
  create?: XOR<ThirdUserCreateWithoutUserInput, Enumerable<ThirdUserCreateWithoutUserInput>>
  connect?: XOR<ThirdUserWhereUniqueInput, Enumerable<ThirdUserWhereUniqueInput>>
  connectOrCreate?: XOR<ThirdUserCreateOrConnectWithoutUserInput, Enumerable<ThirdUserCreateOrConnectWithoutUserInput>>
}

export type StringFieldUpdateOperationsInput = {
  set?: string
}

export type DateTimeFieldUpdateOperationsInput = {
  set?: Date | string
}

export type NullableDateTimeFieldUpdateOperationsInput = {
  set?: XOR<Date | string, null>
}

export type NullableStringFieldUpdateOperationsInput = {
  set?: XOR<string, null>
}

export type IntFieldUpdateOperationsInput = {
  set?: number
  increment?: number
  decrement?: number
  multiply?: number
  divide?: number
}

export type BoolFieldUpdateOperationsInput = {
  set?: boolean
}

export type UserLogUpdateManyWithoutOwnerInput = {
  create?: XOR<UserLogCreateWithoutOwnerInput, Enumerable<UserLogCreateWithoutOwnerInput>>
  connect?: XOR<UserLogWhereUniqueInput, Enumerable<UserLogWhereUniqueInput>>
  set?: XOR<UserLogWhereUniqueInput, Enumerable<UserLogWhereUniqueInput>>
  disconnect?: XOR<UserLogWhereUniqueInput, Enumerable<UserLogWhereUniqueInput>>
  delete?: XOR<UserLogWhereUniqueInput, Enumerable<UserLogWhereUniqueInput>>
  update?: XOR<UserLogUpdateWithWhereUniqueWithoutOwnerInput, Enumerable<UserLogUpdateWithWhereUniqueWithoutOwnerInput>>
  updateMany?: XOR<UserLogUpdateManyWithWhereWithoutOwnerInput, Enumerable<UserLogUpdateManyWithWhereWithoutOwnerInput>>
  deleteMany?: XOR<UserLogScalarWhereInput, Enumerable<UserLogScalarWhereInput>>
  upsert?: XOR<UserLogUpsertWithWhereUniqueWithoutOwnerInput, Enumerable<UserLogUpsertWithWhereUniqueWithoutOwnerInput>>
  connectOrCreate?: XOR<UserLogCreateOrConnectWithoutOwnerInput, Enumerable<UserLogCreateOrConnectWithoutOwnerInput>>
}

export type UserLogUpdateManyWithoutOperatorInput = {
  create?: XOR<UserLogCreateWithoutOperatorInput, Enumerable<UserLogCreateWithoutOperatorInput>>
  connect?: XOR<UserLogWhereUniqueInput, Enumerable<UserLogWhereUniqueInput>>
  set?: XOR<UserLogWhereUniqueInput, Enumerable<UserLogWhereUniqueInput>>
  disconnect?: XOR<UserLogWhereUniqueInput, Enumerable<UserLogWhereUniqueInput>>
  delete?: XOR<UserLogWhereUniqueInput, Enumerable<UserLogWhereUniqueInput>>
  update?: XOR<UserLogUpdateWithWhereUniqueWithoutOperatorInput, Enumerable<UserLogUpdateWithWhereUniqueWithoutOperatorInput>>
  updateMany?: XOR<UserLogUpdateManyWithWhereWithoutOperatorInput, Enumerable<UserLogUpdateManyWithWhereWithoutOperatorInput>>
  deleteMany?: XOR<UserLogScalarWhereInput, Enumerable<UserLogScalarWhereInput>>
  upsert?: XOR<UserLogUpsertWithWhereUniqueWithoutOperatorInput, Enumerable<UserLogUpsertWithWhereUniqueWithoutOperatorInput>>
  connectOrCreate?: XOR<UserLogCreateOrConnectWithoutOperatorInput, Enumerable<UserLogCreateOrConnectWithoutOperatorInput>>
}

export type ThirdUserUpdateManyWithoutUserInput = {
  create?: XOR<ThirdUserCreateWithoutUserInput, Enumerable<ThirdUserCreateWithoutUserInput>>
  connect?: XOR<ThirdUserWhereUniqueInput, Enumerable<ThirdUserWhereUniqueInput>>
  set?: XOR<ThirdUserWhereUniqueInput, Enumerable<ThirdUserWhereUniqueInput>>
  disconnect?: XOR<ThirdUserWhereUniqueInput, Enumerable<ThirdUserWhereUniqueInput>>
  delete?: XOR<ThirdUserWhereUniqueInput, Enumerable<ThirdUserWhereUniqueInput>>
  update?: XOR<ThirdUserUpdateWithWhereUniqueWithoutUserInput, Enumerable<ThirdUserUpdateWithWhereUniqueWithoutUserInput>>
  updateMany?: XOR<ThirdUserUpdateManyWithWhereWithoutUserInput, Enumerable<ThirdUserUpdateManyWithWhereWithoutUserInput>>
  deleteMany?: XOR<ThirdUserScalarWhereInput, Enumerable<ThirdUserScalarWhereInput>>
  upsert?: XOR<ThirdUserUpsertWithWhereUniqueWithoutUserInput, Enumerable<ThirdUserUpsertWithWhereUniqueWithoutUserInput>>
  connectOrCreate?: XOR<ThirdUserCreateOrConnectWithoutUserInput, Enumerable<ThirdUserCreateOrConnectWithoutUserInput>>
}

export type UserCreateOneWithoutOwnerUserLogInput = {
  create?: UserCreateWithoutOwnerUserLogInput
  connect?: UserWhereUniqueInput
  connectOrCreate?: UserCreateOrConnectWithoutOwnerUserLogInput
}

export type UserCreateOneWithoutOperatorUserLogInput = {
  create?: UserCreateWithoutOperatorUserLogInput
  connect?: UserWhereUniqueInput
  connectOrCreate?: UserCreateOrConnectWithoutOperatorUserLogInput
}

export type UserUpdateOneRequiredWithoutOwnerUserLogInput = {
  create?: UserCreateWithoutOwnerUserLogInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutOwnerUserLogInput
  upsert?: UserUpsertWithoutOwnerUserLogInput
  connectOrCreate?: UserCreateOrConnectWithoutOwnerUserLogInput
}

export type UserUpdateOneWithoutOperatorUserLogInput = {
  create?: UserCreateWithoutOperatorUserLogInput
  connect?: UserWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: UserUpdateWithoutOperatorUserLogInput
  upsert?: UserUpsertWithoutOperatorUserLogInput
  connectOrCreate?: UserCreateOrConnectWithoutOperatorUserLogInput
}

export type UserCreateOneWithoutThirdUserInput = {
  create?: UserCreateWithoutThirdUserInput
  connect?: UserWhereUniqueInput
  connectOrCreate?: UserCreateOrConnectWithoutThirdUserInput
}

export type UserUpdateOneRequiredWithoutThirdUserInput = {
  create?: UserCreateWithoutThirdUserInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutThirdUserInput
  upsert?: UserUpsertWithoutThirdUserInput
  connectOrCreate?: UserCreateOrConnectWithoutThirdUserInput
}

export type NestedIntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: XOR<number, NestedIntFilter>
}

export type NestedStringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: XOR<string, NestedStringFilter>
}

export type NestedDateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date> | Enumerable<string>
  notIn?: Enumerable<Date> | Enumerable<string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: XOR<Date | string, NestedDateTimeFilter>
}

export type NestedDateTimeNullableFilter = {
  equals?: XOR<Date | string, null>
  in?: XOR<Enumerable<Date> | Enumerable<string>, null>
  notIn?: XOR<Enumerable<Date> | Enumerable<string>, null>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeNullableFilter | null
}

export type NestedStringNullableFilter = {
  equals?: XOR<string, null>
  in?: XOR<Enumerable<string>, null>
  notIn?: XOR<Enumerable<string>, null>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringNullableFilter | null
}

export type NestedBoolFilter = {
  equals?: boolean
  not?: XOR<boolean, NestedBoolFilter>
}

export type UserLogCreateWithoutOwnerInput = {
  level: number
  action: string
  msg: string
  details?: XOR<string, null>
  createdAt?: Date | string
  userAgent: string
  ipAddress: string
  Operator?: UserCreateOneWithoutOperatorUserLogInput
}

export type UserLogCreateOrConnectWithoutOwnerInput = {
  where: UserLogWhereUniqueInput
  create: UserLogCreateWithoutOwnerInput
}

export type UserLogCreateWithoutOperatorInput = {
  level: number
  action: string
  msg: string
  details?: XOR<string, null>
  createdAt?: Date | string
  userAgent: string
  ipAddress: string
  Owner: UserCreateOneWithoutOwnerUserLogInput
}

export type UserLogCreateOrConnectWithoutOperatorInput = {
  where: UserLogWhereUniqueInput
  create: UserLogCreateWithoutOperatorInput
}

export type ThirdUserCreateWithoutUserInput = {
  createdAt?: Date | string
  updatedAt?: XOR<Date | string, null>
  openId: string
  unionid?: XOR<string, null>
  avatar: string
  nickname: string
  sex?: number
  language?: XOR<string, null>
  country?: XOR<string, null>
  province?: XOR<string, null>
  city?: XOR<string, null>
  details: string
  provider: string
}

export type ThirdUserCreateOrConnectWithoutUserInput = {
  where: ThirdUserWhereUniqueInput
  create: ThirdUserCreateWithoutUserInput
}

export type UserLogUpdateWithWhereUniqueWithoutOwnerInput = {
  where: UserLogWhereUniqueInput
  data: UserLogUpdateWithoutOwnerInput
}

export type UserLogUpdateManyWithWhereWithoutOwnerInput = {
  where: UserLogScalarWhereInput
  data: UserLogUpdateManyMutationInput
}

export type UserLogScalarWhereInput = {
  AND?: XOR<UserLogScalarWhereInput, Enumerable<UserLogScalarWhereInput>>
  OR?: XOR<UserLogScalarWhereInput, Enumerable<UserLogScalarWhereInput>>
  NOT?: XOR<UserLogScalarWhereInput, Enumerable<UserLogScalarWhereInput>>
  id?: XOR<IntFilter, number>
  level?: XOR<IntFilter, number>
  action?: XOR<StringFilter, string>
  msg?: XOR<StringFilter, string>
  details?: StringNullableFilter | string | null
  createdAt?: XOR<DateTimeFilter, Date | string>
  userAgent?: XOR<StringFilter, string>
  ipAddress?: XOR<StringFilter, string>
  ownerId?: XOR<StringFilter, string>
  operatorId?: StringNullableFilter | string | null
}

export type UserLogUpsertWithWhereUniqueWithoutOwnerInput = {
  where: UserLogWhereUniqueInput
  update: UserLogUpdateWithoutOwnerInput
  create: UserLogCreateWithoutOwnerInput
}

export type UserLogUpdateWithWhereUniqueWithoutOperatorInput = {
  where: UserLogWhereUniqueInput
  data: UserLogUpdateWithoutOperatorInput
}

export type UserLogUpdateManyWithWhereWithoutOperatorInput = {
  where: UserLogScalarWhereInput
  data: UserLogUpdateManyMutationInput
}

export type UserLogUpsertWithWhereUniqueWithoutOperatorInput = {
  where: UserLogWhereUniqueInput
  update: UserLogUpdateWithoutOperatorInput
  create: UserLogCreateWithoutOperatorInput
}

export type ThirdUserUpdateWithWhereUniqueWithoutUserInput = {
  where: ThirdUserWhereUniqueInput
  data: ThirdUserUpdateWithoutUserInput
}

export type ThirdUserUpdateManyWithWhereWithoutUserInput = {
  where: ThirdUserScalarWhereInput
  data: ThirdUserUpdateManyMutationInput
}

export type ThirdUserScalarWhereInput = {
  AND?: XOR<ThirdUserScalarWhereInput, Enumerable<ThirdUserScalarWhereInput>>
  OR?: XOR<ThirdUserScalarWhereInput, Enumerable<ThirdUserScalarWhereInput>>
  NOT?: XOR<ThirdUserScalarWhereInput, Enumerable<ThirdUserScalarWhereInput>>
  id?: XOR<IntFilter, number>
  createdAt?: XOR<DateTimeFilter, Date | string>
  updatedAt?: DateTimeNullableFilter | Date | string | null
  openId?: XOR<StringFilter, string>
  unionid?: StringNullableFilter | string | null
  avatar?: XOR<StringFilter, string>
  nickname?: XOR<StringFilter, string>
  sex?: XOR<IntFilter, number>
  language?: StringNullableFilter | string | null
  country?: StringNullableFilter | string | null
  province?: StringNullableFilter | string | null
  city?: StringNullableFilter | string | null
  details?: XOR<StringFilter, string>
  provider?: XOR<StringFilter, string>
  userId?: XOR<StringFilter, string>
}

export type ThirdUserUpsertWithWhereUniqueWithoutUserInput = {
  where: ThirdUserWhereUniqueInput
  update: ThirdUserUpdateWithoutUserInput
  create: ThirdUserCreateWithoutUserInput
}

export type UserCreateWithoutOwnerUserLogInput = {
  uid?: string
  createdAt?: Date | string
  updatedAt?: XOR<Date | string, null>
  avatar?: XOR<string, null>
  nickname?: XOR<string, null>
  sex?: number
  username?: XOR<string, null>
  password?: XOR<string, null>
  verified?: boolean
  email?: XOR<string, null>
  emailVerified?: boolean
  mobile?: XOR<string, null>
  mobileVerified?: boolean
  isLocked?: boolean
  isAdmin?: boolean
  OperatorUserLog?: UserLogCreateManyWithoutOperatorInput
  ThirdUser?: ThirdUserCreateManyWithoutUserInput
}

export type UserCreateOrConnectWithoutOwnerUserLogInput = {
  where: UserWhereUniqueInput
  create: UserCreateWithoutOwnerUserLogInput
}

export type UserCreateWithoutOperatorUserLogInput = {
  uid?: string
  createdAt?: Date | string
  updatedAt?: XOR<Date | string, null>
  avatar?: XOR<string, null>
  nickname?: XOR<string, null>
  sex?: number
  username?: XOR<string, null>
  password?: XOR<string, null>
  verified?: boolean
  email?: XOR<string, null>
  emailVerified?: boolean
  mobile?: XOR<string, null>
  mobileVerified?: boolean
  isLocked?: boolean
  isAdmin?: boolean
  OwnerUserLog?: UserLogCreateManyWithoutOwnerInput
  ThirdUser?: ThirdUserCreateManyWithoutUserInput
}

export type UserCreateOrConnectWithoutOperatorUserLogInput = {
  where: UserWhereUniqueInput
  create: UserCreateWithoutOperatorUserLogInput
}

export type UserUpdateWithoutOwnerUserLogInput = {
  uid?: XOR<string, StringFieldUpdateOperationsInput>
  createdAt?: XOR<Date | string, DateTimeFieldUpdateOperationsInput>
  updatedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  avatar?: string | NullableStringFieldUpdateOperationsInput | null
  nickname?: string | NullableStringFieldUpdateOperationsInput | null
  sex?: XOR<number, IntFieldUpdateOperationsInput>
  username?: string | NullableStringFieldUpdateOperationsInput | null
  password?: string | NullableStringFieldUpdateOperationsInput | null
  verified?: XOR<boolean, BoolFieldUpdateOperationsInput>
  email?: string | NullableStringFieldUpdateOperationsInput | null
  emailVerified?: XOR<boolean, BoolFieldUpdateOperationsInput>
  mobile?: string | NullableStringFieldUpdateOperationsInput | null
  mobileVerified?: XOR<boolean, BoolFieldUpdateOperationsInput>
  isLocked?: XOR<boolean, BoolFieldUpdateOperationsInput>
  isAdmin?: XOR<boolean, BoolFieldUpdateOperationsInput>
  OperatorUserLog?: UserLogUpdateManyWithoutOperatorInput
  ThirdUser?: ThirdUserUpdateManyWithoutUserInput
}

export type UserUpsertWithoutOwnerUserLogInput = {
  update: UserUpdateWithoutOwnerUserLogInput
  create: UserCreateWithoutOwnerUserLogInput
}

export type UserUpdateWithoutOperatorUserLogInput = {
  uid?: XOR<string, StringFieldUpdateOperationsInput>
  createdAt?: XOR<Date | string, DateTimeFieldUpdateOperationsInput>
  updatedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  avatar?: string | NullableStringFieldUpdateOperationsInput | null
  nickname?: string | NullableStringFieldUpdateOperationsInput | null
  sex?: XOR<number, IntFieldUpdateOperationsInput>
  username?: string | NullableStringFieldUpdateOperationsInput | null
  password?: string | NullableStringFieldUpdateOperationsInput | null
  verified?: XOR<boolean, BoolFieldUpdateOperationsInput>
  email?: string | NullableStringFieldUpdateOperationsInput | null
  emailVerified?: XOR<boolean, BoolFieldUpdateOperationsInput>
  mobile?: string | NullableStringFieldUpdateOperationsInput | null
  mobileVerified?: XOR<boolean, BoolFieldUpdateOperationsInput>
  isLocked?: XOR<boolean, BoolFieldUpdateOperationsInput>
  isAdmin?: XOR<boolean, BoolFieldUpdateOperationsInput>
  OwnerUserLog?: UserLogUpdateManyWithoutOwnerInput
  ThirdUser?: ThirdUserUpdateManyWithoutUserInput
}

export type UserUpsertWithoutOperatorUserLogInput = {
  update: UserUpdateWithoutOperatorUserLogInput
  create: UserCreateWithoutOperatorUserLogInput
}

export type UserCreateWithoutThirdUserInput = {
  uid?: string
  createdAt?: Date | string
  updatedAt?: XOR<Date | string, null>
  avatar?: XOR<string, null>
  nickname?: XOR<string, null>
  sex?: number
  username?: XOR<string, null>
  password?: XOR<string, null>
  verified?: boolean
  email?: XOR<string, null>
  emailVerified?: boolean
  mobile?: XOR<string, null>
  mobileVerified?: boolean
  isLocked?: boolean
  isAdmin?: boolean
  OwnerUserLog?: UserLogCreateManyWithoutOwnerInput
  OperatorUserLog?: UserLogCreateManyWithoutOperatorInput
}

export type UserCreateOrConnectWithoutThirdUserInput = {
  where: UserWhereUniqueInput
  create: UserCreateWithoutThirdUserInput
}

export type UserUpdateWithoutThirdUserInput = {
  uid?: XOR<string, StringFieldUpdateOperationsInput>
  createdAt?: XOR<Date | string, DateTimeFieldUpdateOperationsInput>
  updatedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  avatar?: string | NullableStringFieldUpdateOperationsInput | null
  nickname?: string | NullableStringFieldUpdateOperationsInput | null
  sex?: XOR<number, IntFieldUpdateOperationsInput>
  username?: string | NullableStringFieldUpdateOperationsInput | null
  password?: string | NullableStringFieldUpdateOperationsInput | null
  verified?: XOR<boolean, BoolFieldUpdateOperationsInput>
  email?: string | NullableStringFieldUpdateOperationsInput | null
  emailVerified?: XOR<boolean, BoolFieldUpdateOperationsInput>
  mobile?: string | NullableStringFieldUpdateOperationsInput | null
  mobileVerified?: XOR<boolean, BoolFieldUpdateOperationsInput>
  isLocked?: XOR<boolean, BoolFieldUpdateOperationsInput>
  isAdmin?: XOR<boolean, BoolFieldUpdateOperationsInput>
  OwnerUserLog?: UserLogUpdateManyWithoutOwnerInput
  OperatorUserLog?: UserLogUpdateManyWithoutOperatorInput
}

export type UserUpsertWithoutThirdUserInput = {
  update: UserUpdateWithoutThirdUserInput
  create: UserCreateWithoutThirdUserInput
}

export type UserLogUpdateWithoutOwnerInput = {
  level?: XOR<number, IntFieldUpdateOperationsInput>
  action?: XOR<string, StringFieldUpdateOperationsInput>
  msg?: XOR<string, StringFieldUpdateOperationsInput>
  details?: string | NullableStringFieldUpdateOperationsInput | null
  createdAt?: XOR<Date | string, DateTimeFieldUpdateOperationsInput>
  userAgent?: XOR<string, StringFieldUpdateOperationsInput>
  ipAddress?: XOR<string, StringFieldUpdateOperationsInput>
  Operator?: UserUpdateOneWithoutOperatorUserLogInput
}

export type UserLogUpdateWithoutOperatorInput = {
  level?: XOR<number, IntFieldUpdateOperationsInput>
  action?: XOR<string, StringFieldUpdateOperationsInput>
  msg?: XOR<string, StringFieldUpdateOperationsInput>
  details?: string | NullableStringFieldUpdateOperationsInput | null
  createdAt?: XOR<Date | string, DateTimeFieldUpdateOperationsInput>
  userAgent?: XOR<string, StringFieldUpdateOperationsInput>
  ipAddress?: XOR<string, StringFieldUpdateOperationsInput>
  Owner?: UserUpdateOneRequiredWithoutOwnerUserLogInput
}

export type ThirdUserUpdateWithoutUserInput = {
  createdAt?: XOR<Date | string, DateTimeFieldUpdateOperationsInput>
  updatedAt?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  openId?: XOR<string, StringFieldUpdateOperationsInput>
  unionid?: string | NullableStringFieldUpdateOperationsInput | null
  avatar?: XOR<string, StringFieldUpdateOperationsInput>
  nickname?: XOR<string, StringFieldUpdateOperationsInput>
  sex?: XOR<number, IntFieldUpdateOperationsInput>
  language?: string | NullableStringFieldUpdateOperationsInput | null
  country?: string | NullableStringFieldUpdateOperationsInput | null
  province?: string | NullableStringFieldUpdateOperationsInput | null
  city?: string | NullableStringFieldUpdateOperationsInput | null
  details?: XOR<string, StringFieldUpdateOperationsInput>
  provider?: XOR<string, StringFieldUpdateOperationsInput>
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
