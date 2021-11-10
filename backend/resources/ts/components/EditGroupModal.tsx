import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useHistory } from 'react-router'
import { TextField, Button, InputAdornment, IconButton } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CancelIcon from '@mui/icons-material/Cancel'
import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import {
  useAppDispatch,
  useDefaultGroupPath,
  useGroupModal,
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
    { isOpen, isConfirm, isOver, newGroupName },

    { openModal, closeModal, openConfirm, closeConfirm, setNewGroupName },
  ] = useGroupModal(groupName)
  const dispatch = useAppDispatch()
  const modalStyle = useModalStyle()
  const history = useHistory()
  const defaultGroupPath = useDefaultGroupPath()

  useEffect(() => {
    setNewGroupName(groupName)
  }, [groupName])

  const onChangeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewGroupName(e.target.value)
  }
  const editGroupHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newGroupName !== undefined && isOver === false) {
      dispatch(editGroup({ groupId: groupId, groupName: newGroupName }))
      closeModal()
    }
  }

  const deleteGroupHandler = () => {
    dispatch(deleteGroup({ groupId: groupId, closeModal: closeModal }))
    history.push(defaultGroupPath)
  }

  return (
    <>
      <OpenButton openModal={openModal} />
      <Modal isOpen={isOpen} onRequestClose={closeModal} style={modalStyle}>
        <div className="modal">
          <h4 className="modal__title" data-testid="modal-title">
            {groupName}
          </h4>
          <button className="icon-btn--close" onClick={closeModal}>
            <CancelIcon />
          </button>
          <div className="modal__content">
            {isConfirm ? (
              <>
                <p data-testid="confirm-message">
                  削除するともとには戻せません。削除してよろしいですか？
                </p>
                <Button
                  onClick={deleteGroupHandler}
                  sx={{ m: 1 }}
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                >
                  グループを削除
                </Button>
                <Button onClick={closeConfirm}>キャンセル</Button>
              </>
            ) : (
              <>
                <form onSubmit={editGroupHandler} className="form">
                  <TextField
                    error={isOver}
                    helperText={
                      isOver
                        ? 'グループ名は15文字以下である必要があります。'
                        : ''
                    }
                    margin="normal"
                    className="modal__input"
                    type="text"
                    name="groupName"
                    id="groupName"
                    onChange={onChangeNameHandler}
                    label="グループ名"
                    variant="standard"
                    fullWidth
                    value={newGroupName || ''}
                    autoFocus
                    inputProps={{
                      'data-testid': 'edit-group-name',
                    }}
                  />
                  <div className="modal__footer">
                    <Button
                      onClick={openConfirm}
                      sx={{ m: 1 }}
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                    >
                      グループを削除
                    </Button>
                  </div>
                </form>
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
type OpenButtonProps = {
  openModal: () => void
}
const OpenButton = React.memo(({ openModal }: OpenButtonProps) => {
  return (
    <IconButton onClick={openModal} data-testid="edit-button">
      <ModeEditIcon />
    </IconButton>
  )
})
