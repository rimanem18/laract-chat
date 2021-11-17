import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// 型定義
export interface MenuState {
  isOpen: boolean
}

// 初期値
const initialState: MenuState = {
  isOpen: false,
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload
    },
  },
})

// 外部からセットできるように
export const { toggleMenuOpen } = menuSlice.actions

export default menuSlice.reducer
