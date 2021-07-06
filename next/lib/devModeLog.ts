import log from 'loglevel';

/**
 * Possible log level descriptors, may be string, lower or upper case, or number.
 */
type LogLevelDescStr =
  | 'trace'
  | 'debug'
  | 'info'
  | 'warn'
  | 'error'
  | undefined;

/**
 * @desc mode="development" 에서만 볼 수 있는, console.log 대체 함수
 * @param msg any data to log to the console (limit 1)
 * @param level as a string, like 'error' (case-insensitive) (not allow logger number)
 */
const devModeLog = (msg: any, level: LogLevelDescStr = 'debug') => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
  log.setLevel(level);
  // loglevel이 호출 시그니처를 지원하지 않아서
  // log[level](msg) 같이 간단한 작성이 불가능하므로 하드 코딩 합니다
  switch (level) {
    case 'trace':
      log.trace(msg);
      break;
    case 'debug':
      log.debug(msg);
      break;
    case 'info':
      log.info(msg);
      break;
    case 'warn':
      log.warn(msg);
      break;
    case 'error':
      log.error(msg);
      break;
    default:
      break;
  }
  log.setLevel('silent');
};

export default devModeLog;
