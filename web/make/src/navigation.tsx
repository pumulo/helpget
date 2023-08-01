import {
    createBrowserRouter,
} from "react-router-dom";


import { Login, Splash } from "./components";
import ActionHome from "./components/action/ActionHome";
import DecisionHome from "./components/decision/DecisionHome";
import EntityHome from "./components/entity/EntityHome";
import CreateEntity from "./components/entity/create/entity";
import PartyHome from "./components/party/PartyHome";
import AppLayout from "./components/AppLayout";
import GenaiHome from "./components/genai/GenAIHome";
import CreateEntityBatch from "./components/entity/create/entityBatch";
  
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
                    path: "/decision",
                    element: < DecisionHome />
                },
                {
                    path: "/entity",
                    element: < EntityHome />
                },
                {
                    path: "/entity/create",
                    element: < CreateEntity />
                },
                {
                    path: "/entity/batch/create",
                    element: < CreateEntityBatch />
                },
                {
                    path: "/genai",
                    element: < GenaiHome />
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