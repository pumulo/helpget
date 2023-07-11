import React from "react";
import { Login, Splash } from "./components";

const App = () => {
    return (
        <div className="container mx-auto">
            <Login />
            <Splash />
        </div>
    );
};

export default App;