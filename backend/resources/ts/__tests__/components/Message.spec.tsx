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
  useGroupModal: () => useGroupModalMock(),
  useRolesState: () => useRolesStateMock(),
  useUserState: () => useUserStateMock(),
}))

// Mock の定義
const messagesState = mockState.chatMessagesSlice
const created_at = messagesState.messages.byId['message1'].created_at
const groupId = 1

const groupState = {
  groups: {
    allNumberIds: [1, 2],
  },
}
const userState = mockState.userSlice
const rolesState = mockState.rolesSlice

const useChatMessagesStateMock = jest.fn().mockReturnValue(messagesState)
const usePostStateMock = jest.fn().mockReturnValue({
  postPromise: 'idle',
})
const useScrollToBottomMock = jest.fn()
const useFormatDateMock = jest.fn().mockReturnValue(created_at)

const useUserStateMock = jest.fn().mockReturnValue(userState)
const useGroupsStateMock = jest.fn().mockReturnValue(groupState)
const useRolesStateMock = jest.fn().mockReturnValue(rolesState)

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
