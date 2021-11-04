import React from 'react'
import Modal from 'react-modal'
import { useAppDispatch, useGroupModal, useModalStyle } from '../app/hooks'
import { addGroup } from '../slices/GroupsSlice'

if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#app')

const AddGroupModal = () => {
  const [
    { isOpen, isConfirm, newGroupName },
    { openModal, closeModal, openConfirm, closeConfirm, setNewGroupName },
  ] = useGroupModal('')
  const dispatch = useAppDispatch()
  const modalStyle = useModalStyle()

  const addGroupHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(addGroup({ groupName: newGroupName }))
    setNewGroupName('')

    closeModal()
  }
  const onChangeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewGroupName(e.target.value)
  }

  return (
    <>
      <button className="btn btn-primary" onClick={openModal}>
        新しいグループを追加
      </button>
      <Modal isOpen={isOpen} onRequestClose={closeModal} style={modalStyle}>
        <h4>追加するグループの名前</h4>
        <form onSubmit={addGroupHandler} className="form">
          <input
            type="text"
            name="groupName"
            id="groupName"
            className="from-controll"
            value={newGroupName || ''}
            onChange={onChangeNameHandler}
            autoFocus
          />
          <button className="btn btn-primary" type="submit">
            追加
          </button>
          <button className="btn btn-light" onClick={closeModal}>
            キャンセル
          </button>
        </form>
      </Modal>
    </>
  )
}

export default React.memo(AddGroupModal)
