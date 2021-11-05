import type { TodoItem, TodoOrder } from 'typings/auth';

// ---------------------------------------------------
/* constant */
// ---------------------------------------------------
const TODO_COUNT = 30;

// ---------------------------------------------------
/* utils */
// ---------------------------------------------------
const getRandomImageUrl = (num: number) =>
  `https://source.unsplash.com/random/${num}`;
const getTrueOrFalse = () => !!Math.floor(Math.random() * 2);
const shuffle = <T = any>(array: T[]) => {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

// ---------------------------------------------------
/* todo.items */
// ---------------------------------------------------
const statusList: TodoItem['status'][] = [
  'next up',
  'in progress',
  'completed',
];
const priorityList: TodoItem['priority'][] = ['low', 'medium', 'high'];

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

const ids = [...Array(TODO_COUNT)].map((_, i) => i + 1);
const tempCreatedAt = new Date(2020, 1, 1);
const tempDueDate = new Date(2099, 12, 31);

const randomTodoItems: TodoItem[] = ids.map((id) => ({
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

// ---------------------------------------------------
/* todo.order */
// ---------------------------------------------------
const getSuffledTodoItemIds = (
  filterPredicate: (item: TodoItem) => boolean,
): TodoItem['id'][] => {
  return shuffle<number>(
    randomTodoItems.filter(filterPredicate).map(({ id }) => id),
  );
};
const statusPredicate = (value: TodoItem['status']) => {
  return ({ status }: TodoItem) => status === value;
};
const priorityPredicate = (value: TodoItem['priority']) => {
  return ({ priority }: TodoItem) => priority === value;
};
const allPredicate = () => true;

const randomTodoOrder: TodoOrder = {
  status: {
    'next up': getSuffledTodoItemIds(statusPredicate('next up')),
    'in progress': getSuffledTodoItemIds(statusPredicate('in progress')),
    completed: getSuffledTodoItemIds(statusPredicate('completed')),
  },
  priority: {
    low: getSuffledTodoItemIds(priorityPredicate('low')),
    medium: getSuffledTodoItemIds(priorityPredicate('medium')),
    high: getSuffledTodoItemIds(priorityPredicate('high')),
  },
  all: getSuffledTodoItemIds(allPredicate),
};

/*
  todo
*/
const Todo = {
  items: randomTodoItems,
  order: randomTodoOrder,
};

export default Todo;
