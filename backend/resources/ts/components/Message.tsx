import React, { useEffect, useRef, useState } from 'react'
import { Box, Grid, IconButton } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import {
  useAppDispatch,
  useChatMessagesState,
  useFormatDate,
  usePostState,
  useGroupsState,
  useParamGroupId,
  useScrollToBottom,
} from '../app/hooks'
import { fetchMessages, updateMessages } from '../slices/ChatMessagesSlice'
import StringAvatar from './StringAvatar'
import EditGroupModal from './EditGroupModal'

const Message = () => {
  const { chatMessageIds, chatMessagesEntities, chatMessagesPromise } =
    useChatMessagesState()
  const { postPromise } = usePostState()
  const messageList = useRef<HTMLDivElement | null>(null)
  const groupId = useParamGroupId()
  const dispatch = useAppDispatch()

  const { groupsEntities } = useGroupsState()

  // 初回のみ一括でメッセージをフェッチ
  useEffect(() => {
    if (chatMessageIds.length === 0 || chatMessagesPromise !== 'loading') {
      dispatch(fetchMessages())
    }
  }, [])
  // メッセージが更新されたらフェッチ
  useEffect(() => {
    if ([chatMessagesPromise, postPromise].every((v) => v === 'idle')) {
      // dispatch(updateMessages())
    }
  }, [postPromise, chatMessageIds.length])

  useEffect(() => {
    useScrollToBottom(messageList)
  }, [messageList.current?.scrollHeight])

  const groupName =
    groupsEntities !== undefined &&
    groupsEntities[`group${groupId}`] !== undefined
      ? groupsEntities[`group${groupId}`].name
      : ''

  return (
    <>
      <GroupName id={groupId ? groupId : ''} name={groupName} />
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
        {chatMessageIds.map((id: string) => {
          const entity = chatMessagesEntities[id]
          // 2個以上の改行を2個改行におさめる
          const content = entity.content.replace(/\n{2,}/g, '\n\n')

          // グループID が一致しているものだけ出力する
          if (Number(groupId) === entity.group_id) {
            return (
              <MessageItem
                key={id}
                name={entity.name}
                role_color={entity.role_color}
                role_name={entity.role_name}
                content={content}
                created_at={entity.created_at}
              />
            )
          }
        })}
        <ScrollButton refObject={messageList} />
      </Box>
    </>
  )
}

export default React.memo(Message)

/**
 * Components
 */

type GroupNameProps = {
  id: string
  name: string
}
const GroupName = React.memo(({ id, name }: GroupNameProps) => {
  return (
    <h2 className="h2">
      {name}
      <EditGroupModal groupId={id} groupName={name} />
    </h2>
  )
})

type MessageItemProps = {
  name: string
  role_name: string
  role_color: string
  content: string
  created_at: string
}
const MessageItem = React.memo(
  ({ name, role_color, role_name, content, created_at }: MessageItemProps) => {
    const datetime = useFormatDate(created_at)

    return (
      <>
        <div className="message__item">
          <Grid container>
            <StringAvatar name={name}></StringAvatar>
            <Box sx={{ m: 1 }}>
              <Box
                sx={{
                  color: role_color,
                  fontWeight: 'bold',
                  display: 'block',
                  fontSize: '80%',
                }}
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
      <IconButton
        data-testid="scroll-btn"
        onClick={useScrollHandler}
        size="large"
      >
        <KeyboardArrowDownIcon fontSize="large" />
      </IconButton>
    </div>
  )
})
