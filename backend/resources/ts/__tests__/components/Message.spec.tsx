import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'
import Message from '../../components/Message'
import { mockState } from '../../app/mockState'

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
  usePostState: () => usePostStateMock(),
  useScrollToBottom: () => useScrollToBottomMock(),
  useFormatDate: () => useFormatDateMock(),
  useGroupsState: () => useGroupsStateMock(),
  useParamGroupId: () => useParamGroupIdMock(),
  useDefaultGroupPath: () => useDefaultGroupPathMock(),
  useGroupModal: () => useGroupModalMock(),
  useUserState: () => useUserStateMock(),
}))

// Mock の定義
const ids = mockState.chatMessagesSlice.ids
const entities = mockState.chatMessagesSlice.entities
const created_at = entities.message1.created_at
const promise = mockState.chatMessagesSlice.promise
const groupId = 1

const groupState = mockState.groupsSlice
const userState = mockState.userSlice

const useChatMessagesStateMock = jest.fn().mockReturnValue({
  chatMessageIds: ids,
  chatMessagesEntities: entities,
  chatMessagesPromise: promise,
})
const usePostStateMock = jest.fn().mockReturnValue({
  postPromise: 'idle',
})
const useScrollToBottomMock = jest.fn()
const useFormatDateMock = jest.fn().mockReturnValue(created_at)

const useUserStateMock = jest.fn().mockReturnValue(userState)
const useGroupsStateMock = jest.fn().mockReturnValue(groupState)

const useParamGroupIdMock = jest.fn().mockReturnValue(groupId)
const useGroupModalMock = jest.fn().mockReturnValue([
  {
    isOpen: false,
    isConfirm: false,
    newName: 'Hello Group',
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
