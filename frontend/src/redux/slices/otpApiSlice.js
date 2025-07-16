import { apiSlice } from "./apiSlice";

const OTP_URL = "/api/otp";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    generateOtp: builder.mutation({
      query: (data) => ({
        url: `${OTP_URL}/send-otp`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGenerateOtpMutation } = authApiSlice;
