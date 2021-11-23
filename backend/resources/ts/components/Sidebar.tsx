import React from 'react'
import { Badge, Box, Button, Grid } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { useAppDispatch, useUserState } from '../app/hooks'
import StringAvatar from './StringAvatar'
import { logout } from '../slices/AuthSlice'
import Group from './Group'

const Sidebar = () => {
  const { userName, userRoleIds, userRoleEntities } = useUserState()
  const dispatch = useAppDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <>
      <Grid container sx={{ my: 2 }}>
        <Grid container>
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
                  <span className={`role__badge${append}`}>{role.name}</span>
                )
              })}
            </p>
          </Box>
        </Grid>
        <Grid container>
          <Button
            onClick={logoutHandler}
            startIcon={<LogoutIcon />}
            sx={{ ml: 1 }}
          >
            ログアウト
          </Button>
        </Grid>
      </Grid>
      <Group />
    </>
  )
}

export default React.memo(Sidebar)
