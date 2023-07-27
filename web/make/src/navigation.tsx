import {
    createBrowserRouter,
} from "react-router-dom";


import { Login, Splash } from "./components";
import ActionHome from "./components/action/ActionHome";
import DecisionHome from "./components/decision/DecisionHome";
import EntityHome from "./components/entity/EntityHome";
import PartyHome from "./components/party/PartyHome";
  
const router = createBrowserRouter(
    [
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
            path: "/decision",
            element: < DecisionHome />
        },
        {
            path: "/entity",
            element: < EntityHome />
        },
        {
            path: "/party",
            element: < PartyHome />
        },

    ]
);

export default router; 