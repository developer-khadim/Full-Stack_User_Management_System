import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Initail state of store
const initialState = {
     userData: null,
     token: null,
     loading: false,
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
      reducers: {},
      extraReducers: (builder) => {
          builder
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

export default userSlice.reducer;