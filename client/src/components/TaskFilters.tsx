import { Select, MenuItem, TextField } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import { ChangeEvent } from 'react'

interface TaskFiltersProps {
	search: string
	status: string
	board: string
	assignee: string
	onChange: (field: string, value: string) => void
}

const TaskFilters = ({
	search,
	status,
	board,
	assignee,
	onChange,
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
				<MenuItem value='ToDo'>ToDo</MenuItem>
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
				<MenuItem value='Frontend Board'>Frontend Board</MenuItem>
				<MenuItem value='UI Board'>UI Board</MenuItem>
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
				<MenuItem value='Иван Петров'>Иван Петров</MenuItem>
				<MenuItem value='Ольга Смирнова'>Ольга Смирнова</MenuItem>
				<MenuItem value='Антон Кузнецов'>Антон Кузнецов</MenuItem>
			</Select>
		</div>
	)
}

export default TaskFilters
