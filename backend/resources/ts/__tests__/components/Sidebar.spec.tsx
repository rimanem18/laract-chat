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
  useModalStyle: () => useModalStyleMock(),
  useUserId: () => useUserIdMock(),
  useUserName: () => useUserNameMock(),
  useUserEmail: () => useUserEmailMock(),
  useGroupsIds: () => useGroupsIdsMock(),
  useGroupsEntities: () => useGroupsEntitiesMock(),
  useGroupsPromise: () => useGroupsPromiseMock(),
  useParamGroupId: () => useParamGroupIdMock(),
  useGroupModal: () => useGroupModalMock(),
}))

// Mock の定義
const user = mockState.userSlice
const group = mockState.groupsSlice
const useModalStyleMock = jest.fn().mockReturnValue({})

const useUserIdMock = jest.fn().mockReturnValue(user.id)
const useUserNameMock = jest.fn().mockReturnValue(user.name)
const useUserEmailMock = jest.fn().mockReturnValue(user.email)
const useGroupsIdsMock = jest.fn().mockReturnValue(group.ids)
const useGroupsEntitiesMock = jest.fn().mockReturnValue(group.entities)
const useGroupsPromiseMock = jest.fn().mockReturnValue(group.promise)
const useParamGroupIdMock = jest.fn().mockReturnValue(1)

const useGroupModalMock = jest.fn().mockReturnValue([{}, {}])

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
  it('ユーザ名の一文字目が表示される', () => {
    const { userName } = setup()

    expect(userName.textContent).toBe('太')
  })

  it('snapshot', () => {
    const tree = renderer.create(Component).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
