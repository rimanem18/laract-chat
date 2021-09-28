import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'

// 型定義
export interface UserSliceState {
  id: number
  name: string
  email: string
}

// 初期値
const initialState: UserSliceState = {
  id: 0,
  name: '',
  email: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, payloadAction: PayloadAction<UserSliceState>) => {
      const user = payloadAction.payload
      state = user
    },
  },
})

// 外部からセットできるように
export const { setUser } = userSlice.actions

// 外部から読み取れるように
export const selectUser = (state: RootState) => state.userSlice

export default userSlice.reducer
