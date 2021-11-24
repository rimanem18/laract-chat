import React from 'react'
import { Box } from '@mui/material'
import StringAvatar from './StringAvatar'
import { useUserState } from '../app/hooks'

const UserInfo = () => {
  const { userName, userRoleIds, userRoleEntities } = useUserState()

  return (
    <>
      <StringAvatar name={userName}></StringAvatar>
      <Box>
        <p>{userName}</p>
        <p className="role">
          {userRoleIds.map((id: string) => {
            const role = userRoleEntities[id]
            let append = ''
            if (role.id === 3) {
              append = '--staff'
            } else if (role.id === 2) {
              append = '--admin'
            } else if (role.id === 1) {
              append = '--super-user'
            }

            return (
              <span key={id} className={`role__badge${append}`}>
                {role.name}
              </span>
            )
          })}
        </p>
      </Box>
    </>
  )
}

export default React.memo(UserInfo)
