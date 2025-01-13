import { createBrowserRouter, Route } from "react-router-dom";
import { createRoutesFromElements } from "react-router";
import { SessionProvider } from "./components/SessionProvider";
import { ErrorPage } from "./pages/ErrorPage";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { TrainPage } from "./pages/TrainPage";
import { AboutPage } from "./pages/AboutPage";
import { PublicRoute } from "./components/PublicRoute";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { UserPage } from "./pages/UserPage";
import { SettingsPage } from "./pages/SettingsPage";
import { PostsPage } from "./pages/PostsPage";
import { PostPage } from "./pages/PostPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const router = createBrowserRouter(
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
