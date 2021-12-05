import React from 'react'
import { Button, Grid } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { useAppDispatch } from '../app/hooks'
import { logout } from '../slices/AuthSlice'
import Group from './Group'
import UserInfo from './UserInfo'
import { useHistory } from 'react-router'

const Sidebar = () => {
  const dispatch = useAppDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <>
      <Grid container sx={{ my: 2 }}>
        <Grid container>
          <UserInfo />
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
