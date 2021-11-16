import { createSelector } from 'reselect'
import { RootState } from '../app/rootReducer'

export const menuSelector = (state: RootState) => state.menuSlice

/**
 * isOpen を取得する
 */
export const menuIsOpenSelector = createSelector(menuSelector, (menuSlice) => {
  return menuSlice.isOpen
})
