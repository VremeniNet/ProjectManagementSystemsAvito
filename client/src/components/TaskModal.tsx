import {
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	Button,
	MenuItem,
	DialogActions,
} from '@mui/material'
import { useState } from 'react'
import { TaskFormValues } from '../types/taskForm'

interface TaskModalProps {
	open: boolean
	onClose: () => void
	onSubmit: (data: TaskFormValues) => void
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

const TaskModal = ({ open, onClose, onSubmit }: TaskModalProps) => {
	const [form, setForm] = useState<TaskFormValues>({
		title: '',
		description: '',
		status: 'Backlog',
		priority: 'Medium',
		assignee: '',
		board: '',
	})

	const handleChange =
		(field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
			setForm(prev => ({ ...prev, [field]: e.target.value }))
		}

	const handleSubmit = () => {
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
				Создать задачу
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
					InputLabelProps={{ shrink: true }}
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
					label='Доска'
					value={form.board}
					onChange={handleChange('board')}
					sx={yellowFieldStyle}
				/>
				<TextField
					select
					label='Статус'
					value={form.status}
					onChange={handleChange('status')}
					sx={yellowFieldStyle}
				>
					<MenuItem value='Backlog'>Backlog</MenuItem>
					<MenuItem value='InProgress'>In Progress</MenuItem>
					<MenuItem value='Done'>Done</MenuItem>
				</TextField>
				<TextField
					select
					label='Приоритет'
					value={form.priority}
					onChange={handleChange('priority')}
					sx={yellowFieldStyle}
				>
					<MenuItem value='Low'>Low</MenuItem>
					<MenuItem value='Medium'>Medium</MenuItem>
					<MenuItem value='High'>High</MenuItem>
				</TextField>
				<TextField
					label='Исполнитель'
					value={form.assignee}
					onChange={handleChange('assignee')}
					sx={yellowFieldStyle}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} sx={{ color: '#ffeb3b' }}>
					Отмена
				</Button>
				<Button
					variant='contained'
					sx={{
						backgroundColor: '#ffeb3b',
						color: '#000',
						fontWeight: 600,
						borderRadius: '8px',
						boxShadow: 'none',
						textTransform: 'none',
						'&:hover': { backgroundColor: '#fdd835' },
					}}
					onClick={handleSubmit}
				>
					Создать
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default TaskModal
