import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { errorHandler } from '../../utils/errorHandler';

const API_URL = 'https://gortigram.themohammadsa.repl.co/profile';

export const getSuggestions = createAsyncThunk('/getSuggestions', async () => {
  try {
    const response = await axios.get(`${API_URL}/getSuggestions`);
    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
});

export const followUser = createAsyncThunk(
  '/followUser',
  async ({ myUsername, username }) => {
    try {
      const response = await axios.post(`${API_URL}/followUser`, {
        myUsername,
        username,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const unFollowUser = createAsyncThunk(
  '/unFollowUser',
  async ({ myUsername, username }) => {
    try {
      const response = await axios.post(`${API_URL}/unFollowUser`, {
        myUsername,
        username,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  }
);

const suggestionsSlice = createSlice({
  name: 'suggestions',
  initialState: {
    suggestions: null,
    status: 'idle',
  },
  reducers: {},
  extraReducers: {
    [getSuggestions.pending]: (state) => {
      state.status = 'pending';
    },
    [getSuggestions.fulfilled]: (state, { payload }) => {
      state.suggestions = payload.suggestions;
      state.status = 'fulfilled';
    },
    [followUser.pending]: (state) => {
      state.followUserStatus = 'pending';
    },
    [followUser.fulfilled]: (state) => {
      state.followUserStatus = 'fulfilled';
    },
    [unFollowUser.pending]: (state) => {
      state.unFollowUserStatus = 'pending';
    },
    [unFollowUser.fulfilled]: (state) => {
      state.unFollowUserStatus = 'fulfilled';
    },
  },
});

export default suggestionsSlice.reducer;
