import { useState } from 'react';
import _ from 'lodash';

import type { KeyOf } from 'typings/common';

export type SectionShowState = {
  [sectionName: string]: boolean;
};

export type ToggleSection<T> = (
  sectionName: KeyOf<T>,
  toggleOption?: {
    justOff: boolean;
  },
) => void;

export default function useSideSectionToggle<T extends SectionShowState>(
  initialState: T,
): [T, ToggleSection<T>] {
  const [sideSectionShowState, setSideSectionShowState] =
    useState<T>(initialState);

  const toggleSection: ToggleSection<T> = (
    sectionName,
    toggleOption = { justOff: false },
  ) => {
    setSideSectionShowState((prevState) => {
      const falsifyAllKeys = (obj: T) => _.mapValues<T>(obj, () => false);
      const nextState = {
        ...falsifyAllKeys(prevState),
        [sectionName]: toggleOption.justOff ? false : !prevState[sectionName],
      } as T;

      return nextState;
    });
  };

  return [sideSectionShowState, toggleSection];
}
