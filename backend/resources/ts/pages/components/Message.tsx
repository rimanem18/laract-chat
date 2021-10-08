import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'

import {
  ChatMessage,
  fetchMessages,
  selectChatMessagesIds,
  selectChatMessagesEntities,
  selectChatMessagesPromise,
} from '../../features/ChatMessagesSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectPostContent, selectPostPromise } from '../../features/PostSlise'
import { selectUser } from '../../features/UserSlice'

const typeCheck = Object.prototype.toString

const Message = () => {
  const dispatch = useAppDispatch()
  const chatMessagesIds = useAppSelector(selectChatMessagesIds)
  const chatMessagesEntities = useAppSelector(selectChatMessagesEntities)
  const chatMessagesPromise = useAppSelector(selectChatMessagesPromise)
  const postPromise = useAppSelector(selectPostPromise)
  const messageList = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (postPromise !== 'loading') {
      dispatch(fetchMessages())
      autoScroll()
      console.log('render')
    }
  }, [postPromise])

  useEffect(() => {
    if (chatMessagesPromise !== 'loading') {
      autoScroll()
    }
  }, [chatMessagesPromise])

  const autoScroll = () => {
    const el = messageList.current
    if (el !== null) {
      console.log('Auto Scroll')
      el.scrollTo(0, el.scrollHeight)
    }
  }

  return (
    <div ref={messageList} className="message">
      {chatMessagesPromise !== 'loading' ? (
        chatMessagesIds.map((id) => (
          <MessageItem
            key={id}
            name={chatMessagesEntities[id].name}
            content={chatMessagesEntities[id].content}
            created_at={chatMessagesEntities[id].created_at}
          />
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
  name: string
  content: string
  created_at: string
}
const MessageItem = React.memo(
  ({ name, content, created_at }: MessageItemProps) => {
    console.log('messageItem')

    return (
      <>
        <div>
          <strong className="mr-1">{name}</strong>
          <small>{created_at}</small>
        </div>
        <p>
          {content.split('\n').map((str, index) => (
            <React.Fragment key={index}>{str}</React.Fragment>
          ))}
        </p>
      </>
    )
  }
)

export default Message
