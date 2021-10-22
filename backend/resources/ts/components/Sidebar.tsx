import React from 'react'
import { useUserEmail, useUserId, useUserName } from '../app/hooks'

const Sidebar = () => {
  const userId = useUserId()
  const userName = useUserName()
  const userEmail = useUserEmail()

  return (
    <div>
      <p data-testid="user-id">{userId}</p>
      <p data-testid="user-name">{userName}</p>
      <p data-testid="user-email">{userEmail}</p>
    </div>
  )
}

export default React.memo(Sidebar)
