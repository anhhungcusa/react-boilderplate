export const MockAPI = {
  request<T>(payload: T, ms: number, failed?: boolean): Promise<T> {
    return new Promise((rs, rj) => {
      setTimeout(() => {
        if (failed) rj('Something went wrong!');
        rs(payload);
      }, ms);
    });
  },
};
