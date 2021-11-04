import React from 'react'
import Modal from 'react-modal'
import { TextField, Button, InputAdornment } from '@mui/material'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
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
      <Button
        variant="contained"
        startIcon={<ControlPointIcon />}
        onClick={openModal}
      >
        新しいグループを追加
      </Button>
      <Modal isOpen={isOpen} onRequestClose={closeModal} style={modalStyle}>
        <h4>追加するグループの名前</h4>
        <form onSubmit={addGroupHandler} className="form">
          <TextField
            label="グループ名"
            variant="standard"
            type="text"
            name="groupName"
            id="groupName"
            value={newGroupName || ''}
            onChange={onChangeNameHandler}
            autoFocus
          />
          <Button type="submit">追加</Button>
          <Button color="secondary" onClick={closeModal}>
            キャンセル
          </Button>
        </form>
      </Modal>
    </>
  )
}

export default React.memo(AddGroupModal)
