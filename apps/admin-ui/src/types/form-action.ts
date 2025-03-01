import { ZodIssue } from 'zod';

export enum FormActionEnum {
  Add = 'add',
  Edit = 'edit',
}

export type RequestState<T = any> = {
  isSuccess: boolean;
  data: T | null;
  errors: ZodIssue[] | null;
  status: number;
  statusText: string;
  message: string | null;
};
