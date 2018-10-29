import { combineReducers } from 'redux';
import chatOption from './reducer_chat_option';
import chatMessage from './reducer_message_chat'
const rootReducer = combineReducers({
    //state:(state = {}) => state
    chatOption : chatOption,
    chatMessage : chatMessage
})
export default rootReducer;