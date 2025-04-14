import axiosInstance from './axiosInstance'
import { Task } from '../types/task'
import { TaskFormValues } from '../types/taskForm'

export const getTasks = async (): Promise<Task[]> => {
	const response = await axiosInstance.get('/tasks')
	return response.data.data
}

export const createTask = async (data: TaskFormValues) => {
	const payload = {
		title: data.title,
		description: data.description,
		priority: data.priority,
		boardId: data.boardId,
		assigneeId: data.assigneeId,
	}
	const response = await axiosInstance.post('/tasks/create', payload)
	return response.data
}

export const updateTask = async (taskId: number, data: TaskFormValues) => {
	const payload = {
		title: data.title,
		description: data.description,
		priority: data.priority,
		status: data.status,
		assigneeId: data.assigneeId,
	}
	const response = await axiosInstance.put(`/tasks/update/${taskId}`, payload)
	return response.data
}

export const updateTaskStatus = async (taskId: number, status: string) => {
	const payload = { status }
	const response = await axiosInstance.put(
		`/tasks/updateStatus/${taskId}`,
		payload
	)
	return response.data
}
