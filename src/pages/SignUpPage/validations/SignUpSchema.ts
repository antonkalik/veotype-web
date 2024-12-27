import * as Yup from "yup";

export const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  birthdate: Yup.date()
    .required("Birthdate is required")
    .max(new Date(), "Birthdate cannot be in the future"),
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
});
