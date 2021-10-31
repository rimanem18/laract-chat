import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useGroupsOldestId, useGroupsPromise, useUserId } from '../app/hooks'

const AuthRedirect = () => {
  const userId = useUserId()
  const oldestGroupsId = useGroupsOldestId().toString()
  const groupPromise = useGroupsPromise()
  const [path, setPath] = useState('')

  useEffect(() => {
    if (groupPromise !== 'loading') {
      setPath(`/groups/${oldestGroupsId}`)
    }
  }, [groupPromise])

  return <>{userId === 0 ? <Redirect to="/login" /> : <Redirect to={path} />}</>
}

export default AuthRedirect
