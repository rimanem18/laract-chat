import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import renderer from 'react-test-renderer'
import Modal from 'react-modal'
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
  useAuthPromise: () => useAuthPromiseMock(),
  useChatMessageIds: () => mockChatMessageIds(),
  useChatMessagesEntities: () => useChatMessagesEntitiesMock(),
  useChatMessagesPromise: () => useChatMessagesPromiseMock(),
  usePostPromise: () => usePostPromiseMock(),
  useScrollToBottom: () => useScrollToBottomMock(),
  useInitFetchMessages: () => useInitFetchMessagesMock(),
  useUpdateMessages: () => useUpdateMessagesMock(),
  useFormatDate: () => useFormatDateMock(),
  useUserId: () => useUserIdMock(),
  useUserName: () => useUserNameMock(),
  useUserEmail: () => useUserEmailMock(),
  usePostContent: () => usePostContentMock(),
  useParamGroupId: () => useParamGroupIdMock(),
  useGroupsIds: () => useGroupsIdsMock(),
  useGroupsEntities: () => useGroupsEntitiesMock(),
  useGroupsPromise: () => useGroupsPromiseMock(),
  useGroupsOldestId: () => useGroupsOldestIdMock(),
  useModalStyle: () => useModalStyleMock(),
}))

// Hooks の Mock
const useAuthPromiseMock = jest.fn().mockReturnValue('idle')
const ids = mockState.chatMessagesSlice.ids
const entities = mockState.chatMessagesSlice.entities
const created_at = entities.message1.created_at
const promise = mockState.chatMessagesSlice.promise
const user = mockState.userSlice
const post = mockState.postSlice
const group = mockState.groupsSlice

const mockChatMessageIds = jest.fn().mockReturnValue(ids)
const useChatMessagesEntitiesMock = jest.fn().mockReturnValue(entities)
const useChatMessagesPromiseMock = jest.fn().mockReturnValue(promise)

const useUserIdMock = jest.fn().mockReturnValue(user.id)
const useUserNameMock = jest.fn().mockReturnValue(user.name)
const useUserEmailMock = jest.fn().mockReturnValue(user.email)

const usePostContentMock = jest.fn().mockReturnValue(post.content)
const usePostPromiseMock = jest.fn().mockReturnValue('idle')

const useParamGroupIdMock = jest.fn().mockReturnValue(1)
const useGroupsIdsMock = jest.fn().mockReturnValue(group.ids)
const useGroupsEntitiesMock = jest.fn().mockReturnValue(group.entities)
const useGroupsPromiseMock = jest.fn().mockReturnValue(group.promise)
const useGroupsOldestIdMock = jest.fn().mockReturnValue(group.oldestId)

const useInitFetchMessagesMock = jest.fn()
const useUpdateMessagesMock = jest.fn()
const useFormatDateMock = jest.fn().mockReturnValue(created_at)
const useScrollToBottomMock = jest.fn()

const useModalStyleMock = jest.fn().mockReturnValue({})

jest
  .spyOn(Modal, 'setAppElement')
  .mockImplementation((param) => console.log(`setAppElement:'${param}'`))

const Component = (
  <Router>
    <Top />
  </Router>
)

// テスト開始
const setup = () => {
  const screen = render(Component)
  const textarea = screen.getByTestId('textarea') as HTMLTextAreaElement
  return {
    textarea,
    ...screen,
  }
}
describe('Top', () => {
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
