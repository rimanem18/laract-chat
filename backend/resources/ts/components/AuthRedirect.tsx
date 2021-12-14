import React from 'react'
import { Redirect } from 'react-router-dom'
import { useGroupsState, useUserState } from '../app/hooks'

const AuthRedirect = () => {
  const userState = useUserState()
  const { defaultPath } = useGroupsState()

  return (
    <>
      {userState.id === 0 ? (
        <Redirect to="/login" />
      ) : (
        <Redirect to={defaultPath} />
      )}
    </>
  )
}

export default AuthRedirect
