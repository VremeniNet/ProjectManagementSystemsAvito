import axios from 'axios'
import { Task } from '../types/task'

const api = axios.create({
	baseURL: 'http://localhost:8080/api/v1',
})

export const getTasks = async (): Promise<Task[]> => {
	const response = await api.get('/tasks')
	return response.data
}
