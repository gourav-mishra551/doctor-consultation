import * as Yup from 'yup'

export const UserSchema = Yup.object({
    name: Yup.string().min(2).max(25).required("Please enter your name"),
    email: Yup.string().email().required("Please enter the email"),
    mobile: Yup.string()
        .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
        .required('Mobile number is required'),
    password: Yup.string().min(6).required("Please enter the password"),
    confirm_password: Yup.string().required().oneOf([Yup.ref('password'), null], "password must matched")
})