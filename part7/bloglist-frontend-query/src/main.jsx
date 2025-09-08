import ReactDOM from 'react-dom/client'
import './styles/notification.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import { NotificationProvider } from './context/NotificationContext'
import { UserProvider } from './context/UserContext'
import { BrowserRouter as Router } from 'react-router-dom'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationProvider>
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <App />
        </Router>
      </QueryClientProvider>
    </UserProvider>
  </NotificationProvider>
)
