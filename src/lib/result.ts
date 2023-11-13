export type Success = unknown;
export type Created = unknown;
export type Updated = unknown;
export type Deleted = unknown;

export class Result {
  public static readonly success: Success;
  public static readonly created: Created;
  public static readonly updated: Updated;
  public static readonly deleted: Deleted;
}
