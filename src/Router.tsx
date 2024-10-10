import { createBrowserRouter } from "react-router-dom";

import { Applayout } from "./components/layouts/AppLayout";

import NoMatch from "./pages/NoMatch";
import Home from "./pages/home";
import Document from "./pages/document";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Applayout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "Document",
          element: <Document />,
        },
      ],
    },
    {
      path: "*",
      element: <NoMatch />,
    },
  ],
  {
    basename: global.basename,
  }
);
