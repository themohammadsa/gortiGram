import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { errorHandler } from '../../utils/errorHandler';

const API_URL = 'https://gortigram.themohammadsa.repl.co/profile';

export const postProfile = createAsyncThunk(
  'posts/postProfile',
  async ({ bio, website, profilePicture, username }) => {
    try {
      const response = await axios.post(`${API_URL}/add`, {
        bio,
        website,
        profilePicture,
        username,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const getProfile = createAsyncThunk(
  'posts/getProfile',
  async ({ username }) => {
    try {
      const response = await axios.post(`${API_URL}/get`, {
        username,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const getPostFromUsername = createAsyncThunk(
  '/getPostFromUsername',
  async ({ username }) => {
    try {
      const response = await axios.post(`${API_URL}/getPosts`, { username });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  }
);

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

export const searchUser = createAsyncThunk(
  '/searchUser',
  async ({ searchValue }) => {
    try {
      const response = await axios.post(`${API_URL}/searchUser`, {
        searchValue,
      });
      console.log('sear', response.data);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: null,
    profilePosts: null,
    searchUser: [],
    status: 'idle',
    getProfileStatus: 'idle',
    postProfileStatus: 'idle',
    followUserStatus: 'idle',
    unFollowUserStatus: 'idle',
    searchUserStatus: 'idle',
  },
  reducers: {
    clearSearch: (state) => {
      state.searchUser = [];
    },
  },
  extraReducers: {
    [getProfile.pending]: (state) => {
      state.getProfileStatus = 'pending';
    },
    [getProfile.fulfilled]: (state, { payload }) => {
      state.profile = payload.findUser;
      state.getProfileStatus = 'fulfilled';
    },
    [getPostFromUsername.pending]: (state) => {
      state.status = 'pending';
    },
    [getPostFromUsername.fulfilled]: (state, { payload }) => {
      state.profilePosts = payload.findPosts;
      state.status = 'fulfilled';
    },
    [postProfile.pending]: (state) => {
      state.postProfileStatus = 'pending';
    },
    [postProfile.fulfilled]: (state) => {
      state.postProfileStatus = 'fulfilled';
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
    [searchUser.pending]: (state) => {
      state.searchUserStatus = 'pending';
    },
    [searchUser.fulfilled]: (state, { payload }) => {
      state.searchUser = payload.searchResult;
      console.log('state search', state.searchUser);
      state.searchUserStatus = 'fulfilled';
    },
  },
});

export const { clearSearch } = profileSlice.actions;

export default profileSlice.reducer;
