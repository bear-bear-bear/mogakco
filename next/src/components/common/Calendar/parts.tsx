import { theme } from '@globalStyles/theme';
import type { EventProps } from 'react-big-calendar';
import type { UserEvent } from 'typings/auth';

export const Event = ({ event }: EventProps<UserEvent>) => (
  <span>
    <b>{event.title}</b>
    {event.desc && `:  ${event.desc}`}
  </span>
);

export const EventAgenda = ({ event }: EventProps<UserEvent>) => (
  <span>
    <b style={{ color: theme.color['blue-1'] }}>{event.title}</b>
    {event.desc && <p style={{ color: theme.color['gray-5'] }}>{event.desc}</p>}
  </span>
);
