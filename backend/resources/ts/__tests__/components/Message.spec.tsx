import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'
import Message from '../../components/Message'
import { mockState } from '../../app/mockState'
import { groupsEntitiesSelector } from '../../selectors/GroupsSelector'

// Hooks の Mock
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
  useChatMessagesState: () => useChatMessagesStateMock(),
  usePostPromise: () => usePostPromiseMock(),
  useScrollToBottom: () => useScrollToBottomMock(),
  useInitFetchMessages: () => useInitFetchMessagesMock(),
  useUpdateMessages: () => useUpdateMessagesMock(),
  useFormatDate: () => useFormatDateMock(),
  useGroupsState: () => useGroupsStateMock(),
  useParamGroupId: () => useParamGroupIdMock(),
  useDefaultGroupPath: () => useDefaultGroupPathMock(),
  useGroupModal: () => useGroupModalMock(),
}))

// Mock の定義
const ids = mockState.chatMessagesSlice.ids
const entities = mockState.chatMessagesSlice.entities
const created_at = entities.message1.created_at
const promise = mockState.chatMessagesSlice.promise
const group = mockState.groupsSlice
const groupId = 1

const useChatMessagesStateMock = jest.fn().mockReturnValue({
  chatMessageIds: ids,
  chatMessagesEntities: entities,
  chatMessagesPromise: promise,
})
const usePostPromiseMock = jest.fn().mockReturnValue('idle')
const useScrollToBottomMock = jest.fn()
const useInitFetchMessagesMock = jest.fn()
const useUpdateMessagesMock = jest.fn()
const useFormatDateMock = jest.fn().mockReturnValue(created_at)

const useGroupsStateMock = jest.fn().mockReturnValue({
  groupIds: group.ids,
  groupEntities: group.entities,
  groupsPromise: group.promise,
})

const useParamGroupIdMock = jest.fn().mockReturnValue(groupId)
const useGroupModalMock = jest.fn().mockReturnValue([
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
const useDefaultGroupPathMock = jest.fn().mockReturnValue(`/groups/1`)

// Setup
const setup = () => {
  const screen = render(<Message />)
  const scrollButton = screen.getByTestId('scroll-btn') as HTMLButtonElement
  return {
    scrollButton,
    ...screen,
  }
}

// テスト開始
describe('Message', () => {
  it('スクロールボタンがクリックで発火する', () => {
    const { scrollButton } = setup()
    fireEvent.click(scrollButton)
    expect(useScrollToBottomMock).toBeCalled()
  })

  it('snapshot', () => {
    const tree = renderer.create(<Message />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
