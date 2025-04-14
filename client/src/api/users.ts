import axiosInstance from './axiosInstance'
import { User } from '../types/user'

export const getUsers = async (): Promise<User[]> => {
	const response = await axiosInstance.get<User[]>('/users')
	return response.data
}
