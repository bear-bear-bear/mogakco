import log from 'loglevel';

const useDebugLog = () => {
  if (process.env.NODE_ENV === 'development') {
    log.setLevel('debug');
  }

  return { debugLog: log.debug };
};

export default useDebugLog;
