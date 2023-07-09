import React from "react";
import splash from './assets/images/get_IT_splash.jpg';

const App = () => {
    return (
        <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
            <img src={splash} alt="Get-IT Solutions"></img>
        </div>
    );
};

export default App;