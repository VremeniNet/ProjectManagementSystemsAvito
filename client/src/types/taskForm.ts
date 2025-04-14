export interface TaskFormValues {
	title: string
	description: string
	priority: 'Low' | 'Medium' | 'High'
	status: 'ToDo' | 'InProgress' | 'Done'
	boardId: number
	assigneeId: number
}

export interface TaskFormValuesWithID extends TaskFormValues {
	id: number
}
