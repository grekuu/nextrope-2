import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    address: '',
    networkName: '',
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        passAddress: (state, action) => {
            state.address = action.payload
        },
        passNetworkName: (state, action) => {
            state.networkName = action.payload
        },
    },
})

export const { passAddress, passNetworkName } = appSlice.actions
export const selectAddress = (state) => state.app.address
export const selectNetworkName = (state) => state.app.networkName

export default appSlice.reducer
