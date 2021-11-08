import React from 'react'
import { Avatar, Button, Grid, Box } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import {
  useAppDispatch,
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

  const logoutHandler = () => {
    dispatch(logout())
  }

  function stringToColor(string: string) {
    let hash = 0
    let i

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = '#'

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff
      color += `00${value.toString(16)}`.substr(-2)
    }
    /* eslint-enable no-bitwise */

    return color
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    }
  }

  return (
    <>
      <Grid container sx={{ my: 2 }}>
        <Grid container>
          <Avatar
            title={userName}
            sx={{ bgcolor: stringToColor(userName), m: 1 }}
          ></Avatar>
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
