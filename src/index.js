import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css';
import reportWebVitals from './reportWebVitals';
import ErrorPage from './error-page';

import Root from "./routes/root";
import { getProjects as projectLoader } from "./query";
import ProjectDetails from "./components/projects";
import Project from "./routes/project";
import Docs from './routes/docs';
import CheatSheet from './routes/cheatsheet';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "projects",
        element: <Project />,
        children: [
          {
            path: ":projectId",
            element: <ProjectDetails />,
            loader: projectLoader
          }
        ]
      },
      {
        path: "docs",
        element: <Docs />
      },
      {
        path: "cheatsheet",
        element: <CheatSheet />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
