import React from 'react'
import { Avatar, Button, Grid, Box } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import {
  useAppDispatch,
  useStringToColor,
  useUserEmail,
  useUserId,
  useUserName,
} from '../app/hooks'
import { logout } from '../slices/AuthSlice'
import Group from './Group'

const Sidebar = () => {
  const userId = useUserId()
  const userName = useUserName()
  const userEmail = useUserEmail()
  const dispatch = useAppDispatch()
  const nameColor = useStringToColor(userName)

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <>
      <Grid container sx={{ my: 2 }}>
        <Grid container>
          <Avatar title={userName} sx={{ bgcolor: nameColor, m: 1 }}></Avatar>
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
