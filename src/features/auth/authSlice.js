import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { errorHandler } from '../../utils/errorHandler';
import { setupTokenHeaderForAxios } from './setupTokenHeaderForAxios';

const API_URL = 'https://gortigram.themohammadsa.repl.co/user';

export const createUser = createAsyncThunk(
  'auth/createUser',
  async ({ name, email, password, username }) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        name,
        email,
        password,
        username,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const checkUserLoginStatus = createAsyncThunk(
  'auth/checkUserLoginStatus',
  async () => {
    try {
      const response = await JSON.parse(localStorage.getItem('loginStatus'));
      return response;
    } catch (error) {
      return errorHandler(error);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    createUserStatus: 'idle',
    loginStatus: 'idle',
    errorMessage: null,
    name: null,
    email: null,
    username: null,
    token: null,
  },
  reducers: {
    logOut: (state) => {
      localStorage.removeItem('loginStatus');
      setupTokenHeaderForAxios(null);
      state.name = null;
      state.email = null;
      state.token = null;
      state.username = null;
      state.errorMessage = null;
      state.loginStatus = 'idle';
      state.createUserStatus = 'idle';
    },
  },
  extraReducers: {
    [createUser.pending]: (state) => {
      state.status = 'pending';
    },
    [createUser.fulfilled]: (state, { payload }) => {
      if (payload.success) {
        state.errorMessage = null;
        state.createUserStatus = 'fulfilled';
      } else if (payload.message === '409') {
        state.createUserStatus = 'error';
        state.errorMessage = 'Email/Username already exists';
      } else {
        state.createUserStatus = 'error';
        state.errorMessage = 'Server error!';
      }
    },
    [createUser.rejected]: (state) => {
      state.createUserStatus = 'rejected';
      state.errorMessage = 'Data is missing!';
    },
    [loginUser.pending]: (state) => {
      state.status = 'pending';
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      if (payload.success) {
        state.name = payload.name;
        state.email = payload.email;
        state.username = payload.username;
        state.token = payload.token;
        state.errorMessage = null;
        setupTokenHeaderForAxios(payload.token);
        window.localStorage.setItem(
          'loginStatus',
          `${JSON.stringify({
            username: payload.username,
            token: payload.token,
            name: payload.name,
            email: payload.email,
          })}`
        );
        state.loginStatus = 'fulfilled';
      } else if (payload.message === '409') {
        state.loginStatus = 'error';
        state.errorMessage = 'Password incorrect';
      } else if (payload.message === '403') {
        state.loginStatus = 'error';
        state.errorMessage = 'Email not found';
      } else {
        state.loginStatus = 'error';
        state.errorMessage = 'Server error!';
      }
    },
    [loginUser.rejected]: (state) => {
      state.loginStatus = 'rejected';
      state.errorMessage = 'Data is missing!';
    },
    [checkUserLoginStatus.fulfilled]: (state, { payload }) => {
      if (payload) {
        state.name = payload.name;
        state.token = payload.token;
        state.username = payload.username;
        state.errorMessage = null;
        setupTokenHeaderForAxios(payload.token);
        state.loginStatus = 'fulfilled';
      }
      state.errorMessage = null;
    },
  },
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
