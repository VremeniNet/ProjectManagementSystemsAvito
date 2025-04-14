import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { Task } from '../types/task'
import { boardTasks } from '../mocks/boardTasks'
import TaskModal from '../components/TaskModal'
import { TaskFormValues } from '../types/taskForm'
import { mockUsers } from '../mocks/users'
import { mockBoards } from '../mocks/boards'

const statusColumns = [
	{ label: 'ToDo', title: 'To Do' },
	{ label: 'InProgress', title: 'In Progress' },
	{ label: 'Done', title: 'Done' },
]

const BoardPage = () => {
	const { id } = useParams()

	const tasks = boardTasks.filter(t => t.boardId === Number(id))
	const boardName = tasks[0]?.boardName || 'Проект'

	const [selectedTask, setSelectedTask] = useState<TaskFormValues | null>(null)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const handleOpen = (task: Task) => {
		const taskForm: TaskFormValues = {
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

	const handleUpdate = (updatedTask: TaskFormValues) => {
		console.log('Обновлена задача:', updatedTask)

		handleClose()
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
						{tasks
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
					users={mockUsers}
					boards={mockBoards}
				/>
			)}
		</div>
	)
}

export default BoardPage
