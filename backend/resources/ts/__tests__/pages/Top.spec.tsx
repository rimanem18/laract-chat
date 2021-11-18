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
  useScrollToBottom: () => useScrollToBottomMock(),
  useInitFetchMessages: () => useInitFetchMessagesMock(),
  useUpdateMessages: () => useUpdateMessagesMock(),
  useFormatDate: () => useFormatDateMock(),
  useParamGroupId: () => useParamGroupIdMock(),
  useGroupModal: () => useGroupModalMock(),
  useDefaultGroupPath: () => useDefaultGroupPathMock(),
  useMenuIsOpen: () => useMenuIsOpenMock(),
}))

// Hooks の Mock
const useAuthStateMock = jest.fn().mockReturnValue({ authPromise: 'idle' })
const ids = mockState.chatMessagesSlice.ids
const entities = mockState.chatMessagesSlice.entities
const created_at = entities.message1.created_at
const promise = mockState.chatMessagesSlice.promise
const user = mockState.userSlice
const post = mockState.postSlice
const group = mockState.groupsSlice

const useChatMessagesStateMock = jest.fn().mockReturnValue({
  chatMessageIds: ids,
  chatMessagesEntities: entities,
  chatMessagesPromise: promise,
})

const useUserStateMock = jest.fn().mockReturnValue({
  userId: user.id,
  userName: user.name,
  userEmail: user.email,
})

const usePostStateMock = jest.fn().mockReturnValue({
  postContent: post.content,
  postPromise: 'idle',
})

const useParamGroupIdMock = jest.fn().mockReturnValue('1')
const useDefaultGroupPathMock = jest.fn().mockReturnValue(`/groups/1`)
const useGroupsStateMock = jest.fn().mockReturnValue({
  groupIds: group.ids,
  groupsEntities: group.entities,
  groupsPromise: group.promise,
  groupsOldestId: group.oldestId,
})

const useInitFetchMessagesMock = jest.fn()
const useUpdateMessagesMock = jest.fn()
const useFormatDateMock = jest.fn().mockReturnValue(created_at)
const useScrollToBottomMock = jest.fn()

let useGroupModalMock = jest.fn()

const useMenuIsOpenMock = jest.fn().mockReturnValue(false)

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
      newGroupName: group.entities.group1.name,
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

      expect(textarea.value).toBe(post.content)
    })

    it('onChange が発火しても文字列は同じ', () => {
      const { textarea } = setup()

      fireEvent.change(textarea, {
        target: {
          value: 'Hello World!',
        },
      })
      expect(textarea.value).toBe(post.content)
    })
  })

  it('snapshot', () => {
    const tree = renderer.create(Component).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
