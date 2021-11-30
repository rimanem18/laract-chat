import React from 'react'
import '@testing-library/jest-dom'
import renderer from 'react-test-renderer'
import { fireEvent, render } from '@testing-library/react'
import { mockState } from '../../app/mockState'
import AddGroupModal from '../../components/AddGroupModal'

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
}))

const group = mockState.groupsSlice

let useGroupModalMock = jest.fn()
const useDefaultGroupPathMock = jest.fn().mockReturnValue(`/groups/1`)

const Component = <AddGroupModal roleIds={[1, 2]} />

const setup = () => {
  const screen = render(Component)
  return {
    ...screen,
  }
}

describe('AddGroupModal', () => {
  describe('Open Modal', () => {
    useGroupModalMock = jest.fn().mockReturnValue([
      {
        isOpen: true,
        isConfirm: false,
        newGroupName: group.groups.byId.group1.name,
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
    const addName = screen.getByTestId('add-group-name') as HTMLInputElement
    it('modal のタイトルが正しい', () => {
      expect(modalTitle.textContent).toBe('追加するグループの名前')
    })
    it('グループが編集されると文字も変わる', () => {
      fireEvent.change(addName, {
        target: {
          value: 'Hello Group!',
        },
      })
      expect(addName.value).toBe('Hello Group!')
    })
  })
})
