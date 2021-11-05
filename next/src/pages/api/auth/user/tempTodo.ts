import type { TodoItem } from 'typings/auth';

const statusList: TodoItem['status'][] = [
  'next up',
  'in progress',
  'completed',
];
const priorityList: TodoItem['priority'][] = ['low', 'medium', 'high'];

const getRandomImageUrl = (num: number) =>
  `https://source.unsplash.com/random/${num}`;
const getTrueOrFalse = () => !!Math.floor(Math.random() * 2);

const randomTodoPropsGetter = {
  title: (id: TodoItem['id']) => {
    return getTrueOrFalse() ? `제목 ${id}` : undefined;
  },
  description: (id: TodoItem['id']) => {
    return getTrueOrFalse() ? `내용 ${id}` : undefined;
  },
  status: () => {
    const randomStatusIndex = Math.floor(Math.random() * statusList.length);
    return statusList[randomStatusIndex];
  },
  priority: () => {
    const randomPriorityIndex = Math.floor(
      Math.random() * priorityList.length + 1, // '+ 1' is for include undefined
    );
    return priorityList[randomPriorityIndex];
  },
  iconUrl: (id: TodoItem['id']) => {
    return getTrueOrFalse() ? getRandomImageUrl(id) : undefined;
  },
  coverUrl: (id: TodoItem['id']) => {
    return getTrueOrFalse() ? getRandomImageUrl(id * 1000) : undefined;
  },
};

const ids = [...Array(30)].map((_, i) => i + 1);
const tempCreatedAt = new Date(2020, 1, 1);
const tempDueDate = new Date(2099, 12, 31);

const tempTodo: TodoItem[] = ids.map((id) => ({
  id,
  status: randomTodoPropsGetter.status(),
  title: randomTodoPropsGetter.title(id),
  description: randomTodoPropsGetter.description(id),
  priority: randomTodoPropsGetter.priority(),
  iconUrl: randomTodoPropsGetter.iconUrl(id),
  coverUrl: randomTodoPropsGetter.coverUrl(id),
  createdAt: tempCreatedAt,
  dueDate: tempDueDate,
}));

export default tempTodo;
