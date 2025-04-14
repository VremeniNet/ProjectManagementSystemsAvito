import axiosInstance from './axiosInstance'
import { Board } from '../types/board'

export const getBoards = async (): Promise<Board[]> => {
	const response = await axiosInstance.get('/boards')
	return response.data.data
}

export const getBoardTasks = async (boardId: number) => {
	const response = await axiosInstance.get(`/boards/${boardId}`)
	return response.data
}
