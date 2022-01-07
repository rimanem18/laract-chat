import { Box, List, ListItemButton, ListItemText } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  useAppDispatch,
  useAppSelector,
  useGroupName,
  useGroupPath,
  useGroupsState,
  useParamGroupId,
  useUserState,
} from '../app/hooks'
import {
  groupNameSelector,
  groupPathSelector,
} from '../selectors/GroupsSelector'
import { fetchGroups } from '../slices/GroupsSlice'
import { toggleMenuOpen } from '../slices/MenuSlice'
import AddGroupModal from './AddGroupModal'

const Group = () => {
  return <GroupBlockListContainer />
}
export default React.memo(Group)

/**
 * Components
 */

// グループひとつ
type GroupBlockProps = {
  id: string
  name: string
  isActive: boolean
  goTo: () => void
}
const GroupBlock = React.memo(
  ({ id, name, isActive, goTo }: GroupBlockProps) => {
    return (
      <>
        <ListItemButton onClick={goTo} selected={isActive}>
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

// グループ一覧
type GroupBlockListProps = {
  groupIds: string[]
  roleIds: number[]
  renderGroupBlock: (id: string) => React.ReactElement
}
const GroupBlockList = ({
  groupIds,
  roleIds,
  renderGroupBlock,
}: GroupBlockListProps) => {
  return (
    <>
      <AddGroupModal roleIds={roleIds} />
      {groupIds.map(renderGroupBlock)}
    </>
  )
}

/**
 * Container
 */
type GroupBlockContainerProps = {
  id: string
  paramGroupId: string
  goToByPath: (path: string) => void
}
const GroupBlockContainer = ({
  id,
  paramGroupId,
  goToByPath,
}: GroupBlockContainerProps) => {
  // 開いている URL とグループID が一致していればアクティブ
  const isActive = id === `group${paramGroupId}`

  // グループ名とpathを生成
  const name = useGroupName(id)
  const path = useGroupPath(id)

  // 遷移関数作成
  const goTo = useCallback(() => {
    goToByPath(path)
  }, [path])

  return <GroupBlock id={id} name={name} isActive={isActive} goTo={goTo} />
}

const GroupBlockListContainer = () => {
  const paramGroupId = useParamGroupId()
  if (paramGroupId === undefined) {
    return null
  }

  const userState = useUserState()
  const roleIds = userState.roleNumberIds
  const dispatch = useAppDispatch()
  const groupState = useGroupsState()

  const groupIds = groupState.groups.allIds

  useEffect(() => {
    // ロールID一覧をもとにグループをフェッチ
    dispatch(fetchGroups({ roleIds: roleIds }))
  }, [roleIds.length])

  const history = useHistory()
  const goToByPath = useCallback(
    (path) => {
      dispatch(toggleMenuOpen(false))
      history.push(path)
    },
    [history]
  )

  return (
    <GroupBlockList
      groupIds={groupIds}
      roleIds={roleIds}
      renderGroupBlock={(id) => (
        <GroupBlockContainer
          key={id}
          id={id}
          paramGroupId={paramGroupId}
          goToByPath={goToByPath}
        />
      )}
    />
  )
}
