import { apiSlice } from "./apiSlice";

const API_URL = import.meta.env.VITE_API_URL;

let OTP_URL;

if (import.meta.env.PROD) {
  OTP_URL = `${API_URL}/api/v1/otp`;
} else {
  OTP_URL = "/api/v1/otp";
}

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
