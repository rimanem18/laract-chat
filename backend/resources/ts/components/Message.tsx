import React, { useEffect, useMemo, useRef } from 'react'
import { useParams } from 'react-router'
import {
  useChatMessageIds,
  useChatMessagesEntities,
  useFormatDate,
  useGroupsEntities,
  useGroupsIds,
  useScrollToBottom,
  useUpdateMessages,
} from '../app/hooks'

const Message = () => {
  const chatMessagesIds = useChatMessageIds()
  const chatMessagesEntities = useChatMessagesEntities()
  const messageList = useRef<HTMLDivElement | null>(null)
  const { groupId } = useParams<{ groupId?: string }>()

  const groupIds = useGroupsIds()
  const groupsEntities = useGroupsEntities()

  if (groupId === undefined) {
    return (
      <div>
        <p>メッセージの取得に失敗しました。</p>
      </div>
    )
  }
  useUpdateMessages()
  useEffect(() => {
    console.log('Auto Scroll')

    useScrollToBottom(messageList)
  }, [messageList.current?.scrollHeight])

  const groupName =
    groupIds.length !== 0 ? groupsEntities[`group${groupId}`].name : undefined
  console.log('Messages')

  return (
    <>
      <h2 className="h2">{groupName !== undefined ? groupName : ''}</h2>
      <div ref={messageList} className="message">
        {chatMessagesIds.map((id: string) =>
          Number(groupId) === chatMessagesEntities[id].group_id ? (
            <MessageItem
              key={id}
              name={chatMessagesEntities[id].name}
              content={chatMessagesEntities[id].content}
              created_at={chatMessagesEntities[id].created_at}
            />
          ) : (
            ''
          )
        )}
        <ScrollButton refObject={messageList} />
      </div>
    </>
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
}
const MessageItem = React.memo(
  ({ name, content, created_at }: MessageItemProps) => {
    // console.log('messageItem')

    // 2個以上の改行を2個改行におさめる
    content = content.replace(/\n{2,}/g, '\n\n')
    const datetime = useFormatDate(created_at)

    return (
      <>
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
      </>
    )
  }
)

type ScrollButtonProps = {
  refObject: React.MutableRefObject<HTMLElement | null>
}
const ScrollButton = React.memo(({ refObject }: ScrollButtonProps) => {
  const useScrollHandler = () => useScrollToBottom(refObject)

  return (
    <div className="scroll-btn">
      <a
        className="scroll-btn__item"
        onClick={useScrollHandler}
        data-testid="scroll-btn"
      >
        <i className="fa fa-arrow  fa-arrow-circle-down fa-4x"></i>
      </a>
    </div>
  )
})
