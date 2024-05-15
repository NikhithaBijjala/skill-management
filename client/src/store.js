import { configureStore } from '@reduxjs/toolkit'
import UserSliceReducer from './userslice'

export default configureStore({
  reducer: {
    userDetails: UserSliceReducer
  },
})