import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import {
  useAppDispatch,
  useGroupsEntities,
  useGroupsIds,
  useGroupsPromise,
  useModalStyle,
  useParamGroupId,
} from '../app/hooks'
import { addGroup, fetchGroups, updateGroups } from '../slices/GroupsSlice'

if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#app')

const Group = () => {
  const dispatch = useAppDispatch()
  const groupIds = useGroupsIds()
  const groupsEntities = useGroupsEntities()

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
      <AddGroupModal />
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
  const activeGroupId = useParamGroupId()
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    setIsActive(activeGroupId === id ? true : false)
  }, [activeGroupId])

  return (
    <>
      <li data-testid={`group${id}`} className="group__item">
        <Link
          data-testid={`group${id}-link`}
          to={`/groups/${id}`}
          className={`group__link` + (isActive ? `--is-active` : ``)}
        >
          <span className="ml-2">{name}</span>
        </Link>
      </li>
    </>
  )
})

const AddGroupModal = React.memo(() => {
  const [isOpen, setIsOpen] = useState(false)
  const [groupName, setGroupName] = useState('')
  const dispatch = useAppDispatch()
  const modalStyle = useModalStyle()

  const addGroupHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(addGroup({ groupName: groupName }))
    setGroupName('')
    console.log('aadd')

    closeModal()
  }
  const onChangeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value)
  }

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
      <Modal isOpen={isOpen} onRequestClose={closeModal} style={modalStyle}>
        <h4>追加するグループの名前</h4>
        <form onSubmit={addGroupHandler} className="form">
          <input
            type="text"
            name="groupName"
            id="groupName"
            className="from-controll"
            value={groupName || ''}
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
})
