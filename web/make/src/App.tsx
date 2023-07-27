import React from "react";
import {
    RouterProvider
} from 'react-router-dom';
import router from './navigation'
import Navbar from "./components/Navbar";


const App = () => {
    return (
        <div className="container mx-auto">
            <Navbar />
            <RouterProvider router={router} />
        </div>
    );
};

export default App;