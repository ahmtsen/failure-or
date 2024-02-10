export const FailureTypes = {
  Default: 'Default',
  Unexpected: 'Unexpected',
  Validation: 'Validation',
  Conflict: 'Conflict',
  NotFound: 'NotFound',
  Unauthorized: 'Unauthorized',
} as const;

export type FailureType = keyof typeof FailureTypes;
