import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  useAppDispatch,
  useGroupsEntities,
  useGroupsIds,
  useGroupsPromise,
} from '../app/hooks'
import { fetchGroups } from '../slices/GroupsSlice'

const Group = () => {
  const dispatch = useAppDispatch()
  const groupIds = useGroupsIds()
  const groupsEntities = useGroupsEntities()
  const groupsPromise = useGroupsPromise()

  useEffect(() => {
    dispatch(fetchGroups())
  }, [])

  return (
    <>
      {
        <ul className="group">
          {groupIds.map((id: string) => (
            <GroupItem
              key={id}
              id={groupsEntities[id].id.toString()}
              name={groupsEntities[id].name}
            />
          ))}
        </ul>
      }
    </>
  )
}

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

export default React.memo(Group)
