import React from 'react'
import ReactDOM from 'react-dom/client'
import Grid from './components/Grid'
import { GameProvider } from './providers/gameProvider'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<GameProvider>
			<Grid />
		</GameProvider>
	</React.StrictMode>
)
