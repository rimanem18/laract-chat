import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import renderer from 'react-test-renderer'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import { mockState } from '../../app/mockState'

const mockUseAppDispatch = jest.fn()
jest.mock('../../app/hooks', () => ({
  useAppDispatch:
    () =>
    (...args: any[]) =>
      mockUseAppDispatch(...args),
  useGroupName: (id: string) => useGroupNameMock(id),
  useGroupPath: (id: string) => useGroupPathMock(id),
  useUserState: () => useUserStateMock(),
  useGroupsState: () => useGroupsStateMock(),
  useParamGroupId: () => useParamGroupIdMock(),
  useGroupModal: () => useGroupModalMock(),
}))

// Mock の定義
const user = mockState.userSlice
const groupState = mockState.groupsSlice

const useUserStateMock = jest.fn().mockReturnValue({
  id: user.id,
  name: user.name,
  email: user.email,
  roles: user.roles,
  roleNumberIds: [1],
  promise: user.promise,
})
const useGroupsStateMock = jest.fn().mockReturnValue(groupState)
const useParamGroupIdMock = jest.fn().mockReturnValue(1)

let useGroupModalMock = jest.fn()

// 引数のある Hooks
const useGroupNameMock = jest
  .fn()
  .mockImplementation((id: string) => groupState.groups.byId[id].name)
const useGroupPathMock = jest
  .fn()
  .mockImplementation(
    (id: string) => `/groups/${groupState.groups.byId[id].id.toString()}`
  )

const Component = (
  <Router>
    <Sidebar />
  </Router>
)

const setup = () => {
  const screen = render(Component)
  const userName = screen.getByTestId('user-name')
  return {
    userName,
    ...screen,
  }
}

describe('Sidebar', () => {
  useGroupModalMock = jest.fn().mockReturnValue([
    {
      isOpen: false,
      isConfirm: false,
      newGroupName: groupState.groups.byId.group1.name,
    },
    {
      openModal: jest.fn(),
      closeModal: jest.fn(),
      openConfirm: jest.fn(),
      closeConfirm: jest.fn(),
      setNewGroupName: jest.fn(),
    },
  ])

  it('ユーザ名の一文字目が表示される', () => {
    const { userName } = setup()

    expect(userName.textContent).toBe('太')
  })

  it('snapshot', () => {
    const tree = renderer.create(Component).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
