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

  const autoScroll = () => {
    const el = messageList.current
    console.log('Auto Scroll')
    if (el !== null) {
      el.scrollTo(0, 1000)
    }
  }

  return (
    <div ref={messageList} className="message">
      {chatMessagesPromise !== 'loading' ? (
        chatMessagesIds.map((id) => (
          <MessageItem key={id} id={id} entities={chatMessagesEntities} />
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
  entities: Record<string, ChatMessage> | undefined
}
const MessageItem = React.memo(({ id, entities }: MessageItemProps) => {
  console.log('messageItem')

  return (
    <>
      {entities !== undefined ? (
        <>
          <div>
            <strong className="mr-1">{entities[id].name}</strong>
            <small>{entities[id].created_at}</small>
          </div>
          <p>
            {entities[id].content.split('\n').map((str, index) => (
              <React.Fragment key={index}>{str}</React.Fragment>
            ))}
          </p>
        </>
      ) : (
        ''
      )}
    </>
  )
})

export default Message
