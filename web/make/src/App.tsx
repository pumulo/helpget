import React from "react";
import { Login } from "./components";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link
} from 'react-router-dom'
import ActionHome from "./components/action/ActionHome";
import DecisionHome from "./components/decision/DecisionHome";
import EntityHome from "./components/entity/EntityHome";
import PartyHome from "./components/party/PartyHome";
import Navbar from "./components/Navbar";


const App = () => {
    return (
        <Router>
            <div className="container mx-auto">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Login />}/>
                    <Route path="/action" element={<ActionHome />}/>
                    <Route path="/decision" element={<DecisionHome />}/>
                    <Route path="/entity" element={<EntityHome />}/>
                    <Route path="/party" element={<PartyHome />}/>
                </Routes>
            </div>
        </Router>
    );
};

export default App;