import { useContext } from 'react'
import { NotificationContext } from '../context/NotificationContext'

const Notification = () => {
  const { notification } = useContext(NotificationContext)
  const { message, type } = notification
  return (
    <div
      style={message === null ? { display: 'none' } : { display: 'block' }}
      className={`${type} notification`}
    >
      <p>{message}</p>
    </div>
  )
}

export default Notification
