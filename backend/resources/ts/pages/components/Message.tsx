import React, { useCallback, useEffect, useRef } from 'react'
import {
  fetchMessages,
  selectChatMessagesIds,
  selectChatMessagesEntities,
  selectChatMessagesPromise,
  addMessages,
} from '../../features/ChatMessagesSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectPostContent, selectPostPromise } from '../../features/PostSlise'

const typeCheck = Object.prototype.toString

const Message = () => {
  const dispatch = useAppDispatch()
  const chatMessagesIds = useAppSelector(selectChatMessagesIds)
  const chatMessagesEntities = useAppSelector(selectChatMessagesEntities)
  const chatMessagesPromise = useAppSelector(selectChatMessagesPromise)
  const postContent = useAppSelector(selectPostContent)
  const postPromise = useAppSelector(selectPostPromise)
  const messageList = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // メッセージが何もフェッチされていないときだけ
    if (chatMessagesIds.length === 0 || chatMessagesPromise !== 'loading') {
      dispatch(fetchMessages())
    }
  }, [])

  useEffect(() => {
    if (postPromise === 'idle') {
      dispatch(addMessages())
      scrollToBottom()
      console.log('render')
    }
  }, [postPromise])

  useEffect(() => {
    if (chatMessagesPromise !== 'loading') {
      scrollToBottom()
    }
  }, [chatMessagesPromise])

  /**
   * メッセージ一覧を最下部にスクロールさせる
   */
  const scrollToBottom = useCallback(() => {
    const el = messageList.current
    if (el !== null) {
      console.log('Scroll')
      el.scrollTo(0, el.scrollHeight)
    }
  }, [messageList])

  // ゼロ埋め
  const zeroPadding = useCallback((num: number, len: number) => {
    return (Array(len).join('0') + num).slice(-len)
  }, [])

  return (
    <div ref={messageList} className="message">
      {chatMessagesIds.map((id) => (
        <MessageItem
          key={id}
          name={chatMessagesEntities[id].name}
          content={chatMessagesEntities[id].content}
          created_at={chatMessagesEntities[id].created_at}
          zeroPadding={zeroPadding}
        />
      ))}
      <ScrollButton scrollHandler={scrollToBottom} />
    </div>
  )
}

export default React.memo(Message)

/**
 * Components
 */
type MessageItemProps = {
  name: string
  content: string
  created_at: string
  zeroPadding: (num: number, len: number) => string
}
const MessageItem = React.memo(
  ({ name, content, created_at, zeroPadding }: MessageItemProps) => {
    console.log('messageItem')

    // 日付フォーマット
    const date = new Date(created_at)
    const year = date.getFullYear()
    const month = zeroPadding(date.getMonth() + 1, 2)
    const day = zeroPadding(date.getDate(), 2)
    const hour = zeroPadding(date.getHours(), 2)
    const min = zeroPadding(date.getMinutes(), 2)
    const datetime = `${year}/${month}/${day} ${hour}:${min}`

    // 2個以上の改行を2個改行におさめる
    content = content.replace(/\n{2,}/g, '\n\n')

    return (
      <div className="message__item">
        <div>
          <strong className="mr-1">{name}</strong>
          <small>{datetime}</small>
        </div>
        <p>
          {content.split('\n').map((str, index) => (
            <React.Fragment key={index}>
              {str}
              <br />
            </React.Fragment>
          ))}
        </p>
      </div>
    )
  }
)

type ScrollButtonProps = {
  scrollHandler: () => void
}
const ScrollButton = React.memo(({ scrollHandler }: ScrollButtonProps) => {
  return (
    <div className="scroll-btn">
      <a className="scroll-btn__item" onClick={scrollHandler}>
        <i className="fa fa-arrow  fa-arrow-circle-down fa-4x"></i>
      </a>
    </div>
  )
})
