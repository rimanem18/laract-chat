import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  useAppDispatch,
  useGroupsEntities,
  useGroupsIds,
  useParamGroupId,
} from '../app/hooks'
import AddGroupModal from './AddGroupModal'

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
