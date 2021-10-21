import React from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import type { Event as IEvent, EventProps } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/ko';

import { theme } from '@globalStyles/theme';

import events from './tempEvents';
import * as S from './style';

const allViews = Object.values(Views);
const localizer = momentLocalizer(moment);

interface ICustomEvent extends IEvent {
  desc?: string;
}

const Event = ({ event }: EventProps<ICustomEvent>) => (
  <span>
    <b>{event.title}</b>
    {event.desc && `:  ${event.desc}`}
  </span>
);

const EventAgenda = ({ event }: EventProps<ICustomEvent>) => (
  <span>
    <b style={{ color: theme.color['blue-1'] }}>{event.title}</b>
    {event.desc && <p style={{ color: theme.color['gray-5'] }}>{event.desc}</p>}
  </span>
);

const Rendering = () => (
  <S.CalendarWrapper>
    <Calendar<ICustomEvent>
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
