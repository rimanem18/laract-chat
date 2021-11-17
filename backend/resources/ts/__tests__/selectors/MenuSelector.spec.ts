import { menuIsOpenSelector } from '../../selectors/MenuSelector'
import { mockState } from '../../app/mockState'

describe('menuSelector', () => {
  it('Selector で menuState の値を取得できる', () => {
    const isOpen = menuIsOpenSelector(mockState)

    expect(isOpen).toBe(false)
  })
})
