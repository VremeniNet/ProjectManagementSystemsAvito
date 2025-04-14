import { useParams } from 'react-router-dom'
import { useEffect, useState, useMemo } from 'react'
import TaskModal from '../components/TaskModal'
import { Task } from '../types/task'
import { TaskFormValues, TaskFormValuesWithID } from '../types/taskForm'
import { User } from '../types/user'
import { Board } from '../types/board'
import { getTasks, updateTask } from '../api/tasks'
import { getUsers } from '../api/users'
import { getBoards } from '../api/boards'

const statusColumns = [
	{ label: 'Backlog', title: 'To Do' },
	{ label: 'InProgress', title: 'In Progress' },
	{ label: 'Done', title: 'Done' },
]

const BoardPage = () => {
	const { id } = useParams()
	const boardId = Number(id)

	const [tasks, setTasks] = useState<Task[]>([])
	const [users, setUsers] = useState<User[]>([])
	const [boards, setBoards] = useState<Board[]>([])
	const [loading, setLoading] = useState(true)

	const [selectedTask, setSelectedTask] = useState<TaskFormValuesWithID | null>(
		null
	)
	const [isModalOpen, setIsModalOpen] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [tasksData, usersData, boardsData] = await Promise.all([
					getTasks(),
					getUsers(),
					getBoards(),
				])
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

	const boardTasks = useMemo(() => {
		return tasks.filter(task => task.boardId === boardId)
	}, [tasks, boardId])

	const boardName = useMemo(() => {
		return boards.find(b => b.id === boardId)?.name || 'Проект'
	}, [boards, boardId])

	const handleOpen = (task: Task) => {
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

	const handleUpdate = async (updatedTask: TaskFormValues) => {
		try {
			if (selectedTask?.id) {
				await updateTask(selectedTask.id, updatedTask)
				const tasksData = await getTasks()
				setTasks(tasksData)
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
				Loading board...
			</div>
		)
	}

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '24px',
				borderBottom: '1px solid #22202E',
				borderTop: '1px solid #22202E',
				backgroundColor: '#0A0A1E',
				height: 'calc(100vh - 12vh - 80px)',
				padding: '10px 30px 0',
			}}
		>
			<h2 style={{ color: '#ffeb3b' }}>{boardName}</h2>

			<div style={{ display: 'flex', gap: '24px' }}>
				{statusColumns.map(col => (
					<div
						key={col.label}
						style={{
							flex: 1,
							backgroundColor: '#161622',
							borderRadius: '12px',
							padding: '16px',
							display: 'flex',
							flexDirection: 'column',
							gap: '12px',
						}}
					>
						<h3 style={{ color: '#ffeb3b', margin: 0 }}>{col.title}</h3>
						{boardTasks
							.filter(task => task.status === col.label)
							.map(task => (
								<div
									key={task.id}
									onClick={() => handleOpen(task)}
									style={{
										backgroundColor: '#2c2c3e',
										padding: '12px',
										borderRadius: '8px',
										color: '#fff',
										boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
										cursor: 'pointer',
										border: '1px solid transparent',
										transition: 'border-color 0.2s',
									}}
									onMouseEnter={e =>
										(e.currentTarget.style.borderColor = '#ffeb3b')
									}
									onMouseLeave={e =>
										(e.currentTarget.style.borderColor = 'transparent')
									}
								>
									<strong>{task.title}</strong>
									<p style={{ opacity: 0.7 }}>{task.description}</p>
									<p style={{ fontSize: '12px', opacity: 0.5 }}>
										⚡ {task.priority} | 👤 {task.assignee.fullName}
									</p>
								</div>
							))}
					</div>
				))}
			</div>

			{isModalOpen && (
				<TaskModal
					open={isModalOpen}
					onClose={handleClose}
					onSubmit={handleUpdate}
					initialValues={selectedTask ?? undefined}
					isFromBoard={true}
					showGoToBoard={false}
					users={users}
					boards={boards}
				/>
			)}
		</div>
	)
}

export default BoardPage
