import { FC } from 'react';
import { useSelector } from 'react-redux';

import { roleSelector } from 'store/modules/auth/selector';
import { useEffect } from 'react';
import { PATH_NAME } from 'configs';
import { useHistory } from 'react-router-dom';

export type Props = {
  requiredRoles?: string[];
};

export const RoleRoute: FC<Props> = ({ requiredRoles, children }) => {
  const { replace } = useHistory();
  const role = useSelector(roleSelector);
  useEffect(() => {
    if (!requiredRoles?.length) return;
    const authorized = requiredRoles.includes(role || '');
    if (!authorized) {
      replace(PATH_NAME.ROOT);
    }
  }, [role, requiredRoles, replace]);
  return <>{children}</>;
};
