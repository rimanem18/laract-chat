import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
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
  usePostContent: () => usePostContentMock(),
}))

// Hooks の Mock
const useAuthPromiseMock = jest.fn().mockReturnValue('idle')
const ids = mockState.chatMessagesSlice.ids
const entities = mockState.chatMessagesSlice.entities
const created_at = entities.message1.created_at
const promise = mockState.chatMessagesSlice.promise
const mockChatMessageIds = jest.fn().mockReturnValue(ids)
const useChatMessagesEntitiesMock = jest.fn().mockReturnValue(entities)
const useChatMessagesPromiseMock = jest.fn().mockReturnValue(promise)
const usePostPromiseMock = jest.fn().mockReturnValue('idle')
const useScrollToBottomMock = jest.fn()
const useInitFetchMessagesMock = jest.fn()
const useUpdateMessagesMock = jest.fn()
const useFormatDateMock = jest.fn().mockReturnValue(created_at)
const mockValues = {
  userId: 1,
  content: 'Hello',
}
const useUserIdMock = jest.fn().mockReturnValue(mockValues.userId)
const usePostContentMock = jest.fn().mockReturnValue(mockValues.content)

const setup = () => {
  const screen = render(<Top />)
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

      expect(textarea.value).toBe(mockValues.content)
    })

    it('onChange が発火しても文字列は同じ', () => {
      const { textarea } = setup()

      fireEvent.change(textarea, {
        target: {
          value: 'Hello World!',
        },
      })
      expect(textarea.value).toBe(mockValues.content)
    })
  })

  it('snapshot', () => {
    const tree = renderer.create(<Top />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
