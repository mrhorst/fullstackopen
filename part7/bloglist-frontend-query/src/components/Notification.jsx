import { useContext } from 'react'
import { NotificationContext } from '../context/NotificationContext'
import Alert from '@mui/material/Alert'

const Notification = () => {
  const { notification } = useContext(NotificationContext)
  const { message, type } = notification
  if (!message) return null
  return <Alert severity={type}>{message}</Alert>
}

export default Notification
