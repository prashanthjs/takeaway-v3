import { ZodIssue } from 'zod';

export class ApiError extends Error {
  public status: number;
  public statusText: string;
  public issues: ZodIssue[];
  public url?: string;

  constructor({
    message,
    statusText,
    issues,
    status,
    url,
  }: {
    message: string;
    statusText: string;
    issues: ZodIssue[];
    status: number;
    url?: string;
  }) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
    this.issues = issues;
    this.url = url;
  }
}

export class FrontendError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FrontendError';
  }
}
