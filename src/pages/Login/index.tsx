import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';

import { FlexBox } from 'components/atoms/FlexBox';
import { AuthApi } from 'apis/auth';
import { authActions } from 'store/modules/auth';
import { useRouter } from 'hooks/useRouter';
import { PATH_NAME } from 'configs';
import { authStorage } from 'configs/cache-storage';

type FormData = {
  username: string;
  password: string;
};

const Login: FC = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = async (data, e) => {
    try {
      const res = await AuthApi.login({ body: data });
      dispatch(authActions.authen(res.data));
      authStorage.set(res.data, 24);
      router.push(PATH_NAME.DASHBOARD);
    } catch (error) {
      alert(error.message || 'Login failed');
    }
  };
  const onError: SubmitErrorHandler<FormData> = (errors, e) => console.log(errors, e);
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <FlexBox
        style={{ width: '100vw', height: '100vh' }}
        className="login-form"
        align="center"
        justify="center"
        direct="column"
      >
        <div>
          <label htmlFor="username">username</label>
          <input type="text" id="username" {...register('username', { required: true })} />
          {errors.username && <div>username is required</div>}
        </div>
        <br />
        <div>
          <label htmlFor="password">password</label>
          <input type="password" id="password" {...register('password', { required: true })} />
          {errors.password && <div>username is required</div>}
        </div>
        <br />
        <input type="submit"></input>
      </FlexBox>
    </form>
  );
};

export default Login;
