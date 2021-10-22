import { theme } from '@globalStyles/theme';
import type { EventProps } from 'react-big-calendar';
import type { CustomEvent } from './tempEvents';

export const Event = ({ event }: EventProps<CustomEvent>) => (
  <span>
    <b>{event.title}</b>
    {event.desc && `:  ${event.desc}`}
  </span>
);

export const EventAgenda = ({ event }: EventProps<CustomEvent>) => (
  <span>
    <b style={{ color: theme.color['blue-1'] }}>{event.title}</b>
    {event.desc && <p style={{ color: theme.color['gray-5'] }}>{event.desc}</p>}
  </span>
);
