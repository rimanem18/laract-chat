import React, { useCallback } from 'react'
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
} from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'

import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { useAppDispatch, useGroupModal } from '../app/hooks'
import { addGroup } from '../slices/GroupsSlice'

type AddGroupModalProps = {
  roleIds: number[]
}
const AddGroupModal = ({ roleIds }: AddGroupModalProps) => {
  const [
    { isOpen, isConfirm, newGroupName, isOver },
    { openModal, closeModal, openConfirm, closeConfirm, setNewGroupName },
  ] = useGroupModal('')
  const dispatch = useAppDispatch()

  const addGroupHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newGroupName !== undefined && isOver === false) {
      dispatch(addGroup({ roleIds: roleIds, groupName: newGroupName }))
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
          <IconButton
            sx={{
              color: '#f2f2f2',
              position: 'absolute',
              top: '0.5em',
              right: '0.5em',
            }}
            onClick={closeModal}
          >
            <CancelIcon />
          </IconButton>
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
