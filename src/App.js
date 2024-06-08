import BookFinder from './components/BookFinder';
import ViewLibrary from './components/ViewLibrary';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import React from 'react';

const AppLayout = () => (
  <div className="app">
    <Outlet />
  </div>
);

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <BookFinder />,
      },
      {
        path: "/library",
        element: <ViewLibrary />,
      },
    ]
  },
]);

const App = () => <RouterProvider router={appRouter} />;

export default App;