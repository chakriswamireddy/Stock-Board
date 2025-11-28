import React from 'react'

function Header() {
  return (
    <div className='flex items-center justify-between sticky p-4   shadow rounded-xl border border-gray-200 ' >
        <div className='flex items-start gap-1  ' >
            <p className='text-violet-600 size-4 ' >  ✱ </p>
            {/* <img src="https://validus.in/assets/images/validus-logo.svg" alt="Validus Logo" /> */}
            <p> StockPulse </p>

        </div>
      
            <img className=''
             src="https://img.icons8.com/ios-glyphs/30/000000/appointment-reminders--v1.png" alt="Notification Icon" />
        
    </div>
  )
}

export default Header