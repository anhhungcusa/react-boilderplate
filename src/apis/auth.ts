import { Role, User } from 'store/modules/auth';
import { DataResponse, Payload } from 'types';
import { MockAPI } from 'utils/mock-api';

export const AuthApi = {
  async login(
    payload: Payload<{ username: string; password: string }>,
  ): Promise<DataResponse<{ accessToken: string; user: User }>> {
    try {
      const { body } = payload;
      await MockAPI.request(body, 100);
      return {
        data: {
          user: {
            username: body.username,
            name: body.username,
            role: body.username === Role.Admin ? Role.Admin : Role.Normal,
          },
          accessToken: body.username,
        },
        status: true,
        message: '',
      };
    } catch (error) {
      return Promise.reject({
        status: false,
        message: error.message,
      });
    }
  },
};
