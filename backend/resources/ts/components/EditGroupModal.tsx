import React, { useEffect } from 'react'
import Modal from 'react-modal'
import { useHistory } from 'react-router'
import { TextField, Button, InputAdornment } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CancelIcon from '@mui/icons-material/Cancel'
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
                  <TextField
                    data-testid="edit-group-name"
                    className="modal__input"
                    type="text"
                    name="groupName"
                    id="groupName"
                    value={newName}
                    onChange={onChangeNameHandler}
                    label="グループ名"
                    variant="standard"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <button className="icon-btn--check" type="submit">
                            <CheckIcon></CheckIcon>
                          </button>
                        </InputAdornment>
                      ),
                    }}
                    autoFocus
                  />
                  <Button
                    onClick={openConfirm}
                    sx={{ m: 1 }}
                    variant="contained"
                    color="error"
                  >
                    グループを削除
                  </Button>
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
    <button
      className="btn btn-primary"
      onClick={openModal}
      data-testid="edit-button"
    >
      グループを編集
    </button>
  )
})
