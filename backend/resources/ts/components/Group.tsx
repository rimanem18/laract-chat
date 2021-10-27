import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import {
  useAppDispatch,
  useGroupsEntities,
  useGroupsIds,
  useGroupsPromise,
} from '../app/hooks'
import { addGroup, fetchGroups, updateGroups } from '../slices/GroupsSlice'

if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#app')

const Group = () => {
  const dispatch = useAppDispatch()
  const groupIds = useGroupsIds()
  const groupsEntities = useGroupsEntities()
  const [groupName, setGroupName] = useState('')

  const addGroupHandler = useCallback(() => {
    dispatch(addGroup({ groupName: groupName }))
  }, [groupName])
  const onChangeNameHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setGroupName(e.target.value)
    },
    [groupName]
  )

  return (
    <>
      <ul className="group">
        {groupIds.map((id: string) => {
          return (
            <GroupItem
              key={id}
              id={groupsEntities[id].id.toString()}
              name={groupsEntities[id].name}
            />
          )
        })}
      </ul>
      <AddGroupModal
        addGroupHandler={addGroupHandler}
        onChangeNameHandler={onChangeNameHandler}
        value={groupName}
      />
    </>
  )
}
export default React.memo(Group)

/**
 * Components
 */
type GroupItemProps = {
  id: string
  name: string
}
const GroupItem = React.memo(({ id, name }: GroupItemProps) => {
  return (
    <>
      <li data-testid={`group${id}`}>
        <Link data-testid={`group${id}-link`} to={`/groups/${id}`}>
          {name}
        </Link>
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
    backgroundColor: '#f2f2f2',
    borderRadius: '1rem',
    padding: '1.5rem',
    width: '30em',
    height: '20em',
    top: '50%',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

type AddGroupModalProps = {
  addGroupHandler: () => void
  onChangeNameHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
}
const AddGroupModal = React.memo(
  ({ addGroupHandler, onChangeNameHandler, value }: AddGroupModalProps) => {
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
            value={value}
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
