const Notification = ({ message }: { message: string | null }) => {
  return (
    message && (
      <div
        style={{ position: 'fixed', background: '#fb7f7fff', zIndex: '999' }}
      >
        <p>{message}</p>
      </div>
    )
  );
};

export default Notification;
