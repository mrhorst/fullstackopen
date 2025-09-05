const Notification = ({ message, type }) => {
  return (
    <div
      style={message === '' ? { display: 'none' } : { display: 'block' }}
      className={`${type} notification`}
    >
      <p>{message}</p>
    </div>
  )
}

export default Notification
