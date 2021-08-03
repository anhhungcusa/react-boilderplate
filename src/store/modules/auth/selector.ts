import { RootState } from 'store/root-reducer';

export const userSelector = (rootState: RootState) => rootState.auth.user;
export const authSelector = (rootState: RootState) => rootState.auth;
export const roleSelector = (rootState: RootState) => userSelector(rootState)?.role;
