import { useState } from 'react'
import { mockBoards } from '../mocks/boards'
import { Board } from '../types/board'
import { useNavigate } from 'react-router-dom'

const BoardsPage = () => {
	const [boards] = useState<Board[]>(mockBoards)
	const navigate = useNavigate()

	return (
		<div
			style={{
				borderBottom: '1px solid #22202E',
				backgroundColor: '#0A0A1E',
				height: 'calc(100vh - 12vh - 80px)',
			}}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '16px',
					padding: '0 30px 30px',
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
