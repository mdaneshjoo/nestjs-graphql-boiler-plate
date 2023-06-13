export interface FindOrCreateResult<T> {
  created: boolean;
  result: T;
}

export type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;
