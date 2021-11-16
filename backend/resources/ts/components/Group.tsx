import { List, ListItemButton, ListItemText } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  useAppDispatch,
  useGroupsEntities,
  useGroupsIds,
  useMenuIsOpen,
  useParamGroupId,
} from '../app/hooks'
import { toggleMenuOpen } from '../slices/MenuSlice'
import AddGroupModal from './AddGroupModal'

const Group = () => {
  const dispatch = useAppDispatch()
  const groupIds = useGroupsIds()
  const groupsEntities = useGroupsEntities()

  return (
    <>
      <AddGroupModal />
      <List
        sx={{
          '&::-webkit-scrollbar': {
            width: 2,
            borderRadius: 5,
          },
          '&::-webkit-scrollbar-track': {
            boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            outline: `1px solid rgba(0, 0, 0, 0.3)`,
          },

          height: '65vh',
          overflowY: 'scroll',
          overflow: 'none',
        }}
      >
        {groupIds.map((id: string) => {
          return (
            <GroupItem
              key={id}
              id={groupsEntities[id].id.toString()}
              name={groupsEntities[id].name}
            />
          )
        })}
      </List>
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
  const history = useHistory()
  const [isActive, setIsActive] = useState(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setIsActive(activeGroupId === id ? true : false)
  }, [activeGroupId])

  const goTo = () => {
    history.push(`/groups/${id}`)
    dispatch(toggleMenuOpen(false))
  }

  return (
    <>
      <ListItemButton
        selected={isActive}
        onClick={goTo}
        key={id}
        data-testid={`group${id}`}
      >
        <ListItemText primary={name}></ListItemText>
      </ListItemButton>
    </>
  )
})
