import React, { useMemo } from 'react'
import { Box } from '@mui/material'
import StringAvatar from './StringAvatar'
import { useUserState } from '../app/hooks'
import { Role } from '../slices/UserSlice'

const UserInfo = () => {
  const { userName, userRoleIds, userRoleEntities } = useUserState()
  const existRole = userRoleIds.length > 1 ? true : false
  let margin
  if (existRole) {
    margin = '0.5em'
  } else {
    margin = '0.8em'
  }

  const roles: RolesProps = useMemo(() => {
    return {
      ids: userRoleIds,
      entities: userRoleEntities,
    }
  }, [userRoleIds, userRoleEntities])

  return (
    <>
      <StringAvatar name={userName}></StringAvatar>
      <Box margin={margin}>
        <Box>{userName}</Box>
        <Roles ids={roles.ids} entities={roles.entities} />
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
  entities: Record<string, Role>
}
const Roles = React.memo(({ ids, entities }: RolesProps) => {
  return (
    <>
      <Box className="role">
        {ids.map((id: string) => {
          const role = entities[id]
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
