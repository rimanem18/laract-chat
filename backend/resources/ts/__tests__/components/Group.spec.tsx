import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import renderer from 'react-test-renderer'
import Modal from 'react-modal'
import { mockState } from '../../app/mockState'
import Group from '../../components/Group'
import { useModalStyle } from '../../app/hooks'

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
  useModalStyle: () => useModalStyleMock(),
  useGroupsIds: () => useGroupsIdsMock(),
  useGroupsEntities: () => useGroupsEntitiesMock(),
  useGroupsPromise: () => useGroupsPromiseMock(),
}))

// Hooks の Mock
const group = mockState.groupsSlice
const useModalStyleMock = jest.fn().mockReturnValue({})
const useParamGroupIdMock = jest.fn().mockReturnValue(1)
const useGroupsIdsMock = jest.fn().mockReturnValue(group.ids)
const useGroupsEntitiesMock = jest.fn().mockReturnValue(group.entities)
const useGroupsPromiseMock = jest.fn().mockReturnValue(group.promise)

jest
  .spyOn(Modal, 'setAppElement')
  .mockImplementation((param) => console.log(`setAppElement:'${param}'`))

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
  const groupLinks = [
    screen.getByTestId('group1-link'),
    screen.getByTestId('group2-link'),
  ]
  return {
    groupNames,
    groupLinks,
    ...screen,
  }
}

describe('Group', () => {
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

  it('グループのリンク先が正しい', () => {
    const { groupLinks } = setup()
    expect(groupLinks[0].getAttribute('href')).toBe('/groups/1')
    expect(groupLinks[1].getAttribute('href')).toBe('/groups/2')
  })
})
