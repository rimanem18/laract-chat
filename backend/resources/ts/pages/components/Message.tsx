import React, { useEffect, useMemo, useRef, useState } from 'react'
import axios from 'axios'

import {
  ChatMessage,
  fetchMessages,
  selectChatMessagesIds,
  selectChatMessagesEntities,
  selectChatMessagesPromise,
  addMessages,
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
    // メッセージが何もフェッチされていないときだけ
    if (chatMessagesIds.length === 0 || chatMessagesPromise !== 'loading') {
      dispatch(fetchMessages())
    }
  }, [])

  useEffect(() => {
    if (postPromise !== 'loading') {
      dispatch(addMessages())
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
      {chatMessagesIds.map((id) => (
        <MessageItem
          key={id}
          name={chatMessagesEntities[id].name}
          content={chatMessagesEntities[id].content}
          created_at={chatMessagesEntities[id].created_at}
        />
      ))}
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
    const date = new Date(created_at)
    const year = date.getFullYear()
    const month = date.getMonth() - 1
    const day = date.getDate()
    const hour = date.getHours()
    const min = date.getMinutes()
    return (
      <div className="message__item">
        <div>
          <strong className="mr-1">{name}</strong>
          <small>
            {year}/{month}/{day} {hour}:{min}
          </small>
        </div>
        <p>
          {content.split('\n').map((str, index) => (
            <React.Fragment key={index}>{str}</React.Fragment>
          ))}
        </p>
      </div>
    )
  }
)

export default React.memo(Message)
