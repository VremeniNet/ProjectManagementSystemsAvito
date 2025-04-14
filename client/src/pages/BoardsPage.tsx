import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Board } from '../types/board'
import { getBoards } from '../api/boards'

const BoardsPage = () => {
	const [boards, setBoards] = useState<Board[]>([])
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchBoards = async () => {
			try {
				const data = await getBoards()
				if (Array.isArray(data)) {
					setBoards(data)
				} else {
					console.error('Ожидался массив досок:', data)
				}
			} catch (error) {
				console.error('Ошибка при загрузке досок:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchBoards()
	}, [])

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
				Loading boards...
			</div>
		)
	}

	return (
		<div
			style={{
				borderTop: '1px solid #22202E',
				borderBottom: '1px solid #22202E',
				backgroundColor: '#0A0A1E',
				height: 'calc(100vh - 12vh - 70px)',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<h2 style={{ margin: 0, padding: '10px 30px', color: '#ffeb3b' }}>
				Проекты
			</h2>

			<div
				style={{
					flex: 1,
					overflowY: 'auto',
					padding: '0 30px 30px',
					display: 'flex',
					flexDirection: 'column',
					gap: '16px',
				}}
			>
				{boards.map(board => (
					<div
						key={board.id}
						onClick={() => navigate(`/board/${board.id}`)}
						style={{
							backgroundColor: '#2c2c3e',
							padding: '16px',
							borderRadius: '12px',
							cursor: 'pointer',
							color: 'white',
							border: '1px solid transparent',
							transition: 'border-color 0.2s',
						}}
						onMouseEnter={e => (e.currentTarget.style.borderColor = '#ffeb3b')}
						onMouseLeave={e =>
							(e.currentTarget.style.borderColor = 'transparent')
						}
					>
						<h3 style={{ margin: 0 }}>{board.name}</h3>
						<p style={{ opacity: 0.8 }}>{board.description}</p>
						<p style={{ opacity: 0.5 }}>📋 Задач: {board.taskCount}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default BoardsPage
