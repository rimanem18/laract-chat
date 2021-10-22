import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import renderer from 'react-test-renderer'
import Input from '../../components/Input'

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
const onChangeMock = jest.fn()

const InputComponent = (
  <Input
    label="Name"
    type="text"
    name="name"
    value=""
    onChange={onChangeMock}
  />
)

// Setup
const setup = () => {
  const screen = render(InputComponent)
  const input = screen.getByTestId('Name-input') as HTMLInputElement
  const label = screen.getByTestId('label') as HTMLLabelElement
  return {
    input,
    label,
    ...screen,
  }
}

// テスト開始
describe('Input', () => {
  it('snapshot', () => {
    const tree = renderer.create(InputComponent).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('渡されたラベルの値が htmlFor, text に反映されている', () => {
    const { label } = setup()

    expect(label.htmlFor).toBe('Name')
    expect(label.textContent).toBe('Name')
  })

  it('渡された type の値が反映されている', () => {
    const { input } = setup()

    expect(input.type).toBe('text')
  })

  it('渡された name の値が name に反映されている', () => {
    const { input } = setup()

    expect(input.name).toBe('name')
  })

  it('渡された value の文字が反映されている', () => {
    const { input } = setup()

    expect(input.value).toBe('')
  })

  it('value が変化すると onChange が発火する', () => {
    const { input } = setup()

    fireEvent.change(input, {
      target: { value: 'Hello' },
    })
    expect(onChangeMock).toBeCalled()
  })
})
