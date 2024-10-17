// @ts-expect-error deploy to server
import React from "react";

import { createRoot } from 'react-dom/client'

import ErrorPage from "./components/ErrorPage.tsx";

//import * as ReactDOM from "react-dom/client";

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

//import App from './App.tsx'

import { LocalizationProvider } from '@mui/x-date-pickers';

import CMPAHistoryForEmployee from "./pages/CMPAHistoryForEmployee.tsx";

import {CMPAForm} from "./components/CMPAForm.tsx";

import TestPage from "./pages/TestPage.tsx";

import './index.css'
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFnsV3";

const router = createBrowserRouter([
    {
        index:true,
        element: <div>Yipper</div>,
        errorElement: <ErrorPage />

    },
    {
        path: "/TestPage",
        element: <TestPage />,
        errorElement: <ErrorPage />
    },
    {
        path: "/CMPAHistory/:id/:name",
        element: <CMPAHistoryForEmployee />,
        errorElement: <ErrorPage />
    },
    {
        path: "/CMPAForm",
        element: <CMPAForm/>,
        errorElement: <ErrorPage />
    },
]
 , {
    basename: "/Portland"
});

//console.log(router);

//console.log(localStorage.getItem('manid'));

createRoot(document.getElementById('root')!).render(
  <>
<LocalizationProvider dateAdapter={AdapterDateFns}>
    <RouterProvider router={router} />
</LocalizationProvider>
  </>
)
