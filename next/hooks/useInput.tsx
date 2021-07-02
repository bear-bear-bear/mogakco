import { useState, useCallback, ChangeEvent } from 'react';

const useInput = (
  initialValue = '',
): [
  string,
  (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  (value: ((prevState: string) => string) | string) => void,
] => {
  const [value, setValue] = useState<string>(initialValue);
  const handler = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    [],
  );
  return [value, handler, setValue];
};

export default useInput;
