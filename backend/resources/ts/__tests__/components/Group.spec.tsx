import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import renderer from 'react-test-renderer'
import { mockState } from '../../app/mockState'
import Group from '../../components/Group'
import { groupNameSelector } from '../../selectors/GroupsSelector'

const mockUseAppDispatch = jest.fn()
const mockUseAppSelector = jest.fn()
jest.mock('../../app/hooks', () => ({
  useAppDispatch:
    () =>
    (...args: any[]) =>
      mockUseAppDispatch(...args),
  useAppSelector:
    () =>
    (...args: any[]) =>
      mockUseAppSelector(...args),
  useGroupName: (id: string) => useGroupNameMock(id),
  useGroupPath: (id: string) => useGroupPathMock(id),
  useParamGroupId: () => useParamGroupIdMock(),
  useGroupModal: () => useGroupModalMock(),
  useUserState: () => useUserStateMock(),
  useGroupsState: () => useGroupsStateMock(),
}))

// Hooks の Mock
const groupState = mockState.groupsSlice
const userState = { roleNumberIds: [1] }
const useParamGroupIdMock = jest.fn().mockReturnValue(1)
const useUserStateMock = jest.fn().mockReturnValue(userState)
const useGroupsStateMock = jest.fn().mockReturnValue(groupState)
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
    <Group />
  </Router>
)

// テスト開始
const setup = () => {
  const screen = render(Component)
  const groupNames = [
    screen.getByTestId('group1') as HTMLElement,
    screen.getByTestId('group2') as HTMLElement,
  ]
  return {
    groupNames,
    ...screen,
  }
}

describe('Group', () => {
  useGroupModalMock = jest.fn().mockReturnValue([
    {
      isOpen: false,
      isConfirm: false,
      newName: 'Group Name',
    },
    {
      openModal: jest.fn(),
      closeModal: jest.fn(),
      openConfirm: jest.fn(),
      closeConfirm: jest.fn(),
      setNewGroupName: jest.fn(),
    },
  ])

  it('snapshot', () => {
    const tree = renderer.create(Component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('グループ名が表示される', () => {
    const { groupNames } = setup()

    const byId = groupState.groups.byId

    expect(groupNames[0].textContent).toBe(byId.group1.name)
    expect(groupNames[1].textContent).toBe(byId.group2.name)
  })
})
