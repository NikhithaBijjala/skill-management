import { createSlice } from '@reduxjs/toolkit'


export const UserSlice = createSlice({
    name: 'userDetails',
    initialState: {
        user: {
            userName: "",
            password: "",
            lastName: "",
            firstName: ""
        }
    },
    reducers: {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        storeUserDetails: (state, action) => {
            state.user = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { storeUserDetails } = UserSlice.actions

export default UserSlice.reducer