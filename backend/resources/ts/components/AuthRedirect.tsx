import React from 'react'
import { Redirect } from 'react-router-dom'
import { useDefaultGroupPath, useUserState } from '../app/hooks'

const AuthRedirect = () => {
  const { userId } = useUserState()
  const defaultGroupPath = useDefaultGroupPath()

  return (
    <>
      {userId === 0 ? (
        <Redirect to="/login" />
      ) : (
        <Redirect to={defaultGroupPath} />
      )}
    </>
  )
}

export default AuthRedirect
