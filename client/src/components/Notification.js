const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  const error = message.toString().toLowerCase().includes("error");
  console.log(error);
  return (
    <>
      {error ? (
        <div className="error">{message}</div>
      ) : (
        <div className="success">{message}</div>
      )}
    </>
  );
};

export default Notification;
