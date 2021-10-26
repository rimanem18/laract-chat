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
  useChatMessageIds: () => mockChatMessageIds(),
  useChatMessagesEntities: () => useChatMessagesEntitiesMock(),
  useChatMessagesPromise: () => useChatMessagesPromiseMock(),
  usePostPromise: () => usePostPromiseMock(),
  useScrollToBottom: () => useScrollToBottomMock(),
  useInitFetchMessages: () => useInitFetchMessagesMock(),
  useUpdateMessages: () => useUpdateMessagesMock(),
  useFormatDate: () => useFormatDateMock(),
  useGroupsIds: () => useGroupsIdsMock(),
  useGroupsEntities: () => useGroupsEntitiesMock(),
  useGroupsPromise: () => useGroupsPromiseMock(),
  useParamGroupId: () => useParamGroupIdMock(),
}))

// Mock の定義
const ids = mockState.chatMessagesSlice.ids
const entities = mockState.chatMessagesSlice.entities
const created_at = entities.message1.created_at
const promise = mockState.chatMessagesSlice.promise
const group = mockState.groupsSlice
const groupId = 1
const mockChatMessageIds = jest.fn().mockReturnValue(ids)
const useChatMessagesEntitiesMock = jest.fn().mockReturnValue(entities)
const useChatMessagesPromiseMock = jest.fn().mockReturnValue(promise)
const usePostPromiseMock = jest.fn().mockReturnValue('idle')
const useScrollToBottomMock = jest.fn()
const useInitFetchMessagesMock = jest.fn()
const useUpdateMessagesMock = jest.fn()
const useFormatDateMock = jest.fn().mockReturnValue(created_at)

const useGroupsIdsMock = jest.fn().mockReturnValue(group.ids)
const useGroupsEntitiesMock = jest.fn().mockReturnValue(group.entities)
const useGroupsPromiseMock = jest.fn().mockReturnValue(group.promise)

const useParamGroupIdMock = jest.fn().mockReturnValue(groupId)

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
