export type CommonColumn = {
  createdAt: string;
  updatedAt: string;
};

export interface CommonApiResponse<T> {
  name(name: any): unknown;
  message: string;
  data: T;
}
