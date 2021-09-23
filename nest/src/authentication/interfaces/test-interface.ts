import { Request } from 'express';

export interface AdminTest {
  user?: Express.User;
  message: string;
}

export interface ExpressUser {
  user?: Express.User;
}

export interface ITestController {
  adminTest(req: Request): AdminTest;

  userTest(req: Request): ExpressUser;
}
