import React, { useMemo } from 'react'
import { Box } from '@mui/material'
import StringAvatar from './StringAvatar'
import { useUserState } from '../app/hooks'
import { Role } from '../slices/UserSlice'

const UserInfo = () => {
  const userState = useUserState()
  const existRole = userState.userRoleIds.length > 1 ? true : false
  let margin
  if (existRole) {
    margin = '0.5em'
  } else {
    margin = '0.8em'
  }

  const roles: RolesProps = useMemo(() => {
    return {
      ids: userState.userRoleIds,
      byId: userState.userRoleEntities,
    }
  }, [userState.userRoleIds, userState.userRoleEntities])

  return (
    <>
      <StringAvatar name={userState.userName}></StringAvatar>
      <Box margin={margin}>
        <Box>{userState.userName}</Box>
        <Roles ids={roles.ids} byId={roles.byId} />
      </Box>
    </>
  )
}
export default React.memo(UserInfo)

/**
 * Components
 */
type RolesProps = {
  ids: string[]
  byId: Record<string, Role>
}
const Roles = React.memo(({ ids, byId }: RolesProps) => {
  return (
    <>
      <Box className="role">
        {ids.map((id: string) => {
          const role = byId[id]
          let append = ''
          if (role.id === 3) {
            append = '--staff'
          } else if (role.id === 2) {
            append = '--admin'
          } else if (role.id === 1) {
            append = '--super-user'
          }

          return (
            <div key={id}>
              {append !== '' ? (
                <span className={`role__badge${append}`}>{role.name}</span>
              ) : null}
            </div>
          )
        })}
      </Box>
    </>
  )
})
