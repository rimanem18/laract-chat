import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useAppDispatch, useEditGroupModal, useModalStyle } from '../app/hooks'
import { deleteGroup, editGroup } from '../slices/GroupsSlice'

if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#app')
type EditGroupModalProps = {
  groupId: string
  groupName: string
}
const EditGroupModal = ({ groupId, groupName }: EditGroupModalProps) => {
  const [
    { isOpen, isConfirm, newName },
    { openModal, closeModal, setNewName, openConfirm },
  ] = useEditGroupModal(groupName)
  const dispatch = useAppDispatch()
  const modalStyle = useModalStyle()

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

  const deleteGroupHandler = () => {
    dispatch(deleteGroup({ groupId: groupId }))
    closeModal()
  }

  return (
    <>
      <Button openModal={openModal} />
      <Modal isOpen={isOpen} onRequestClose={closeModal} style={modalStyle}>
        <h4 data-testid="modal-title">{groupName}</h4>
        {isConfirm ? (
          <>
            <p data-testid="confirm-message">
              削除するともとには戻せません。削除してよろしいですか？
            </p>
            <button className="btn btn-danger" onClick={deleteGroupHandler}>
              グループを削除
            </button>
            <button className="btn btn-light" onClick={closeModal}>
              キャンセル
            </button>
          </>
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
            <button className="btn btn-danger" onClick={openConfirm}>
              グループを削除
            </button>
          </>
        )}
      </Modal>
    </>
  )
}
export default React.memo(EditGroupModal)

/**
 * Components
 */
type ButtonProps = {
  openModal: () => void
}
const Button = React.memo(({ openModal }: ButtonProps) => {
  return (
    <button
      className="btn btn-primary"
      onClick={openModal}
      data-testid="edit-button"
    >
      グループを編集
    </button>
  )
})
