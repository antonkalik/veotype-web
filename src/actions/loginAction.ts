import { Api } from "src/api";

export async function loginAction({ request }: { request: Request }) {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    throw new Error("Invalid form data");
  }

  try {
    await Api.Session.login(email, password);
    return { email, password };
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Invalid credentials") {
      return {
        error: "Invalid username or password.",
      };
    }
    throw error;
  }
}
