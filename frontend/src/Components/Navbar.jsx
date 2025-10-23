import React, { useState,useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from 'axios'

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedin,setIsLoggedin] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
  try {
    let response = await axios.post("https://cars-selling-website-backend.onrender.com/auth/logout",{},{ withCredentials: true });
    setIsLoggedin(false);
    setIsAdmin(false);
    window.location.reload()
    navigate("/");
  } catch (error) {
    alert("Can't Logout");
  }
};


  useEffect(()=>{
    let check = async()=>{
      try {
        let response = await axios.get('https://cars-selling-website-backend.onrender.com/auth/isLoggedin',{withCredentials:true});
        console.log(response.data.isLoggedin)
        if(response.data.isLoggedin){
          setIsLoggedin(true)
        }else{
          setIsLoggedin(false)
        }
        if(response.data.role === 'admin'){
          setIsAdmin(true)
        };
      } catch (error) {
        if (error.response && error.response.status === 401) {
            setIsLoggedin(false); 
        } else {
            console.error("Critical login check failure:", error);
        }
      }
    }
    check();
  },[])



  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const baseNavLinkClasses = ({ isActive }) =>
    `block text-white text-md font-semibold py-2 px-4 md:p-0 transition-all duration-100 ease-out 
     ${isActive ? "md:border-b-2 text-sky-400 md:text-white" : "hover:text-sky-400"}
     ${isActive ? "bg-gray-700 md:bg-transparent" : "hover:bg-gray-700 md:hover:bg-transparent"}
    `;

  const createListingClasses = "block text-sky-400 hover:text-white border border-sky-400 hover:bg-sky-500 py-2 px-4 rounded-lg transition-all duration-100 ease-out mt-2 md:mt-0 md:ml-4";


  return (
    <nav className="w-full sticky top-0 bg-gray-800 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="navbar flex justify-between h-16 items-center">
          {/* Company Logo */}
          <div className="company-logo flex-shrink-0">
            <Link to={'/'} className="text-white text-xl sm:text-2xl font-bold" onClick={closeMenu}>
              <i className="fa-solid fa-car-side"></i> CarZone
            </Link>
          </div>

          {/* Hamburger Menu Button (Mobile) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              ) : (
                // Icon when menu is open
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
          
          {/* Desktop Navigations */}
          <div className="hidden md:block">
            <div className="navigations ml-10 flex items-baseline space-x-4">
              <ul className="flex items-center space-x-4 lg:space-x-6 text-white text-md font-semibold">
                <li>
                  <NavLink to={'/'} className={({isActive}) => isActive? "text-white border-b-2 py-1 transition-all duration-100 ease-out":'hover:text-sky-400'}>Home</NavLink>
                </li>
                <li>
                  <NavLink to={'/cars/all'} className={({isActive}) => isActive? "text-white border-b-2 py-1 transition-all duration-100 ease-out":'hover:text-sky-400'}>All Cars</NavLink>
                </li>
                <li>
                  <NavLink to={'/about_us'} className={({isActive}) => isActive? "text-white border-b-2 py-1 transition-all duration-100 ease-out":'hover:text-sky-400'}>About us</NavLink>
                </li>
                <li>
                  <NavLink to={'/contact_us'} className={({isActive}) => isActive? "text-white border-b-2 py-1 transition-all duration-100 ease-out":'hover:text-sky-400'}>Contact us</NavLink>
                </li>
                {(!isLoggedin) && <li>
                  <NavLink to={'/auth/login'} className={({isActive}) => isActive? "text-white border-b-2 py-1 transition-all duration-100 ease-out":'hover:text-sky-400'}>
                    <i className="fa-regular fa-user"></i> Sign in
                  </NavLink>
                </li>}
                 {(isLoggedin) && <li>
                  <button onClick={logout} className="hover:text-sky-600 cursor-pointer">
                    <i className="fa-regular fa-user"></i> Sign out
                  </button>
                </li>}
                
                {(isAdmin) && <li>
                  <NavLink to="/admin/createlisting" className={"hover:text-sky-400 transition-all duration-100 ease-out border border-white py-2 px-4 rounded-lg hover:border-sky-400"}>Create Listing</NavLink>
                </li>}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Conditionally rendered) */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink to={'/'} className={baseNavLinkClasses} onClick={closeMenu}>Home</NavLink>
          <NavLink to={'/cars/all'} className={baseNavLinkClasses} onClick={closeMenu}>All Listings</NavLink>
          <NavLink to={'/about_us'} className={baseNavLinkClasses} onClick={closeMenu}>About us</NavLink>
          <NavLink to={'/contact_us'} className={baseNavLinkClasses} onClick={closeMenu}>Contact us</NavLink>
          <NavLink to={'/auth/login'} className={baseNavLinkClasses} onClick={closeMenu}>
             <i className="fa-regular fa-user"></i> Sign in
          </NavLink>
          {(isAdmin) && (
             <NavLink to="/" className={createListingClasses} onClick={closeMenu}>Create Listing</NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};


export default Navbar;


