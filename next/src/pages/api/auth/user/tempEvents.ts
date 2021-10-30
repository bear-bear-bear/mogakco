import type { UserEvent } from 'typings/auth';

const now = new Date();

const tempEvents: UserEvent[] = [
  {
    id: 0,
    title: '모든 날 이벤트 매우 긴 타이틀',
    allDay: true,
    start: new Date(2021, 10, 0),
    end: new Date(2021, 10, 1),
  },
  {
    id: 1,
    title: '긴 이벤트',
    start: new Date(2021, 10, 7),
    end: new Date(2021, 10, 10),
  },

  {
    id: 2,
    title: 'DTS STARTS',
    start: new Date(2021, 11, 13, 0, 0, 0),
    end: new Date(2021, 11, 20, 0, 0, 0),
  },

  {
    id: 3,
    title: 'DTS ENDS',
    start: new Date(2021, 10, 6, 0, 0, 0),
    end: new Date(2021, 10, 13, 0, 0, 0),
  },

  {
    id: 4,
    title: 'Some Event',
    start: new Date(2021, 10, 9, 0, 0, 0),
    end: new Date(2021, 10, 10, 0, 0, 0),
  },
  {
    id: 5,
    title: '컨퍼런스',
    start: new Date(2021, 10, 11),
    end: new Date(2021, 10, 13),
    desc: 'Big conference for important people',
  },
  {
    id: 6,
    title: '미팅',
    start: new Date(2021, 10, 12, 10, 30, 0, 0),
    end: new Date(2021, 10, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting',
  },
  {
    id: 7,
    title: '점심',
    start: new Date(2021, 10, 12, 12, 0, 0, 0),
    end: new Date(2021, 10, 12, 13, 0, 0, 0),
    desc: 'Power lunch',
  },
  {
    id: 8,
    title: '미팅',
    start: new Date(2021, 10, 12, 14, 0, 0, 0),
    end: new Date(2021, 10, 12, 15, 0, 0, 0),
  },
  {
    id: 9,
    title: '휴가',
    start: new Date(2021, 10, 12, 17, 0, 0, 0),
    end: new Date(2021, 10, 12, 17, 30, 0, 0),
    desc: 'Most important meal of the day',
  },
  {
    id: 10,
    title: '저녁',
    start: new Date(2021, 10, 12, 20, 0, 0, 0),
    end: new Date(2021, 10, 12, 21, 0, 0, 0),
  },
  {
    id: 11,
    title: 'Paige랑 미팅 계획',
    start: new Date(2021, 10, 13, 8, 0, 0),
    end: new Date(2021, 10, 13, 10, 30, 0),
  },
  {
    id: 13,
    title: 'Multi-day Event',
    start: new Date(2021, 10, 20, 19, 30, 0),
    end: new Date(2021, 10, 22, 2, 0, 0),
  },
  {
    id: 16,
    title: '비디오 녹화',
    start: new Date(2021, 10, 14, 15, 30, 0),
    end: new Date(2021, 10, 14, 19, 0, 0),
  },
  {
    id: 18,
    title: '이태원 할로윈 파티',
    start: new Date(2021, 10, 14, 16, 30, 0),
    end: new Date(2021, 10, 14, 17, 30, 0),
  },
  {
    id: 19,
    title: '온라인 코딩 테스트',
    start: new Date(2021, 10, 14, 17, 30, 0),
    end: new Date(2021, 10, 14, 20, 30, 0),
  },
  {
    id: 20,
    title: 'An overlapped Event',
    start: new Date(2021, 10, 14, 17, 0, 0),
    end: new Date(2021, 10, 14, 18, 30, 0),
  },
  {
    id: 21,
    title: '핸드폰 인터뷰',
    start: new Date(2021, 10, 14, 17, 0, 0),
    end: new Date(2021, 10, 14, 18, 30, 0),
  },
  {
    id: 22,
    title: '쿠킹 클래스',
    start: new Date(2021, 10, 14, 17, 30, 0),
    end: new Date(2021, 10, 14, 19, 0, 0),
  },
  {
    id: 23,
    title: '체육관 가기',
    start: new Date(2021, 10, 14, 18, 30, 0),
    end: new Date(2021, 10, 14, 20, 0, 0),
  },
];

export default tempEvents;
