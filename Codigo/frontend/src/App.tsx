import { UserProvider } from './context/UserContext'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'

export function App() {
	return (
		<UserProvider>
			<BrowserRouter>
				<Router />
			</BrowserRouter>
		</UserProvider>
	)
}