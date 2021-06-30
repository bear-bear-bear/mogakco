/**
 * @desc: next-redux-wrapper의 getServerSideProps 인자로 들어오는 store의 sagaTask 프로퍼티 타입 정의입니다.
 */
import { Task } from 'redux-saga';

declare module 'redux' {
  export interface Store {
    sagaTask?: Task;
  }
}
