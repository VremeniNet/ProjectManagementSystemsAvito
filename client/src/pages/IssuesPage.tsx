// src/pages/IssuesPage.tsx

import { useMemo, useState, useEffect } from 'react'
import TaskFilters from '../components/TaskFilters'
import CreateTaskButton from '../components/CreateTaskButton'
import TaskModal from '../components/TaskModal'

import { TaskFormValues, TaskFormValuesWithID } from '../types/taskForm'
import { Task } from '../types/task'
import { User } from '../types/user'
import { Board } from '../types/board'

import { getTasks, createTask, updateTask } from '../api/tasks'
import { getUsers } from '../api/users'
import { getBoards } from '../api/boards'

const IssuesPage = () => {
	// Состояния для данных с сервера
	const [users, setUsers] = useState<User[]>([])
	const [boards, setBoards] = useState<Board[]>([])
	const [tasks, setTasks] = useState<Task[]>([])
	const [loading, setLoading] = useState(true)

	// Состояние для фильтров
	const [filters, setFilters] = useState({
		search: '',
		status: '',
		board: '',
		assignee: '',
	})

	// Состояние для выбранной задачи (с ID) и открытия модалки
	const [selectedTask, setSelectedTask] = useState<TaskFormValuesWithID | null>(
		null
	)
	const [isModalOpen, setIsModalOpen] = useState(false)

	// При первом рендере загружаем данные с сервера
	useEffect(() => {
		const fetchData = async () => {
			try {
				const tasksData = await getTasks()
				const usersData = await getUsers()
				const boardsData = await getBoards()

				setTasks(tasksData)
				setUsers(usersData)
				setBoards(boardsData)
			} catch (error) {
				console.error('Ошибка при загрузке данных:', error)
			} finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [])

	// Фильтрация задач по поиску, статусу, доске и исполнителю
	const filteredTasks = useMemo(() => {
		return tasks.filter(task => {
			const matchesSearch = task.title
				.toLowerCase()
				.includes(filters.search.toLowerCase())
			const matchesStatus = filters.status
				? task.status === filters.status
				: true
			const matchesBoard = task.boardName
				.toLowerCase()
				.includes(filters.board.toLowerCase())
			const matchesAssignee = task.assignee.fullName
				.toLowerCase()
				.includes(filters.assignee.toLowerCase())

			return matchesSearch && matchesStatus && matchesBoard && matchesAssignee
		})
	}, [filters, tasks])

	// Обработчик изменения фильтров
	const handleChange = (field: string, value: string) => {
		setFilters(prev => ({ ...prev, [field]: value }))
	}

	// Создание новой задачи (через API)
	const handleCreate = async (data: TaskFormValues) => {
		try {
			const newTask = await createTask(data)
			console.log('Создана задача:', newTask)
			// Добавляем новую задачу в локальный стейт
			setTasks(prev => [...prev, newTask])
		} catch (error) {
			console.error('Ошибка при создании задачи:', error)
		}
	}

	// Открытие модалки для редактирования задачи
	const handleOpen = (task: Task) => {
		// Преобразуем Task → TaskFormValuesWithID
		const taskForm: TaskFormValuesWithID = {
			id: task.id,
			title: task.title,
			description: task.description,
			status: task.status,
			priority: task.priority,
			assigneeId: task.assignee.id,
			boardId: task.boardId,
		}
		setSelectedTask(taskForm)
		setIsModalOpen(true)
	}

	const handleClose = () => {
		setSelectedTask(null)
		setIsModalOpen(false)
	}

	// Обновление задачи (через API)
	const handleUpdate = async (updatedTask: TaskFormValues) => {
		try {
			if (selectedTask?.id) {
				const updated = await updateTask(selectedTask.id, updatedTask)
				console.log('Обновлена задача:', updated)
				// Обновляем задачу в локальном списке
				setTasks(prev =>
					prev.map(task =>
						task.id === selectedTask.id ? { ...task, ...updated } : task
					)
				)
			}
		} catch (error) {
			console.error('Ошибка при обновлении задачи:', error)
		}
		handleClose()
	}

	if (loading) {
		return (
			<div
				style={{
					backgroundColor: '#0A0A1E',
					height: 'calc(100vh - 12vh - 70px)',
					color: '#fff',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				Loading tasks...
			</div>
		)
	}

	return (
		<div
			style={{
				borderBottom: '1px solid #22202E',
				backgroundColor: '#0A0A1E',
				height: 'calc(100vh - 12vh - 70px)',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			{/* Фильтры */}
			<TaskFilters
				search={filters.search}
				status={filters.status}
				board={filters.board}
				assignee={filters.assignee}
				onChange={handleChange}
			/>

			{/* Список задач */}
			<div
				style={{
					flex: 1,
					overflowY: 'auto',
					padding: '0 30px 60px',
					display: 'flex',
					flexDirection: 'column',
					gap: '16px',
				}}
			>
				{filteredTasks.map(task => (
					<div
						key={task.id}
						onClick={() => handleOpen(task)}
						style={{
							padding: '16px',
							backgroundColor: '#2c2c3e',
							borderRadius: '8px',
							color: 'white',
							cursor: 'pointer',
							border: '1px solid transparent',
							transition: 'border-color 0.2s',
						}}
						onMouseEnter={e => (e.currentTarget.style.borderColor = '#ffeb3b')}
						onMouseLeave={e =>
							(e.currentTarget.style.borderColor = 'transparent')
						}
					>
						<h3>{task.title}</h3>
						<p style={{ opacity: 0.7 }}>{task.description}</p>
						<p>
							📌 {task.status} | ⚡ {task.priority} | 👤{' '}
							{task.assignee.fullName} | 📋 {task.boardName}
						</p>
					</div>
				))}
			</div>

			{/* Кнопка создания задачи */}
			<div
				style={{
					display: 'flex',
					justifyContent: 'flex-end',
					marginTop: '15px',
					marginBottom: '26px',
					marginRight: '30px',
				}}
			>
				<CreateTaskButton onClick={() => setIsModalOpen(true)} />
				{isModalOpen && (
					<TaskModal
						open={isModalOpen}
						onClose={handleClose}
						onSubmit={selectedTask ? handleUpdate : handleCreate}
						initialValues={selectedTask ?? undefined}
						isFromBoard={false}
						showGoToBoard={!!selectedTask}
						users={users}
						boards={boards}
					/>
				)}
			</div>
		</div>
	)
}

export default IssuesPage
