import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render, screen as SCREEN } from '@testing-library/react'
import renderer from 'react-test-renderer'
import PostForm from '../../components/PostForm'
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
  useUserState: () => useUserStateMock(),
  usePostState: () => usePostStateMock(),
  useParamGroupId: () => useParamGroupIdMock(),
}))

const postState = mockState.postSlice

const useUserStateMock = jest.fn().mockReturnValue({ userId: postState.userId })
const usePostStateMock = jest.fn().mockReturnValue({
  postContent: postState.content,
})
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

    expect(textarea.value).toBe(postState.content)
  })

  it('onChange が発火すると文字列が反映される', () => {
    const { textarea } = setup()

    expect(textarea.value).toBe('fugafuga')
    fireEvent.change(textarea, {
      target: {
        value: 'Hello World!',
      },
    })
    expect(textarea.value).toBe('Hello World')
  })
})
