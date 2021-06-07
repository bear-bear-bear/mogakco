export interface ICookieProps {
  token: string;
  domain?: string;
  path: string;
  httpOnly: boolean;
  maxAge: number;
}

export {};
