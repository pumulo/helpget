import React from "react";
import splash from '../assets/images/get_IT_splash.png';
import { Copyright } from "./Copyright";

const Splash = () => {
    return (
        <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
            <img src={splash} alt="Get-IT Solutions"></img>
            <Copyright />
        </div>
    );
};

export { Splash };