import React, { useCallback } from 'react'
import { TextField, Button, Dialog, DialogTitle } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CancelIcon from '@mui/icons-material/Cancel'

import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { useAppDispatch, useGroupModal, useModalStyle } from '../app/hooks'
import { addGroup } from '../slices/GroupsSlice'
import { toggleMenuOpen } from '../slices/MenuSlice'

const AddGroupModal = () => {
  const [
    { isOpen, isConfirm, newGroupName, isOver },
    { openModal, closeModal, openConfirm, closeConfirm, setNewGroupName },
  ] = useGroupModal('')
  const dispatch = useAppDispatch()
  const modalStyle = useModalStyle()

  const addGroupHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newGroupName !== undefined && isOver === false) {
      dispatch(addGroup({ groupName: newGroupName }))
      setNewGroupName('')
      closeModal()
    }
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
      <Dialog open={isOpen} onClose={closeModal}>
        <div className="modal">
          <DialogTitle className="modal__title" data-testid="modal-title">
            追加するグループの名前
          </DialogTitle>
          <button className="icon-btn--close" onClick={closeModal}>
            <CancelIcon />
          </button>
          <div className="modal__content">
            <form onSubmit={addGroupHandler} className="form">
              <TextField
                error={isOver}
                helperText={
                  isOver ? 'グループ名は15文字以下である必要があります。' : ''
                }
                margin="normal"
                data-testid="add-group"
                label="グループ名"
                variant="standard"
                type="text"
                name="groupName"
                id="groupName"
                value={newGroupName || ''}
                onChange={onChangeNameHandler}
                autoFocus
                fullWidth
                inputProps={{
                  'data-testid': 'add-group-name',
                }}
              />
              <Button type="submit" variant="contained">
                追加
              </Button>
              <Button color="secondary" onClick={closeModal}>
                キャンセル
              </Button>
            </form>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default React.memo(AddGroupModal)
