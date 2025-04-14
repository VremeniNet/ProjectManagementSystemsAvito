import { Button } from '@mui/material'

interface CreateTaskButtonProps {
	onClick: () => void
}

const CreateTaskButton = ({ onClick }: CreateTaskButtonProps) => {
	return (
		<Button
			variant='contained'
			onClick={onClick}
			sx={{
				backgroundColor: '#ffeb3b',
				color: '#000',
				fontWeight: 600,
				borderRadius: '8px',
				textTransform: 'none',
				boxShadow: 'none',
				'&:hover': {
					backgroundColor: '#fdd835',
				},
			}}
		>
			Создать задачу
		</Button>
	)
}

export default CreateTaskButton
