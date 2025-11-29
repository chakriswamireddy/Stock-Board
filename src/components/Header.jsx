import React from 'react'

function Header() {
  return (
    <div className='flex items-center justify-between sticky p-4   shadow rounded-xl border border-gray-200 ' >
        <div className='flex items-center gap-3 ' >
        <img className='size-6'
             src="/asterisk.png" alt="Asterik" />
            {/* <img src="https://validus.in/assets/images/validus-logo.svg" alt="Validus Logo" /> */}
            <p className='text-lg font-bold' > StockPulse </p>

        </div>  
      
            <img className='size-8'
             src="/man.png" alt="Notification Icon" />
        
    </div>
  )
}

export default Header