import React from 'react'
import '@testing-library/jest-dom'
import renderer from 'react-test-renderer'
import { fireEvent, render } from '@testing-library/react'
import { mockState } from '../../app/mockState'
import EditGroupModal from '../../components/EditGroupModal'

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
  useGroupModal: () => useGroupModalMock(),
  useDefaultGroupPath: () => useDefaultGroupPathMock(),
  useGroupsState: () => useGroupsStateMock(),
}))

const user = mockState.userSlice
const groupsState = mockState.groupsSlice

let useGroupModalMock = jest.fn()
const useDefaultGroupPathMock = jest.fn().mockReturnValue(`/groups/1`)
const useGroupsStateMock = jest.fn().mockReturnValue(groupsState)

const Component = (
  <EditGroupModal groupId={'1'} groupName={'Hello Group'} roleIds={[1, 2]} />
)

const setup = () => {
  const screen = render(Component)
  return {
    ...screen,
  }
}

describe('EditGroupModal', () => {
  describe('Open Modal', () => {
    useGroupModalMock = jest.fn().mockReturnValue([
      {
        isOpen: true,
        isConfirm: false,
        newGroupName: 'Hello Group',
      },
      {
        openModal: jest.fn(),
        closeModal: jest.fn(),
        openConfirm: jest.fn(),
        closeConfirm: jest.fn(),
        setNewGroupName: jest.fn(),
      },
    ])
    const screen = render(Component)
    const modalTitle = screen.getByTestId('modal-title')
    const editName = screen.getByTestId('edit-group-name') as HTMLInputElement
    it('props で渡された値が反映されている', () => {
      expect(modalTitle.textContent).toBe('Hello Group')
      expect(editName.value).toBe('Hello Group')
    })
    it('グループが編集されると文字も変わる', () => {
      fireEvent.change(editName, {
        target: {
          value: 'Hello',
        },
      })
      expect(editName.value).toBe('Hello')
    })
  })
})
