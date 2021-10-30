import React from 'react'
import { Link } from 'react-router-dom'
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

  return (
    <>
      <ul>
        <li data-testid="user-id">{userId}</li>
        <li data-testid="user-name">{userName}</li>
        <li data-testid="user-email">{userEmail}</li>
      </ul>
      <button onClick={logoutHandler} className="btn btn-primary">
        ログアウト
      </button>
      <Group />
    </>
  )
}

export default React.memo(Sidebar)
