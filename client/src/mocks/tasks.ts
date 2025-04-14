import { Task } from '../types/task'

export const mockTasks: Task[] = [
	{
		id: 1,
		title: 'Добавить фильтры на страницу задач',
		description: 'Нужно реализовать фильтрацию по статусу, доске и исполнителю',
		status: 'ToDo',
		priority: 'High',
		assignee: {
			id: 1,
			fullName: 'Иван Петров',
		},
		boardId: 1,
		boardName: 'Frontend Board',
	},
	{
		id: 2,
		title: 'Реализовать drag-and-drop задач',
		description: 'Перемещение задач между колонками на доске',
		status: 'InProgress',
		priority: 'Medium',
		assignee: {
			id: 2,
			fullName: 'Ольга Смирнова',
		},
		boardId: 1,
		boardName: 'Frontend Board',
	},
	{
		id: 3,
		title: 'Обновить стили кнопки создания',
		description: 'Сделать кнопку ярче, добавить закругление',
		status: 'Done',
		priority: 'Low',
		assignee: {
			id: 3,
			fullName: 'Антон Кузнецов',
		},
		boardId: 2,
		boardName: 'UI Board',
	},
]
