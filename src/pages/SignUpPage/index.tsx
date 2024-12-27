import { FC } from "react";
import { useFormik } from "formik";
import { Button, Label, TextInput, Card } from "flowbite-react";
import { SignUpSchema } from "./validations/SignUpSchema.ts";

export const SignUpPage: FC = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      birthdate: "",
      first_name: "",
      last_name: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      // Handle form submission logic here (e.g., call an API)
    },
  });

  return (
    <div className="flex w-full flex-1">
      <div className="flex w-full items-center justify-center">
        <Card className="m-auto h-auto w-full max-w-md">
          <h2 className="mb-6 text-center text-2xl font-semibold">Sign Up</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="first_name" value="First Name" />
              <TextInput
                id="first_name"
                name="first_name"
                placeholder="Enter your first name"
                color={
                  formik.errors.first_name && formik.touched.first_name
                    ? "failure"
                    : undefined
                }
                helperText={
                  formik.touched.first_name &&
                  formik.errors.first_name && (
                    <span className="text-sm text-red-500">
                      {formik.errors.first_name}
                    </span>
                  )
                }
                value={formik.values.first_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="last_name" value="Last Name" />
              <TextInput
                id="last_name"
                name="last_name"
                placeholder="Enter your last name"
                color={
                  formik.errors.last_name && formik.touched.last_name
                    ? "failure"
                    : undefined
                }
                helperText={
                  formik.touched.last_name &&
                  formik.errors.last_name && (
                    <span className="text-sm text-red-500">
                      {formik.errors.last_name}
                    </span>
                  )
                }
                value={formik.values.last_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="email" value="Email" />
              <TextInput
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                color={
                  formik.errors.email && formik.touched.email
                    ? "failure"
                    : undefined
                }
                helperText={
                  formik.touched.email &&
                  formik.errors.email && (
                    <span className="text-sm text-red-500">
                      {formik.errors.email}
                    </span>
                  )
                }
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="birthdate" value="Birthdate" />
              <TextInput
                type="date"
                id="birthdate"
                name="birthdate"
                color={
                  formik.errors.birthdate && formik.touched.birthdate
                    ? "failure"
                    : undefined
                }
                helperText={
                  formik.touched.birthdate &&
                  formik.errors.birthdate && (
                    <span className="text-sm text-red-500">
                      {formik.errors.birthdate}
                    </span>
                  )
                }
                value={formik.values.birthdate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            <div className="mb-6">
              <Label htmlFor="password" value="Password" />
              <TextInput
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                color={
                  formik.errors.password && formik.touched.password
                    ? "failure"
                    : undefined
                }
                helperText={
                  formik.touched.password &&
                  formik.errors.password && (
                    <span className="text-sm text-red-500">
                      {formik.errors.password}
                    </span>
                  )
                }
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            <Button
              type="submit"
              color="blue"
              fullSized
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Signing up..." : "Sign Up"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};
