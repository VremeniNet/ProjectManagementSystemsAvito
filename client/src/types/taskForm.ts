export interface TaskFormValues {
	title: string
	description: string
	status: 'Backlog' | 'InProgress' | 'Done'
	priority: 'Low' | 'Medium' | 'High'
	assignee: string
	board: string
}
