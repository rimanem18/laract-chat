import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Register from './Register'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { AuthState } from '../../features/AuthSlice'

jest.mock('../../features/AuthSlice')
jest.mock('../../app/hooks')
const useSelectorMock = useAppSelector as jest.Mock<AuthState>
const useDispatchMock = useAppDispatch as jest.Mock

describe('Register', () => {
  test('renders Register component', () => {
    render(<Register />)
  })
})
