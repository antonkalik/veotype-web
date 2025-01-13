import { useEffect, useState } from "react";
import { RouterProvider } from "react-router";
import { Api } from "src/api";
import { Spinner } from "flowbite-react";
import { router } from "./router.tsx";

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Api.Constrains.getConstrains()
      .then((response) => {
        console.log(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner color="info" aria-label="Loading..." />
      </div>
    );
  }

  return <RouterProvider router={router} />;
};
