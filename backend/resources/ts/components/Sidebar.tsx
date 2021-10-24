import React from 'react'
import { Link } from 'react-router-dom'
import { useUserEmail, useUserId, useUserName } from '../app/hooks'
import Group from './Group'

const Sidebar = () => {
  const userId = useUserId()
  const userName = useUserName()
  const userEmail = useUserEmail()

  return (
    <>
      <ul>
        <li data-testid="user-id">{userId}</li>
        <li data-testid="user-name">{userName}</li>
        <li data-testid="user-email">{userEmail}</li>
      </ul>
      <Group />
    </>
  )
}

export default React.memo(Sidebar)
