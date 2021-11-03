import React, { useEffect } from 'react'
import Modal from 'react-modal'
import { useHistory } from 'react-router'
import {
  useAppDispatch,
  useDefaultGroupPath,
  useEditGroupModal,
  useModalStyle,
} from '../app/hooks'
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
  const history = useHistory()
  const defaultGroupPath = useDefaultGroupPath()

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
    dispatch(deleteGroup({ groupId: groupId, closeModal: closeModal }))
    history.push(defaultGroupPath)
  }

  return (
    <>
      <Button openModal={openModal} />
      <Modal isOpen={isOpen} onRequestClose={closeModal} style={modalStyle}>
        <div className="modal">
          <h4 className="modal__title" data-testid="modal-title">
            {groupName}
          </h4>
          <button className="icon-btn">
            <i className="fa fa-close"></i>
          </button>
          <div className="modal__content">
            {isConfirm ? (
              <>
                <p data-testid="confirm-message">
                  削除するともとには戻せません。削除してよろしいですか？
                </p>
                <button className="btn--red" onClick={deleteGroupHandler}>
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
                    className="input"
                    type="text"
                    name="groupName"
                    id="groupName"
                    value={newName}
                    onChange={onChangeNameHandler}
                    autoFocus
                  />
                  <button className="icon-btn" type="submit">
                    <i className="fa fa-check fa-4x"></i>
                  </button>
                  <button className="btn" onClick={closeModal}>
                    キャンセル
                  </button>
                </form>
                <button className="btn--red" onClick={openConfirm}>
                  グループを削除
                </button>
              </>
            )}
          </div>
        </div>
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
