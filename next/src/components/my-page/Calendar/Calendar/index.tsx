import React from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/ko';

import { Event, EventAgenda } from './parts';
import events from './tempEvents';
import type { CustomEvent } from './tempEvents';

import * as S from './style';

const allViews = Object.values(Views);
const localizer = momentLocalizer(moment);

const Rendering = () => (
  <S.CalendarWrapper>
    <Calendar<CustomEvent>
      views={allViews}
      events={events}
      localizer={localizer}
      defaultDate={new Date()}
      defaultView={Views.AGENDA}
      components={{
        event: Event,
        agenda: {
          event: EventAgenda,
        },
      }}
    />
  </S.CalendarWrapper>
);

export default Rendering;
