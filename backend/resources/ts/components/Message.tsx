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
  useUserState,
} from '../app/hooks'
import { fetchMessages } from '../slices/ChatMessagesSlice'
import StringAvatar from './StringAvatar'
import EditGroupModal from './EditGroupModal'

const Message = () => {
  const groupId = useParamGroupId()
  if (groupId === undefined) {
    return null
  }

  const { userRoleNumberIds: roleIds } = useUserState()
  const chatMessagesState = useChatMessagesState()
  const { postPromise } = usePostState()
  const messageList = useRef<HTMLDivElement | null>(null)
  const dispatch = useAppDispatch()

  const groupState = useGroupsState()
  const groupIds = [Number(groupId)]

  // 初回のみ一括でメッセージをフェッチ
  useEffect(() => {
    if (
      chatMessagesState.messages.allIds.length === 0 ||
      chatMessagesState.promise !== 'loading'
    ) {
      dispatch(fetchMessages({ groupIds: groupIds }))
    }
  }, [])

  // メッセージが更新されたらフェッチ
  useEffect(() => {
    if ([chatMessagesState.promise, postPromise].every((v) => v === 'idle')) {
      dispatch(fetchMessages({ groupIds: groupIds }))
    }
  }, [postPromise, chatMessagesState.messages.allIds.length])

  useEffect(() => {
    useScrollToBottom(messageList)
  }, [messageList.current?.scrollHeight])

  const groupName =
    groupState.groups.byId !== undefined &&
    groupState.groups.byId[`group${groupId}`] !== undefined
      ? groupState.groups.byId[`group${groupId}`].name
      : ''

  return (
    <>
      <GroupName
        id={groupId ? groupId : ''}
        name={groupName}
        roleIds={roleIds}
      />
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
        {chatMessagesState.messages.allIds.map((id: string) => {
          const entity = chatMessagesState.messages.byId[id]
          const role = chatMessagesState.roles.byId[entity.roles[0]]
          const role_color = role.color
          // 2個以上の改行を2個改行におさめる
          const content = entity.content.replace(/\n{2,}/g, '\n\n')

          // グループID が一致しているものだけ出力する
          if (Number(groupId) === entity.group_id) {
            return (
              <MessageItem
                key={id}
                name={entity.name}
                roleColor={role.color}
                roleName={role.name}
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
  roleIds: number[]
}
const GroupName = React.memo(({ id, name, roleIds }: GroupNameProps) => {
  return (
    <h2 className="h2">
      {name}
      <EditGroupModal groupId={id} groupName={name} roleIds={roleIds} />
    </h2>
  )
})

type MessageItemProps = {
  name: string
  roleName: string
  roleColor: string
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
