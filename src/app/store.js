import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import postReducer from '../features/posts/postSlice';
import profileReducer from '../features/profile/profileSlice';
import suggestionsReducer from '../features/suggestions/suggestionsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    profile: profileReducer,
    suggestions: suggestionsReducer,
  },
});
