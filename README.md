# failure-or

<div align="center">

[![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/ahmtsen/failure-or/node.js.yml?logo=GitHub)](https://github.com/ahmtsen/failure-or/actions) [![Codecov](https://img.shields.io/codecov/c/gh/ahmtsen/failure-or?logo=codecov)](https://app.codecov.io/gh/ahmtsen/failure-or) [![GitHub License](https://img.shields.io/github/license/ahmtsen/failure-or)](https://github.com/ahmtsen/failure-or/blob/main/LICENSE) [![npm](https://img.shields.io/npm/v/failure-or?logo=npm)](https://www.npmjs.com/package/failure-or)

</div>

a simple, discriminated union of a failure and a result
- [failure-or](#failure-or)
  - [Credits](#credits)
  - [Give it a star!](#give-it-a-star)
  - [Getting Started](#getting-started)
    - [Replace throwing errors with `FailureOr<T>`](#replace-throwing-errors-with-failureort)
    - [Return multiple `Failure`s when needed](#return-multiple-failures-when-needed)
  - [Creating a `FailureOr<T>` instance](#creating-a-failureort-instance)
    - [Using `FailureOr` methods](#using-failureor-methods)
    - [Using helper functions](#using-helper-functions)
  - [Properties](#properties)
    - [`isFailure`](#isfailure)
    - [`isSuccess`](#issuccess)
    - [`value`](#value)
    - [`failures`](#failures)
    - [`firstFailure`](#firstfailure)
    - [`failuresOrEmptyList`](#failuresoremptylist)
  - [Methods](#methods)
    - [`match`](#match)
      - [`match`](#match-1)
      - [`matchAsync`](#matchasync)
    - [`matchFirst`](#matchfirst)
      - [`matchFirst`](#matchfirst-1)
      - [`matchFirstAsync`](#matchfirstasync)
    - [`switch`](#switch)
      - [`switch`](#switch-1)
      - [`switchAsync`](#switchasync)
    - [`switchFirst`](#switchfirst)
      - [`switchFirst`](#switchfirst-1)
      - [`switchFirstAsync`](#switchfirstasync)
    - [`map`](#map)
      - [`map`](#map-1)
      - [`mapAsync`](#mapasync)
    - [`else`](#else)
      - [`else`](#else-1)
      - [`elseAsync`](#elseasync)
  - [Mixing methods (`then`, `else`, `switch`, `match`)](#mixing-methods-then-else-switch-match)
  - [Failure Types](#failure-types)
    - [Built in failure types](#built-in-failure-types)
    - [Custom failure type](#custom-failure-type)
  - [Built in result types](#built-in-result-types)
  - [Organizing Failures](#organizing-failures)
  - [Contribution](#contribution)
  - [License](#license)


## Credits

- [ErrorOr](https://github.com/amantinband/error-or) The best library ever! The original C# implementation of this library!

## Give it a star!

Loving the project? Show your support by giving the project a star!

## Getting Started

Checkout auto generated typedoc [here!](https://ahmtsen.github.io/failure-or/)

```shell
npm install failure-or

```

### Replace throwing errors with `FailureOr<T>`

With throwing errors

```ts
function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }

  return a / b;
}

try {
  const result = divide(4, 2);
  console.log(result * 2);
} catch (error) {
  console.error(error);
}
```

With `FailureOr<T>`

```typescript
function divide(a: number, b: number): FailureOr<number> {
  if (b === 0) {
    return fail(Failure.unexpected('Divide.ByZero', 'Cannot divide by zero'));
  }

  return ok(a / b);
}

const result = divide(4, 2);
if (result.isFailure) {
  console.error(result.firstFailure.description);
}

console.log(result.value * 2);
```

Or, using map/else and switch/match methods

```typescript
divide(4, 2)
  .map((value) => value * 2)
  .switchFirst(
    (value) => console.log(value),
    (failure) => console.log(failure.description),
  );
```

### Return multiple `Failure`s when needed

Internally, the `FailureOr` object has a list of `Failure`s, so if you have multiple failures, you don't need to compromise and have only the first one

```typescript
class User {
  private readonly name: string;

  private constructor(name) {
    this.name = name;
  }

  public static create(name: string): FailureOr<User> {
    const failures: Failure[] = [];

    if (name.length < 2) {
      failures.push(
        Failure.Validation('User.Name.TooShort', 'Name is too short'),
      );
    }

    if (name.length > 100) {
      failures.push(
        Failure.Validation('User.Name.TooLong', 'Name is too long'),
      );
    }

    if (name.trim() === '') {
      failures.push(
        Failure.Validation(
          'User.Name.Required',
          'Name cannot be empty or whitespace only',
        ),
      );
    }

    if (failures.length > 0) {
      return fail(failures);
    }

    return ok(new User(name));
  }
}
```

## Creating a `FailureOr<T>` instance

### Using `FailureOr` methods

From a value

```typescript
const result: FailureOr<number> = FailureOr.fromValue(5);
```

From a `Failure`

```typescript
const result: FailureOr<number> = FailureOr.fromFailure(Failure.unexpected());
```

From multiple `Failure`s

```typescript
const result: FailureOr<number> = FailureOr.fromFailures([
  Failure.unexpected(),
  Failure.validation(),
]);
```

### Using helper functions

From a value

```typescript
const result: FailureOr<number> = ok(5);
```

From a `Failure`

```typescript
const result: FailureOr<number> = fail(Failure.unexpected());
```

From multiple `Failure`s

```typescript
const result: FailureOr<number> = fail([
  Failure.unexpected(),
  Failure.validation(),
]);
```

## Properties

### `isFailure`

```typescript
const result: FailureOr<User> = User.create();

if (result.isFailure) {
  // result contains one or more failures
}
```

### `isSuccess`

```typescript
const result: FailureOr<User> = User.create();

if (result.isSuccess) {
  // result is a success
}
```

### `value`

```typescript
const result: FailureOr<User> = User.create();

if (result.isSuccess) {
  // the result contains a value

  console.log(result.value);
}
```

### `failures`

```typescript
const result: FailureOr<User> = User.create();

if (result.isFailure) {
  result.failures // contains the list of failures that occurred
    .forEach((failure) => console.error(failure.description));
}
```

### `firstFailure`

```typescript
const result: FailureOr<User> = User.create();

if (result.isFailure) {
  const firstFailure = result.firstFailure; // only the first failure that occurred

  console.error(firstFailure.description);
}
```

### `failuresOrEmptyList`

```typescript
const result: FailureOr<User> = User.create();

if (result.isFailure) {
  result.failuresOrEmptyList; // one or more failures
} else {
  result.failuresOrEmptyList; // empty list
}
```

## Methods

### `match`

The `match` method receives two callbacks, `onValue` and `onFailure`, `onValue` will be invoked if the result is a success, and `onFailure` will be invoked if the result is a failure.

#### `match`

```typescript
const foo: string = result.match(
  (value) => value,
  (failures) => `${failures.length} errors occurred`,
);
```

#### `matchAsync`

```typescript
const foo: string = await result.matchAsync(
  (value) => Promise.resolve(value),
  (failures) => Promise.resolve(`${failures.length} errors occurred`),
);
```

### `matchFirst`

The `matchFirst` method received two callbacks, `onValue`, and `onFailure`, `onValue` will be invoked if the result is a success, and `onFailure` will be invoked if the result is a failure.

Unlike `match`, if the state is a failure, `matchFirst`'s `onFailure` function receives only the first failure that occurred, not the entire list of failures.

#### `matchFirst`

```typescript
const foo: string = result.matchFirst(
  (value) => value,
  (firstFailure) => firstFailure.description,
);
```

#### `matchFirstAsync`

```typescript
const foo: string = await result.matchFirstAsync(
  (value) => Promise.resolve(value),
  (firstFailure) => Promise.resolve(firstFailure.description),
);
```

### `switch`

The `switch` method receives two callbacks, `onValue` and `onFailure`, `onValue` will be invoked if the result is a success, and `onFailure` will be invoked if the result is a failure.

#### `switch`

```typescript
result.switch(
  (value) => console.log(value),
  (failures) => console.error(`${failures.length} errors occurred`),
);
```

#### `switchAsync`

```typescript
await result.switchAsync(
  (value) =>
    new Promise((resolve) => {
      console.log(value);
      resolve();
    }),
  (failures) =>
    new Promise((resolve) => {
      console.error(`${failures.length} errors occurred`);
      resolve();
    }),
);
```

### `switchFirst`

The `switchFirst` method receives two callbacks, `onValue` and `onFailure`, `onValue` will be invoked if the result is a success, and `onFailure` will be invoked if the result is a failure.

Unlike `switch`, if the state is a failure, `switchFirst`'s `onFailure` function receives only the first failures that occurred, not the entire list of failures.

#### `switchFirst`

```typescript
result.switchFirst(
  (value) => console.log(value),
  (firstFailure) => console.error(firstFailure.description),
);
```

#### `switchFirstAsync`

```typescript
await result.switchFirstAsync(
  (value) =>
    new Promise((resolve) => {
      console.log(value);
      resolve();
    }),
  (firstFailure) =>
    new Promise((resolve) => {
      console.error(firstFailure);
      resolve();
    }),
);
```

### `map`

#### `map`

`map` receives a callback function, and invokes it only if the result is not a failure (is a success).

```typescript
const result: FailureOr<string> = User.create('John').map((user) =>
  ok('Hello, ' + user.name),
);
```

Multiple `map` methods can be chained together.

```typescript
const result: FailureOr<string> = ok('5')
  .map((value: string) => ok(parseInt(value, 10)))
  .map((value: number) => ok(value * 2))
  .map((value: number) => ok(value.toString()));
```

If any of the methods return a failure, the chain will break and the failures will be returned.

```typescript
const result: FailureOr<string> = ok('5')
  .map((value: string) => ok(parseInt(value, 10)))
  .map((value: number) => fail<number>(Failure.unexpected()))
  .map((value: number) => ok(value * 2)); // t
```

#### `mapAsync`

<!-- TODO: implement mapAsync and give examples -->

### `else`

#### `else`

`else` receives a callback function, and invokes it only if the result is a failure (is not a success).

```typescript
const result: FailureOr<string> = fail<string>(Failure.unexpected()).else(() =>
  ok('fallback value'),
);
```

```typescript
const result: FailureOr<string> = fail<string>(Failure.unexpected()).else(
  (failures) => ok(`${failures.length} errors occurred`),
);
```

```typescript
const result: FailureOr<string> = fail<string>(Failure.unexpected()).else(() =>
  fail(Failure.notFound()),
);
```

#### `elseAsync`

<!-- TODO: implement elseAsync and give examples -->

## Mixing methods (`then`, `else`, `switch`, `match`)

You can mix `then`, `else`, `switch` and `match` methods together.

```typescript
ok('5')
  .map((value: string) => ok(parseInt(value, 10)))
  .map((value: number) => ok(value * 10))
  .map((value: number) => ok(value.toString()))
  .else((failures) => `${failures.length} failures occurred`)
  .switchFirst(
    (value) => console.log(value),
    (firstFailure) =>
      console.error(`A failure occurred : ${firstFailure.description}`),
  );
```

## Failure Types

Each `Failure` instance has a `type` property, which is a string that represents the type of the error.

### Built in failure types

The following failure types are built in:

```typescript
export const FailureTypes = {
  Default: 'Default',
  Unexpected: 'Unexpected',
  Validation: 'Validation',
  Conflict: 'Conflict',
  NotFound: 'NotFound',
  Unauthorized: 'Unauthorized',
} as const;
```

Each failure type has a static method that creates a failure of that type.

```typescript
const failure = Failure.notFound();
```

Optionally, you can pass a failure code and description to the failure.

```typescript
const failure = Failure.unexpected(
  'User.ShouldNeverHappen',
  'A user failure that should never happen',
);
```

### Custom failure type

You can create your own failure types if you would like to categorize your failures differently.

A custom failure type can be created with the `custom` static method

```typescript
const failure = Failure.custom(
  'MyCustomErrorCode',
  'User.ShouldNeverHappen',
  'A user failure that should never happen',
);
```

You can use the `Failure.type` property to retrieve the type of the failure

## Built in result types

There are few built in result types

```typescript
const result: FailureOr<Success> = ok(Result.success);
const result: FailureOr<Created> = ok(Result.created);
const result: FailureOr<Updated> = ok(Result.updated);
const result: FailureOr<Deleted> = ok(Result.deleted);
```

Which can be used as following

```typescript
function deleteUser(userId: string): FailureOr<Deleted> {
  const user = database.findById(userId);
  if (!user) {
    return fail(
      Failure.NotFound('User.NotFound', `User with id ${userId} not found`),
    );
  }

  database.delete(user);

  return ok(Result.Deleted);
}
```

## Organizing Failures

A nice approach, is creating a object with the expected failures.

```typescript
const DIVISION_ERRORS = {
  CANNOT_DIVIDE_BY_ZERO: Failure.unexpected(
    'Division.CannotDivideByZero',
    'Cannot divide by zero',
  ),
} as const;
```

Which can later be used as following

```typescript
function divide(a: number, b: number): FailureOr<number> {
  if (b === 0) {
    return fail(DIVISION_ERRORS.CANNOT_DIVIDE_BY_ZERO);
  }

  return ok(a / b);
}
```

## Contribution

If you have any questions, comments, or suggestions, please open an issue or create a pull request 🙂

## License

This project is licensed under the terms of the MIT license.
