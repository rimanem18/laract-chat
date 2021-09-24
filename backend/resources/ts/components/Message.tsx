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

const typeCheck = Object.prototype.toString

const Message = () => {
  const [messages, setMessages] = useState<ChatMessageState[]>([]);

  useEffect(() => {
    getChatMessages()
    console.log('render')
    console.log(typeCheck.call(messages));


  }, [messages.length])



  const getChatMessages = async () => {
    const response = await axios.get('/api/chat_messages')
    setMessages(response.data.chat_messages)
  }

  return (
    <>
      <ul>
        {messages.length !== 0 ?
          messages.map(message =>
            <li key={message.id}>{message.content}</li>
          ) : "通信中..."
        }
      </ul>
    </>
  )
}

export default Message
