import log from 'loglevel';

/**
 * @desc mode="development" 에서만 볼 수 있는, console.log 대체 함수
 * @param msg any data to log to the console
 */
const devLog = (...msg: any[]) => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
  log.setLevel('debug');
  log.debug(msg);
  log.setLevel('silent');
};

export default devLog;
