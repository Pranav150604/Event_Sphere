import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';

export default function ({username}) {
    const [user,setUser] = useState("")
    const [userType,setUserType] = useState("")
    const [drop,setDrop] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('jwtToken');
        
        if (token) {
          try {
            const decodedToken = jwtDecode(token);
            const user = decodedToken.uname;
            setUserType(decodedToken.user_type);
            setUser(user);
          } catch (error) {
            console.error('Error decoding token:', error);
          }
        }
      }, []);
    
    const logout = () => {
        localStorage.removeItem('jwtToken');
        navigate("/signin")
    }

    return <div className="font-outfit">
        <nav className="bg-white border-gray-200 ml-[25px] mr-[25px]">
            <div className=" flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center">
                    <Link to="/home">
                        <a className="flex items-center space-x-3">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-orange-500">eventsphere</span>
                    </a>
                    </Link>
                    
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 absolute mt-[10px] ml-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        <input className="bg-slate-200 ml-4 pl-8 p-2 rounded-3xl shadow-md w-[750px]" type="text" placeholder="Search events" />

                    </div>
                </div>

                <div className="">
                    <div className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white gap-5">
                        {userType == "customer" ? null : 
                        <Link to="/create" className="flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            <div className="hover:text-slate-500 hover:cursor-pointer">Create Event</div>
                        </Link>}
                        {userType == "customer" ? null : 
                        <Link to="/organize" className="flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                            </svg>
                            <div className="hover:text-slate-500 hover:cursor-pointer">Organize Events</div>
                        </Link>}
                        
                        
                        <Link to="/userTickets" className="flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
                            </svg>

                            <div className="hover:text-slate-500 hover:cursor-pointer">Tickets</div>
                        </Link>
                        <div className="flex justify-center items-center gap-1 hover:bg-gray-200 w-[150px] cursor-pointer" onClick={(e) => {
                            setDrop(!drop)
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-8">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            <div className="flex justify-center items-center [16px]">{user}</div>
                            <div className="cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </div>
                            {drop ? <div className="fixed mt-[80px] bg-gray-200 w-[150px] flex justify-center p-2 items-center">
                                <div className="bg-red-500 flex rounded-lg w-20 text-center h-8 items-center justify-center hover:bg-red-600 text-white" onClick={logout}>logout</div>
                            </div>: null}
                            
                            
                        </div>
                        
                        
                    </div>
                </div>
            </div>
        </nav>

    </div>
}