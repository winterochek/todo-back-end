import { Request } from 'express';

export type AuthorizedRequest = Request & {
  user: { id: number; email: string };
};

export enum ManagingActionEnum {
  CREATE = 'create',
  DELETE = 'delete',
}
