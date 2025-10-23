import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='mt-14 bottom-0 w-full'>
      {/* Main Footer Links Section: Responsive grid/flex layout */}
      <div className='footer flex flex-wrap justify-between gap-y-10 px-4 sm:px-6 lg:px-14 max-w-7xl mx-auto'>

        {/* Stay Connected Column */}
        <div className='flex flex-col gap-6 w-full sm:w-1/2 lg:w-auto'>
          <h1 className='text-lg font-bold'>Stay Connected</h1>
          <div className='flex flex-col gap-1 text-gray-700 text-sm'>
          <p>Address: Punjab, Pakistan</p>
          <p>Phone: (+92) 3030935500</p>
          <h2 className='mt-2 text-base font-semibold text-black'>Follow us on Social media</h2>
          <div className='flex gap-3 mt-1'>
            {/* Social Icons (Slightly larger and adjusted hover effect for better touch targets) */}
            <div className="h-8 w-8 hover:scale-110 hover:text-black transition-all duration-150 ease-in border border-gray-400 flex items-center justify-center rounded-full"><Link target='_blank' to={'https://x.com/naeem_sadozaii'}><i className="fa-brands fa-x-twitter"></i></Link></div>
            <div className="h-8 w-8 hover:scale-110 hover:text-black transition-all duration-150 ease-in border border-gray-400 flex items-center justify-center rounded-full"><Link target='_blank' to={'https://www.facebook.com/share/1UQkp1PDRM/?mibextid=wwXIfr'}><i className="fa-brands fa-facebook"></i></Link></div>
            <div className="h-8 w-8 hover:scale-110 hover:text-black transition-all duration-150 ease-in border border-gray-400 flex items-center justify-center rounded-full"><Link target='_blank' to={'https://wa.me/923030935500'}><i className="fa-brands fa-whatsapp"></i></Link></div>
            <div className="h-8 w-8 hover:scale-110 hover:text-black transition-all duration-150 ease-in border border-gray-400 flex items-center justify-center rounded-full"><Link target='_blank' to={'https://www.instagram.com/naeem_sadozai?igsh=eWF3cGZ0bXEwODJl&utm_source=qr'}><i className="fa-brands fa-instagram"></i></Link></div>
          </div>
          </div>
        </div>

        {/* CarZone Column */}
        <div className='flex flex-col gap-6 w-full sm:w-1/2 lg:w-auto'>
          <h1 className='text-lg font-bold'>CarZone</h1>
          <ul className='text-gray-700 flex flex-col gap-1 text-sm'>
            <li className='hover:text-black hover:underline'><Link to='/'>About Us</Link></li>
            <li className='hover:text-black hover:underline'><Link to='/'>Careers</Link></li>
            <li className='hover:text-black hover:underline'><Link to='/'>Collaboration</Link></li>
            <li className='hover:text-black hover:underline'><Link to='/'>Dashboard</Link></li>
            <li className='hover:text-black hover:underline'><Link to='/'>Policies</Link></li>
          </ul>
        </div>

        {/* Customer Services Column */}
        <div className='flex flex-col gap-6 w-full sm:w-1/2 lg:w-auto'>
          <h1 className='text-lg font-bold'>Customer Services</h1>
          <div>
            <ul className='text-gray-700 flex flex-col gap-1 text-sm'>
              <li className='hover:text-black hover:underline'>
                <Link to={'/'}>Rules and Regulations</Link>
              </li>
              <li className='hover:text-black hover:underline'>
                <Link to={'/'}>Terms of Use</Link>
              </li>
              <li className='hover:text-black hover:underline'>
                <Link to={'/'}>Return Procedures</Link>
              </li>
              <li className='hover:text-black hover:underline'>
                <Link to={'/'}>Privacy Policies</Link>
              </li>
              <li className='hover:text-black hover:underline'>
                <Link to={'/'}>Forums</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Us Column */}
        <div className='flex flex-col gap-6 w-full sm:w-1/2 lg:w-auto'>
          <h1 className='text-lg font-bold'>Contact Us</h1>
          <div>
            <ul className='text-gray-700 flex flex-col gap-1 text-sm'>
              <li className='hover:text-black hover:underline'>
                <Link>Contact Us</Link>
              </li>
              <li className='hover:text-black hover:underline'>
                <Link>Blog</Link>
              </li>
              <li className='hover:text-black hover:underline'>
                <Link>Returns and Refunds</Link>
              </li>
              <li className='hover:text-black hover:underline'>
                <Link>Track Order</Link>
              </li>
              <li className='hover:text-black hover:underline'>
                <Link>FAQ</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Copyrights Section: Layout changes to stack on mobile */}
      <div className="copyrights bg-blue-500 mt-8 py-3 text-white">
        <div className='w-11/12 mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left text-sm gap-2'>
          <h1 className='text-xs sm:text-sm'>&copy; All Rights Reserved for CarZone - 2025</h1>
          <div className='flex gap-2 text-xs sm:text-sm'>
            <div className='border-r pr-2 border-gray-300'>
              <Link className='hover:underline'>Terms & Conditions</Link>
            </div>
            <Link className='hover:underline'>Privacy Policies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;

