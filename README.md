# failure-or

a simple, discriminated union of a failure and a result

## Getting Started

### Single Failure

### With throwing Errors

```typescript
function getUser(userId: number): User {
  if (userId < 0) {
    throw new Error('Invalid User ID');
  }

  return new User('John', 'Doe');
}
```

```typescript
try {
  const user = getUser(0);
  console.log(user);
} catch (err) {
  console.error(err);
}
```

### With FailureOr

```typescript
import FailureOr, { ok, failure } from 'failure-or';

function getUser(userId: number): FailureOr<User> {
  if (userId < 0) {
    return fail(
      Failure.validation('User.Id.Invalid', 'Invalid user id received.')
    );
  }

  return ok(new User('John', 'Doe'));
}
```

```typescript
const failureOrUser = getUser(0);

failureOrUser.switchFirst(
  (user) => console.log(user),
  (failure) => console.error(failure)
);
```

## Multiple Failures

### With trowing Errors

```typescript
class User {
  public readonly name: string;

  private constructor(name: string) {
    this.name = name;
  }

  public static create(name: string): User {
    if (name.length < 2) {
      throw new Error('Name is too short.');
    }

    if (name.length > 100) {
      throw new Error('Name is too long.');
    }

    return new User(name);
  }
}
```

### With FailureOr

```typescript
class User {
  public readonly name: string;

  private constructor(name: string) {
    this.name = name;
  }

  public static create(name: string): FailureOr<User> {
    const failures: Failure[] = [];

    if (name.length < 2) {
      failures.push(
        Failure.validation('User.Name.Short', 'Name is too short.')
      );
    }

    if (name.length > 100) {
      failures.push(Failure.validation('User.Name.Long', 'Name is too long.'));
    }

    if (failures.length > 0) {
      return failure(failures);
    }

    return ok(new User(name));
  }
}
```

```typescript
const ERRORS = {
  USERS: {
    NAME_TOO_SHORT: Failure.validation(
      'Users.Name.TooShort',
      'Name is too short.'
    ),
    NAME_TOO_LONG: Failure.validation(
      'Users.Name.TooLong',
      'Name is too long.'
    ),
  },
} as const;
```

```typescript
class User {
  public readonly name: string;

  private constructor(name: string) {
    this.name = name;
  }

  public static create(name: string): FailureOr<User> {
    const failures: Failure[] = [];

    if (name.length < 2) {
      failures.push(ERRORS.USERS.NAME_TOO_SHORT);
    }

    if (name.length > 100) {
      failures.push(ERRORS_USERS.NAME_TOO_LONG);
    }

    if (failures.length > 0) {
      return failure(failures);
    }

    return ok(new User(name));
  }
}
```
