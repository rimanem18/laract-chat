import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render, screen as SCREEN } from '@testing-library/react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import renderer from 'react-test-renderer'
import Top from '../../pages/Top'
import { mockState } from '../../app/mockState'

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
  useAuthState: () => useAuthStateMock(),
  useUserState: () => useUserStateMock(),
  useGroupsState: () => useGroupsStateMock(),
  useChatMessagesState: () => useChatMessagesStateMock(),
  usePostState: () => usePostStateMock(),
  useRolesState: () => useRolesStateMock(),
  useScrollToBottom: () => useScrollToBottomMock(),
  useFormatDate: () => useFormatDateMock(),
  useParamGroupId: () => useParamGroupIdMock(),
  useGroupModal: () => useGroupModalMock(),
  useMenuIsOpen: () => useMenuIsOpenMock(),
  // 引数あり
  useGroupName: (id: string) => useGroupNameMock(id),
  useGroupPath: (id: string) => useGroupPathMock(id),
  useMessageName: (id: string) => useMessageNameMock(id),
  useMessageDatatime: (id: string) => useMessageDatetimeMock(id),
  useMessageContent: (id: string) => useMessageContentMock(id),
  useMessageRoleColor: (id: string) => useMessageRoleColorMock(id),
  useMessageGroupId: (id: string) => useMessageGroupIdMock(id),
}))

// Hooks の Mock
const authState = mockState.authSlice
const useAuthStateMock = jest.fn().mockReturnValue(authState)
const messagesState = mockState.chatMessagesSlice
const userMock = mockState.userSlice
const userState = {
  id: userMock.id,
  name: userMock.name,
  email: userMock.email,
  roles: userMock.roles,
  promise: userMock.promise,
  roleNumberIds: [1, 2],
}
const postState = mockState.postSlice
const rolesState = mockState.rolesSlice

const useChatMessagesStateMock = jest.fn().mockReturnValue(messagesState)
const useUserStateMock = jest.fn().mockReturnValue(userState)
const usePostStateMock = jest.fn().mockReturnValue(postState)
const useRolesStateMock = jest.fn().mockReturnValue(rolesState)

const useParamGroupIdMock = jest.fn().mockReturnValue('1')

const groupsMock = mockState.groupsSlice
const groupState = {
  groups: {
    byId: groupsMock.groups.byId,
    allIds: groupsMock.groups.allIds,
    allNumberIds: [1, 2],
  },
}

const useGroupsStateMock = jest.fn().mockReturnValue(groupState)

const useFormatDateMock = jest
  .fn()
  .mockReturnValue(messagesState.messages.byId['message1'].created_at)
const useScrollToBottomMock = jest.fn()

let useGroupModalMock = jest.fn()

const useMenuIsOpenMock = jest.fn().mockReturnValue(false)

// 引数のある Hooks
const useGroupNameMock = jest
  .fn()
  .mockImplementation((id: string) => groupState.groups.byId[id].name)
const useGroupPathMock = jest
  .fn()
  .mockImplementation(
    (id: string) => `/groups/${groupState.groups.byId[id].id.toString()}`
  )
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

const Component = (
  <Router>
    <Top />
  </Router>
)

// テスト開始
const setup = () => {
  const screen = render(Component)
  const textarea = screen.getByTestId('post-form') as HTMLTextAreaElement
  return {
    textarea,
    ...screen,
  }
}
describe('Top', () => {
  useGroupModalMock = jest.fn().mockReturnValue([
    {
      isOpen: false,
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
  describe('PostForm', () => {
    it('入力値と postSlice content の文字列が同じ', () => {
      const { textarea } = setup()

      expect(textarea.value).toBe(postState.content)
    })

    it('onChange が発火しても文字列は同じ', () => {
      const { textarea } = setup()

      fireEvent.change(textarea, {
        target: {
          value: 'Hello World!',
        },
      })
      expect(textarea.value).toBe(postState.content)
    })
  })

  it('snapshot', () => {
    const tree = renderer.create(Component).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
