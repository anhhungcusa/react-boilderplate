import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './type';

const initialState: AuthState = {
  isAuthenticated: false,
  init: true,
  isExpired: false,
};

export const { actions: authActions, reducer: authReducer } = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authen(state, action: PayloadAction<Pick<Required<AuthState>, 'user' | 'accessToken'>>) {
      const { payload } = action;
      state.init = false;
      state.isAuthenticated = true;
      state.user = payload.user;
      state.accessToken = payload.accessToken;
      state.isExpired = false;
    },
    authWithFailed(state) {
      state.init = false;
    },
    expireSession(state) {
      if (state.isAuthenticated) {
        state.isExpired = true;
      }
    },
    clear() {
      return { ...initialState, init: false };
    },
  },
});
