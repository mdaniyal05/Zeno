import { logout, setToken } from "./authSlice";
import { baseQuery } from "./apiSlice";
import { apiSlice } from "./apiSlice";

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let response = await baseQuery(args, api, extraOptions);

  if (response.error?.status === 401) {
    const refreshResponse = await apiSlice.endpoints.refreshToken.initiate(
      null
    )(api.dispatch, api.getState, extraOptions);

    if (refreshResponse.data?.accessToken) {
      api.dispatch(setToken(refreshResponse.data.accessToken));
      response = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return response;
};

export default baseQueryWithReauth;
