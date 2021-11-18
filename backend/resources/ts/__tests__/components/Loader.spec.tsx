import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import renderer from 'react-test-renderer'
import Loader from '../../components/Loader'
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
  useAuthState: () => useAuthStateMock(),
  useUserState: () => useUserStateMock(),
}))

// Mock の定義
const authSlice = mockState.authSlice
const userSlice = mockState.userSlice
const useAuthStateMock = jest
  .fn()
  .mockReturnValue({ authPromise: authSlice.promise })
const useUserStateMock = jest
  .fn()
  .mockReturnValue({ userPromise: userSlice.promise })

const LoaderComponent = <Loader />

describe('Loader', () => {
  it('snapshot', () => {
    const tree = renderer.create(LoaderComponent).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
