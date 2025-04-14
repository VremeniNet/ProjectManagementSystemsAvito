import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import CreateTaskButton from './CreateTaskButton'
import TaskModal from './TaskModal'
import { Board } from '../types/board'
import { User } from '../types/user'
import { getUsers } from '../api/users'
import { getBoards } from '../api/boards'
import { TaskFormValues } from '../types/taskForm'
import { createTask, getTasks } from '../api/tasks'

const Header = () => {
	const location = useLocation()

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [loading, setLoading] = useState(true)
	const [users, setUsers] = useState<User[]>([])
	const [boards, setBoards] = useState<Board[]>([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [usersData, boardsData] = await Promise.all([
					getUsers(),
					getBoards(),
				])
				setUsers(usersData)
				setBoards(boardsData)
			} catch (err) {
				console.error('Ошибка при загрузке в хедере:', err)
			} finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [])

	const isActive = (path: string) =>
		location.pathname.startsWith(path) ? 'active' : ''

	const handleCreate = async (data: TaskFormValues) => {
		try {
			await createTask(data)
			await getTasks()
		} catch (err) {
			console.error('Ошибка при создании задачи в хедере:', err)
		}
		setIsModalOpen(false)
	}

	if (loading) {
		return (
			<header
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: '14px 32px',
					backgroundColor: '#0A0A1E',
					color: '#fff',
					fontFamily: 'Roboto',
					borderTop: '1px solid #22202E',
				}}
			>
				<nav style={{ display: 'flex', gap: '30px' }}>
					<Link
						to='/issues'
						className={isActive('/issues')}
						style={{
							color: isActive('/issues') ? '#ffeb3b' : '#fff',
							textDecoration: 'none',
							fontWeight: 800,
							fontSize: 22,
						}}
					>
						Все задачи
					</Link>
					<Link
						to='/boards'
						className={isActive('/boards')}
						style={{
							color: isActive('/boards') ? '#ffeb3b' : '#fff',
							textDecoration: 'none',
							fontWeight: 800,
							fontSize: 22,
						}}
					>
						Проекты
					</Link>
				</nav>
				<CreateTaskButton onClick={() => setIsModalOpen(true)} />
			</header>
		)
	}

	return (
		<header
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				padding: '14px 32px',
				backgroundColor: '#0A0A1E',
				color: '#fff',
				fontFamily: 'Roboto',
				borderTop: '1px solid #22202E',
			}}
		>
			<nav style={{ display: 'flex', gap: '30px' }}>
				<Link
					to='/issues'
					className={isActive('/issues')}
					style={{
						color: isActive('/issues') ? '#ffeb3b' : '#fff',
						textDecoration: 'none',
						fontWeight: 800,
						fontSize: 22,
					}}
				>
					Все задачи
				</Link>
				<Link
					to='/boards'
					className={isActive('/boards')}
					style={{
						color: isActive('/boards') ? '#ffeb3b' : '#fff',
						textDecoration: 'none',
						fontWeight: 800,
						fontSize: 22,
					}}
				>
					Проекты
				</Link>
			</nav>

			<div>
				<CreateTaskButton onClick={() => setIsModalOpen(true)} />
				{isModalOpen && (
					<TaskModal
						open={isModalOpen}
						onClose={() => setIsModalOpen(false)}
						onSubmit={handleCreate}
						users={users}
						boards={boards}
						isFromBoard={false}
						showGoToBoard={false}
					/>
				)}
			</div>
		</header>
	)
}

export default Header
