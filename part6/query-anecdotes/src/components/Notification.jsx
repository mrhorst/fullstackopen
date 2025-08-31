import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  return <div style={notification === '' ? {} : style}>{notification}</div>
}

Notification.propTypes = {
  notification: PropTypes.string.isRequired,
}

export default Notification
