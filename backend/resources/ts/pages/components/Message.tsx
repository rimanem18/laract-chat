import React, { useEffect, useState } from 'react'
import axios from 'axios'

import {
  ChatMessage,
  getChatMessages,
  selectChatMessages,
} from '../../features/ChatMessagesSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

const typeCheck = Object.prototype.toString

const Message = () => {
  const dispatch = useAppDispatch()
  const chatMessages = useAppSelector(selectChatMessages)

  useEffect(() => {
    fetchChatMessages()
    console.log('render')
    console.log(chatMessages)
  }, [chatMessages.ids.length])

  const fetchChatMessages = async () => {
    const response = await axios.get('/api/chat_messages')
    dispatch(getChatMessages(response.data.chat_messages))
  }

  return (
    <>
      {chatMessages.ids.length !== 0
        ? chatMessages.ids.map((id) => (
            <MessageItem key={id} id={id} entries={chatMessages.entities} />
          ))
        : '通信中...'}
    </>
  )
}

type MessageItemProps = {
  id: string
  entries: Record<string, ChatMessage>
}
const MessageItem = ({ id, entries }: MessageItemProps) => {
  return (
    <>
      <div>
        <strong className="mr-1">{entries[id].name}</strong>
        <small>{entries[id].created_at}</small>
      </div>
      <div>{entries[id].content}</div>
    </>
  )
}

export default Message
