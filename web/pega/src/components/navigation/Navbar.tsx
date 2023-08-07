import React, { useState } from "react";
import {
    Link,
    NavLink
} from 'react-router-dom';
import {
    FaBars,
    FaTimes
} from 'react-icons/fa';
import icon from '../../assets/images/get_IT_logo.png';
import pegaIcon from '../../assets/images/pega-logo.png';




const Navbar = () => {
    const links = [
        {name: 'Action', id: 'actionNavId', link: '/action'},
        {name: 'Dashboard', id: 'dashboardId', link: '/dashboard'},
        {name: 'Decision', id: 'decisionNavId', link: '/decision'},
        {name: 'Admin', id: 'partyNavId', link: '/party'},
    ]

    let [isOpen, setIsOpen] = useState(false);
    return (
        <div className="shadow-md w-full fixed mb-auto top-0 left-0 bg-white">
            <div className="md:px-10 py-4 px-7 md:flex justify-between items-center">
                {/* logo and title here */}
                <Link to='/'>
                    <div className="flex text-2x1 cursor-pointer items-center gap-2">
                        <img src={icon} alt="Home" className='w-10 h-10'></img>
                        <span className="font-bold">
                            Get-IT Solutions 
                        </span> 
                        <img src={pegaIcon} alt="Home" className='h-10'></img>
                    </div>
                </Link>

                {/* menu icon */}
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-7 h-7 absolute right-8 top-6 cursor-pointer md:hidden"
                >
                    {
                        isOpen? <FaTimes></FaTimes>: <FaBars></FaBars>
                    }
                </div>

                {/* nav links here */}
                <ul className={`md:flex md-items-center md:pb-0 pb-12 
                    absolute md:static bg-white md:z-auto z-[-1] left-0 w-full 
                    md:w-auto md:pl-1 pl-9 transistion-all
                    duration-500 ease-in bg-white
                    ${ isOpen? 'top-12': 'top-[-490px]'}`}>
                    {
                        links.map(
                            link => (
                                <li className='font-semibold my-7 md:my-0 md:ml-8 ' key={link.id}>
                                    <NavLink
                                        to={link.link}
                                        id={link.id}
                                    >
                                        {link.name}
                                    </NavLink>
                                </li>
                            )
                        )
                    }  
                </ul>
            </div>
        </div>
    )
};

export default Navbar;