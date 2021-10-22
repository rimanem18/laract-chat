import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import renderer from 'react-test-renderer'
import Sidebar from '../../components/Sidebar'
import { mockState } from '../../app/mockState'

const mockUseAppDispatch = jest.fn()
jest.mock('../../app/hooks', () => ({
  useAppDispatch:
    () =>
    (...args: any[]) =>
      mockUseAppDispatch(...args),
  useUserId: () => useUserIdMock(),
  useUserName: () => useUserNameMock(),
  useUserEmail: () => useUserEmailMock(),
}))

// Mock の定義
const user = mockState.userSlice
const useUserIdMock = jest.fn().mockReturnValue(user.id)
const useUserNameMock = jest.fn().mockReturnValue(user.name)
const useUserEmailMock = jest.fn().mockReturnValue(user.email)

const setup = () => {
  const screen = render(<Sidebar />)
  const userId = screen.getByTestId('user-id')
  const userName = screen.getByTestId('user-name')
  const userEmail = screen.getByTestId('user-email')
  const groupId = screen.getByTestId('group-id')
  const groupName = screen.getByTestId('group-name')
  const groupMessage = screen.getByTestId('group-message')
  return {
    userId,
    userName,
    userEmail,
    groupId,
    groupName,
    groupMessage,
    ...screen,
  }
}

describe('Sidebar', () => {
  it('ユーザ情報が表示される', () => {
    const { userId, userEmail, userName } = setup()

    expect(userId.textContent).toBe(user.id.toString())
    expect(userName.textContent).toBe(user.name)
    expect(userEmail.textContent).toBe(user.email)
  })

  //   it('グループ一覧が表示される', () => {
  //     const { groupId, groupName, groupMessage } = setup

  // 	expect(groupId.textContent).toBe()
  //   })
})
