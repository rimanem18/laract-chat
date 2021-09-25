import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { ChatMessagesSliceState, getChatMessages, selectChatMessages } from '../../features/ChatMessagesSlice'
import { useAppDispatch } from '../../app/hooks'
import { useSelector } from 'react-redux'

const typeCheck = Object.prototype.toString

const Message = () => {
  const dispatch = useAppDispatch()
  const chatMessages = useSelector(selectChatMessages)

  useEffect(() => {
    fetchChatMessages();
    console.log('render')
    console.log(chatMessages);
  }, [chatMessages.ids.length])



  const fetchChatMessages = async () => {
    const response = await axios.get('/api/chat_messages')
    dispatch(getChatMessages(response.data.chat_messages))
  }

  return (
    <>
      <div className="container">
        {/* {chatMessages.length !== 0 ?
          chatMessages.map(message =>
            <div className="card" key={message.id}>
              <p>
                {message.content}
              </p>
            </div>
          ) : "通信中..."
        } */}
      </div>
      <div className="container">
        {
          chatMessages.ids.length !== 0 ?
            chatMessages.ids.map(id =>
              <MessageItem key={id} id={id} chatMessages={chatMessages} />
            ) :
            "通信中..."
        }
      </div>
    </>
  )
}

type MessageItemProps = {
  id: string
  chatMessages: ChatMessagesSliceState
}
const MessageItem = ({ id, chatMessages }: MessageItemProps) => {
  const entries = chatMessages.entities

  return (
    <>
      <div>
        <strong className="mr-1">{id}</strong>
        <small>{entries[id].create_at}</small>
      </div>
      <div className="toast-body">
        {entries[id].content}
      </div>
    </>
  )
}

export default Message
