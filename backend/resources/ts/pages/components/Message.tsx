import React, { useEffect, useState } from 'react'
import axios from 'axios'

import {
  ChatMessage,
  getChatMessages,
  selectChatMessages,
} from '../../features/ChatMessagesSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectPost } from '../../features/PostSlise'
import { selectUser } from '../../features/UserSlice'

const typeCheck = Object.prototype.toString

const Message = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const chatMessages = useAppSelector(selectChatMessages)
  const post = useAppSelector(selectPost)

  useEffect(() => {
    fetchChatMessages()
    console.log('render')
    console.log(chatMessages)
  }, [chatMessages.ids.length, post.promise])

  const fetchChatMessages = async () => {
    const response = await axios.get('/api/chat_messages')
    dispatch(getChatMessages(response.data.chat_messages))
  }

  return (
    <>
      {chatMessages.ids.length !== 0 ? (
        chatMessages.ids.map((id) => (
          <MessageItem key={id} id={id} entries={chatMessages.entities} />
        ))
      ) : (
        <p>メッセージを取得中</p>
      )}
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
      {entries[id].content.split('\n').map((str, index) => (
        <React.Fragment key={index}>
          {str}
          <br />
        </React.Fragment>
      ))}
    </>
  )
}

export default Message
