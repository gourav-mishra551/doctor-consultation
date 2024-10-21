import { NavLink } from 'react-router-dom'
import { MdOutlineEmail } from "react-icons/md";

const TopHeader = () => {
  return (
    <div className='h-auto bg-[#00768a] sm:flex justify-between p-1 hidden'>
      <div className='flex justify-between'>
        <div className='flex gap-1'>
          <p className='text-white font-normal ml-4 text-[12px]'>
            <NavLink to={`mailto:info@ametheushealth.com?subject=Subject&body=Body`}>EMAIL US</NavLink></p>
          <NavLink to={`mailto:info@ametheushealth.com?subject=Subject&body=Body`}> <MdOutlineEmail className='mt-1 text-sm text-white' /></NavLink>
        </div>

        <NavLink to="tel:+9999099538">
          <p className='text-white font-normal ml-4 text-sm'>+91-9999099538</p>
        </NavLink>

      </div>

      <div className='flex justify-between mr-4'>
        <p className='text-white font-normal ml-4 text-[11px] cursor-pointer'>
          <NavLink className="text-white" to='/contact-us'>Contact us</NavLink>
          </p>
        <p className='text-white font-normal ml-4 text-[11px] cursor-pointer'>
          <NavLink className="text-white" to='/about'>About us</NavLink>
          </p>
        <p className='text-white font-normal ml-4 text-[11px] cursor-pointer'>
          <NavLink className="text-white" to='/faq'>FAQ's</NavLink>
          </p>
      </div>
    </div>
  )
}

export default TopHeader