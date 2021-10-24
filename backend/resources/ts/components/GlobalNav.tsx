import React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useUserId } from '../app/hooks'
import { logout } from '../slices/AuthSlice'

const GlobalNav = () => {
  const userId = useUserId()
  const dispatch = useAppDispatch()

  // ログアウト
  const logoutHandler = () => {
    dispatch(logout())
  }

  console.log('GlobalNav')
  console.log(userId)

  return (
    <nav>
      <ul data-testid="nav">
        <Link to="/groups/1">
          <li>Top</li>
        </Link>
        <Link to="/about">
          <li>About</li>
        </Link>
        {userId === 0 ? (
          <>
            <Link to="/login">
              <li>Login</li>
            </Link>
            <Link to="/register">
              <li>Register</li>
            </Link>
          </>
        ) : (
          <a href="" onClick={logoutHandler}>
            <li>Logout</li>
          </a>
        )}
      </ul>
    </nav>
  )
}

export default React.memo(GlobalNav)
