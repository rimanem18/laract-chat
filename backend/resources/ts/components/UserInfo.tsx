import React, { useMemo } from 'react'
import { Box } from '@mui/material'
import StringAvatar from './StringAvatar'
import { useUserState } from '../app/hooks'

const UserInfo = () => {
  const userState = useUserState()
  const existRole = userState.roles.length > 1 ? true : false
  let margin
  if (existRole) {
    margin = '0.5em'
  } else {
    margin = '0.8em'
  }

  return (
    <>
      <StringAvatar name={userState.name}></StringAvatar>
      <Box margin={margin}>
        <Box>{userState.name}</Box>
      </Box>
    </>
  )
}
export default React.memo(UserInfo)
