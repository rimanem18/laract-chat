import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import PostForm from '../../components/PostForm'

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
  useUserId: () => useUserIdMock(),
  usePostContent: () => usePostContentMock(),
}))

const mockValues = {
  userId: 1,
  content: 'Hello',
}
const useUserIdMock = jest.fn().mockReturnValue(mockValues.userId)
const usePostContentMock = jest.fn().mockReturnValue(mockValues.content)

// Setup
const setup = () => {
  const screen = render(<PostForm />)
  const textarea = screen.getByTestId('textarea') as HTMLTextAreaElement
  return {
    textarea,
    ...screen,
  }
}

// テスト開始
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
