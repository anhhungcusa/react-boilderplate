import { RootState } from 'store/root-reducer';

export const selectUser = (rootState: RootState) => rootState.auth.user;
