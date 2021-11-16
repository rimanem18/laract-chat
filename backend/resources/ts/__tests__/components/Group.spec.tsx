import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import renderer from 'react-test-renderer'
import { mockState } from '../../app/mockState'
import Group from '../../components/Group'

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
  useParamGroupId: () => useParamGroupIdMock(),
  useGroupModal: () => useGroupModalMock(),
  useGroupsIds: () => useGroupsIdsMock(),
  useGroupsEntities: () => useGroupsEntitiesMock(),
  useGroupsPromise: () => useGroupsPromiseMock(),
}))

// Hooks の Mock
const group = mockState.groupsSlice
const useParamGroupIdMock = jest.fn().mockReturnValue(1)
const useGroupsIdsMock = jest.fn().mockReturnValue(group.ids)
const useGroupsEntitiesMock = jest.fn().mockReturnValue(group.entities)
const useGroupsPromiseMock = jest.fn().mockReturnValue(group.promise)
let useGroupModalMock = jest.fn()

const Component = (
  <Router>
    <Group />
  </Router>
)

// テスト開始
const setup = () => {
  const screen = render(Component)
  const groupNames = [
    screen.getByTestId('group1'),
    screen.getByTestId('group2'),
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
      newName: group.entities.group1.name,
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
    const ent = group.entities
    expect(groupNames[0].textContent).toBe(ent.group1.name)
    expect(groupNames[1].textContent).toBe(ent.group2.name)
  })
})
