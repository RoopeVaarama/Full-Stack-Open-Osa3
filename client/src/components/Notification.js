const Notification = ({ errorMessage, message }) => {
    if (message === null && errorMessage === null) {
        return null
    }
    return (
        <>
        {errorMessage ? 
        <div className="error">
            {errorMessage}
        </div> : null}
        {message ?
        <div className="success">
            {message}
        </div> : null}
        </>

    )
}

export default Notification;