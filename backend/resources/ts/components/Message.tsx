import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router'
import Modal from 'react-modal'
import {
  useAppDispatch,
  useChatMessageIds,
  useChatMessagesEntities,
  useFormatDate,
  useGroupsEntities,
  useGroupsIds,
  useModalStyle,
  useParamGroupId,
  useScrollToBottom,
  useUpdateMessages,
} from '../app/hooks'
import { deleteGroup, editGroup } from '../slices/GroupsSlice'

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
  }, [groupId])

  return (
    <>
      <EditGroupModal groupId={groupId} groupName={groupName} />
      <h2 className="h2">
        {groupsEntities[`group${groupId}`]
          ? groupsEntities[`group${groupId}`].name
          : ''}
      </h2>
      <div ref={messageList} className="message">
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

if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#app')
type EditGroupModalProps = {
  groupId: string
  groupName: string
}
const EditGroupModal = ({ groupId, groupName }: EditGroupModalProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isConfirm, setIsConfirm] = useState(false)
  const [newName, setNewName] = useState('')
  const dispatch = useAppDispatch()
  const modalStyle = useModalStyle()

  const openModal = () => {
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
    setIsConfirm(false)
  }

  useEffect(() => {
    setNewName(groupName)
  }, [groupName])

  const onChangeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value)
  }
  const editGroupHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newName !== undefined) {
      dispatch(editGroup({ groupId: groupId, groupName: newName }))
      closeModal()
    }
  }

  const deleteGroupConfirm = () => {
    setIsConfirm(true)
  }
  const deleteGroupHandler = () => {
    dispatch(deleteGroup({ groupId: groupId }))
    closeModal()
  }

  return (
    <>
      <button className="btn btn-primary" onClick={openModal}>
        グループを編集
      </button>
      <Modal isOpen={isOpen} onRequestClose={closeModal} style={modalStyle}>
        <h4>{groupName}</h4>
        {isConfirm ? (
          <div>
            <p>削除するともとには戻せません。削除してよろしいですか？</p>
            <button className="btn btn-danger" onClick={deleteGroupHandler}>
              グループを削除
            </button>
            <button className="btn btn-light" onClick={closeModal}>
              キャンセル
            </button>
          </div>
        ) : (
          <>
            <form onSubmit={editGroupHandler} className="form">
              <input
                data-testid="edit-group-name"
                className="form-controll"
                type="text"
                name="groupName"
                id="groupName"
                value={newName}
                onChange={onChangeNameHandler}
                autoFocus
              />
              <button className="btn btn-primary" type="submit">
                OK
              </button>
              <button className="btn btn-light" onClick={closeModal}>
                キャンセル
              </button>
            </form>
            <button className="btn btn-danger" onClick={deleteGroupConfirm}>
              グループを削除
            </button>
          </>
        )}
      </Modal>
    </>
  )
}
