import { Observable } from 'rxjs';

export type GuardReturnType = boolean | Promise<boolean> | Observable<boolean>;

export default {};
