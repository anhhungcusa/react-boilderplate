import { useEffect, FC } from 'react';
import { useDispatch } from 'react-redux';

import { authStorage } from 'configs/cache-storage';
import { authActions } from 'store/modules/auth';

export const AuthContainer: FC = (props) => {
  const dispatch = useDispatch();
  const initAuth = () => {
    const cachedAuth = authStorage.value;
    if (cachedAuth) {
      dispatch(authActions.authen(cachedAuth));
    } else {
      dispatch(authActions.authWithFailed());
    }
  };

  useEffect(() => {
    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{props.children}</>;
};
