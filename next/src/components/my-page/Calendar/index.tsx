import React from 'react';
import MyCalendar from '@components/common/Calendar';

import * as S from './style';

const Calendar = () => {
  return (
    <S.Main>
      <MyCalendar
        wrapperStyle={{
          maxWidth: '1280px',
          height: '800px',
          paddingBottom: '2rem',
        }}
      />
    </S.Main>
  );
};

export default Calendar;
