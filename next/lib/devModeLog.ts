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
  log[level](msg);
  log.setLevel('silent');
};

export default devModeLog;
