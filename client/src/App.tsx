// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import BoardsPage from './pages/BoardsPage'
import BoardPage from './pages/BoardPage'
import IssuesPage from './pages/IssuesPage'
import Header from './components/Header'
import TaskModal from './components/TaskModal'
import { TaskFormValues } from './types/taskForm'
import { mockBoards } from './mocks/boards'
import { mockUsers } from './mocks/users'

const uniqueBoards = mockBoards
const uniqueUsers = mockUsers

function App() {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const handleCreate = (data: TaskFormValues) => {
		console.log('Создана задача:', data)
		// Здесь можно сохранить в стейт или отправить на сервер
	}

	return (
		<BrowserRouter>
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '20vw',
					height: '150px',
					backgroundImage: 'url(/pattern.png)',
					backgroundSize: '320px 320px',
					pointerEvents: 'none',
					backgroundRepeat: 'repeat',
					zIndex: -1,
				}}
			/>

			<Header onOpenCreateModal={() => setIsModalOpen(true)} />

			<Routes>
				<Route path='/' element={<Navigate to='/issues' replace />} />
				<Route path='/boards' element={<BoardsPage />} />
				<Route path='/board/:id' element={<BoardPage />} />
				<Route path='/issues' element={<IssuesPage />} />
			</Routes>

			<TaskModal
				open={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSubmit={handleCreate}
				users={uniqueUsers}
				boards={uniqueBoards}
			/>

			<div
				style={{
					position: 'absolute',
					bottom: 0,
					right: 0,
					width: '20vw',
					height: '150px',
					backgroundImage: 'url(/pattern.png)',
					backgroundSize: '320px 320px',
					pointerEvents: 'none',
					backgroundRepeat: 'repeat',
					zIndex: -1,
				}}
			/>
		</BrowserRouter>
	)
}

export default App
