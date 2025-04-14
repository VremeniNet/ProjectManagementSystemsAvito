export type TaskStatus = 'ToDo' | 'InProgress' | 'Done'
export type TaskPriority = 'Low' | 'Medium' | 'High'

export interface Assignee {
	id: number
	fullName: string
	email: string
	avatarUrl: string
}

export interface Task {
	id: number
	title: string
	description: string
	priority: 'Low' | 'Medium' | 'High'
	status: 'ToDo' | 'InProgress' | 'Done'
	boardId: number
	boardName: string
	assignee: {
		id: number
		fullName: string
	}
}
