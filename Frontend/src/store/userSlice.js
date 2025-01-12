import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

// Initail state of store
const initialState = {
     loading: false,
     token: null,
     userData: null,
     error: null
}

export const handleGoogleCallback = createAsyncThunk(
     'user/handleGoogleCallback',
     async (queryParams, { rejectWithValue }) => {
        let { user, token } = queryParams;
        if(user && token){
           return { user, token}
        } else {
         return rejectWithValue("Authentication failed")
        }
     }
)

// Create a Slice
const userSlice = createSlice({
      name: 'user',
      initialState,
      reducers: {
          setUserData(action, state){
               state.loading = false
               state.token = action.payload?.token || null
               state.userData = action.payload?.userData || null
               state.error = null

          }
      },
      extraReducers: (builder) => {
          builder

          // Handle data come from GoogleApi
          .addCase(handleGoogleCallback.pending, (state) => {
               state.loading = true
               state.error = null
          })
          .addCase(handleGoogleCallback.fulfilled, (state, action) => {
               state.loading = false
               state.userData = action.payload.user
               state.token = action.payload.token
               localStorage.setItem('token', action.payload.token)
          })
          .addCase(handleGoogleCallback.rejected, (state, action) =>{
               state.loading = false,
               state.error = action.payload || 'Autentication failed'
          })

          

     },
}) 

export const { setUserData } = userSlice.actions
export default userSlice.reducer;