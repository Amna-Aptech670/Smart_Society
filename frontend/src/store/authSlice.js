import { createSlice } from '@reduxjs/toolkit';

const savedUser = localStorage.getItem('smartsociety_user');
const parsedUser = savedUser ? JSON.parse(savedUser) : null;
const savedToken = localStorage.getItem('token');

const initialState = {
  user: parsedUser,
  role: parsedUser ? parsedUser.role.toLowerCase() : null,
  token: savedToken || null,
  isAuthenticated: parsedUser ? true : false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
  state.user = action.payload.user;
  state.role = action.payload.user.role.toLowerCase();
  state.token = action.payload.token;
  state.isAuthenticated = true;
  localStorage.setItem('smartsociety_user', JSON.stringify(action.payload.user));
  localStorage.setItem('token', action.payload.token);
},
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('smartsociety_user');
      localStorage.removeItem('token');
    }
  }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;