import { EmailSucProps } from './types';
export declare const emailSuccess: ({ envelope: { to } }: EmailSucProps) => void;
export declare const emailFailure: (err: Error) => null;
export declare const prepareFailure: (err: Error) => never;
