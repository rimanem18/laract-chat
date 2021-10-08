import React, { useEffect, useState } from 'react'
import axios from 'axios'

import {
  ChatMessage,
  getChatMessages,
  selectChatMessages,
} from '../../features/ChatMessagesSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  selectPost,
  selectPostContent,
  selectPostPromise,
  selectPostUserId,
} from '../../features/PostSlise'
import { selectUser } from '../../features/UserSlice'

const typeCheck = Object.prototype.toString

const Message = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const chatMessages = useAppSelector(selectChatMessages)
  const content = useAppSelector(selectPostContent)
  const postPromise = useAppSelector(selectPostPromise)

  useEffect(() => {
    if (postPromise !== 'loading') {
      fetchChatMessages()
      console.log('render')
      console.log(chatMessages)
    }
  }, [postPromise])

  const fetchChatMessages = async () => {
    const response = await axios.get('/api/chat_messages')
    dispatch(getChatMessages(response.data.chat_messages))
  }

  const entities = React.useMemo(() => {
    return chatMessages.entities
  }, [chatMessages.ids.length])

  return (
    <div className="message">
      {chatMessages.ids.length !== 0 ? (
        chatMessages.ids.map((id) => (
          <MessageItem key={id} id={id} entries={entities} />
        ))
      ) : (
        <p>メッセージを取得中</p>
      )}
    </div>
  )
}

/**
 * Components
 */
type MessageItemProps = {
  id: string
  entries: Record<string, ChatMessage>
}
const MessageItem = React.memo(({ id, entries }: MessageItemProps) => {
  console.log('messageItem')

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
})

export default Message
