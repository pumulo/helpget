import React from "react";
import splash from '../assets/images/get_IT_splash.png';
import { Copyright } from "./Copyright";
import { useUserQuery } from "../store";

const Splash = (login: any) => {
    let content;
    const { data, error, isLoading } = useUserQuery(login.login);
    if (isLoading) {
        content = <i>loading...</i>
    } else if (error) {
        content = <div>Error loading user</div>
    } else {
        if (data) {
            const { firstName, lastName } = data
            content = <h1>Welcome {firstName} {lastName}</h1>
        } else {
            content = <div>Error no user found</div>
        }
    }
    return (
        <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
            {content}
            <img src={splash} alt="Get-IT Solutions"></img>
            <Copyright />
        </div>
    );
};

export { Splash };