import {Link} from 'react-router-dom'

function Footer() {
  return (
    <div className='p-8 flex flex-col items-center'>
      <Link to="/" className="text-2xl font-bold text-green-500 hover:text-green-700">MedHive.com</Link>

        <div className='flex flex-row justify-around'>

           <div className='flex flex-col flex-1 basis-2/5 gap-4 p-6 justify-center'>
                <p className='text-gray-500 text-sm'>This website was created in 2025 by a group of students from ESTIN as part of their modulo project. It allows users to search for and buy non-prescription medicines from pharmacists and other customers, making medicine shopping easier and more accessible</p>

                <div className='flex flex-row gap-3 justify-center'>
                    <div>
                    <i className="fa-brands fa-instagram"></i>
                    </div>
                    <div>
                    <i className="fa-brands fa-facebook"></i>
                    </div>
                    <div>
                    <i className="fa-brands fa-linkedin"></i>
                    </div>
                    <div>
                    <i className="fa-brands fa-pinterest"></i>
                    </div>
                </div>
            </div>


            <div className='flex flex-col flex-1 basis-1/5 gap-4 p-6 justify-center items-center'>
                {/* <Link to='/help-center' className='underline'>Help center</Link> */}
                <Link to='/terms'className='underline'>Terms of use</Link>
                {/* <Link to='/colaborations'className='underline'>Colaborations</Link> */}
                <Link to='/about-us'className='underline'>About us</Link>
            </div> 


            <div className='flex flex-col flex-1 basis-2/5 gap-4 p-6 justify-center'>
               <div className='gap-2'>
               <i className="fa-solid fa-location-dot"></i> 
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Route+nationale+n°75,+Amizour+06300+Béjaia" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:underline"
                >
                  Route nationale n°75, Amizour 06300 Béjaia
                </a>
                </div> 
               <div>
               <i className="fa-solid fa-phone"></i> 
                 <a 
                    href="tel:0164203819327" 
                    className="hover:underline"
                  >
                    0164 203 819 327
                  </a>
                </div> 
               <div>
               <i className="fa-solid fa-envelope"></i>
                <a href="mailto:support@medhive.com" className="hover:underline">
          medhivecompany@gmail.com
        </a>
                </div> 
            </div>
        </div>

    </div>
  )
}

export default Footer
