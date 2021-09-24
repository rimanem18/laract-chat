import React, { useEffect, useState } from 'react'
import axios from 'axios'


type ChatMessageState = {
    id: number,
    user_id: number,
    group_id: number,
    content: string,
    create_at: string,
    update_at: string,
}

const Message = ()=>{
    const [messages, setMessages] = useState<ChatMessageState[]>([]);
    const [text , setText] = useState("")

    useEffect(() => {
        // getChatMessages()
        setText('a')
        setMessages([{
            id: 1,
            user_id: 1,
            group_id: 1,
            content: "ぁぁぁ",
            create_at: "0000",
            update_at: "0000"
        }
        ])
        console.log('render')
        console.log(messages);
        console.log(text);



      }, [])

      const getChatMessages = async () => {
        const response = await axios.get('/api/chat_messages')
        console.log("response:"+response.data.chat_messages);
        const msg = response.data.chat_message

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
