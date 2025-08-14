import { logout } from "./authSlice";
import { baseQuery } from "./apiSlice";

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    console.log("Access token expired, trying refresh...");

    const refreshResult = await baseQuery(
      { url: "/api/v1/auth/refresh-token", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult.data?.accessToken) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export default baseQueryWithReauth;
