import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import Message from './Message'
import {} from '../../app/hooks'
import {
  ChatMessage,
  ChatMessagesSliceState,
} from '../../features/ChatMessagesSlice'
import { PromiseState } from '../../app/type'

// Mock の State
const mockState: ChatMessagesSliceState = {
  ids: ['message1', 'message2'],
  entities: {
    message1: {
      id: 1,
      name: 'hoge',
      content: 'fugafuga',
      created_at: '1900-01-01',
    },
    message2: {
      id: 2,
      name: 'piyo',
      content: 'fugafuga',
      created_at: '1900-01-01',
    },
  },
  promise: 'idle',
}

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
  useChatMessageIds: () => mockChatMessageIds(),
  useChatMessagesEntities: () => useChatMessagesEntitiesMock(),
  useChatMessagesPromise: () => useChatMessagesPromiseMock(),
  usePostPromise: () => usePostPromiseMock(),
  useScrollToBottom: () => useScrollToBottomMock(),
  useInitFetchMessages: () => useInitFetchMessagesMock(),
  useAddMessages: () => useAddMessagesMock(),
  useFormatDate: () => useFormatDateMock(),
}))

// Mock の定義
const mockChatMessageIds = jest.fn().mockReturnValue(mockState.ids)
const useChatMessagesEntitiesMock = jest
  .fn()
  .mockReturnValue(mockState.entities)
const useChatMessagesPromiseMock = jest.fn().mockReturnValue(mockState.promise)
const usePostPromiseMock = jest.fn().mockReturnValue('idle')
const useScrollToBottomMock = jest.fn()
const useInitFetchMessagesMock = jest.fn()
const useAddMessagesMock = jest.fn()
const useFormatDateMock = jest
  .fn()
  .mockReturnValue(mockState.entities.message1.created_at)

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
})
