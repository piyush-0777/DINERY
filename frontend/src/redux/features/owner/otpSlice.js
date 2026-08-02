import { createSlice } from "@reduxjs/toolkit";
import { sendOTP, verifyOTP } from "../../thunks/otpThunk";

const initialState = {
    loading: false,
    success: false,
    verified: false,
    message: "",
    error: null,
};

const otpSlice = createSlice({
    name: "otp",
    initialState,

    reducers: {
        resetOTPState: (state) => {
            state.loading = false;
            state.success = false;
            state.verified = false;
            state.message = "";
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder

            // Send OTP
            .addCase(sendOTP.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendOTP.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(sendOTP.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload?.message;
            })

            // Verify OTP
            .addCase(verifyOTP.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyOTP.fulfilled, (state, action) => {
                state.loading = false;
                state.verified = true;
                state.message = action.payload.message;
            })
            .addCase(verifyOTP.rejected, (state, action) => {
                state.loading = false;
                state.verified = false;
                state.error = action.payload?.message;
            });
    },
});

export const { resetOTPState } = otpSlice.actions;

export default otpSlice.reducer;