import React, { useEffect, useMemo, useRef } from 'react'
import { Box, Grid, IconButton } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import {
  useAppDispatch,
  useChatMessagesState,
  usePostState,
  useGroupsState,
  useParamGroupId,
  useScrollToBottom,
  useUserState,
  useAppSelector,
  useMessageName,
  useMessageContent,
  useMessageDatatime,
  useMessageGroupId,
  useMessageRoleColor,
} from '../app/hooks'
import { fetchMessages } from '../slices/ChatMessagesSlice'
import StringAvatar from './StringAvatar'
import EditGroupModal from './EditGroupModal'
import {
  messageContentSelector,
  messageDatetimeSelector,
  messageGroupIdSelector,
  messageNameSelector,
  messageRoleColorSelector,
} from '../selectors/ChatMessagesSelector'

const Message = () => <MessageListContainer />
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

// メッセージ一つ
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
              data-testid={`${id}-name`}
              sx={{
                color: roleColor,
                fontWeight: 'bold',
                display: 'block',
                fontSize: '80%',
              }}
            >
              {name}
            </Box>
            <Box
              data-testid={`${id}-datetime`}
              sx={{ display: 'block', fontSize: '80%' }}
            >
              {datetime}
            </Box>
          </Box>
        </Grid>
        <p data-testid={`${id}-content`}>
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

// メッセージ一覧
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
        <ScrollButton refObject={messageList} />
      </Box>
    </>
  )
}

/**
 * Container
 */
type MessageBlockContainerProps = {
  id: string
  paramGroupId: string
}
const MessageBlockContainer = ({
  id,
  paramGroupId,
}: MessageBlockContainerProps) => {
  const name = useMessageName(id)
  const content = useMessageContent(id)
  const datetime = useMessageDatatime(id)
  const roleColor = useMessageRoleColor(id)

  const groupId = useMessageGroupId(id)
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
