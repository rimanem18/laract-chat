import React, { useEffect, useRef, useState } from 'react'
import { Box, Grid } from '@mui/material'
import {
  useChatMessageIds,
  useChatMessagesEntities,
  useFormatDate,
  useGroupsEntities,
  useParamGroupId,
  useScrollToBottom,
  useUpdateMessages,
} from '../app/hooks'
import StringAvatar from './StringAvatar'
import EditGroupModal from './EditGroupModal'

const Message = () => {
  const chatMessagesIds = useChatMessageIds()
  const chatMessagesEntities = useChatMessagesEntities()
  const messageList = useRef<HTMLDivElement | null>(null)
  const groupId = useParamGroupId()

  const [groupName, setGroupName] = useState('')

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
    useScrollToBottom(messageList)
  }, [messageList.current?.scrollHeight])

  useEffect(() => {
    setGroupName(groupsEntities[`group${groupId}`].name)
  }, [groupId, groupsEntities[`group${groupId}`].name])

  return (
    <>
      <h2 className="h2">
        {groupsEntities[`group${groupId}`]
          ? groupsEntities[`group${groupId}`].name
          : ''}
        <EditGroupModal groupId={groupId} groupName={groupName} />
      </h2>
      <Box
        sx={{
          '&::-webkit-scrollbar': {
            width: 2,
            borderRadius: 5,
          },
          '&::-webkit-scrollbar-track': {
            boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            outline: `1px solid rgba(0, 0, 0, 0.3)`,
          },

          height: '70vh',
          overflowY: 'scroll',
          overflow: 'none',
        }}
        ref={messageList}
      >
        <p className="message__note">ここが「{groupName}」の先頭です。</p>
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
      </Box>
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
    // 2個以上の改行を2個改行におさめる
    content = content.replace(/\n{2,}/g, '\n\n')
    const datetime = useFormatDate(created_at)

    return (
      <>
        <div className="message__item">
          <Grid container>
            <StringAvatar name={name}></StringAvatar>
            <Box sx={{ m: 1 }}>
              <Box
                sx={{ fontWeight: 'bold', display: 'block', fontSize: '80%' }}
              >
                {name}
              </Box>
              <Box sx={{ display: 'block', fontSize: '80%' }}>{datetime}</Box>
            </Box>
          </Grid>
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
