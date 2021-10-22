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
  useAuthPromise: () => useAuthPromiseMock(),
  useUserPromise: () => useUserPromiseMock(),
}))

// Mock の定義
const authSlice = mockState.authSlice
const userSlice = mockState.userSlice
const useAuthPromiseMock = jest.fn().mockReturnValue(authSlice.promise)
const useUserPromiseMock = jest.fn().mockReturnValue(userSlice.promise)

const LoaderComponent = <Loader />

describe('Loader', () => {
  it('snapshot', () => {
    const tree = renderer.create(LoaderComponent).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
