import { createRoutesFromElements, RouterProvider } from "react-router";
import { createBrowserRouter, Route } from "react-router-dom";
import { ErrorPage } from "src/pages/ErrorPage";
import { Layout } from "src/components/Layout";
import { HomePage } from "src/pages/HomePage";
import { AboutPage } from "src/pages/AboutPage";
import { LoginPage } from "src/pages/LoginPage";
import { SignUpPage } from "src/pages/SignUpPage";
import { ForgotPasswordPage } from "src/pages/ForgotPasswordPage";
import { UserPage } from "src/pages/UserPage";
import { SettingsPage } from "src/pages/SettingsPage";
import { PostsPage } from "src/pages/PostsPage";
import { PostPage } from "src/pages/PostPage";
import { NotFoundPage } from "src/pages/NotFoundPage";
import { SessionProvider } from "src/components/SessionProvider";
import { PublicRoute } from "./components/PublicRoute";
import { ProtectedRoute } from "src/components/ProtectedRoute";
import { TrainPage } from "src/pages/TrainPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<SessionProvider />} errorElement={<ErrorPage />}>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/train" element={<TrainPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/login"
          element={<PublicRoute element={<LoginPage />} />}
        />
        <Route
          path="/sign-up"
          element={<PublicRoute element={<SignUpPage />} />}
        />
        <Route
          path="/forgot-password"
          element={<PublicRoute element={<ForgotPasswordPage />} />}
        />
        <Route
          path="/account"
          element={<ProtectedRoute element={<UserPage />} />}
        />
        <Route
          path="/settings"
          element={<ProtectedRoute element={<SettingsPage />} />}
        />
        <Route path="/posts" element={<ProtectedRoute />}>
          <Route index element={<PostsPage />} />
          <Route path=":uuid" element={<PostPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
);

export const App = () => {
  return <RouterProvider router={router} />;
};
