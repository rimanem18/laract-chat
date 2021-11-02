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
  useEditGroupModal: () => useEditGroupModalMock(),
  useDefaultGroupPath: () => useDefaultGroupPathMock(),
  useModalStyle: () => useModalStyleMock(),
}))

const group = mockState.groupsSlice

let useEditGroupModalMock = jest.fn()
const useModalStyleMock = jest.fn().mockReturnValue({})
const useDefaultGroupPathMock = jest.fn().mockReturnValue(`/groups/1`)

const Component = (
  <EditGroupModal
    groupId={group.entities.group1.id.toString()}
    groupName={group.entities.group1.name}
  />
)

const setup = () => {
  const screen = render(Component)
  return {
    ...screen,
  }
}

describe('EditGroupModal', () => {
  describe('Open Modal', () => {
    useEditGroupModalMock = jest.fn().mockReturnValue([
      {
        isOpen: true,
        isConfirm: false,
        newName: group.entities.group1.name,
      },
      {},
    ])
    const screen = render(Component)
    const modalTitle = screen.getByTestId('modal-title')
    const editName = screen.getByTestId('edit-group-name') as HTMLInputElement
    it('props で渡された値が反映されている', () => {
      expect(modalTitle.textContent).toBe(group.entities.group1.name)
      expect(editName.value).toBe(group.entities.group1.name)
    })
    it('グループが編集されると文字も変わる', () => {
      fireEvent.change(editName, {
        target: {
          value: 'Hello Group!',
        },
      })
      expect(editName.value).toBe('Hello Group!')
    })
  })
})
