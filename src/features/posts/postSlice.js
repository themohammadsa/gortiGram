import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { errorHandler } from '../../utils/errorHandler';

const API_URL = 'https://gortigram.themohammadsa.repl.co/post';

export const postImage = createAsyncThunk(
  'posts/postImage',
  async ({ filename, url, caption, username }) => {
    try {
      const response = await axios.post(`${API_URL}/add`, {
        filename,
        url,
        caption,
        username,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
  try {
    const response = await axios.get(`${API_URL}/get`);
    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
});

export const likePost = createAsyncThunk(
  'posts/likePost',
  async ({ username, postId }) => {
    try {
      const response = await axios.post(`${API_URL}/likePost`, {
        username,
        postId,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const dislikePost = createAsyncThunk(
  'posts/dislikePost',
  async ({ username, postId }) => {
    try {
      const response = await axios.post(`${API_URL}/dislikePost`, {
        username,
        postId,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const postComment = createAsyncThunk(
  'posts/postComment',
  async ({ postId, username, comment }) => {
    try {
      const response = await axios.post(`${API_URL}/postComment`, {
        postId,
        username,
        comment,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
    postCommentStatus: 'idle',
    likePostStatus: 'idle',
  },
  reducers: {},
  extraReducers: {
    [getPosts.pending]: (state) => {
      state.status = 'pending';
    },
    [getPosts.fulfilled]: (state, { payload }) => {
      state.posts = payload.postsData;
      state.status = 'fulfilled';
    },
    [postComment.pending]: (state) => {
      state.postCommentStatus = 'pending';
    },
    [postComment.fulfilled]: (state) => {
      state.postCommentStatus = 'fulfilled';
    },
    [likePost.pending]: (state) => {
      state.likePostStatus = 'pending';
    },
    [likePost.fulfilled]: (state) => {
      state.likePostStatus = 'fulfilled';
    },
    [dislikePost.pending]: (state) => {
      state.likePostStatus = 'pending';
    },
    [dislikePost.fulfilled]: (state) => {
      state.likePostStatus = 'fulfilled';
    },
  },
});

export default postSlice.reducer;
