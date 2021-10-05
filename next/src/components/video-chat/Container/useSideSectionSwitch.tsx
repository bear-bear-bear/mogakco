import { useState } from 'react';
import _ from 'lodash';

import type { KeyOf } from 'typings/common';

export type SectionShowState = {
  [sectionName: string]: boolean;
};

export type ToggleSection<T> = (
  sectionName: KeyOf<T>,
  switchOption?: {
    justOff: boolean;
  },
) => void;

/**
 * @desc
 * 메인 섹션 (캠 섹션) 을 제외한 사이드 섹션(채팅 섹션, 유저 리스트 섹션 등) 들의 view toggle 을 담당합니다.
 * 지정한 섹션 이름 외 다른 섹션 이름의 value를 모두 false로 만들고,
 * 지정한 섹션 이름의 value를 toggle합니다.
 */
export default function useSideSectionSwitch<T extends SectionShowState>(
  initialState: T,
): [T, ToggleSection<T>] {
  const [sectionShowState, setSectionShowState] = useState<T>(initialState);

  const toggleSection: ToggleSection<T> = (
    sectionName,
    switchOption = { justOff: false },
  ) => {
    setSectionShowState((prevState) => {
      const falsifyAllKeys = (obj: T) => _.mapValues<T>(obj, () => false);
      const nextState = {
        ...falsifyAllKeys(prevState),
        [sectionName]: switchOption.justOff ? false : !prevState[sectionName],
      } as T;

      return nextState;
    });
  };

  return [sectionShowState, toggleSection];
}
