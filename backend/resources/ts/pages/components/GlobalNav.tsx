import React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { logout } from '../../features/AuthSlice'
import { userIdSelector } from '../../features/UserSelector'
import { selectUserId } from '../../features/UserSlice'

const GlobalNav = () => {
  const userId = useAppSelector(userIdSelector)
  const dispatch = useAppDispatch()

  // ログアウト
  const logoutHandler = () => {
    dispatch(logout())
  }

  console.log(userId)

  return (
    <nav>
      <ul>
        <Link to="/">
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
