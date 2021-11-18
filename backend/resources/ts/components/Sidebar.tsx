import React from 'react'
import { Button, Grid } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { useAppDispatch, useUserState } from '../app/hooks'
import StringAvatar from './StringAvatar'
import { logout } from '../slices/AuthSlice'
import Group from './Group'

const Sidebar = () => {
  const { userName } = useUserState()
  const dispatch = useAppDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <>
      <Grid container sx={{ my: 2 }}>
        <Grid container>
          <StringAvatar name={userName}></StringAvatar>
          <p>{userName}</p>
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
