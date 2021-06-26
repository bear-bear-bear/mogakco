/**
 * @desc useLayoutEffect 의 SSR warning에 대한 resove hooks 입니다.
 */
import { useLayoutEffect, useEffect } from 'react';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
