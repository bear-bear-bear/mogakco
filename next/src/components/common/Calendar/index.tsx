import React from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/ko';

import { Event, EventAgenda } from './parts';
import events from './tempEvents';
import type { CustomEvent } from './tempEvents';

type Props = {
  wrapperStyle?: React.CSSProperties;
};

const allViews = Object.values(Views);
const localizer = momentLocalizer(moment);

const MyCalendar = ({ wrapperStyle }: Props) => (
  <div style={wrapperStyle}>
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
  </div>
);

export default MyCalendar;
