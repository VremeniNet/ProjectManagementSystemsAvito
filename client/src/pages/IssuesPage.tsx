import { useMemo, useState } from 'react'
import { mockTasks } from '../mocks/tasks'
import TaskFilters from '../components/TaskFilters'
import CreateTaskButton from '../components/CreateTaskButton'
import TaskModal from '../components/TaskModal'
import { TaskFormValues } from '../types/taskForm'

const IssuesPage = () => {
	const [filters, setFilters] = useState({
		search: '',
		status: '',
		board: '',
		assignee: '',
	})

	const [isModalOpen, setIsModalOpen] = useState(false)

	const filteredTasks = useMemo(() => {
		return mockTasks.filter(task => {
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
	}, [filters])

	const handleChange = (field: string, value: string) => {
		setFilters(prev => ({ ...prev, [field]: value }))
	}

	const handleCreate = (data: TaskFormValues) => {
		console.log('Создана задача:', data)
	}

	return (
		<div
			style={{
				borderBottom: '1px solid #22202E',
				backgroundColor: '#0A0A1E',
				height: 'calc(100vh - 12vh - 80px)',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<TaskFilters
				search={filters.search}
				status={filters.status}
				board={filters.board}
				assignee={filters.assignee}
				onChange={handleChange}
			/>

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
						style={{
							padding: '16px',
							backgroundColor: '#2c2c3e',
							borderRadius: '8px',
							color: 'white',
						}}
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

				<TaskModal
					open={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					onSubmit={handleCreate}
				/>
			</div>
		</div>
	)
}

export default IssuesPage
