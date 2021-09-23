import React, { useEffect, useState } from 'react'
import axios from 'axios'


type MessageState = {
    id: number,
    user_id: number,
    group_id: number,
    content: string,
    create_at: string,
    update_at: string,
}

const Message = ()=>{
    const [messages, setMessages] = useState<MessageState[]>([]);

    useEffect(()=>{
        getMessages();
        console.log(messages);

    },[])

    const getMessages =async ()=>{
        await axios.get('/api/messages')
        .then(response => {
            return response.data
        })
        .catch(()=>{
            console.log('通信に失敗しました。');
        })
    }


    return(
        <>
            <ul>
                {
                    messages.map(message=> {
                        <li key={message.id}>
                            {message.content}
                        </li>
                    })
                }
            </ul>
        </>
    )
}

export default Message
