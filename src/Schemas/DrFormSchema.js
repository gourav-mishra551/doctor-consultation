import * as Yup from 'yup'

export const DoctorSchema = Yup.object({
    dr_name: Yup.string().min(2).max(25).required("Please enter your name"),
    dr_email: Yup.string().email().required("Please enter the email"),
    dr_mobile: Yup.string()
        .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
        .required('Enter Mobile number'),
    dr_experience: Yup.string().max(2).required("Please enter your Experience in years"),
    dr_dateOfBirth: Yup.date()
        .max(new Date(), 'Date of birth cannot be in the future')
        .required('Date of birth is required'),
    dr_specailization: Yup.string().min(2).max(25).required("Please enter your Specialization"),
    hospital_name: Yup.string().min(2).max(25).required("Please enter your Hospital Name"),
    hospital_address: Yup.string().min(2).max(25).required("Please enter Hospital Address"),
    hospital_locality: Yup.string().min(2).max(25).required("Please enter Hospital Localiity"),
    hospital_state: Yup.string().min(2).max(25).required("Please enter Hospital State"),
    hospital_contact: Yup.string().min(2).max(25).required("Please enter Hospital Contact"),
    hospital_email: Yup.string().min(2).max(25).required("Please enter Hospital Email"),
})