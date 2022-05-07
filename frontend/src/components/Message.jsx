function Message({isError, message}) {
    const messageStyle = isError ? {
        color: '#f00',
    } : {
        color: '#fff'
    }
    
    return (
        <div style={messageStyle}>
            {message}
        </div>
    )
}

export default Message