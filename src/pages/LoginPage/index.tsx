import { FC } from "react";
import { useFormik } from "formik";
import { Button, Label, TextInput, Card } from "flowbite-react";
import { LoginSchema } from "./validations/LoginSchema.ts";

export const LoginPage: FC = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });

  return (
    <div className="flex w-full flex-1">
      <div className="flex w-full items-center justify-center">
        <Card className="m-auto h-auto w-full max-w-md">
          <h2 className="mb-6 text-center text-2xl font-semibold">Login</h2>
          <form onSubmit={formik.handleSubmit}>
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
              {formik.isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};
