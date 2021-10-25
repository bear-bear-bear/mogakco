import React from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/ko';

import useUser from '@hooks/useUser';
import type { UserEvent } from 'typings/auth';

import * as parts from './parts';

type Props = {
  wrapperStyle?: React.CSSProperties;
};

const allViews = Object.values(Views);
const localizer = momentLocalizer(moment);

const MyCalendar = ({ wrapperStyle }: Props) => {
  const { user } = useUser();

  return (
    <section style={wrapperStyle}>
      <Calendar<UserEvent>
        views={allViews}
        events={user?.events || []}
        localizer={localizer}
        defaultDate={new Date()}
        defaultView={Views.AGENDA}
        components={{
          event: parts.Event,
          agenda: {
            event: parts.EventAgenda,
          },
        }}
      />
    </section>
  );
};

export default MyCalendar;
