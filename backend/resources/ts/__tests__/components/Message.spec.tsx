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
  // 引数あり
  useMessageName: (id: string) => useMessageNameMock(id),
  useMessageDatatime: (id: string) => useMessageDatetimeMock(id),
  useMessageContent: (id: string) => useMessageContentMock(id),
  useMessageRoleColor: (id: string) => useMessageRoleColorMock(id),
  useMessageGroupId: (id: string) => useMessageGroupIdMock(id),
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

// 引数のある Hooks
const msgById = messagesState.messages.byId
const useMessageNameMock = jest
  .fn()
  .mockImplementation((id: string) => msgById[id].name)
const useMessageContentMock = jest
  .fn()
  .mockImplementation((id: string) => msgById[id].content)
const useMessageDatetimeMock = jest
  .fn()
  .mockImplementation((id: string) => msgById[id].created_at)
const useMessageRoleColorMock = jest
  .fn()
  .mockImplementation((id: string) => msgById[id].roles)
const useMessageGroupIdMock = jest
  .fn()
  .mockImplementation((id) => msgById[id].group_id)

// Setup
const setup = () => {
  const screen = render(<Message />)
  const scrollButton = screen.getByTestId('scroll-btn') as HTMLButtonElement
  const messages = {
    message1: {
      name: screen.getByTestId('message1-name') as HTMLDivElement,
      content: screen.getByTestId('message1-content') as HTMLElement,
      datetime: screen.getByTestId('message1-datetime') as HTMLDivElement,
    },
  }
  return {
    scrollButton,
    messages,
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

  it('メッセージの情報が正しく表示できる', () => {
    const { messages } = setup()

    expect(messages.message1.name.textContent).toBe(msgById.message1.name)
    expect(messages.message1.content.textContent).toBe(msgById.message1.content)
    expect(messages.message1.datetime.textContent).toBe(
      msgById.message1.created_at
    )
  })

  it('snapshot', () => {
    const tree = renderer.create(<Message />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
