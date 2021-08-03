import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { authSelector } from 'store/modules/auth';
import { PATH_NAME } from 'configs';

export type AuthGuardProps = {};

export const AuthGuard: FC = (props) => {
  const auth = useSelector(authSelector);
  if (auth.init) return <div>loading....</div>;
  if (!auth.init && !auth.isAuthenticated) return <Redirect to={PATH_NAME.LOGIN} />;
  return <> {props.children} </>;
};
