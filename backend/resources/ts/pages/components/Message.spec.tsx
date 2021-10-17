import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import Message from './Message'

const mockUseAppDispatch = jest.fn()
const mockUseAppSelector = jest.fn()
jest.mock('../../app/hooks', () => ({
  useAppDispatch: () => (...args: any[]) => mockUseAppDispatch(...args),
  useAppSelector: () => (...args: any[]) => mockUseAppSelector(...args),
}))

const mockChatMessagesIds = ["message1", "message2"]

const mockScrollBottom = jest.fn()
jest.mock('./Message'), () => ({
  scrollToButtom: () => () => mockScrollBottom(),
  chatMessagesIds: mockChatMessagesIds,
})

const setup = () => {
  const screen = render(<Message />)
  jest.advanceTimersByTime(500)
  const scrollButton = screen.getByTestId('scroll-btn') as HTMLButtonElement
  return {
    scrollButton,
    ...screen,
  }
}

describe('Message', () => {
  it('スクロールボタンがクリックで発火する', () => {
    const { scrollButton } = setup()
    fireEvent.click(scrollButton)
    expect(scrollButton).toBeCalledTimes(1)
  })

})
