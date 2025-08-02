const Notification = (props) => {
  return (
    <div className={props.type}>
      <h3>{props.message}</h3>
    </div>
  )
}

export default Notification
