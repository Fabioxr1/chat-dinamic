import React from 'react';


const ListMessage = ({ listMessage }) => {
    if(listMessage.length === 0) {
        return <p>Nessuna conversazione è stata mai fatta qui! Si il primo!</p>
    }
    return (
        <div className="panel-body">
            <ul className="chat">
                {
                    listMessage.map((item) => {
                        return (
                            <li className="left clearfix" key={item.id}>
                                <div className="chat-body clearfix">
                                    <div className="header">
                                        <strong className="primary-font"> {item.user}</strong> <small className="pull-right text-muted">
                                            <span className="glyphicon glyphicon-time"></span>{item.dateinsert}</small>
                                    </div>
                                    <p>{item.CurrentMessage}</p>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
export default ListMessage;