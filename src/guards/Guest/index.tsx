import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { selectAuth } from 'store/modules/auth/selector';
import { PATH_NAME } from 'configs';

export const AuthGuard: FC = (props) => {
  const auth = useSelector(selectAuth);
  if (auth.isAuthenticated) return <Redirect to={PATH_NAME.ROOT} />;
  return <> {props.children} </>;
};
