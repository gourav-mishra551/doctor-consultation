import * as Yup from 'yup'

export const otpVerifySchema = Yup.object({
    otp_box: Yup.string()
        .matches(/^\d{6}$/, 'OTP must be exactly 6 digits')
        .required('OTP is required')
})