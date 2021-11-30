import { Box, List, ListItemButton, ListItemText } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  useAppDispatch,
  useGroupsState,
  useParamGroupId,
  useUserState,
} from '../app/hooks'
import { fetchGroups } from '../slices/GroupsSlice'
import { toggleMenuOpen } from '../slices/MenuSlice'
import AddGroupModal from './AddGroupModal'

const Group = () => {
  const activeGroupId = useParamGroupId()
  if (activeGroupId === undefined) {
    return null
  }

  const userState = useUserState()
  const roleIds = userState.userRoleNumberIds
  const dispatch = useAppDispatch()
  const groupState = useGroupsState()
  const history = useHistory()

  useEffect(() => {
    // ロールID一覧をもとにグループをフェッチ
    dispatch(fetchGroups({ roleIds: roleIds }))
  }, [roleIds.length])

  const goToById = useCallback((id) => {
    history.push(`/groups/${id}`)
    dispatch(toggleMenuOpen(false))
  }, [])

  return (
    <>
      <AddGroupModal roleIds={roleIds} />
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
        {groupState.groups.allIds.map((id: string) => {
          const groups = groupState.groups
          console.log(groups.byId[id])

          const isActive = id === activeGroupId

          return (
            <GroupItem
              key={id}
              id={groups.byId[id].id.toString()}
              name={groups.byId[id].name}
              goToById={goToById}
              isActive={isActive}
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
  goToById: (id: string) => void
  isActive: boolean
}
const GroupItem = React.memo(
  ({ id, name, goToById, isActive }: GroupItemProps) => {
    const goTo = () => {
      goToById(id)
    }

    return (
      <>
        <ListItemButton
          selected={isActive}
          onClick={goTo}
          data-testid={`group${id}`}
        >
          <ListItemText>
            <Box
              sx={{
                width: '13em',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {name}
            </Box>
          </ListItemText>
        </ListItemButton>
      </>
    )
  }
)
