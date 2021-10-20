import React, { useEffect, useRef } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// import '!style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/ko';

import events from './tempEvents';
import * as S from './style';

const allViews = Object.values(Views);
const localizer = momentLocalizer(moment);

const Basic = () => {
  return (
    <S.CalendarWrapper>
      <Calendar
        events={events}
        // views={allViews}
        step={60}
        showMultiDayTimes
        // max={}
        defaultDate={new Date()}
        localizer={localizer}
      />
    </S.CalendarWrapper>
  );
};

export default Basic;
