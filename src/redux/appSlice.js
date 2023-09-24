import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    address: '',
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        passAddress: (state, action) => {
            state.address = action.payload
        },
    },
})

export const { passAddress } = appSlice.actions
export const selectAddress = (state) => state.app.address

export default appSlice.reducer
