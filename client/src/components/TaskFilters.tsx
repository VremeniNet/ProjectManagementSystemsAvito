import { Select, MenuItem, TextField } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import { ChangeEvent } from 'react'
import { Board } from '../types/board'
import { User } from '../types/user'

interface TaskFiltersProps {
	search: string
	status: string
	board: string
	assignee: string
	onChange: (field: string, value: string) => void
	boards: Board[]
	users: User[]
}

const TaskFilters = ({
	search,
	status,
	board,
	assignee,
	onChange,
	boards,
	users,
}: TaskFiltersProps) => {
	const handleTextChange =
		(field: string) => (e: ChangeEvent<HTMLInputElement>) => {
			onChange(field, e.target.value)
		}

	const handleSelectChange = (field: string) => (e: SelectChangeEvent) => {
		onChange(field, e.target.value)
	}

	const textInputStyle = {
		'& input': {
			backgroundColor: '#0A0A1E',
			color: '#fff',
			padding: '5px 12px',
			borderRadius: '8px',
		},
		'& fieldset': {
			border: 'none',
		},
	}

	const selectStyle = {
		backgroundColor: 'transparent',
		color: '#fff',
		padding: '0 12px',
		'& .MuiSelect-select': {
			padding: '5px 0',
		},
		'& fieldset': {
			border: 'none',
		},
		'&:hover': {
			backgroundColor: 'transparent',
		},
	}

	return (
		<div
			style={{
				display: 'flex',
				gap: '16px',
				marginBottom: '24px',
				flexWrap: 'wrap',
				backgroundColor: '#17172A',
				padding: '10px 30px',
			}}
		>
			<TextField
				placeholder='Поиск'
				variant='outlined'
				value={search}
				onChange={handleTextChange('search')}
				sx={textInputStyle}
			/>

			<Select
				value={status}
				onChange={handleSelectChange('status')}
				displayEmpty
				variant='outlined'
				sx={selectStyle}
				renderValue={value => (value ? value : 'Статус')}
			>
				<MenuItem value=''>Статус</MenuItem>
				<MenuItem value='Backlog'>Backlog</MenuItem>
				<MenuItem value='InProgress'>In Progress</MenuItem>
				<MenuItem value='Done'>Done</MenuItem>
			</Select>

			<Select
				value={board}
				onChange={handleSelectChange('board')}
				displayEmpty
				variant='outlined'
				sx={selectStyle}
				renderValue={value => (value ? value : 'Проект')}
			>
				<MenuItem value=''>Проект</MenuItem>
				{boards?.map(b => (
					<MenuItem key={b.id} value={b.name}>
						{b.name}
					</MenuItem>
				))}
			</Select>

			<Select
				value={assignee}
				onChange={handleSelectChange('assignee')}
				displayEmpty
				variant='outlined'
				sx={selectStyle}
				renderValue={value => (value ? value : 'Исполнитель')}
			>
				<MenuItem value=''>Исполнитель</MenuItem>
				{users?.map(u => (
					<MenuItem key={u.id} value={u.fullName}>
						{u.fullName}
					</MenuItem>
				))}
			</Select>
		</div>
	)
}

export default TaskFilters
