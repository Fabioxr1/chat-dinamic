import React from 'react';

const TipingChat = ({write_message}) => {
    if(!write_message) {
        return <div/>
    }
    return (       
            <span className="badge badge-success">{write_message}</span>
    )
}
export default TipingChat;