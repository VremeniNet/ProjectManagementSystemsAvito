import { Link, useLocation } from 'react-router-dom'
import CreateTaskButton from './CreateTaskButton'

interface HeaderProps {
	onOpenCreateModal: () => void
}

const Header = ({ onOpenCreateModal }: HeaderProps) => {
	const location = useLocation()

	const isActive = (path: string) =>
		location.pathname.startsWith(path) ? 'active' : ''

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

			<CreateTaskButton onClick={onOpenCreateModal} />
		</header>
	)
}

export default Header
