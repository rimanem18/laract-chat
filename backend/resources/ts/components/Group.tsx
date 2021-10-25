import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import { useAppDispatch, useGroupsEntities, useGroupsIds } from '../app/hooks'
import { addGroup, fetchGroups } from '../slices/GroupsSlice'

Modal.setAppElement('#app')

const Group = () => {
  const dispatch = useAppDispatch()
  const groupIds = useGroupsIds()
  const groupsEntities = useGroupsEntities()
  const [groupName, setGroupName] = useState('')

  useEffect(() => {
    dispatch(fetchGroups())
  }, [])
  const addGroupHandler = () => {
    dispatch(addGroup({ groupName: groupName }))
  }
  const onChangeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value)
  }

  return (
    <>
      <ul className="group">
        {groupIds.map((id: string) => (
          <GroupItem
            key={id}
            id={groupsEntities[id].id.toString()}
            name={groupsEntities[id].name}
          />
        ))}
      </ul>
      <AddGroupModal
        addGroupHandler={addGroupHandler}
        onChangeNameHandler={onChangeNameHandler}
      />
    </>
  )
}
export default React.memo(Group)

type GroupItemProps = {
  id: string
  name: string
}
const GroupItem = React.memo(({ id, name }: GroupItemProps) => {
  return (
    <>
      <li>
        <Link to={`/groups/${id}`}>{name}</Link>
      </li>
    </>
  )
})

const modalStyle = {
  overlay: {
    // position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  content: {
    // position: 'absolute',
    top: '25%',
    left: '25%',
    right: '25%',
    bottom: '25%',
    backgroundColor: '#f2f2f2',
    borderRadius: '1rem',
    padding: '1.5rem',
    width: '30em',
    height: '20em',
  },
}

type AddGroupModalProps = {
  addGroupHandler: () => void
  onChangeNameHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const AddGroupModal = React.memo(
  ({ addGroupHandler, onChangeNameHandler }: AddGroupModalProps) => {
    const [modalisOpen, setIsOpen] = useState(false)

    const openModal = () => {
      setIsOpen(true)
    }
    const closeModal = () => {
      setIsOpen(false)
    }

    return (
      <>
        <button className="btn btn-primary" onClick={openModal}>
          新しいグループを追加
        </button>
        <Modal
          isOpen={modalisOpen}
          onRequestClose={closeModal}
          style={modalStyle}
        >
          <h4>追加するグループの名前</h4>
          <input
            type="text"
            name="groupName"
            id="groupName"
            onChange={onChangeNameHandler}
            autoFocus
          />
          <button className="btn btn-primary" onClick={addGroupHandler}>
            追加
          </button>
          <button className="btn btn-light" onClick={closeModal}>
            戻る
          </button>
        </Modal>
      </>
    )
  }
)
