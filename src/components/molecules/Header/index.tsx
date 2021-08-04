import { FlexBox } from 'components/atoms/FlexBox';
import { authStorage } from 'configs/cache-storage';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions, authSelector } from 'store/modules/auth';

export const Header: FC = (props) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(authSelector);
  const handleLogout = () => {
    authStorage.clear();
    dispatch(authActions.clear());
  };
  return (
    <div>
      <FlexBox justify="between">
        <div>LOGO</div>
        <div>
          {isAuthenticated && (
            <>
              <span>{user?.username}</span>
              <button onClick={handleLogout}>logout</button>
            </>
          )}
        </div>
      </FlexBox>
    </div>
  );
};
