import { Task } from '../types/task'

export const boardTasks: Task[] = [
	{
		id: 1,
		title: 'Сделать кнопку',
		description: 'Добавить кнопку "Создать задачу"',
		status: 'ToDo',
		priority: 'High',
		assignee: { id: 1, fullName: 'Иван Иванов' },
		boardId: 1,
		boardName: 'Frontend Board',
	},
	{
		id: 2,
		title: 'Fix баг в логике',
		description: 'Исправить ошибку перехода',
		status: 'InProgress',
		priority: 'Medium',
		assignee: { id: 2, fullName: 'Ольга Смирнова' },
		boardId: 1,
		boardName: 'Frontend Board',
	},
	{
		id: 3,
		title: 'Выкатить на прод',
		description: 'Запуск финальной версии',
		status: 'Done',
		priority: 'Low',
		assignee: { id: 3, fullName: 'Антон Кузнецов' },
		boardId: 1,
		boardName: 'Frontend Board',
	},
]
