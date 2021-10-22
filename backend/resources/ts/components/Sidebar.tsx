import React from 'react'
import { Link } from 'react-router-dom'
import { useUserEmail, useUserId, useUserName } from '../app/hooks'

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
      <ul>
        <li>
          <Link to="/groups/1">グループ1</Link>
        </li>
        <li>
          <Link to="/groups/2">グループ2</Link>
        </li>
        <li>
          <Link to="/groups/3">グループ3</Link>
        </li>
      </ul>
    </>
  )
}

export default React.memo(Sidebar)
