import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import renderer from 'react-test-renderer'
import { mockState } from '../../app/mockState'
import StringAvatar from '../../components/StringAvatar'

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
}))

// Mock の定義
const user = mockState.userSlice

const Component = <StringAvatar name={user.name} />
const setup = () => {
  const screen = render(Component)
  const userName = screen.getByTestId('user-name')
  return {
    userName,
    ...screen,
  }
}

describe('StringAvatar', () => {
  it('ユーザ名の一文字目が表示される', () => {
    const { userName } = setup()

    expect(userName.textContent).toBe('太')
  })

  it('snapshot', () => {
    const tree = renderer.create(Component).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
