const Notification = ({ message }) => {
  const padding = {
    border: 1,
    borderStyle: 'solid',
    padding: 5,
  }
  return <div style={message === '' ? {} : padding}>{message}</div>
}

export { Notification }
