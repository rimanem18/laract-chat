import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render, screen as SCREEN } from '@testing-library/react'
import renderer from 'react-test-renderer'
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
  useUserState: () => useUserStateMock(),
  usePostContent: () => usePostContentMock(),
  useParamGroupId: () => useParamGroupIdMock(),
}))

const mockValues = {
  userId: 1,
  content: 'Hello',
}
const useUserStateMock = jest
  .fn()
  .mockReturnValue({ userId: mockValues.userId })
const usePostContentMock = jest.fn().mockReturnValue(mockValues.content)
const useParamGroupIdMock = jest.fn().mockReturnValue('1')

const Component = <PostForm />

// Setup
const setup = () => {
  const screen = render(Component)
  const textarea = screen.getByTestId('post-form') as HTMLTextAreaElement
  return {
    textarea,
    ...screen,
  }
}

// テスト開始
describe('PostForm', () => {
  it('snapshot', () => {
    const tree = renderer.create(Component).toJSON()
    expect(tree).toMatchSnapshot()
  })

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
