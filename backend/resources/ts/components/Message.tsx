import React, { useEffect, useMemo, useRef, useState } from 'react'
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
  useRolesState,
  useAppSelector,
} from '../app/hooks'
import { fetchMessages } from '../slices/ChatMessagesSlice'
import StringAvatar from './StringAvatar'
import EditGroupModal from './EditGroupModal'
import {
  messageContentSelector,
  messageDatetimeSelector,
  messageGroupIdSelector,
  messageNameSelector,
  messageRolesSelector,
} from '../selectors/ChatMessagesSelector'

const Message = () => {
  return <MessageListContainer />

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

          // ロール情報を取得
          let role = rolesState.roles.byId[entity.roles[0]]

          if (role === undefined) {
            // ロールを持っていない場合は無難なデータを作って渡す
            role = {
              id: 0,
              name: '',
              color: '#333333',
            }
          }

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
  roleName?: string
  roleColor?: string
  content: string
  created_at: string
}
const MessageItem = React.memo(
  ({ name, roleColor, roleName, content, created_at }: MessageItemProps) => {
    const datetime = useFormatDate(created_at)

    return (
      <>
        <div className="message__item">
          <Grid container>
            <StringAvatar name={name}></StringAvatar>
            <Box sx={{ m: 1 }}>
              <Box
                sx={{
                  color: roleColor,
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

type MessageBlockProps = {
  id: string
  name: string
  content: string
  datetime: string
  roleColor: string
}
const MessageBlock = React.memo(
  ({ id, name, content, datetime, roleColor }: MessageBlockProps) => {
    return (
      <div className="message__item">
        <Grid container>
          <StringAvatar name={name}></StringAvatar>
          <Box sx={{ m: 1 }}>
            <Box
              sx={{
                color: roleColor,
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
    )
  }
)

type MessageBlockListProps = {
  messageIds: string[]
  groupId: string
  groupName: string
  roleIds: number[]
  messageList: React.MutableRefObject<HTMLDivElement | null>
  renderMessageBlock: (id: string) => React.ReactElement
}
const MessageBlockList = ({
  messageIds,
  messageList,
  groupId,
  groupName,
  roleIds,
  renderMessageBlock,
}: MessageBlockListProps) => {
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
        {messageIds.map(renderMessageBlock)}
      </Box>
    </>
  )
}

type MessageBlockContainerProps = {
  id: string
  paramGroupId: string
}
const MessageBlockContainer = ({
  id,
  paramGroupId,
}: MessageBlockContainerProps) => {
  const nameFactory = useAppSelector(messageNameSelector)
  const name = useMemo(() => {
    return nameFactory(id)
  }, [nameFactory, id])

  const contentFactory = useAppSelector(messageContentSelector)
  const content = useMemo(() => {
    return contentFactory(id)
  }, [contentFactory, id])

  const datetimeFactory = useAppSelector(messageDatetimeSelector)
  const datetime = useMemo(() => {
    return datetimeFactory(id)
  }, [datetimeFactory, id])

  const rolesState = useRolesState()
  const rolesFactory = useAppSelector(messageRolesSelector)
  const roleColor = useMemo(() => {
    const roleIds = rolesFactory(id)
    let role = rolesState.roles.byId[roleIds[0]]

    if (role === undefined) {
      // ロールを持っていない場合は無難なデータを作って渡す
      role = {
        id: 0,
        name: '',
        color: '#333333',
      }
    }

    return role.color
  }, [rolesFactory, id])

  const groupIdFactory = useAppSelector(messageGroupIdSelector)
  const groupId = useMemo(() => {
    return groupIdFactory(id)
  }, [groupIdFactory, id])

  // グループIDが一致しない場合は null
  if (Number(paramGroupId) !== groupId) return null
  return (
    <MessageBlock
      id={id}
      name={name}
      content={content}
      datetime={datetime}
      roleColor={roleColor}
    />
  )
}

const MessageListContainer = () => {
  const paramGroupId = useParamGroupId()
  if (paramGroupId === undefined) {
    return null
  }

  const { roleNumberIds: roleIds } = useUserState()
  const rolesState = useRolesState()
  const chatMessagesState = useChatMessagesState()
  const postState = usePostState()
  const messageList = useRef<HTMLDivElement | null>(null)
  const dispatch = useAppDispatch()

  const groupState = useGroupsState()
  const groupIds = groupState.groups.allNumberIds

  // 初回のみ一括でメッセージをフェッチ
  useEffect(() => {
    if (groupIds.length !== 0) {
      dispatch(fetchMessages({ groupIds: groupIds }))
    }
  }, [groupIds.length])

  // メッセージが更新されたらフェッチ
  useEffect(() => {
    if (
      [chatMessagesState.promise, postState.promise].every((v) => v === 'idle')
    ) {
      dispatch(fetchMessages({ groupIds: groupIds }))
    }
  }, [postState.promise, chatMessagesState.messages.allIds.length])

  useEffect(() => {
    useScrollToBottom(messageList)
  }, [messageList.current?.scrollHeight])

  const groupName =
    groupState.groups.byId !== undefined &&
    groupState.groups.byId[`group${paramGroupId}`] !== undefined
      ? groupState.groups.byId[`group${paramGroupId}`].name
      : ''

  const messageState = useChatMessagesState()
  const messageIds = messageState.messages.allIds

  return (
    <MessageBlockList
      messageIds={messageIds}
      messageList={messageList}
      groupId={paramGroupId}
      groupName={groupName}
      roleIds={roleIds}
      renderMessageBlock={(id) => (
        <MessageBlockContainer key={id} id={id} paramGroupId={paramGroupId} />
      )}
    />
  )
}
