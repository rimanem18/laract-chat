import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  ButtonGroup,
} from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import { useAppDispatch, useGroupModal, useGroupsState } from '../app/hooks'
import { deleteGroup, editGroup } from '../slices/GroupsSlice'

type EditGroupModalProps = {
  groupId: string
  groupName: string
  roleIds: number[]
}
const EditGroupModal = ({
  groupId,
  groupName,
  roleIds,
}: EditGroupModalProps) => {
  const [
    { isOpen, isConfirm, isOver, newGroupName },

    { openModal, closeModal, openConfirm, closeConfirm, setNewGroupName },
  ] = useGroupModal(groupName)
  const dispatch = useAppDispatch()
  const history = useHistory()
  const { defaultPath } = useGroupsState()

  useEffect(() => {
    setNewGroupName(groupName)
  }, [groupName])

  const onChangeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewGroupName(e.target.value)
  }
  const editGroupHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newGroupName !== undefined && isOver === false) {
      dispatch(
        editGroup({
          groupId: groupId,
          groupName: newGroupName,
          roleIds: roleIds,
        })
      )
      closeModal()
    }
  }

  const deleteGroupHandler = () => {
    dispatch(
      deleteGroup({
        groupId: groupId,
        roleIds: roleIds,
      })
    )
    closeModal()
    history.push(defaultPath)
  }

  return (
    <>
      <OpenButton openModal={openModal} />
      <Dialog open={isOpen} onClose={closeModal}>
        <div className="modal">
          <DialogTitle className="modal__title" data-testid="modal-title">
            {groupName}
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
            {isConfirm ? (
              <>
                <p data-testid="confirm-message">
                  ?????????????????????????????????????????????????????????????????????????????????
                </p>
                <Button
                  onClick={deleteGroupHandler}
                  sx={{ m: 1 }}
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                >
                  ?????????????????????
                </Button>
                <Button onClick={closeConfirm}>???????????????</Button>
              </>
            ) : (
              <>
                <form onSubmit={editGroupHandler} className="form">
                  <TextField
                    error={isOver}
                    helperText={
                      isOver
                        ? '??????????????????15?????????????????????????????????????????????'
                        : ''
                    }
                    margin="normal"
                    className="modal__input"
                    type="text"
                    name="groupName"
                    id="groupName"
                    onChange={onChangeNameHandler}
                    label="???????????????"
                    variant="standard"
                    fullWidth
                    value={newGroupName || ''}
                    autoFocus
                    inputProps={{
                      'data-testid': 'edit-group-name',
                    }}
                  />
                  <Button type="submit" variant="contained">
                    OK
                  </Button>
                  <Button color="secondary" onClick={closeModal}>
                    ???????????????
                  </Button>
                </form>
                <Button
                  onClick={openConfirm}
                  sx={{ m: 1 }}
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                >
                  ?????????????????????
                </Button>
              </>
            )}
          </div>
        </div>
      </Dialog>
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
