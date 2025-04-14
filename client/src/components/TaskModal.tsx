import {
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	Button,
	MenuItem,
	DialogActions,
	SelectChangeEvent,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TaskFormValuesWithID } from '../types/taskForm'
import { User } from '../types/user'
import { Board } from '../types/board'

interface TaskModalProps {
	open: boolean
	onClose: () => void
	onSubmit: (data: TaskFormValuesWithID) => void
	initialValues?: TaskFormValuesWithID
	isFromBoard?: boolean
	showGoToBoard?: boolean
	users: User[]
	boards: Board[]
}

const yellowFieldStyle = {
	'& .MuiInputLabel-root': {
		color: '#ffeb3b',
	},
	'& .MuiOutlinedInput-root': {
		color: '#ffeb3b',
		'& fieldset': {
			borderColor: '#ffeb3b',
		},
		'&:hover fieldset': {
			borderColor: '#fdd835',
		},
		'&.Mui-focused fieldset': {
			borderColor: '#fdd835',
		},
	},
}

const TaskModal = ({
	open,
	onClose,
	onSubmit,
	initialValues,
	isFromBoard = false,
	showGoToBoard = false,
	users,
	boards,
}: TaskModalProps) => {
	const navigate = useNavigate()
	const isEditMode = Boolean(initialValues)

	const [form, setForm] = useState<TaskFormValuesWithID>({
		id: 0,
		title: '',
		description: '',
		status: 'Backlog',
		priority: 'Medium',
		assigneeId: 0,
		boardId: 0,
	})

	useEffect(() => {
		if (initialValues) {
			setForm(initialValues)
		}
	}, [initialValues])

	const handleChange =
		(field: keyof TaskFormValuesWithID) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setForm(prev => ({ ...prev, [field]: e.target.value }))
		}

	const handleSelectChange =
		(field: keyof TaskFormValuesWithID) => (e: SelectChangeEvent) => {
			const value = e.target.value
			setForm(prev => ({
				...prev,
				[field]: typeof prev[field] === 'number' ? Number(value) : value,
			}))
		}

	const handleSubmit = () => {
		if (!form.title.trim()) {
			alert('Введите название задачи')
			return
		}
		onSubmit(form)
		onClose()
	}

	return (
		<Dialog
			open={open}
			onClose={onClose}
			fullWidth
			maxWidth='sm'
			PaperProps={{
				sx: {
					border: '1px solid #ffeb3b',
					backgroundColor: '#0A0A1E',
					color: '#fff',
					borderRadius: '16px',
					padding: '16px',
					boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
				},
			}}
			slotProps={{
				backdrop: {
					sx: {
						backgroundColor: 'rgba(0, 0, 0, 0.6)',
					},
				},
			}}
		>
			<DialogTitle
				sx={{
					fontSize: 20,
					fontWeight: 700,
					paddingBottom: 1,
					color: '#ffeb3b',
				}}
			>
				{isEditMode ? 'Редактировать задачу' : 'Создать задачу'}
			</DialogTitle>
			<DialogContent
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
					mt: 1,
					pt: '10px !important',
				}}
			>
				<TextField
					label='Название задачи'
					value={form.title}
					onChange={handleChange('title')}
					fullWidth
					sx={yellowFieldStyle}
				/>
				<TextField
					label='Описание'
					value={form.description}
					onChange={handleChange('description')}
					fullWidth
					multiline
					rows={4}
					sx={yellowFieldStyle}
				/>
				<TextField
					label='Проект'
					select
					value={form.boardId}
					onChange={handleSelectChange('boardId')}
					sx={{
						...yellowFieldStyle,
						'& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline':
							{
								borderColor: '#ffeb3b',
							},
						'& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-input': {
							color: '#ffeb3b',
							WebkitTextFillColor: '#ffeb3b',
						},
						'& .MuiInputLabel-root.Mui-disabled': {
							color: '#ffeb3b',
						},
					}}
					disabled={isFromBoard}
				>
					<MenuItem value={0}>Без проекта</MenuItem>
					{boards.map(board => (
						<MenuItem key={board.id} value={board.id}>
							{board.name}
						</MenuItem>
					))}
				</TextField>
				<TextField
					select
					label='Приоритет'
					value={form.priority}
					onChange={handleSelectChange('priority')}
					sx={yellowFieldStyle}
				>
					<MenuItem value='Low'>Low</MenuItem>
					<MenuItem value='Medium'>Medium</MenuItem>
					<MenuItem value='High'>High</MenuItem>
				</TextField>
				<TextField
					select
					label='Статус'
					value={form.status}
					onChange={handleSelectChange('status')}
					sx={yellowFieldStyle}
				>
					<MenuItem value='Backlog'>Backlog</MenuItem>
					<MenuItem value='InProgress'>In Progress</MenuItem>
					<MenuItem value='Done'>Done</MenuItem>
				</TextField>
				<TextField
					label='Исполнитель'
					select
					value={form.assigneeId}
					onChange={handleSelectChange('assigneeId')}
					sx={yellowFieldStyle}
				>
					<MenuItem value={0}>Без исполнителя</MenuItem>
					{users.map(user => (
						<MenuItem key={user.id} value={user.id}>
							{user.fullName}
						</MenuItem>
					))}
				</TextField>
			</DialogContent>
			<DialogActions
				sx={{
					justifyContent: showGoToBoard ? 'space-between' : 'flex-end',
				}}
			>
				<Button onClick={onClose} sx={{ color: '#ffeb3b' }}>
					Отмена
				</Button>
				{showGoToBoard && (
					<Button
						variant='outlined'
						onClick={() => navigate(`/board/${form.boardId}`)}
						sx={{
							color: '#ffeb3b',
							borderColor: '#ffeb3b',
						}}
					>
						Перейти на доску
					</Button>
				)}
				<Button
					variant='contained'
					onClick={handleSubmit}
					sx={{
						backgroundColor: '#ffeb3b',
						color: '#000',
						fontWeight: 600,
						borderRadius: '8px',
						boxShadow: 'none',
						textTransform: 'none',
						'&:hover': { backgroundColor: '#fdd835' },
					}}
				>
					{isEditMode ? 'Обновить' : 'Создать'}
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default TaskModal
