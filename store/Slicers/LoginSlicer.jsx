import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as Secure from 'expo-secure-store'
export const getToken = createAsyncThunk(
  "token/getToken",
  async () => {
    const access_token = await Secure.getItemAsync('asccessToken')
    return access_token || null;
  }
)
export const setToken = createAsyncThunk(
  "token/setToken",
  async (token) => {
    await Secure.setItemAsync('asccessToken', token)
    return token;
  }
)
export const removeToken = createAsyncThunk(
  "token/removeToken",
  async () => {
    await Secure.deleteItemAsync('asccessToken')
    return null;
  }
)
const LoginSlicer = createSlice({
  name: "user",
  initialState: {
    user: null,
    access_token: null,
    logOut_load: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getToken.fulfilled, (state, { payload }) => {
      state.access_token = payload
    })
    builder.addCase(setToken.fulfilled, (state, { payload }) => {
      state.access_token = payload
    })
    builder.addCase(removeToken.pending, (state, { payload }) => {
      state.logOut_load = true
    })
    builder.addCase(removeToken.fulfilled, (state, { payload }) => {
      state.access_token = payload
      state.logOut_load = false
    })
  }
})


export default LoginSlicer.reducer;