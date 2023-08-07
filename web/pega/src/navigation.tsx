import {
    createBrowserRouter,
} from "react-router-dom";


import { Login, Splash } from "./components";
import ActionHome from "./components/action/ActionHome";
import DecisionHome from "./components/decision/DecisionHome";
import PartyHome from "./components/party/PartyHome";
import AppLayout from "./components/AppLayout";
import { PegaDashboard } from "./components/dashboard/PegaDashboard";
  
const router = createBrowserRouter(
    [
        {
            element: <AppLayout/>,
            children: [
                {
                    path:"/",
                    element: (
                        <Login />
                    )
                },
                {
                    path: "/home",
                    element: < Splash />
                },
                {
                    path: "/action",
                    element: < ActionHome />
                },
                {
                    path: "/dashboard",
                    element: < PegaDashboard />
                },
                {
                    path: "/decision",
                    element: < DecisionHome />
                },
                {
                    path: "/party",
                    element: < PartyHome />
                },
            ]
        },
    ]
);

export default router; 