import React from 'react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { fireEvent, render } from '@testing-library/react'
import GlobalNav from '../../components/GlobalNav'

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
}))

// Mock の定義
const useUserIdMock = jest.fn().mockReturnValue(1)

// Setup
const setup = () => {
  const screen = render(
    <Router>
      <GlobalNav />
    </Router>
  )
  const nav = screen.getByTestId('nav') as HTMLElement
  return {
    nav,
    ...screen,
  }
}

// テスト開始
describe('GlobalNav', () => {
  it('ログインしているときだけログアウトボタンがある', () => {
    const { nav } = setup()

    expect(Boolean(nav.textContent?.match(/Logout/g))).toBe(true)
  })

  it('ログインしていると登録ボタンとログインボタンは表示されない', () => {
    const { nav } = setup()

    expect(Boolean(nav.textContent?.match(/Login/g))).toBe(false)
    expect(Boolean(nav.textContent?.match(/Register/g))).toBe(false)
  })
})
